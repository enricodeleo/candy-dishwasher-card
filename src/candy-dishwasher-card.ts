import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import artwork from "../assets/dishwasher-running.svg";

declare const __VERSION__: string;

// The few Home Assistant frontend types this card uses.
interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
}

interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  platform: string;
  translation_key?: string;
}

interface Hass {
  states: Record<string, HassEntityState>;
  entities: Record<string, HassEntityRegistryEntry>;
  locale: { language: string };
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
}

type Role = "salt" | "rinse_aid" | "door" | "start" | "stop";

interface CardConfig extends Partial<Record<Role, string>> {
  type: string;
  entity: string;
  name?: string;
  needs_emptying?: string;
  hide_controls?: boolean;
}

// The Candy integration (bigmoby/home-assistant-candy) puts these entities on the
// dishwasher's device. They are found there by translation key, or failing that by the
// end of the entity id, and can be set in the card config instead.
const DISCOVERY: Record<Role, { domain: string; key: string; match: RegExp }> = {
  salt: { domain: "binary_sensor", key: "dishwasher_salt_empty", match: /salt_empty$/ },
  rinse_aid: { domain: "binary_sensor", key: "dishwasher_rinse_aid_empty", match: /rinse_aid_empty$/ },
  door: { domain: "binary_sensor", key: "dishwasher_door", match: /_door$/ },
  start: { domain: "button", key: "dishwasher_start_button", match: /start(_button)?$|_start_/ },
  stop: { domain: "button", key: "dishwasher_stop_button", match: /stop(_button)?$|_stop_/ },
};

const LABELS: Record<string, string> = {
  entity: "Dishwasher status sensor (Candy)",
  name: "Name",
  needs_emptying: "Needs emptying (binary sensor, optional)",
  hide_controls: "Hide Start / Stop",
  salt: "Salt empty",
  rinse_aid: "Rinse aid empty",
  door: "Door",
  start: "Start button",
  stop: "Stop button",
};

const STAGES = ["Pre-wash", "Wash", "Rinse", "Drying"] as const;
type Stage = (typeof STAGES)[number];
const DELAYED = "Delayed start programmed";
const OFFLINE = new Set(["unavailable", "unknown"]);

const TEXT = {
  en: {
    title: "Dishwasher",
    idle: "Idle",
    offline: "Not reachable",
    finished: "Finished",
    delayed: "Delayed start",
    startsIn: (h: number) => `Starts in ${h} h`,
    endsAt: (t: string) => `Ends at ${t}`,
    minutes: (m: number) => `${m} min`,
    finishedAt: (t: string, ago: string) => `Finished at ${t} · ${ago} ago`,
    needsEmptying: "Needs emptying",
    stages: { "Pre-wash": "Pre-wash", Wash: "Wash", Rinse: "Rinse", Drying: "Drying" },
    salt: "Salt empty",
    rinseAid: "Rinse aid empty",
    door: "Door open",
    eco: "Eco",
    start: "Start",
    stop: "Stop",
    confirmStop: "Tap again to stop",
    missing: "Entity not found",
  },
  it: {
    title: "Lavastoviglie",
    idle: "In attesa",
    offline: "Non raggiungibile",
    finished: "Finita",
    delayed: "Partenza ritardata",
    startsIn: (h: number) => `Parte tra ${h} h`,
    endsAt: (t: string) => `Fine alle ${t}`,
    minutes: (m: number) => `${m} min`,
    finishedAt: (t: string, ago: string) => `Finita alle ${t} · ${ago} fa`,
    needsEmptying: "Da svuotare",
    stages: { "Pre-wash": "Prelavaggio", Wash: "Lavaggio", Rinse: "Risciacquo", Drying: "Asciugatura" },
    salt: "Sale finito",
    rinseAid: "Brillantante finito",
    door: "Porta aperta",
    eco: "Eco",
    start: "Avvia",
    stop: "Interrompi",
    confirmStop: "Tocca di nuovo per fermare",
    missing: "Entità non trovata",
  },
};

