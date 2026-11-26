var pt=Object.defineProperty;var ut=Object.getOwnPropertyDescriptor;var U=(n,e,t,r)=>{for(var i=r>1?void 0:r?ut(e,t):e,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(r?s(e,t,i):s(i))||i);return r&&i&&pt(e,t,i),i};var X=globalThis,ee=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),Ne=new WeakMap,H=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ee&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=Ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Ne.set(t,e))}return e}toString(){return this.cssText}},Be=n=>new H(typeof n=="string"?n:n+"",void 0,de),pe=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((r,i,o)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new H(t,n,de)},Re=(n,e)=>{if(ee)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),i=X.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,n.appendChild(r)}},ue=ee?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return Be(t)})(n):n;var{is:ht,defineProperty:mt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:ft,getOwnPropertySymbols:gt,getPrototypeOf:kt}=Object,te=globalThis,Pe=te.trustedTypes,xt=Pe?Pe.emptyScript:"",wt=te.reactiveElementPolyfillSupport,F=(n,e)=>n,L={toAttribute(n,e){switch(e){case Boolean:n=n?xt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},re=(n,e)=>!ht(n,e),Oe={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&mt(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){let{get:i,set:o}=yt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){let l=i?.call(this);o?.call(this,s),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Oe}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let e=kt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let t=this.properties,r=[...ft(t),...gt(t)];for(let i of r)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)t.unshift(ue(i))}else e!==void 0&&t.push(ue(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Re(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:L).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let o=r.getPropertyOptions(i),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:L;this._$Em=i;let l=s.fromAttribute(t,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,r,i=!1,o){if(e!==void 0){let s=this.constructor;if(i===!1&&(o=this[e]),r??=s.getPropertyOptions(e),!((r.hasChanged??re)(o,t)||r.useDefault&&r.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:o},s){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),o!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,o]of r){let{wrapped:s}=o,l=this[i];s!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[F("elementProperties")]=new Map,k[F("finalized")]=new Map,wt?.({ReactiveElement:k}),(te.reactiveElementVersions??=[]).push("2.1.2");var xe=globalThis,Me=n=>n,ie=xe.trustedTypes,De=ie?ie.createPolicy("lit-html",{createHTML:n=>n}):void 0,qe="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,je="?"+b,vt=`<${je}>`,S=document,q=()=>S.createComment(""),j=n=>n===null||typeof n!="object"&&typeof n!="function",we=Array.isArray,bt=n=>we(n)||typeof n?.[Symbol.iterator]=="function",he=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ue=/-->/g,He=/>/g,E=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,Le=/"/g,ze=/^(?:script|style|textarea|title)$/i,ve=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),f=ve(1),Kt=ve(2),Zt=ve(3),x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ie=new WeakMap,A=S.createTreeWalker(S,129);function Ve(n,e){if(!we(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return De!==void 0?De.createHTML(e):e}var _t=(n,e)=>{let t=n.length-1,r=[],i,o=e===2?"<svg>":e===3?"<math>":"",s=I;for(let l=0;l<t;l++){let a=n[l],p,h,c=-1,y=0;for(;y<a.length&&(s.lastIndex=y,h=s.exec(a),h!==null);)y=s.lastIndex,s===I?h[1]==="!--"?s=Ue:h[1]!==void 0?s=He:h[2]!==void 0?(ze.test(h[2])&&(i=RegExp("</"+h[2],"g")),s=E):h[3]!==void 0&&(s=E):s===E?h[0]===">"?(s=i??I,c=-1):h[1]===void 0?c=-2:(c=s.lastIndex-h[2].length,p=h[1],s=h[3]===void 0?E:h[3]==='"'?Le:Fe):s===Le||s===Fe?s=E:s===Ue||s===He?s=I:(s=E,i=void 0);let m=s===E&&n[l+1].startsWith("/>")?" ":"";o+=s===I?a+vt:c>=0?(r.push(p),a.slice(0,c)+qe+a.slice(c)+b+m):a+b+(c===-2?l:m)}return[Ve(n,o+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},z=class n{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let o=0,s=0,l=e.length-1,a=this.parts,[p,h]=_t(e,t);if(this.el=n.createElement(p,r),A.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(qe)){let y=h[s++],m=i.getAttribute(c).split(b),g=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:g[2],strings:m,ctor:g[1]==="."?ye:g[1]==="?"?fe:g[1]==="@"?ge:O}),i.removeAttribute(c)}else c.startsWith(b)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(ze.test(i.tagName)){let c=i.textContent.split(b),y=c.length-1;if(y>0){i.textContent=ie?ie.emptyScript:"";for(let m=0;m<y;m++)i.append(c[m],q()),A.nextNode(),a.push({type:2,index:++o});i.append(c[y],q())}}}else if(i.nodeType===8)if(i.data===je)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(b,c+1))!==-1;)a.push({type:7,index:o}),c+=b.length-1}o++}}static createElement(e,t){let r=S.createElement("template");return r.innerHTML=e,r}};function P(n,e,t=n,r){if(e===x)return e;let i=r!==void 0?t._$Co?.[r]:t._$Cl,o=j(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,t,r)),r!==void 0?(t._$Co??=[])[r]=i:t._$Cl=i),i!==void 0&&(e=P(n,i._$AS(n,e.values),i,r)),e}var me=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??S).importNode(t,!0);A.currentNode=i;let o=A.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let p;a.type===2?p=new V(o,o.nextSibling,this,e):a.type===1?p=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(p=new ke(o,this,e)),this._$AV.push(p),a=r[++l]}s!==a?.index&&(o=A.nextNode(),s++)}return A.currentNode=S,i}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},V=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),j(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):bt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=z.createElement(Ve(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{let o=new me(i,this),s=o.u(this.options);o.p(t),this.T(s),this._$AH=o}}_$AC(e){let t=Ie.get(e.strings);return t===void 0&&Ie.set(e.strings,t=new z(e)),t}k(e){we(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let o of e)i===t.length?t.push(r=new n(this.O(q()),this.O(q()),this,this.options)):r=t[i],r._$AI(o),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=Me(e).nextSibling;Me(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(e,t=this,r,i){let o=this.strings,s=!1;if(o===void 0)e=P(this,e,t,0),s=!j(e)||e!==this._$AH&&e!==x,s&&(this._$AH=e);else{let l=e,a,p;for(e=o[0],a=0;a<o.length-1;a++)p=P(this,l[r+a],t,a),p===x&&(p=this._$AH[a]),s||=!j(p)||p!==this._$AH[a],p===d?e=d:e!==d&&(e+=(p??"")+o[a+1]),this._$AH[a]=p}s&&!i&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ye=class extends O{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},fe=class extends O{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},ge=class extends O{constructor(e,t,r,i,o){super(e,t,r,i,o),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??d)===x)return;let r=this._$AH,i=e===d&&r!==d||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==d&&(r===d||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var Ct=xe.litHtmlPolyfillSupport;Ct?.(z,V),(xe.litHtmlVersions??=[]).push("3.3.3");var We=(n,e,t)=>{let r=t?.renderBefore??e,i=r._$litPart$;if(i===void 0){let o=t?.renderBefore??null;r._$litPart$=i=new V(e.insertBefore(q(),o),o,void 0,t??{})}return i._$AI(n),i};var be=globalThis,_=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=We(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};_._$litElement$=!0,_.finalized=!0,be.litElementHydrateSupport?.({LitElement:_});var $t=be.litElementPolyfillSupport;$t?.({LitElement:_});(be.litElementVersions??=[]).push("4.2.2");var Tt={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:re},Et=(n=Tt,e,t)=>{let{kind:r,metadata:i}=t,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(t.name,n),r==="accessor"){let{name:s}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,a,n,!0,l)},init(l){return l!==void 0&&this.C(s,void 0,n,l),l}}}if(r==="setter"){let{name:s}=t;return function(l){let a=this[s];e.call(this,l),this.requestUpdate(s,a,n,!0,l)}}throw Error("Unsupported decorator location: "+r)};function ne(n){return(e,t)=>typeof t=="object"?Et(n,e,t):((r,i,o)=>{let s=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(i,o):void 0})(n,e,t)}function oe(n){return ne({...n,state:!0,attribute:!1})}var Qe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ke=n=>(...e)=>({_$litDirective$:n,values:e}),ae=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var W=class extends ae{constructor(e){if(super(e),this.it=d,e.type!==Qe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===d||e==null)return this._t=void 0,this.it=e;if(e===x)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};W.directiveName="unsafeHTML",W.resultType=1;var Ze=Ke(W);var Ge=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">

<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>

<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<circle cx="280" cy="120" r="19" fill="#55BBF8"></circle>
<line x1="280" y1="120" x2="280" y2="109" stroke="#fff" stroke-width="4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0 280 120;360 280 120" dur="4s" repeatCount="indefinite"></animateTransform></line>
<line x1="280" y1="120" x2="287" y2="120" stroke="#fff" stroke-width="4" stroke-linecap="round"></line>

</svg>
`;var Ye=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<clipPath id="cd"><rect x="85" y="150" width="230" height="140"></rect></clipPath>
<g clip-path="url(#cd)"><g><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" values="0 140;0 140;0 0;0 0;0 140;0 140" keyTimes="0;0.28;0.4;0.7;0.76;1" calcMode="spline" keySplines="0 0 1 1;.2 .8 .3 1;0 0 1 1;.5 0 .8 .4;0 0 1 1"></animateTransform>
<circle class="paper" cx="166" cy="244" r="52" stroke="currentColor" stroke-width="10"></circle><circle cx="166" cy="244" r="37" fill="#55BBF8"></circle></g><g><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" values="0 140;0 140;0 0;0 0;0 140;0 140" keyTimes="0;0.32;0.44;0.68;0.74;1" calcMode="spline" keySplines="0 0 1 1;.2 .8 .3 1;0 0 1 1;.5 0 .8 .4;0 0 1 1"></animateTransform>
<circle class="paper" cx="236" cy="244" r="52" stroke="currentColor" stroke-width="10"></circle><circle cx="236" cy="244" r="37" fill="#55BBF8"></circle></g>
<g opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.40;0.44;0.57;0.59;1" values="0;0;1;1;0;0"></animate><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.40;0.44;0.57;0.59;1" values="0 0;0 0;2 -15;6 -122;6 -128;6 -128"></animateTransform><circle class="paper" cx="110" cy="280" r="9" stroke="#55BBF8" stroke-width="4"></circle></g>
<g opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.42;0.46;0.59;0.61;1" values="0;0;1;1;0;0"></animate><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.42;0.46;0.59;0.61;1" values="0 0;0 0;2 -15;5 -128;5 -134;5 -134"></animateTransform><circle class="paper" cx="200" cy="282" r="11" stroke="#55BBF8" stroke-width="4"></circle></g>
<g opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.41;0.45;0.58;0.60;1" values="0;0;1;1;0;0"></animate><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.41;0.45;0.58;0.60;1" values="0 0;0 0;-2 -15;-5 -125;-5 -131;-5 -131"></animateTransform><circle class="paper" cx="292" cy="280" r="10" stroke="#55BBF8" stroke-width="4"></circle></g>
<g opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.52;0.65;0.67;1" values="0;0;1;1;0;0"></animate><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.52;0.65;0.67;1" values="0 0;0 0;-1 -15;-4 -113;-4 -119;-4 -119"></animateTransform><circle class="paper" cx="150" cy="285" r="6" stroke="#55BBF8" stroke-width="4"></circle></g>
<g opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.52;0.56;0.69;0.71;1" values="0;0;1;1;0;0"></animate><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.52;0.56;0.69;0.71;1" values="0 0;0 0;-2 -15;-6 -116;-6 -122;-6 -122"></animateTransform><circle class="paper" cx="255" cy="284" r="7" stroke="#55BBF8" stroke-width="4"></circle></g>
<g opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.58;0.62;0.75;0.77;1" values="0;0;1;1;0;0"></animate><animateTransform attributeName="transform" type="translate" dur="6s" repeatCount="indefinite" keyTimes="0;0.58;0.62;0.75;0.77;1" values="0 0;0 0;1 -15;3 -113;3 -119;3 -119"></animateTransform><circle class="paper" cx="205" cy="286" r="6" stroke="#55BBF8" stroke-width="4"></circle></g>
</g>
<circle cx="280" cy="120" r="15" fill="#55BBF8"></circle>
<polygon class="paper" points="80,290 320,290 320,150 80,150" stroke="currentColor" stroke-width="10" stroke-linejoin="round"><animate attributeName="points" dur="6s" repeatCount="indefinite" keyTimes="0.000;0.140;0.158;0.175;0.193;0.210;0.228;0.245;0.263;0.280;0.780;0.780;0.795;0.810;0.825;0.840;0.855;0.870;0.885;0.900;1.000" values="80,290 320,290 320,150 80,150;80,290 320,290 320,150 80,150;80,290 320,290 324,152 76,152;80,290 320,290 333,161 67,161;80,290 320,290 346,179 54,179;80,290 320,290 358,209 42,209;80,290 320,290 367,246 33,246;80,290 320,290 372,281 28,281;80,290 320,290 374,306 26,306;80,290 320,290 374,316 26,316;80,290 320,290 374,316 26,316;80,290 320,290 374,316 26,316;80,290 320,290 374,306 26,306;80,290 320,290 372,281 28,281;80,290 320,290 367,246 33,246;80,290 320,290 358,209 42,209;80,290 320,290 346,179 54,179;80,290 320,290 333,161 67,161;80,290 320,290 324,152 76,152;80,290 320,290 320,150 80,150;80,290 320,290 320,150 80,150"></animate></polygon>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"><animate attributeName="x1" dur="6s" repeatCount="indefinite" keyTimes="0.000;0.140;0.158;0.175;0.193;0.210;0.228;0.245;0.263;0.280;0.780;0.780;0.795;0.810;0.825;0.840;0.855;0.870;0.885;0.900;1.000" values="160;160;159;156;153;149;147;145;145;145;145;145;145;145;147;149;153;156;159;160;160"></animate><animate attributeName="x2" dur="6s" repeatCount="indefinite" keyTimes="0.000;0.140;0.158;0.175;0.193;0.210;0.228;0.245;0.263;0.280;0.780;0.780;0.795;0.810;0.825;0.840;0.855;0.870;0.885;0.900;1.000" values="240;240;241;244;247;251;253;255;255;255;255;255;255;255;253;251;247;244;241;240;240"></animate><animate attributeName="y1" dur="6s" repeatCount="indefinite" keyTimes="0.000;0.140;0.158;0.175;0.193;0.210;0.228;0.245;0.263;0.280;0.780;0.780;0.795;0.810;0.825;0.840;0.855;0.870;0.885;0.900;1.000" values="172;172;174;181;197;222;253;283;304;312;312;312;304;283;253;222;197;181;174;172;172"></animate><animate attributeName="y2" dur="6s" repeatCount="indefinite" keyTimes="0.000;0.140;0.158;0.175;0.193;0.210;0.228;0.245;0.263;0.280;0.780;0.780;0.795;0.810;0.825;0.840;0.855;0.870;0.885;0.900;1.000" values="172;172;174;181;197;222;253;283;304;312;312;312;304;283;253;222;197;181;174;172;172"></animate><animate attributeName="opacity" dur="6s" repeatCount="indefinite" calcMode="discrete" keyTimes="0.000;0.140;0.158;0.175;0.193;0.210;0.228;0.245;0.263;0.280;0.780;0.780;0.795;0.810;0.825;0.840;0.855;0.870;0.885;0.900;1.000" values="1;1;1;1;1;1;1;1;0;0;0;0;0;1;1;1;1;1;1;1;1"></animate></line>
<g transform="translate(300 190)"><path d="M0,-14 Q2.1,-2.1 14,0 Q2.1,2.1 0,14 Q-2.1,2.1 -14,0 Q-2.1,-2.1 0,-14Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.46;0.52;0.62;1" values="0;0;1;0;0"></animate><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.46;0.52;0.62;1" values="0;0;1.2;0;0"></animateTransform><animateTransform attributeName="transform" type="rotate" additive="sum" dur="6s" repeatCount="indefinite" keyTimes="0;0.46;0.52;0.62;1" values="0;0;45;135;135"></animateTransform></path></g><g transform="translate(118 177)"><path d="M0,-9 Q1.3,-1.3 9,0 Q1.3,1.3 0,9 Q-1.3,1.3 -9,0 Q-1.3,-1.3 0,-9Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.56;0.66;1" values="0;0;1;0;0"></animate><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.56;0.66;1" values="0;0;1.2;0;0"></animateTransform><animateTransform attributeName="transform" type="rotate" additive="sum" dur="6s" repeatCount="indefinite" keyTimes="0;0.5;0.56;0.66;1" values="0;0;45;135;135"></animateTransform></path></g><g transform="translate(205 169)"><path d="M0,-9 Q1.3,-1.3 9,0 Q1.3,1.3 0,9 Q-1.3,1.3 -9,0 Q-1.3,-1.3 0,-9Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.59;0.69;1" values="0;0;1;0;0"></animate><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.59;0.69;1" values="0;0;1.2;0;0"></animateTransform><animateTransform attributeName="transform" type="rotate" additive="sum" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.59;0.69;1" values="0;0;45;135;135"></animateTransform></path></g>
</svg>
`;var Je=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<path d="M150,78 q-12,-12 0,-24 q12,-12 0,-24" fill="none" stroke="#55BBF8" stroke-width="8" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="3s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="3s" begin="0s" repeatCount="indefinite"></animate></path>
<path d="M200,78 q-12,-12 0,-24 q12,-12 0,-24" fill="none" stroke="#55BBF8" stroke-width="8" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="3s" begin="1s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite"></animate></path>
<path d="M250,78 q-12,-12 0,-24 q12,-12 0,-24" fill="none" stroke="#55BBF8" stroke-width="8" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -14" dur="3s" begin="2s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite"></animate></path>
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>

<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<circle cx="280" cy="120" r="15" fill="#55BBF8"></circle>
</svg>
`;var Xe=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g><animateTransform attributeName="transform" type="translate" values="0 0;-5 0;5 0;-4 0;4 0;0 0;0 0" keyTimes="0;.05;.1;.15;.2;.25;1" dur="2s" repeatCount="indefinite"></animateTransform>
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>

<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<g><circle cx="280" cy="120" r="17" fill="#FB8C00"><animate attributeName="r" values="17;21;17" dur="1.2s" repeatCount="indefinite"></animate></circle>
<line x1="280" y1="110" x2="280" y2="122" stroke="#fff" stroke-width="6" stroke-linecap="round"></line><circle cx="280" cy="131" r="3.5" fill="#fff"></circle></g>
</g>
</svg>
`;var et=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>

<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<circle class="knob-off" cx="280" cy="120" r="15"></circle>
</svg>
`;var tt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">

<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>



<circle cx="280" cy="120" r="15" fill="#55BBF8"></circle>
<clipPath id="co"><rect x="85" y="150" width="230" height="140"></rect></clipPath><g clip-path="url(#co)"><circle class="paper" cx="166" cy="244" r="52" stroke="currentColor" stroke-width="10"></circle><circle cx="166" cy="244" r="37" fill="#55BBF8"></circle><circle class="paper" cx="236" cy="244" r="52" stroke="currentColor" stroke-width="10"></circle><circle cx="236" cy="244" r="37" fill="#55BBF8"></circle></g>
<polygon class="paper" points="80,290 320,290 374,316 26,316" stroke="currentColor" stroke-width="10" stroke-linejoin="round"></polygon>
</svg>
`;var rt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<clipPath id="cr"><rect x="85" y="180" width="230" height="105"></rect></clipPath>
<g clip-path="url(#cr)">
<circle class="paper" cx="170" cy="238" r="46" stroke="currentColor" stroke-width="10"></circle><circle cx="170" cy="238" r="32" fill="#55BBF8"></circle>
<circle class="paper" cx="232" cy="238" r="46" stroke="currentColor" stroke-width="10"></circle><circle cx="232" cy="238" r="32" fill="#55BBF8"></circle>
<line x1="110" y1="176" x2="110" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></line>
<line x1="150" y1="176" x2="150" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.45s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.45s" repeatCount="indefinite"></animate></line>
<line x1="190" y1="176" x2="190" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.2s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.2s" repeatCount="indefinite"></animate></line>
<line x1="230" y1="176" x2="230" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.65s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.65s" repeatCount="indefinite"></animate></line>
<line x1="270" y1="176" x2="270" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.1s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.1s" repeatCount="indefinite"></animate></line>
<line x1="130" y1="176" x2="130" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.75s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></line>
<line x1="250" y1="176" x2="250" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.35s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.35s" repeatCount="indefinite"></animate></line>
<line x1="210" y1="176" x2="210" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.9s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.9s" repeatCount="indefinite"></animate></line>
<line x1="170" y1="176" x2="170" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.55s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.55s" repeatCount="indefinite"></animate></line>
<line x1="290" y1="176" x2="290" y2="190" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 95" dur="1s" begin="0.8s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.8s" repeatCount="indefinite"></animate></line>
</g>
<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<circle cx="280" cy="120" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle>
</svg>
`;var it=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g opacity=".4">
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>

<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>

</g>
<circle class="knob-off" cx="280" cy="120" r="19"></circle><text x="280" y="129" text-anchor="middle" font-family="Roboto, sans-serif" font-size="26" font-weight="700" fill="#fff">?</text>
</svg>
`;var nt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="105" y1="332" x2="105" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="295" y1="332" x2="295" y2="346" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect class="paper" x="80" y="90" width="240" height="240" rx="20" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="150" x2="320" y2="150" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="112" y1="108" x2="112" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="134" y1="108" x2="134" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="156" y1="108" x2="156" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="178" y1="108" x2="178" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="200" y1="108" x2="200" y2="132" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<clipPath id="cw"><rect x="85" y="180" width="230" height="105"></rect></clipPath>
<g clip-path="url(#cw)">
<path d="M-80,232 q20,-10 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 V300 H-80Z" fill="#55BBF8" opacity=".35"><animateTransform attributeName="transform" type="translate" values="0 0;80 0" dur="1.6s" repeatCount="indefinite"></animateTransform></path>
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.8s" begin="0s" repeatCount="indefinite"></animateTransform><circle class="paper" cx="170" cy="238" r="46" stroke="currentColor" stroke-width="10"></circle><circle cx="170" cy="238" r="32" fill="#55BBF8"></circle></g>
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.8s" begin="0.45s" repeatCount="indefinite"></animateTransform><circle class="paper" cx="232" cy="238" r="46" stroke="currentColor" stroke-width="10"></circle><circle cx="232" cy="238" r="32" fill="#55BBF8"></circle></g>
<path d="M-80,246 q20,-8 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 V300 H-80Z" fill="#55BBF8" opacity=".85"><animateTransform attributeName="transform" type="translate" values="80 0;0 0" dur="2.2s" repeatCount="indefinite"></animateTransform></path>
<circle class="paper" cx="130" cy="280" r="7" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="280;195" dur="2.4s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.4s" begin="0s" repeatCount="indefinite"></animate></circle>
<circle class="paper" cx="205" cy="280" r="9" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="280;195" dur="2.4s" begin="0.7s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.4s" begin="0.7s" repeatCount="indefinite"></animate></circle>
<circle class="paper" cx="265" cy="280" r="6" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="280;195" dur="2.4s" begin="1.3s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.4s" begin="1.3s" repeatCount="indefinite"></animate></circle>
<circle class="paper" cx="170" cy="280" r="5" stroke="#55BBF8" stroke-width="4" opacity="0"><animate attributeName="cy" values="280;195" dur="2.4s" begin="1.9s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.4s" begin="1.9s" repeatCount="indefinite"></animate></circle>
</g>
<line x1="80" y1="290" x2="320" y2="290" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<line x1="160" y1="172" x2="240" y2="172" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<circle cx="280" cy="120" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle>
</svg>
`;var Q={salt:{domain:"binary_sensor",key:"dishwasher_salt_empty",match:/salt_empty$/},rinse_aid:{domain:"binary_sensor",key:"dishwasher_rinse_aid_empty",match:/rinse_aid_empty$/},door:{domain:"binary_sensor",key:"dishwasher_door",match:/_door$/},remote:{domain:"binary_sensor",key:"remote_control",match:/remote_control$/},error:{domain:"sensor",key:"dishwasher_error_code",match:/error_code$/},eco:{domain:"switch",key:"dishwasher_eco_switch",match:/_eco(_option)?$/},three_in_one:{domain:"switch",key:"dishwasher_three_in_one_switch",match:/3in1|three_in_one/},start:{domain:"button",key:"dishwasher_start_button",match:/start(_button|_dishwasher)?$/},stop:{domain:"button",key:"dishwasher_stop_button",match:/stop(_button|_dishwasher)?$/}},_e={salt:"mdi:shaker-outline",rinse_aid:"mdi:water-outline",remote:"mdi:remote"},Ut={entity:"Dishwasher status sensor (Candy)",name:"Name",needs_emptying:"Needs emptying (binary sensor, optional)",hide_controls:"Hide Start / Stop",salt:"Salt empty",rinse_aid:"Rinse aid empty",door:"Door",remote:"Remote control",error:"Error code",eco:"Eco option",three_in_one:"3-in-1 tablets",start:"Start button",stop:"Stop button"},le=["Pre-wash","Wash","Rinse","Drying"],Ht="Delayed start programmed",Ft=new Set(["unavailable","unknown"]),Lt=new Set(["E0","0","","unknown","unavailable"]),It={off:et,unknown:it,rinsing:rt,washing:nt,drying:Je,done:Ye,open:tt,error:Xe,delayed:Ge},qt={"Pre-wash":"rinsing",Wash:"washing",Rinse:"rinsing",Drying:"drying"},ot={en:{title:"Dishwasher",idle:"Idle",unknown:"Unknown",finished:"Finished",delayed:"Delayed start",error:n=>`Error ${n}`,stages:{"Pre-wash":"Pre-wash",Wash:"Wash",Rinse:"Rinse",Drying:"Drying"},readyToStart:"Ready to start",doorOpen:"Door open",doorClosed:"Door closed",remoteOff:"Remote control off",remoteOn:"Remote control on",noData:"No data from the dishwasher",running:n=>`Program ${n} running`,delayedSub:"Delayed start programmed",needsEmptying:"Needs emptying",emptied:"Emptied",errorSub:n=>`Error code ${n}`,program:"Program",remaining:"Remaining",endsAt:"Ends at",delay:"Delay",finishedRow:"Finished",door:"Door",open:"Open",closed:"Closed",hours:n=>`${n} h`,duration:n=>n>=60?`${Math.floor(n/60)} h${n%60?` ${n%60} min`:""}`:`${n} min`,ago:n=>`${n} ago`,eco:"Eco",threeInOne:"3-in-1",saltOk:"Salt OK",saltEmpty:"Salt empty",rinseOk:"Rinse aid OK",rinseEmpty:"Rinse aid empty",start:"Start",stop:"Stop",confirmStop:"Tap again to stop",hintUnavailable:"The dishwasher integration is unavailable.",hintRemote:n=>`Turn on remote control on the dishwasher to ${n?"stop":"start"} it from here.`,hintDoor:"Close the door before starting.",hintBusy:"Waiting for the dishwasher\u2026",missing:"Entity not found"},it:{title:"Lavastoviglie",idle:"In attesa",unknown:"Sconosciuto",finished:"Finita",delayed:"Partenza ritardata",error:n=>`Errore ${n}`,stages:{"Pre-wash":"Prelavaggio",Wash:"Lavaggio",Rinse:"Risciacquo",Drying:"Asciugatura"},readyToStart:"Pronta per partire",doorOpen:"Porta aperta",doorClosed:"Porta chiusa",remoteOff:"Controllo remoto spento",remoteOn:"Controllo remoto attivo",noData:"Nessun dato dalla lavastoviglie",running:n=>`Programma ${n} in corso`,delayedSub:"Partenza ritardata impostata",needsEmptying:"Da svuotare",emptied:"Svuotata",errorSub:n=>`Codice errore ${n}`,program:"Programma",remaining:"Mancano",endsAt:"Fine alle",delay:"Ritardo",finishedRow:"Finita",door:"Porta",open:"Aperta",closed:"Chiusa",hours:n=>`${n} h`,duration:n=>n>=60?`${Math.floor(n/60)} h${n%60?` ${n%60} min`:""}`:`${n} min`,ago:n=>`${n} fa`,eco:"Eco",threeInOne:"3 in 1",saltOk:"Sale OK",saltEmpty:"Sale finito",rinseOk:"Brillantante OK",rinseEmpty:"Brillantante finito",start:"Avvia",stop:"Interrompi",confirmStop:"Tocca di nuovo per fermare",hintUnavailable:"L'integrazione della lavastoviglie non \xE8 disponibile.",hintRemote:n=>`Attiva il controllo remoto sulla lavastoviglie per ${n?"fermarla":"avviarla"} da qui.`,hintDoor:"Chiudi la porta prima di avviare.",hintBusy:"In attesa della lavastoviglie\u2026",missing:"Entit\xE0 non trovata"}},N=class extends _{constructor(){super(...arguments);this.armedStop=!1;this.tick=0;this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");this.onMotionChange=()=>this.requestUpdate()}static getConfigForm(){let t=(r,i)=>({name:r,selector:{entity:{filter:{domain:i}}}});return{schema:[{name:"entity",required:!0,selector:{entity:{filter:{domain:"sensor",integration:"candy"}}}},{name:"name",selector:{text:{}}},t("needs_emptying","binary_sensor"),{name:"hide_controls",selector:{boolean:{}}},{type:"expandable",name:"",title:"Entities (found automatically on the dishwasher's device)",schema:Object.keys(Q).map(r=>t(r,Q[r].domain))}],computeLabel:r=>Ut[r.name]}}static getStubConfig(t){return{entity:Object.values(t.entities).find(i=>i.platform==="candy"&&i.entity_id.startsWith("sensor.")&&"salt_empty"in(t.states[i.entity_id]?.attributes??{}))?.entity_id??"sensor.dishwasher"}}setConfig(t){if(!t.entity)throw new Error("entity is required: the Candy dishwasher status sensor");this.config=t}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this.clock=window.setInterval(()=>this.tick++,6e4),this.reducedMotion.addEventListener("change",this.onMotionChange)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.armedTimer),window.clearInterval(this.clock),this.reducedMotion.removeEventListener("change",this.onMotionChange)}get t(){return(this.hass?.locale.language.split("-")[0]??"en")==="it"?ot.it:ot.en}entities(){let t=this.hass,r=this.config,i=t.entities[r.entity]?.device_id,o=i?Object.values(t.entities).filter(l=>l.device_id===i&&l.platform==="candy"):[],s={};for(let l of Object.keys(Q)){let{domain:a,key:p,match:h}=Q[l],c=o.filter(m=>m.entity_id.startsWith(`${a}.`)),y=r[l]??(c.find(m=>m.translation_key===p)??c.find(m=>h.test(m.entity_id)))?.entity_id;y&&t.states[y]&&(s[l]=t.states[y])}return s}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;let r=t.get("hass");if(!r||!this.hass||!this.config||r.locale!==this.hass.locale||r.entities!==this.hass.entities)return!0;let i=this.config;return[i.entity,i.needs_emptying,...Object.keys(Q).map(s=>i[s]),...Object.values(this.entities()).map(s=>s.entity_id)].filter(s=>!!s).some(s=>r.states[s]!==this.hass.states[s])}updated(){let t=this.renderRoot.querySelector(".art svg");t&&(this.reducedMotion.matches?(t.pauseAnimations(),t.setCurrentTime(0)):t.unpauseAnimations())}time(t){return t.toLocaleTimeString(this.hass?.locale.language,{hour:"2-digit",minute:"2-digit"})}since(t){let r=Math.max(0,Math.round((Date.now()-new Date(t).getTime())/6e4));return r<2880?this.t.duration(r):`${Math.round(r/1440)} d`}moreInfo(t,r){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))}send(t){Promise.resolve(this.hass.callService("button","press",{entity_id:t.entity_id})).catch(()=>{})}press(t,r){t.stopPropagation(),this.send(r)}pressStop(t,r){if(t.stopPropagation(),window.clearTimeout(this.armedTimer),!this.armedStop){this.armedStop=!0,this.armedTimer=window.setTimeout(()=>this.armedStop=!1,3e3);return}this.armedStop=!1,this.send(r)}pill(t){let r=t.entity?f`<ha-state-icon .hass=${this.hass} .stateObj=${t.entity}></ha-state-icon>`:f`<ha-icon icon=${t.icon}></ha-icon>`,i=t.kind==="ok"||t.kind==="quiet";return f`<span
      class="pill ${t.kind} ${i?"compact":""} ${t.entity?"link":""}"
      title=${t.text}
      aria-label=${t.text}
      @click=${t.entity?o=>this.moreInfo(o,t.entity.entity_id):void 0}
      >${r}${i?d:t.text}</span
    >`}render(){if(!this.hass||!this.config)return d;this.tick;let t=this.t,r=this.config,i=this.hass.states[r.entity];if(!i)return f`<ha-card><div class="missing">${t.missing}: ${r.entity}</div></ha-card>`;let o=this.entities(),s=r.needs_emptying?this.hass.states[r.needs_emptying]:void 0,l=i.attributes,a=i.state,p=Ft.has(a),h=le.includes(a),c=a===Ht,y=(u,R)=>o[u]?o[u].state==="on":l[R]===!0,m=y("door","door_open"),g=y("remote","remote_control"),Ce=y("salt","salt_empty"),$e=y("rinse_aid","rinse_aid_empty"),st=y("eco","eco_mode"),at=o.three_in_one?.state==="on",K=o.error?.state??"E0",Te=!p&&!Lt.has(K),M=typeof l.program=="string"&&l.program?l.program:"\u2014",Z=Number(l.remaining_minutes??0),ce=s?.state==="on",D=!h&&!c&&!p&&(a==="Finished"||ce),C,$,w,v;if(p)[C,$,w,v]=[t.unknown,"grey",t.noData,"unknown"];else if(h){let u=a;[C,$,w,v]=[t.stages[u],u==="Drying"?"teal":"blue",t.running(M),qt[u]]}else c?[C,$,w,v]=[t.delayed,"purple",t.delayedSub,"delayed"]:D?[C,$,w,v]=[t.finished,"green",s?ce?t.needsEmptying:t.emptied:t.finished,m?"open":"done"]:[C,$,w,v]=[t.idle,"grey",m?t.doorOpen:g?t.readyToStart:t.remoteOff,m?"open":"off"];Te&&(w=v==="off"?t.errorSub(K):`${t.errorSub(K)} \xB7 ${w}`,[C,$,v]=[t.error(K),"orange","error"]);let B;if(p)B=[[t.program,"\u2014"],[t.remaining,"\u2014"]];else if(h)B=[[t.program,M],[t.remaining,Z>0?t.duration(Z):"\u2014"],[t.endsAt,Z>0?this.time(new Date(Date.now()+Z*6e4)):"\u2014"]];else if(c){let u=Number(l.delayed_start_hours??0);B=[[t.program,M],[t.delay,u>0?t.hours(u):"\u2014"]]}else if(D){let u=s?.attributes.finished_at??(a==="Finished"?i.last_changed:void 0);B=[[t.program,M],[t.finishedRow,u?`${this.time(new Date(u))} \xB7 ${t.ago(this.since(u))}`:"\u2014"]]}else B=[[t.program,M],[t.door,m?t.open:t.closed]];let Ee=p?[]:[st&&t.eco,at&&t.threeInOne].filter(u=>!!u),Ae=h?le.indexOf(a):D?le.length:-1,lt=le.map((u,R)=>{let dt=R<Ae?D?"complete":"done":R===Ae?Te?"current error":"current":"";return f`<div class="step ${dt}"><span></span><label>${t.stages[u]}</label></div>`}),G=[];D&&ce&&G.push({text:t.needsEmptying,entity:s,icon:"mdi:silverware-clean",kind:"info"}),p||G.push({text:m?t.doorOpen:t.doorClosed,role:"door",entity:o.door,icon:m?"mdi:door-open":"mdi:door-closed",kind:m?"neutral":"quiet"},{text:Ce?t.saltEmpty:t.saltOk,role:"salt",entity:o.salt,icon:_e.salt,kind:Ce?"bad":"ok"},{text:$e?t.rinseEmpty:t.rinseOk,role:"rinse_aid",entity:o.rinse_aid,icon:_e.rinse_aid,kind:$e?"bad":"ok"},{text:g?t.remoteOn:t.remoteOff,role:"remote",entity:o.remote,icon:_e.remote,kind:g?"ok":"bad"});let T=h||c,Y=T?o.stop:o.start,ct=Y?.state==="unavailable",J=p?t.hintUnavailable:g?!T&&m?t.hintDoor:ct?t.hintBusy:"":t.hintRemote(T),Se=!r.hide_controls&&Y?f`<button
            class="action ${T?"stop":"start"} ${this.armedStop?"armed":""}"
            ?disabled=${J!==""}
            @click=${u=>T?this.pressStop(u,Y):this.press(u,Y)}
          >
            <ha-icon icon=${T?"mdi:stop":"mdi:play"}></ha-icon>
            ${T?this.armedStop?t.confirmStop:t.stop:t.start}
          </button>`:d;return f`
      <ha-card class="tone-${$}" @click=${u=>this.moreInfo(u,r.entity)}>
        <div class="head">
          <div class="titles">
            <div class="name">${r.name??t.title}</div>
            <div class="muted">${w}</div>
          </div>
          <span class="chip">${C}</span>
        </div>
        <div class="body">
          <div class="art">${Ze(It[v])}</div>
          <div class="facts">
            ${B.map(([u,R])=>f`<div class="fact"><span class="muted">${u}</span><span>${R}</span></div>`)}
            ${Ee.length?f`<div class="options">${Ee.map(u=>f`<span>${u}</span>`)}</div>`:d}
          </div>
        </div>
        <div class="steps">${lt}</div>
        ${G.length?f`<div class="pills">${G.map(u=>this.pill(u))}</div>`:d}
        ${J||Se!==d?f`<div class="foot">
              ${J?f`<span class="hint">${J}</span>`:d} ${Se}
            </div>`:d}
      </ha-card>`}static{this.styles=pe`
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
  `}};U([ne({attribute:!1})],N.prototype,"hass",2),U([oe()],N.prototype,"config",2),U([oe()],N.prototype,"armedStop",2),U([oe()],N.prototype,"tick",2);customElements.get("candy-dishwasher-card")||customElements.define("candy-dishwasher-card",N);window.customCards=window.customCards??[];window.customCards.some(n=>n.type==="candy-dishwasher-card")||window.customCards.push({type:"candy-dishwasher-card",name:"Candy Dishwasher Card",description:"Cycle steps, end time, supplies and start/stop for a Candy dishwasher.",preview:!0,documentationURL:"https://github.com/enricodeleo/candy-dishwasher-card"});console.info("%c candy-dishwasher-card 0.2.0 ","background:#55bbf8;color:#111");export{N as CandyDishwasherCard};
