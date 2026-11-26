var It=Object.defineProperty;var jt=Object.getOwnPropertyDescriptor;var T=(r,t,e,s)=>{for(var i=s>1?void 0:s?jt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&It(t,e,i),i};var L=globalThis,F=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),ft=new WeakMap,N=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(F&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ft.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ft.set(e,t))}return t}toString(){return this.cssText}},yt=r=>new N(typeof r=="string"?r:r+"",void 0,K),Z=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new N(e,r,K)},gt=(r,t)=>{if(F)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Y=F?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return yt(e)})(r):r;var{is:qt,defineProperty:zt,getOwnPropertyDescriptor:Vt,getOwnPropertyNames:Wt,getOwnPropertySymbols:Qt,getPrototypeOf:Gt}=Object,I=globalThis,vt=I.trustedTypes,Kt=vt?vt.emptyScript:"",Zt=I.reactiveElementPolyfillSupport,P=(r,t)=>r,R={toAttribute(r,t){switch(t){case Boolean:r=r?Kt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},j=(r,t)=>!qt(r,t),_t={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:j};Symbol.metadata??=Symbol("metadata"),I.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&zt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Vt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let a=i?.call(this);o?.call(this,n),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;let t=Gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){let e=this.properties,s=[...Wt(e),...Qt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Y(i))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:R).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:R;this._$Em=i;let a=n.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??j)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,a=this[i];n!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[P("elementProperties")]=new Map,g[P("finalized")]=new Map,Zt?.({ReactiveElement:g}),(I.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,$t=r=>r,q=rt.trustedTypes,bt=q?q.createPolicy("lit-html",{createHTML:r=>r}):void 0,Et="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+$,Yt=`<${Ct}>`,x=document,B=()=>x.createComment(""),O=r=>r===null||typeof r!="object"&&typeof r!="function",nt=Array.isArray,Jt=r=>nt(r)||typeof r?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,wt=/>/g,A=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,kt=/"/g,Tt=/^(?:script|style|textarea|title)$/i,ot=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),y=ot(1),he=ot(2),pe=ot(3),v=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),St=new WeakMap,w=x.createTreeWalker(x,129);function Nt(r,t){if(!nt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var Xt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=M;for(let a=0;a<e;a++){let l=r[a],p,u,c=-1,m=0;for(;m<l.length&&(n.lastIndex=m,u=n.exec(l),u!==null);)m=n.lastIndex,n===M?u[1]==="!--"?n=At:u[1]!==void 0?n=wt:u[2]!==void 0?(Tt.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=A):u[3]!==void 0&&(n=A):n===A?u[0]===">"?(n=i??M,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?A:u[3]==='"'?kt:xt):n===kt||n===xt?n=A:n===At||n===wt?n=M:(n=A,i=void 0);let f=n===A&&r[a+1].startsWith("/>")?" ":"";o+=n===M?l+Yt:c>=0?(s.push(p),l.slice(0,c)+Et+l.slice(c)+$+f):l+$+(c===-2?a:f)}return[Nt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},H=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,a=t.length-1,l=this.parts,[p,u]=Xt(t,e);if(this.el=r.createElement(p,s),w.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=w.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(Et)){let m=u[n++],f=i.getAttribute(c).split($),_=/([.?@])?(.*)/.exec(m);l.push({type:1,index:o,name:_[2],strings:f,ctor:_[1]==="."?tt:_[1]==="?"?et:_[1]==="@"?st:C}),i.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:o}),i.removeAttribute(c));if(Tt.test(i.tagName)){let c=i.textContent.split($),m=c.length-1;if(m>0){i.textContent=q?q.emptyScript:"";for(let f=0;f<m;f++)i.append(c[f],B()),w.nextNode(),l.push({type:2,index:++o});i.append(c[m],B())}}}else if(i.nodeType===8)if(i.data===Ct)l.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf($,c+1))!==-1;)l.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function E(r,t,e=r,s){if(t===v)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=O(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=E(r,i._$AS(r,t.values),i,s)),t}var X=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??x).importNode(e,!0);w.currentNode=i;let o=w.nextNode(),n=0,a=0,l=s[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new U(o,o.nextSibling,this,t):l.type===1?p=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(p=new it(o,this,t)),this._$AV.push(p),l=s[++a]}n!==l?.index&&(o=w.nextNode(),n++)}return w.currentNode=x,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},U=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(Nt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new X(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new H(t)),e}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(B()),this.O(B()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=$t(t).nextSibling;$t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=E(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==v,n&&(this._$AH=t);else{let a=t,l,p;for(t=o[0],l=0;l<o.length-1;l++)p=E(this,a[s+l],e,l),p===v&&(p=this._$AH[l]),n||=!O(p)||p!==this._$AH[l],p===d?t=d:t!==d&&(t+=(p??"")+o[l+1]),this._$AH[l]=p}n&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},tt=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},et=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},st=class extends C{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===v)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},it=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var te=rt.litHtmlPolyfillSupport;te?.(H,U),(rt.litHtmlVersions??=[]).push("3.3.3");var Pt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new U(t.insertBefore(B(),o),o,void 0,e??{})}return i._$AI(r),i};var at=globalThis,b=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};b._$litElement$=!0,b.finalized=!0,at.litElementHydrateSupport?.({LitElement:b});var ee=at.litElementPolyfillSupport;ee?.({LitElement:b});(at.litElementVersions??=[]).push("4.2.2");var se={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:j},ie=(r=se,t,e)=>{let{kind:s,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),s==="accessor"){let{name:n}=e;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,r,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,r,a),a}}}if(s==="setter"){let{name:n}=e;return function(a){let l=this[n];t.call(this,a),this.requestUpdate(n,l,r,!0,a)}}throw Error("Unsupported decorator location: "+s)};function z(r){return(t,e)=>typeof e=="object"?ie(r,t,e):((s,i,o)=>{let n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}function V(r){return z({...r,state:!0,attribute:!1})}var Rt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Mt=r=>(...t)=>({_$litDirective$:r,values:t}),Q=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var D=class extends Q{constructor(t){if(super(t),this.it=d,t.type!==Rt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===d||t==null)return this._t=void 0,this.it=t;if(t===v)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};D.directiveName="unsafeHTML",D.resultType=1;var Bt=Mt(D);var Ot=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <style>.ln { stroke: #111; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; } .blue { fill: #55BBF8; }</style>

  <defs>
    <clipPath id="inside"><rect x="85" y="150" width="230" height="140"/></clipPath>
  </defs>

  <!-- legs -->
  <line class="ln" x1="105" y1="332" x2="105" y2="346"/>
  <line class="ln" x1="295" y1="332" x2="295" y2="346"/>

  <!-- body -->
  <rect class="ln" x="80" y="90" width="240" height="240" rx="20" fill="#fff"/>
  <line class="ln" x1="80" y1="150" x2="320" y2="150"/>
  <line class="ln" x1="112" y1="108" x2="112" y2="132"/>
  <line class="ln" x1="134" y1="108" x2="134" y2="132"/>
  <line class="ln" x1="156" y1="108" x2="156" y2="132"/>
  <line class="ln" x1="178" y1="108" x2="178" y2="132"/>
  <line class="ln" x1="200" y1="108" x2="200" y2="132"/>
  <circle class="blue" cx="280" cy="120" r="15">
    <animate attributeName="r" dur="6s" repeatCount="indefinite" keyTimes="0;.04;.08;.12;1" values="15;15;19;15;15"/>
  </circle>

  <!-- plates (rise out of the rack) -->
  <g clip-path="url(#inside)">
    <g>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite"
        values="0 140;0 140;0 0;0 0;0 140;0 140" keyTimes="0;0.28;0.4;0.7;0.76;1" calcMode="spline"
        keySplines="0 0 1 1;.2 .8 .3 1;0 0 1 1;.5 0 .8 .4;0 0 1 1"/>
      <circle cx="166" cy="244" r="52" fill="#fff" stroke="#111" stroke-width="10"/>
      <circle class="blue" cx="166" cy="244" r="37"/>
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite"
        values="0 140;0 140;0 0;0 0;0 140;0 140" keyTimes="0;0.32;0.44;0.68;0.74;1" calcMode="spline"
        keySplines="0 0 1 1;.2 .8 .3 1;0 0 1 1;.5 0 .8 .4;0 0 1 1"/>
      <circle cx="236" cy="244" r="52" fill="#fff" stroke="#111" stroke-width="10"/>
      <circle class="blue" cx="236" cy="244" r="37"/>
    </g>
  </g>

    <!-- soap bubbles -->
  <g clip-path="url(#inside)">
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.40;0.44;0.57;0.59;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.40;0.44;0.57;0.59;1" values="0 0;0 0;2.0 -15;6 -122;6 -128;6 -128"/>
      <circle cx="110" cy="280" r="9" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M105.0,279.1 A5.0,5.0 0 0 1 109.1,275.1" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.44;0.48;0.61;0.63;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.44;0.48;0.61;0.63;1" values="0 0;0 0;-1.3 -15;-4 -113;-4 -119;-4 -119"/>
      <circle cx="140" cy="285" r="6" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M136.7,284.4 A3.3,3.3 0 0 1 139.4,281.7" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.42;0.46;0.59;0.61;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.42;0.46;0.59;0.61;1" values="0 0;0 0;1.7 -15;5 -128;5 -134;5 -134"/>
      <circle cx="200" cy="282" r="11" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M193.9,280.9 A6.1,6.1 0 0 1 198.9,275.9" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.47;0.51;0.64;0.66;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.47;0.51;0.64;0.66;1" values="0 0;0 0;-2.0 -15;-6 -116;-6 -122;-6 -122"/>
      <circle cx="258" cy="284" r="7" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M254.2,283.3 A3.9,3.9 0 0 1 257.3,280.1" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.41;0.45;0.58;0.60;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.41;0.45;0.58;0.60;1" values="0 0;0 0;-1.7 -15;-5 -125;-5 -131;-5 -131"/>
      <circle cx="292" cy="280" r="10" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M286.5,279.0 A5.5,5.5 0 0 1 291.0,274.5" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.50;0.54;0.67;0.69;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.50;0.54;0.67;0.69;1" values="0 0;0 0;1.3 -15;4 -110;4 -116;4 -116"/>
      <circle cx="175" cy="286" r="5" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M172.2,285.5 A2.8,2.8 0 0 1 174.5,283.2" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.57;0.70;0.72;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.57;0.70;0.72;1" values="0 0;0 0;-1.0 -15;-3 -119;-3 -125;-3 -125"/>
      <circle cx="225" cy="286" r="8" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M220.6,285.2 A4.4,4.4 0 0 1 224.2,281.6" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.56;0.60;0.73;0.75;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.56;0.60;0.73;0.75;1" values="0 0;0 0;1.7 -15;5 -116;5 -122;5 -122"/>
      <circle cx="120" cy="284" r="7" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M116.2,283.3 A3.9,3.9 0 0 1 119.3,280.1" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.58;0.62;0.75;0.77;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.58;0.62;0.75;0.77;1" values="0 0;0 0;-1.3 -15;-4 -113;-4 -119;-4 -119"/>
      <circle cx="285" cy="286" r="6" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M281.7,285.4 A3.3,3.3 0 0 1 284.4,282.7" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.61;0.65;0.78;0.80;1" values="0;0;1;1;0;0"/>
      <animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.61;0.65;0.78;0.80;1" values="0 0;0 0;1.0 -15;3 -113;3 -119;3 -119"/>
      <circle cx="205" cy="286" r="6" fill="#fff" stroke="#55BBF8" stroke-width="4"/>
      <path d="M201.7,285.4 A3.3,3.3 0 0 1 204.4,282.7" fill="none" stroke="#55BBF8" stroke-width="2.5" stroke-linecap="round"/>
    </g>
  </g>

  <!-- door: real hinge rotation around the bottom edge (top tips toward you) -->
  <polygon class="ln" fill="#fff" points="80,290 320,290 320.0,150.0 80.0,150.0">
    <animate attributeName="points" dur="6s" repeatCount="indefinite" calcMode="linear" keyTimes="0.0000;0.1400;0.1500;0.1600;0.1700;0.1800;0.1900;0.2000;0.2100;0.2200;0.2300;0.2400;0.2500;0.2600;0.2700;0.2800;0.7800;0.7886;0.7971;0.8057;0.8143;0.8229;0.8314;0.8400;0.8486;0.8571;0.8657;0.8743;0.8829;0.8914;0.9000;1.0000" values="80,290 320,290 320.0,150.0 80.0,150.0;80,290 320,290 320.0,150.0 80.0,150.0;80,290 320,290 321.2,150.6 78.8,150.6;80,290 320,290 324.7,152.8 75.3,152.8;80,290 320,290 330.0,157.2 70.0,157.2;80,290 320,290 336.5,164.7 63.5,164.7;80,290 320,290 343.9,175.9 56.1,175.9;80,290 320,290 351.3,191.0 48.7,191.0;80,290 320,290 358.2,209.4 41.8,209.4;80,290 320,290 364.0,230.0 36.0,230.0;80,290 320,290 368.4,251.4 31.6,251.4;80,290 320,290 371.4,271.9 28.6,271.9;80,290 320,290 373.1,289.7 26.9,289.7;80,290 320,290 373.8,303.7 26.2,303.7;80,290 320,290 374.0,312.8 26.0,312.8;80,290 320,290 374.0,316.0 26.0,316.0;80,290 320,290 374.0,316.0 26.0,316.0;80,290 320,290 374.0,312.8 26.0,312.8;80,290 320,290 373.8,303.7 26.2,303.7;80,290 320,290 373.1,289.7 26.9,289.7;80,290 320,290 371.4,271.9 28.6,271.9;80,290 320,290 368.4,251.4 31.6,251.4;80,290 320,290 364.0,230.0 36.0,230.0;80,290 320,290 358.2,209.4 41.8,209.4;80,290 320,290 351.3,191.0 48.7,191.0;80,290 320,290 343.9,175.9 56.1,175.9;80,290 320,290 336.5,164.7 63.5,164.7;80,290 320,290 330.0,157.2 70.0,157.2;80,290 320,290 324.7,152.8 75.3,152.8;80,290 320,290 321.2,150.6 78.8,150.6;80,290 320,290 320.0,150.0 80.0,150.0;80,290 320,290 320.0,150.0 80.0,150.0"/>
  </polygon>
  <line class="ln" x1="160" y1="172" x2="240" y2="172">
    <animate attributeName="x1" dur="6s" repeatCount="indefinite" keyTimes="0.0000;0.1400;0.1500;0.1600;0.1700;0.1800;0.1900;0.2000;0.2100;0.2200;0.2300;0.2400;0.2500;0.2600;0.2700;0.2800;0.7800;0.7886;0.7971;0.8057;0.8143;0.8229;0.8314;0.8400;0.8486;0.8571;0.8657;0.8743;0.8829;0.8914;0.9000;1.0000" values="160.0;160.0;159.7;158.7;157.2;155.4;153.3;151.2;149.3;147.6;146.4;145.6;145.1;144.9;144.8;144.8;144.8;144.8;144.9;145.1;145.6;146.4;147.6;149.3;151.2;153.3;155.4;157.2;158.7;159.7;160.0;160.0"/>
    <animate attributeName="x2" dur="6s" repeatCount="indefinite" keyTimes="0.0000;0.1400;0.1500;0.1600;0.1700;0.1800;0.1900;0.2000;0.2100;0.2200;0.2300;0.2400;0.2500;0.2600;0.2700;0.2800;0.7800;0.7886;0.7971;0.8057;0.8143;0.8229;0.8314;0.8400;0.8486;0.8571;0.8657;0.8743;0.8829;0.8914;0.9000;1.0000" values="240.0;240.0;240.3;241.3;242.8;244.6;246.7;248.8;250.7;252.4;253.6;254.4;254.9;255.1;255.2;255.2;255.2;255.2;255.1;254.9;254.4;253.6;252.4;250.7;248.8;246.7;244.6;242.8;241.3;240.3;240.0;240.0"/>
    <animate attributeName="y1" dur="6s" repeatCount="indefinite" keyTimes="0.0000;0.1400;0.1500;0.1600;0.1700;0.1800;0.1900;0.2000;0.2100;0.2200;0.2300;0.2400;0.2500;0.2600;0.2700;0.2800;0.7800;0.7886;0.7971;0.8057;0.8143;0.8229;0.8314;0.8400;0.8486;0.8571;0.8657;0.8743;0.8829;0.8914;0.9000;1.0000" values="172.0;172.0;172.5;174.4;178.1;184.4;193.8;206.5;222.1;239.5;257.5;274.7;289.8;301.6;309.2;311.9;311.9;309.2;301.6;289.8;274.7;257.5;239.5;222.1;206.5;193.8;184.4;178.1;174.4;172.5;172.0;172.0"/>
    <animate attributeName="y2" dur="6s" repeatCount="indefinite" keyTimes="0.0000;0.1400;0.1500;0.1600;0.1700;0.1800;0.1900;0.2000;0.2100;0.2200;0.2300;0.2400;0.2500;0.2600;0.2700;0.2800;0.7800;0.7886;0.7971;0.8057;0.8143;0.8229;0.8314;0.8400;0.8486;0.8571;0.8657;0.8743;0.8829;0.8914;0.9000;1.0000" values="172.0;172.0;172.5;174.4;178.1;184.4;193.8;206.5;222.1;239.5;257.5;274.7;289.8;301.6;309.2;311.9;311.9;309.2;301.6;289.8;274.7;257.5;239.5;222.1;206.5;193.8;184.4;178.1;174.4;172.5;172.0;172.0"/>
    <animate attributeName="opacity" dur="6s" repeatCount="indefinite" calcMode="discrete" keyTimes="0.0000;0.1400;0.1500;0.1600;0.1700;0.1800;0.1900;0.2000;0.2100;0.2200;0.2300;0.2400;0.2500;0.2600;0.2700;0.2800;0.7800;0.7886;0.7971;0.8057;0.8143;0.8229;0.8314;0.8400;0.8486;0.8571;0.8657;0.8743;0.8829;0.8914;0.9000;1.0000" values="1;1;1;1;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;1;1;1;1;1;1;1"/>
  </line>


  <!-- sparkles -->
  <g transform="translate(300 190)"><path class="blue" d="M0,-14 Q2.1,-2.1 14,0 Q2.1,2.1 0,14 Q-2.1,2.1 -14,0 Q-2.1,-2.1 0,-14Z" opacity="0">
    <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.46;0.52;0.62;1" values="0;0;1;0;0"/>
    <animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.46;0.52;0.62;1" values="0;0;1.2;0;0"/>
    <animateTransform attributeName="transform" type="rotate" additive="sum" dur="6s" repeatCount="indefinite" keyTimes="0;0.46;0.52;0.62;1" values="0;0;45;135;135"/>
  </path></g>
  <g transform="translate(118 177)"><path class="blue" d="M0,-9 Q1.3,-1.3 9,0 Q1.3,1.3 0,9 Q-1.3,1.3 -9,0 Q-1.3,-1.3 0,-9Z" opacity="0">
    <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.56;0.66;1" values="0;0;1;0;0"/>
    <animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.56;0.66;1" values="0;0;1.2;0;0"/>
    <animateTransform attributeName="transform" type="rotate" additive="sum" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.56;0.66;1" values="0;0;45;135;135"/>
  </path></g>
  <g transform="translate(205 169)"><path class="blue" d="M0,-9 Q1.3,-1.3 9,0 Q1.3,1.3 0,9 Q-1.3,1.3 -9,0 Q-1.3,-1.3 0,-9Z" opacity="0">
    <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.5900000000000001;0.6900000000000001;1" values="0;0;1;0;0"/>
    <animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.5900000000000001;0.6900000000000001;1" values="0;0;1.2;0;0"/>
    <animateTransform attributeName="transform" type="rotate" additive="sum" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.5900000000000001;0.6900000000000001;1" values="0;0;45;135;135"/>
  </path></g>
</svg>
`;var lt={salt:{domain:"binary_sensor",key:"dishwasher_salt_empty",match:/salt_empty$/},rinse_aid:{domain:"binary_sensor",key:"dishwasher_rinse_aid_empty",match:/rinse_aid_empty$/},door:{domain:"binary_sensor",key:"dishwasher_door",match:/_door$/},start:{domain:"button",key:"dishwasher_start_button",match:/start(_button)?$|_start_/},stop:{domain:"button",key:"dishwasher_stop_button",match:/stop(_button)?$|_stop_/}},ne={entity:"Dishwasher status sensor (Candy)",name:"Name",needs_emptying:"Needs emptying (binary sensor, optional)",hide_controls:"Hide Start / Stop",salt:"Salt empty",rinse_aid:"Rinse aid empty",door:"Door",start:"Start button",stop:"Stop button"},G=["Pre-wash","Wash","Rinse","Drying"],Ht="Delayed start programmed",Ut=new Set(["unavailable","unknown"]),Dt={en:{title:"Dishwasher",idle:"Idle",offline:"Not reachable",finished:"Finished",delayed:"Delayed start",startsIn:r=>`Starts in ${r} h`,endsAt:r=>`Ends at ${r}`,minutes:r=>`${r} min`,finishedAt:(r,t)=>`Finished at ${r} \xB7 ${t} ago`,needsEmptying:"Needs emptying",stages:{"Pre-wash":"Pre-wash",Wash:"Wash",Rinse:"Rinse",Drying:"Drying"},salt:"Salt empty",rinseAid:"Rinse aid empty",door:"Door open",eco:"Eco",start:"Start",stop:"Stop",confirmStop:"Tap again to stop",missing:"Entity not found"},it:{title:"Lavastoviglie",idle:"In attesa",offline:"Non raggiungibile",finished:"Finita",delayed:"Partenza ritardata",startsIn:r=>`Parte tra ${r} h`,endsAt:r=>`Fine alle ${r}`,minutes:r=>`${r} min`,finishedAt:(r,t)=>`Finita alle ${r} \xB7 ${t} fa`,needsEmptying:"Da svuotare",stages:{"Pre-wash":"Prelavaggio",Wash:"Lavaggio",Rinse:"Risciacquo",Drying:"Asciugatura"},salt:"Sale finito",rinseAid:"Brillantante finito",door:"Porta aperta",eco:"Eco",start:"Avvia",stop:"Interrompi",confirmStop:"Tocca di nuovo per fermare",missing:"Entit\xE0 non trovata"}},k=class extends b{constructor(){super(...arguments);this.armedStop=!1;this.tick=0;this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");this.onMotionChange=()=>this.requestUpdate()}static getConfigForm(){let e=(s,i)=>({name:s,selector:{entity:{filter:{domain:i}}}});return{schema:[{name:"entity",required:!0,selector:{entity:{filter:{domain:"sensor",integration:"candy"}}}},{name:"name",selector:{text:{}}},e("needs_emptying","binary_sensor"),{name:"hide_controls",selector:{boolean:{}}},{type:"expandable",name:"",title:"Entities (found automatically on the dishwasher's device)",schema:[e("salt","binary_sensor"),e("rinse_aid","binary_sensor"),e("door","binary_sensor"),e("start","button"),e("stop","button")]}],computeLabel:s=>ne[s.name]}}static getStubConfig(e){return{entity:Object.values(e.entities).find(i=>i.platform==="candy"&&i.entity_id.startsWith("sensor.")&&"salt_empty"in(e.states[i.entity_id]?.attributes??{}))?.entity_id??"sensor.dishwasher"}}setConfig(e){if(!e.entity)throw new Error("entity is required: the Candy dishwasher status sensor");this.config=e}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this.clock=window.setInterval(()=>this.tick++,6e4),this.reducedMotion.addEventListener("change",this.onMotionChange)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.armedTimer),window.clearInterval(this.clock),this.reducedMotion.removeEventListener("change",this.onMotionChange)}get t(){return(this.hass?.locale.language.split("-")[0]??"en")==="it"?Dt.it:Dt.en}entities(){let e=this.hass,s=this.config,i=e.entities[s.entity]?.device_id,o=i?Object.values(e.entities).filter(a=>a.device_id===i&&a.platform==="candy"):[],n={};for(let a of Object.keys(lt)){let{domain:l,key:p,match:u}=lt[a],c=o.filter(f=>f.entity_id.startsWith(`${l}.`)),m=s[a]??(c.find(f=>f.translation_key===p)??c.find(f=>u.test(f.entity_id)))?.entity_id;m&&e.states[m]&&(n[a]=e.states[m])}return n}shouldUpdate(e){if(!e.has("hass")||e.size>1)return!0;let s=e.get("hass");if(!s||!this.hass||!this.config||s.locale!==this.hass.locale||s.entities!==this.hass.entities)return!0;let i=this.config;return[i.entity,i.needs_emptying,...Object.keys(lt).map(n=>i[n]),...Object.values(this.entities()).map(n=>n.entity_id)].filter(n=>!!n).some(n=>s.states[n]!==this.hass.states[n])}updated(){let e=this.renderRoot.querySelector(".art svg");if(!e||!this.hass||!this.config)return;G.includes(this.hass.states[this.config.entity]?.state??"")&&!this.reducedMotion.matches?e.unpauseAnimations():(e.pauseAnimations(),e.setCurrentTime(0))}time(e){return new Date(e).toLocaleTimeString(this.hass?.locale.language,{hour:"2-digit",minute:"2-digit"})}ago(e){let s=Math.max(0,Math.round((Date.now()-new Date(e).getTime())/6e4));return s<60?`${s} min`:s<2880?`${Math.round(s/60)} h`:`${Math.round(s/1440)} d`}moreInfo(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}send(e){Promise.resolve(this.hass.callService("button","press",{entity_id:e.entity_id})).catch(()=>{})}press(e,s){e.stopPropagation(),this.send(s)}pressStop(e,s){if(e.stopPropagation(),window.clearTimeout(this.armedTimer),!this.armedStop){this.armedStop=!0,this.armedTimer=window.setTimeout(()=>this.armedStop=!1,3e3);return}this.armedStop=!1,this.send(s)}render(){if(!this.hass||!this.config)return d;let e=this.t,s=this.hass.states[this.config.entity];if(!s)return y`<ha-card><div class="missing">${e.missing}: ${this.config.entity}</div></ha-card>`;let i=this.entities(),o=this.config.needs_emptying?this.hass.states[this.config.needs_emptying]:void 0,n=s.attributes,a=s.state,l=G.includes(a),p=o?.state==="on",u="idle",c,m=d;if(l){u="running";let h=a,S=Number(n.remaining_minutes??0),pt=S>0?new Date(Date.now()+S*6e4).toISOString():void 0;c=e.stages[h],m=y`
        <div class="stepper">
          ${G.map((Lt,ut)=>{let mt=G.indexOf(h),Ft=ut<mt?"done":ut===mt?"current":"";return y`<div class="step ${Ft}"><span></span><label>${e.stages[Lt]}</label></div>`})}
        </div>
        <div class="row">
          <span class="big">${pt?e.endsAt(this.time(pt)):d}</span>
          <span class="muted">${S>0?e.minutes(S):d}</span>
        </div>`}else if(a==="Finished"||p){u=p?"attention":"done";let h=o?.attributes.finished_at??(a==="Finished"?s.last_changed:void 0);c=h?e.finishedAt(this.time(h),this.ago(h)):e.finished,p&&(m=y`<div class="big">${e.needsEmptying}</div>`)}else if(a===Ht){u="running";let h=Number(n.delayed_start_hours??0);c=h>0?e.startsIn(h):e.delayed}else Ut.has(a)?c=e.offline:c=e.idle;let f=[n.program,n.eco_mode?e.eco:void 0].filter(Boolean).join(" \xB7 "),_=(h,S)=>i[h]?i[h].state==="on":n[S]===!0,ct=[_("salt","salt_empty")&&e.salt,_("rinse_aid","rinse_aid_empty")&&e.rinseAid,l&&_("door","door_open")&&e.door].filter(h=>!!h),dt=h=>h&&h.state!=="unavailable",ht=this.config.hide_controls?[]:[(a==="Idle"||a==="Finished")&&dt(i.start)?y`<button @click=${h=>this.press(h,i.start)}>
                <ha-icon icon="mdi:play"></ha-icon>${e.start}
              </button>`:d,(l||a===Ht)&&dt(i.stop)?y`<button class=${this.armedStop?"armed":""}
                @click=${h=>this.pressStop(h,i.stop)}>
                <ha-icon icon="mdi:stop"></ha-icon>${this.armedStop?e.confirmStop:e.stop}
              </button>`:d];return y`
      <ha-card class=${u} @click=${()=>this.moreInfo(this.config.entity)}>
        <div class="head">
          <div class="art">${Bt(Ot)}</div>
          <div class="titles">
            <div class="name">${this.config.name??e.title}</div>
            <div class="status">${c}</div>
            ${f&&!Ut.has(a)?y`<div class="muted">${f}</div>`:d}
          </div>
        </div>
        ${m}
        ${ct.length?y`<div class="chips">${ct.map(h=>y`<span class="chip">${h}</span>`)}</div>`:d}
        ${ht.some(h=>h!==d)?y`<div class="controls">${ht}</div>`:d}
      </ha-card>`}static{this.styles=Z`
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
  `}};T([z({attribute:!1})],k.prototype,"hass",2),T([V()],k.prototype,"config",2),T([V()],k.prototype,"armedStop",2),T([V()],k.prototype,"tick",2);customElements.get("candy-dishwasher-card")||customElements.define("candy-dishwasher-card",k);window.customCards=window.customCards??[];window.customCards.some(r=>r.type==="candy-dishwasher-card")||window.customCards.push({type:"candy-dishwasher-card",name:"Candy Dishwasher Card",description:"Cycle stage, end time, supplies and start/stop for a Candy dishwasher.",preview:!0,documentationURL:"https://github.com/enricodeleo/candy-dishwasher-card"});console.info("%c candy-dishwasher-card 0.1.0 ","background:#55bbf8;color:#111");export{k as CandyDishwasherCard};