export class CandyDishwasherCard extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private config?: CardConfig;
  @state() private armedStop = false;
  // Bumped every minute so "2 h ago" and "starts in" stay current between state changes.
  @state() private tick = 0;
  private armedTimer?: number;
  private clock?: number;
  private readonly reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private readonly onMotionChange = () => this.requestUpdate();

  static getConfigForm() {
    const optional = (name: string, domain: string) => ({
      name,
      selector: { entity: { filter: { domain } } },
    });
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: { entity: { filter: { domain: "sensor", integration: "candy" } } },
        },
        { name: "name", selector: { text: {} } },
        optional("needs_emptying", "binary_sensor"),
        { name: "hide_controls", selector: { boolean: {} } },
        {
          type: "expandable",
          name: "",
          title: "Entities (found automatically on the dishwasher's device)",
          schema: [
            optional("salt", "binary_sensor"),
            optional("rinse_aid", "binary_sensor"),
            optional("door", "binary_sensor"),
            optional("start", "button"),
            optional("stop", "button"),
          ],
        },
      ],
      computeLabel: (field: { name: string }) => LABELS[field.name],
    };
  }

  static getStubConfig(hass: Hass): Partial<CardConfig> {
    const source = Object.values(hass.entities).find(
      (e) =>
        e.platform === "candy" &&
        e.entity_id.startsWith("sensor.") &&
        "salt_empty" in (hass.states[e.entity_id]?.attributes ?? {}),
    );
    return { entity: source?.entity_id ?? "sensor.dishwasher" };
  }

  setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error("entity is required: the Candy dishwasher status sensor");
    }
    this.config = config;
  }

  getCardSize(): number {
    return 3;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.clock = window.setInterval(() => this.tick++, 60000);
    this.reducedMotion.addEventListener("change", this.onMotionChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.armedTimer);
    window.clearInterval(this.clock);
    this.reducedMotion.removeEventListener("change", this.onMotionChange);
  }

  private get t() {
    const lang = this.hass?.locale.language.split("-")[0] ?? "en";
    return lang === "it" ? TEXT.it : TEXT.en;
  }

  // Configured entities first, then the Candy entities on the same device.
  private entities(): Partial<Record<Role, HassEntityState>> {
    const hass = this.hass!;
    const config = this.config!;
    const deviceId = hass.entities[config.entity]?.device_id;
    const onDevice = deviceId
      ? Object.values(hass.entities).filter(
          (e) => e.device_id === deviceId && e.platform === "candy",
        )
      : [];
    const out: Partial<Record<Role, HassEntityState>> = {};
    for (const role of Object.keys(DISCOVERY) as Role[]) {
      const { domain, key, match } = DISCOVERY[role];
      const inDomain = onDevice.filter((e) => e.entity_id.startsWith(`${domain}.`));
      const id =
        config[role] ??
        (inDomain.find((e) => e.translation_key === key) ??
          inDomain.find((e) => match.test(e.entity_id)))?.entity_id;
      if (id && hass.states[id]) out[role] = hass.states[id];
    }
    return out;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!changed.has("hass") || changed.size > 1) return true;
    const before = changed.get("hass") as Hass | undefined;
    if (!before || !this.hass || !this.config) return true;
    if (before.locale !== this.hass.locale || before.entities !== this.hass.entities) return true;
    const config = this.config;
    const ids = [
      config.entity,
      config.needs_emptying,
      ...(Object.keys(DISCOVERY) as Role[]).map((r) => config[r]),
      ...Object.values(this.entities()).map((s) => s.entity_id),
    ].filter((id): id is string => Boolean(id));
    return ids.some((id) => before.states[id] !== this.hass!.states[id]);
  }

  // Animate the artwork only while a cycle runs, and never with reduced motion.
  protected updated(): void {
    const svg = this.renderRoot.querySelector<SVGSVGElement>(".art svg");
    if (!svg || !this.hass || !this.config) return;
    const running = (STAGES as readonly string[]).includes(
      this.hass.states[this.config.entity]?.state ?? "",
    );
    if (running && !this.reducedMotion.matches) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    }
  }

  private time(iso: string): string {
    return new Date(iso).toLocaleTimeString(this.hass?.locale.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private ago(iso: string): string {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 60) return `${minutes} min`;
    if (minutes < 48 * 60) return `${Math.round(minutes / 60)} h`;
    return `${Math.round(minutes / 1440)} d`;
  }

  private moreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }),
    );
  }

  // Home Assistant shows its own error toast when a press fails.
  private send(button: HassEntityState): void {
    Promise.resolve(
      this.hass!.callService("button", "press", { entity_id: button.entity_id }),
    ).catch(() => {});
  }

  private press(ev: Event, button: HassEntityState): void {
    ev.stopPropagation();
    this.send(button);
  }

  // Stopping cancels the running program, so it takes a second tap within 3 s.
  private pressStop(ev: Event, button: HassEntityState): void {
    ev.stopPropagation();
    window.clearTimeout(this.armedTimer);
    if (!this.armedStop) {
      this.armedStop = true;
      this.armedTimer = window.setTimeout(() => (this.armedStop = false), 3000);
      return;
    }
    this.armedStop = false;
    this.send(button);
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    const t = this.t;
    const source = this.hass.states[this.config.entity];
    if (!source) {
      return html`<ha-card><div class="missing">${t.missing}: ${this.config.entity}</div></ha-card>`;
    }
    const ents = this.entities();
    const empty = this.config.needs_emptying
      ? this.hass.states[this.config.needs_emptying]
      : undefined;
    const a = source.attributes;
    const s = source.state;
    const running = (STAGES as readonly string[]).includes(s);
    const needsEmptying = empty?.state === "on";

    let tone = "idle";
    let status: string;
    let detail: TemplateResult | typeof nothing = nothing;

    if (running) {
      tone = "running";
      const stage = s as Stage;
      const remaining = Number(a.remaining_minutes ?? 0);
      const end =
        remaining > 0
          ? new Date(Date.now() + remaining * 60000).toISOString()
          : undefined;
      status = t.stages[stage];
      detail = html`
        <div class="stepper">
          ${STAGES.map((st, i) => {
            const cur = STAGES.indexOf(stage);
            const cls = i < cur ? "done" : i === cur ? "current" : "";
            return html`<div class="step ${cls}"><span></span><label>${t.stages[st]}</label></div>`;
          })}
        </div>
        <div class="row">
          <span class="big">${end ? t.endsAt(this.time(end)) : nothing}</span>
          <span class="muted">${remaining > 0 ? t.minutes(remaining) : nothing}</span>
        </div>`;
    } else if (s === "Finished" || needsEmptying) {
      tone = needsEmptying ? "attention" : "done";
      const finishedAt =
        (empty?.attributes.finished_at as string | undefined) ??
        (s === "Finished" ? source.last_changed : undefined);
      status = finishedAt ? t.finishedAt(this.time(finishedAt), this.ago(finishedAt)) : t.finished;
      if (needsEmptying) detail = html`<div class="big">${t.needsEmptying}</div>`;
    } else if (s === DELAYED) {
      tone = "running";
      const hours = Number(a.delayed_start_hours ?? 0);
      status = hours > 0 ? t.startsIn(hours) : t.delayed;
    } else if (OFFLINE.has(s)) {
      status = t.offline;
    } else {
      status = t.idle;
    }

    const program = [a.program, a.eco_mode ? t.eco : undefined].filter(Boolean).join(" · ");
    const on = (role: Role, attr: string) =>
      ents[role] ? ents[role]!.state === "on" : a[attr] === true;
    const alerts = [
      on("salt", "salt_empty") && t.salt,
      on("rinse_aid", "rinse_aid_empty") && t.rinseAid,
      running && on("door", "door_open") && t.door,
    ].filter((x): x is string => Boolean(x));

    // A button's state is the time it was last pressed ("unknown" until the first press);
    // the Candy integration makes it unavailable when the command cannot be sent.
    const usable = (b?: HassEntityState) => b && b.state !== "unavailable";
    const controls = !this.config.hide_controls
      ? [
          (s === "Idle" || s === "Finished") && usable(ents.start)
            ? html`<button @click=${(e: Event) => this.press(e, ents.start!)}>
                <ha-icon icon="mdi:play"></ha-icon>${t.start}
              </button>`
            : nothing,
          (running || s === DELAYED) && usable(ents.stop)
            ? html`<button class=${this.armedStop ? "armed" : ""}
                @click=${(e: Event) => this.pressStop(e, ents.stop!)}>
                <ha-icon icon="mdi:stop"></ha-icon>${this.armedStop ? t.confirmStop : t.stop}
              </button>`
            : nothing,
        ]
      : [];

    return html`
      <ha-card class=${tone} @click=${() => this.moreInfo(this.config!.entity)}>
        <div class="head">
          <div class="art">${unsafeHTML(artwork)}</div>
          <div class="titles">
            <div class="name">${this.config.name ?? t.title}</div>
            <div class="status">${status}</div>
            ${program && !OFFLINE.has(s) ? html`<div class="muted">${program}</div>` : nothing}
          </div>
        </div>
        ${detail}
        ${alerts.length
          ? html`<div class="chips">${alerts.map((x) => html`<span class="chip">${x}</span>`)}</div>`
          : nothing}
        ${controls.some((c) => c !== nothing) ? html`<div class="controls">${controls}</div>` : nothing}
      </ha-card>`;
  }

  static styles = css`
    ha-card {
      padding: 16px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .head {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .art {
      width: 72px;
      height: 72px;
      flex: none;
    }
    .art svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .idle .art {
      opacity: 0.7;
    }
    .titles {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .status {
      color: var(--primary-text-color);
    }
    .attention .status {
      color: var(--warning-color, #ffa600);
    }
    .muted,
    .missing {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }
    .big {
      font-size: 1.1em;
      color: var(--primary-text-color);
    }
    .attention .big {
      color: var(--warning-color, #ffa600);
    }
    .stepper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
    }
    .step span {
      display: block;
      height: 4px;
      border-radius: 2px;
      background: var(--divider-color);
    }
    .step.done span {
      background: var(--primary-color);
      opacity: 0.5;
    }
    .step.current span {
      background: var(--primary-color);
    }
    .step label {
      display: block;
      margin-top: 4px;
      font-size: 0.75em;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .step.current label {
      color: var(--primary-text-color);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      font-size: 0.8em;
      padding: 2px 10px;
      border-radius: 12px;
      color: var(--error-color, #db4437);
      background: rgba(var(--rgb-error-color, 219, 68, 55), 0.12);
    }
    .controls {
      display: flex;
      gap: 8px;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font: inherit;
      padding: 6px 14px;
      border-radius: 18px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-text-color);
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    button.armed {
      border-color: var(--error-color, #db4437);
      color: var(--error-color, #db4437);
    }
  `;
}

if (!customElements.get("candy-dishwasher-card")) {
  customElements.define("candy-dishwasher-card", CandyDishwasherCard);
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((c) => c.type === "candy-dishwasher-card")) window.customCards.push({
  type: "candy-dishwasher-card",
  name: "Candy Dishwasher Card",
  description: "Cycle stage, end time, supplies and start/stop for a Candy dishwasher.",
  preview: true,
  documentationURL: "https://github.com/enricodeleo/candy-dishwasher-card",
});

console.info(`%c candy-dishwasher-card ${__VERSION__} `, "background:#55bbf8;color:#111");
