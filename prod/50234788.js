import{b as e,a as s,g as t,k as n,r as i,f as o,c as r,n as a,v as c,j as d,z as l,i as u}from"./e94213f9.js";import{K as w,O as p}from"./953d27ae.js";function h(s){return class extends s{connectedCallback(){const s="rtl"===getComputedStyle(this).direction;this[e]({rightToLeft:s}),super.connectedCallback()}}}const b=Symbol("implicitCloseListener");async function v(e){const s=this,t=e.relatedTarget||document.activeElement;t instanceof Element&&!c(s,t)&&(s[d]=!0,await s.close({canceled:"window blur"}),s[d]=!1)}async function m(e){const t=this,n="resize"!==e.type||t[s].closeOnWindowResize;!l(t,e)&&n&&(t[d]=!0,await t.close({canceled:`window ${e.type}`}),t[d]=!1)}const f=w(function(c){return class extends c{get closeOnWindowResize(){return this[s].closeOnWindowResize}set closeOnWindowResize(s){this[e]({closeOnWindowResize:s})}get[t](){return Object.assign(super[t]||{},{closeOnWindowResize:!0,role:"alert"})}[n](e){let s=!1;switch(e.key){case"Escape":this.close({canceled:"Escape"}),s=!0}return s||super.keydown&&super.keydown(e)||!1}[i](e){if(super[i]&&super[i](e),this[o]&&this.addEventListener("blur",v.bind(this)),e.role){const{role:e}=this[s];this.setAttribute("role",e)}}[r](e){if(super[r]&&super[r](e),e.opened)if(this.opened){("requestIdleCallback"in window?window.requestIdleCallback:setTimeout)((()=>{var e;this.opened&&((e=this)[b]=m.bind(e),window.addEventListener("blur",e[b]),window.addEventListener("resize",e[b]),window.addEventListener("scroll",e[b]))}))}else(s=this)[b]&&(window.removeEventListener("blur",s[b]),window.removeEventListener("resize",s[b]),window.removeEventListener("scroll",s[b]),s[b]=null);var s}get role(){return super.role}set role(s){super.role=s,this[a]||this[e]({role:s})}}}(p));class E extends f{[i](e){super[i](e),e.backdropPartType&&(this[u].backdrop.addEventListener("mousedown",L.bind(this)),"PointerEvent"in window||this[u].backdrop.addEventListener("touchend",L))}}async function L(e){const s=this;s[d]=!0,await s.close({canceled:"mousedown outside"}),s[d]=!1,e.preventDefault(),e.stopPropagation()}export{h as L,E as P};
