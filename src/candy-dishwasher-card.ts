import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import iconDelayed from "../assets/states/delayed.svg";
import iconDone from "../assets/states/done.svg";
import iconDrying from "../assets/states/drying.svg";
import iconError from "../assets/states/error.svg";
import iconOff from "../assets/states/off.svg";
import iconOpen from "../assets/states/open.svg";
import iconRinsing from "../assets/states/rinsing.svg";
import iconUnknown from "../assets/states/unknown.svg";
import iconWashing from "../assets/states/washing.svg";

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

type Role =
  | "salt"
  | "rinse_aid"
  | "door"
  | "remote"
  | "error"
  | "eco"
  | "three_in_one"
  | "start"
  | "stop";

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
  remote: { domain: "binary_sensor", key: "remote_control", match: /remote_control$/ },
  error: { domain: "sensor", key: "dishwasher_error_code", match: /error_code$/ },
  eco: { domain: "switch", key: "dishwasher_eco_switch", match: /_eco(_option)?$/ },
  three_in_one: { domain: "switch", key: "dishwasher_three_in_one_switch", match: /3in1|three_in_one/ },
  start: { domain: "button", key: "dishwasher_start_button", match: /start(_button|_dishwasher)?$/ },
  stop: { domain: "button", key: "dishwasher_stop_button", match: /stop(_button|_dishwasher)?$/ },
};

// Used when a tag has no entity to take its icon from.
const FALLBACK_ICON: Partial<Record<Role, string>> = {
  salt: "mdi:shaker-outline",
  rinse_aid: "mdi:water-outline",
  remote: "mdi:remote",
};

const LABELS: Record<string, string> = {
  entity: "Dishwasher status sensor (Candy)",
  name: "Name",
  needs_emptying: "Needs emptying (binary sensor, optional)",
  hide_controls: "Hide Start / Stop",
  salt: "Salt empty",
  rinse_aid: "Rinse aid empty",
  door: "Door",
  remote: "Remote control",
  error: "Error code",
  eco: "Eco option",
  three_in_one: "3-in-1 tablets",
  start: "Start button",
  stop: "Stop button",
};

const STAGES = ["Pre-wash", "Wash", "Rinse", "Drying"] as const;
type Stage = (typeof STAGES)[number];
const DELAYED = "Delayed start programmed";
const OFFLINE = new Set(["unavailable", "unknown"]);
const NO_ERROR = new Set(["E0", "0", "", "unknown", "unavailable"]);

type Icon = "off" | "unknown" | "rinsing" | "washing" | "drying" | "done" | "open" | "error" | "delayed";
const ICONS: Record<Icon, string> = {
  off: iconOff,
  unknown: iconUnknown,
  rinsing: iconRinsing,
  washing: iconWashing,
  drying: iconDrying,
  done: iconDone,
  open: iconOpen,
  error: iconError,
  delayed: iconDelayed,
};
const STAGE_ICON: Record<Stage, Icon> = {
  "Pre-wash": "rinsing",
  Wash: "washing",
  Rinse: "rinsing",
  Drying: "drying",
};

type Tone = "grey" | "blue" | "teal" | "green" | "orange" | "purple";

const TEXT = {
  en: {
    title: "Dishwasher",
    idle: "Idle",
    unknown: "Unknown",
    finished: "Finished",
    delayed: "Delayed start",
    error: (c: string) => `Error ${c}`,
    stages: { "Pre-wash": "Pre-wash", Wash: "Wash", Rinse: "Rinse", Drying: "Drying" },
    readyToStart: "Ready to start",
    doorOpen: "Door open",
    doorClosed: "Door closed",
    remoteOff: "Remote control off",
    remoteOn: "Remote control on",
    noData: "No data from the dishwasher",
    running: (p: string) => `Program ${p} running`,
    delayedSub: "Delayed start programmed",
    needsEmptying: "Needs emptying",
    emptied: "Emptied",
    errorSub: (c: string) => `Error code ${c}`,
    program: "Program",
    remaining: "Remaining",
    endsAt: "Ends at",
    delay: "Delay",
    finishedRow: "Finished",
    door: "Door",
    open: "Open",
    closed: "Closed",
    hours: (h: number) => `${h} h`,
    duration: (m: number) =>
      m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`,
    ago: (d: string) => `${d} ago`,
    eco: "Eco",
    threeInOne: "3-in-1",
    saltOk: "Salt OK",
    saltEmpty: "Salt empty",
    rinseOk: "Rinse aid OK",
    rinseEmpty: "Rinse aid empty",
    start: "Start",
    stop: "Stop",
    confirmStop: "Tap again to stop",
    hintUnavailable: "The dishwasher integration is unavailable.",
    hintRemote: (stop: boolean) =>
      `Turn on remote control on the dishwasher to ${stop ? "stop" : "start"} it from here.`,
    hintDoor: "Close the door before starting.",
    missing: "Entity not found",
  },
  it: {
    title: "Lavastoviglie",
    idle: "In attesa",
    unknown: "Sconosciuto",
    finished: "Finita",
    delayed: "Partenza ritardata",
    error: (c: string) => `Errore ${c}`,
    stages: { "Pre-wash": "Prelavaggio", Wash: "Lavaggio", Rinse: "Risciacquo", Drying: "Asciugatura" },
    readyToStart: "Pronta per partire",
    doorOpen: "Porta aperta",
    doorClosed: "Porta chiusa",
    remoteOff: "Controllo remoto spento",
    remoteOn: "Controllo remoto attivo",
    noData: "Nessun dato dalla lavastoviglie",
    running: (p: string) => `Programma ${p} in corso`,
    delayedSub: "Partenza ritardata impostata",
    needsEmptying: "Da svuotare",
    emptied: "Svuotata",
    errorSub: (c: string) => `Codice errore ${c}`,
    program: "Programma",
    remaining: "Mancano",
    endsAt: "Fine alle",
    delay: "Ritardo",
    finishedRow: "Finita",
    door: "Porta",
    open: "Aperta",
    closed: "Chiusa",
    hours: (h: number) => `${h} h`,
    duration: (m: number) =>
      m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`,
    ago: (d: string) => `${d} fa`,
    eco: "Eco",
    threeInOne: "3 in 1",
    saltOk: "Sale OK",
    saltEmpty: "Sale finito",
    rinseOk: "Brillantante OK",
    rinseEmpty: "Brillantante finito",
    start: "Avvia",
    stop: "Interrompi",
    confirmStop: "Tocca di nuovo per fermare",
    hintUnavailable: "L'integrazione della lavastoviglie non è disponibile.",
    hintRemote: (stop: boolean) =>
      `Attiva il controllo remoto sulla lavastoviglie per ${stop ? "fermarla" : "avviarla"} da qui.`,
    hintDoor: "Chiudi la porta prima di avviare.",
    missing: "Entità non trovata",
  },
};

interface Pill {
  text: string;
  role?: Role;
  entity?: HassEntityState;
  icon: string;
  // ok and quiet show the icon only; bad, neutral and info also show their text.
  kind: "ok" | "quiet" | "bad" | "neutral" | "info";
}

export class CandyDishwasherCard extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private config?: CardConfig;
  @state() private armedStop = false;
  // Bumped every minute so "2 h ago" and "ends at" stay current between state changes.
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
          schema: (Object.keys(DISCOVERY) as Role[]).map((r) => optional(r, DISCOVERY[r].domain)),
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
    return 6;
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

  // The icons animate with SMIL; hold them still when the user asks for reduced motion.
  protected updated(): void {
    const svg = this.renderRoot.querySelector<SVGSVGElement>(".art svg");
    if (!svg) return;
    if (this.reducedMotion.matches) {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    } else {
      svg.unpauseAnimations();
    }
  }

  private time(date: Date): string {
    return date.toLocaleTimeString(this.hass?.locale.language, { hour: "2-digit", minute: "2-digit" });
  }

  private since(iso: string): string {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 48 * 60) return this.t.duration(minutes);
    return `${Math.round(minutes / 1440)} d`;
  }

  private moreInfo(ev: Event, entityId: string): void {
    ev.stopPropagation();
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

  private pill(p: Pill): TemplateResult {
    const icon = p.entity
      ? html`<ha-state-icon .hass=${this.hass} .stateObj=${p.entity}></ha-state-icon>`
      : html`<ha-icon icon=${p.icon}></ha-icon>`;
    // Tags with nothing to report show only their icon, so the row stays on one line.
    const compact = p.kind === "ok" || p.kind === "quiet";
    return html`<span
      class="pill ${p.kind} ${compact ? "compact" : ""} ${p.entity ? "link" : ""}"
      title=${p.text}
      aria-label=${p.text}
      @click=${p.entity ? (e: Event) => this.moreInfo(e, p.entity!.entity_id) : undefined}
      >${icon}${compact ? nothing : p.text}</span
    >`;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    void this.tick;
    const t = this.t;
    const config = this.config;
    const source = this.hass.states[config.entity];
    if (!source) {
      return html`<ha-card><div class="missing">${t.missing}: ${config.entity}</div></ha-card>`;
    }
    const ents = this.entities();
    const helper = config.needs_emptying ? this.hass.states[config.needs_emptying] : undefined;
    const a = source.attributes;
    const s = source.state;
    const offline = OFFLINE.has(s);
    const running = (STAGES as readonly string[]).includes(s);
    const delayed = s === DELAYED;

    // An entity's state when there is one, else the matching status attribute.
    const flag = (role: Role, attr: string) =>
      ents[role] ? ents[role]!.state === "on" : a[attr] === true;
    const door = flag("door", "door_open");
    const remote = flag("remote", "remote_control");
    const salt = flag("salt", "salt_empty");
    const rinseAid = flag("rinse_aid", "rinse_aid_empty");
    const eco = flag("eco", "eco_mode");
    const threeInOne = ents.three_in_one?.state === "on";
    const errorCode = ents.error?.state ?? "E0";
    const hasError = !offline && !NO_ERROR.has(errorCode);
    const program = typeof a.program === "string" && a.program ? a.program : "—";
    const remaining = Number(a.remaining_minutes ?? 0);

    // After a cycle the machine may go back to Idle (or drop off Wi-Fi), so the helper
    // keeps the finished view until the dishes are taken out.
    const needsEmptying = helper?.state === "on";
    const finished = !running && !delayed && !offline && (s === "Finished" || needsEmptying);

    let label: string;
    let tone: Tone;
    let sub: string;
    let icon: Icon;
    if (offline) {
      [label, tone, sub, icon] = [t.unknown, "grey", t.noData, "unknown"];
    } else if (running) {
      const stage = s as Stage;
      [label, tone, sub, icon] = [
        t.stages[stage],
        stage === "Drying" ? "teal" : "blue",
        t.running(program),
        STAGE_ICON[stage],
      ];
    } else if (delayed) {
      [label, tone, sub, icon] = [t.delayed, "purple", t.delayedSub, "delayed"];
    } else if (finished) {
      [label, tone, sub, icon] = [
        t.finished,
        "green",
        helper ? (needsEmptying ? t.needsEmptying : t.emptied) : t.finished,
        door ? "open" : "done",
      ];
    } else {
      [label, tone, sub, icon] = [
        t.idle,
        "grey",
        door ? t.doorOpen : remote ? t.readyToStart : t.remoteOff,
        door ? "open" : "off",
      ];
    }
    if (hasError) {
      sub = icon === "off" ? t.errorSub(errorCode) : `${t.errorSub(errorCode)} · ${sub}`;
      [label, tone, icon] = [t.error(errorCode), "orange", "error"];
    }

    let rows: Array<[string, string]>;
    if (offline) {
      rows = [[t.program, "—"], [t.remaining, "—"]];
    } else if (running) {
      rows = [
        [t.program, program],
        [t.remaining, remaining > 0 ? t.duration(remaining) : "—"],
        [t.endsAt, remaining > 0 ? this.time(new Date(Date.now() + remaining * 60000)) : "—"],
      ];
    } else if (delayed) {
      const hours = Number(a.delayed_start_hours ?? 0);
      rows = [[t.program, program], [t.delay, hours > 0 ? t.hours(hours) : "—"]];
    } else if (finished) {
      const at =
        (helper?.attributes.finished_at as string | undefined) ??
        (s === "Finished" ? source.last_changed : undefined);
      rows = [
        [t.program, program],
        [t.finishedRow, at ? `${this.time(new Date(at))} · ${t.ago(this.since(at))}` : "—"],
      ];
    } else {
      rows = [[t.program, program], [t.door, door ? t.open : t.closed]];
    }

    const options = offline
      ? []
      : [eco && t.eco, threeInOne && t.threeInOne].filter((x): x is string => Boolean(x));

    const current = running ? STAGES.indexOf(s as Stage) : finished ? STAGES.length : -1;
    const steps = STAGES.map((st, i) => {
      const cls =
        i < current ? (finished ? "complete" : "done") : i === current ? (hasError ? "current error" : "current") : "";
      return html`<div class="step ${cls}"><span></span><label>${t.stages[st]}</label></div>`;
    });

    const pills: Pill[] = [];
    if (finished && needsEmptying) {
      pills.push({ text: t.needsEmptying, entity: helper, icon: "mdi:silverware-clean", kind: "info" });
    }
    if (!offline) {
      pills.push(
        {
          text: door ? t.doorOpen : t.doorClosed,
          role: "door",
          entity: ents.door,
          icon: door ? "mdi:door-open" : "mdi:door-closed",
          kind: door ? "neutral" : "quiet",
        },
        { text: salt ? t.saltEmpty : t.saltOk, role: "salt", entity: ents.salt, icon: FALLBACK_ICON.salt!, kind: salt ? "bad" : "ok" },
        {
          text: rinseAid ? t.rinseEmpty : t.rinseOk,
          role: "rinse_aid",
          entity: ents.rinse_aid,
          icon: FALLBACK_ICON.rinse_aid!,
          kind: rinseAid ? "bad" : "ok",
        },
        {
          text: remote ? t.remoteOn : t.remoteOff,
          role: "remote",
          entity: ents.remote,
          icon: FALLBACK_ICON.remote!,
          kind: remote ? "ok" : "bad",
        },
      );
    }

    // One action: Stop while a cycle runs or waits, Start otherwise.
    const isStop = running || delayed;
    const button = isStop ? ents.stop : ents.start;
    const blocked = offline || button?.state === "unavailable" ? t.hintUnavailable : !remote ? t.hintRemote(isStop) : "";
    const hint = blocked || (!isStop && door ? t.hintDoor : "");
    const action =
      !config.hide_controls && button
        ? html`<button
            class="action ${isStop ? "stop" : "start"} ${this.armedStop ? "armed" : ""}"
            ?disabled=${blocked !== ""}
            @click=${(e: Event) => (isStop ? this.pressStop(e, button) : this.press(e, button))}
          >
            <ha-icon icon=${isStop ? "mdi:stop" : "mdi:play"}></ha-icon>
            ${isStop ? (this.armedStop ? t.confirmStop : t.stop) : t.start}
          </button>`
        : nothing;

    return html`
      <ha-card class="tone-${tone}" @click=${(e: Event) => this.moreInfo(e, config.entity)}>
        <div class="head">
          <div class="titles">
            <div class="name">${config.name ?? t.title}</div>
            <div class="muted">${sub}</div>
          </div>
          <span class="chip">${label}</span>
        </div>
        <div class="body">
          <div class="art">${unsafeHTML(ICONS[icon])}</div>
          <div class="facts">
            ${rows.map(([k, v]) => html`<div class="fact"><span class="muted">${k}</span><span>${v}</span></div>`)}
            ${options.length
              ? html`<div class="options">${options.map((o) => html`<span>${o}</span>`)}</div>`
              : nothing}
          </div>
        </div>
        <div class="steps">${steps}</div>
        ${pills.length ? html`<div class="pills">${pills.map((p) => this.pill(p))}</div>` : nothing}
        ${hint || action !== nothing
          ? html`<div class="foot">
              ${hint ? html`<span class="hint">${hint}</span>` : nothing} ${action}
            </div>`
          : nothing}
      </ha-card>`;
  }

  static styles = css`
    ha-card {
      --cdw-blue: var(--blue-color, #2196f3);
      --cdw-ok: var(--success-color, #43a047);
      --cdw-warn: var(--warning-color, #fb8c00);
      --cdw-tone: var(--secondary-text-color);
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tone-blue {
      --cdw-tone: var(--cdw-blue);
    }
    .tone-teal {
      --cdw-tone: var(--teal-color, #009688);
    }
    .tone-green {
      --cdw-tone: var(--cdw-ok);
    }
    .tone-orange {
      --cdw-tone: var(--cdw-warn);
    }
    .tone-purple {
      --cdw-tone: var(--deep-purple-color, #673ab7);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .titles {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .muted,
    .missing {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      /* Pulled toward the text color so dark tones stay readable on dark themes. */
      color: color-mix(in srgb, var(--cdw-tone) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--cdw-tone) 16%, transparent);
    }
    .body {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .art {
      width: 120px;
      height: 120px;
      flex: none;
      color: var(--primary-text-color);
    }
    .art svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .art .paper {
      fill: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .knob-off {
      fill: var(--disabled-text-color, #bdbdbd);
    }
    .facts {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fact {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .fact .muted {
      font-size: 14px;
    }
    .fact span:last-child {
      font-weight: 500;
      text-align: right;
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
    }
    .options span {
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      color: var(--cdw-blue);
      background: color-mix(in srgb, var(--cdw-blue) 16%, transparent);
    }
    .steps {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 6px;
    }
    .step span {
      display: block;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .step.done span {
      background: color-mix(in srgb, var(--primary-color) 45%, transparent);
    }
    .step.current span {
      background: var(--primary-color);
    }
    .step.current.error span {
      background: var(--cdw-warn);
    }
    .step.complete span {
      background: var(--cdw-ok);
    }
    .step label {
      display: block;
      margin-top: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .step.current label {
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      --mdc-icon-size: 16px;
    }
    .pill ha-state-icon,
    .pill ha-icon {
      --state-icon-color: currentColor;
      color: var(--secondary-text-color);
    }
    .pill.ok ha-state-icon,
    .pill.ok ha-icon {
      color: var(--cdw-ok);
    }
    .pill.bad {
      color: var(--cdw-warn);
      background: color-mix(in srgb, var(--cdw-warn) 16%, transparent);
    }
    .pill.bad ha-state-icon,
    .pill.bad ha-icon,
    .pill.info ha-state-icon,
    .pill.info ha-icon {
      color: inherit;
    }
    .pill.info {
      color: var(--cdw-blue);
      background: color-mix(in srgb, var(--cdw-blue) 16%, transparent);
    }
    .pill.compact {
      padding: 6px;
    }
    .pill.link {
      cursor: pointer;
    }
    .foot {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }
    .hint {
      flex: 1;
      font-size: 12px;
      line-height: 16px;
      color: var(--secondary-text-color);
    }
    .action {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 40px;
      padding: 0 20px;
      border: none;
      border-radius: 20px;
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .action.stop {
      background: var(--error-color, #db4437);
    }
    .action.armed {
      outline: 2px solid var(--error-color, #db4437);
      outline-offset: 2px;
    }
    .action:disabled {
      opacity: 0.38;
      cursor: not-allowed;
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
  description: "Cycle steps, end time, supplies and start/stop for a Candy dishwasher.",
  preview: true,
  documentationURL: "https://github.com/enricodeleo/candy-dishwasher-card",
});

console.info(`%c candy-dishwasher-card ${__VERSION__} `, "background:#55bbf8;color:#111");
