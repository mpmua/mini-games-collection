/*! For license information please see 344.ae0aaeda.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkmini_games_collection=self.webpackChunkmini_games_collection||[]).push([[344],{9344:function(e,t,n){n.r(t),n.d(t,{startTapClick:function(){return o}});var i=n(1811),o=function(e){var t,n,o,l=10*-f,v=0,p=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),m=new WeakMap,h=function(e){l=(0,i.u)(e),E(e)},L=function(){clearTimeout(o),o=void 0,t&&(T(!1),t=void 0)},w=function(e){t||g(a(e),e)},E=function(e){g(void 0,e)},g=function(e,n){if(!e||e!==t){clearTimeout(o),o=void 0;var a=(0,i.q)(n),c=a.x,d=a.y;if(t){if(m.has(t))throw new Error("internal error");t.classList.contains(s)||b(t,c,d),T(!0)}if(e){var f=m.get(e);f&&(clearTimeout(f),m.delete(e));var l=r(e)?0:u;e.classList.remove(s),o=setTimeout((function(){b(e,c,d),o=void 0}),l)}t=e}},b=function(e,t,i){v=Date.now(),e.classList.add(s);var o=p&&c(e);o&&o.addRipple&&(k(),n=o.addRipple(t,i))},k=function(){void 0!==n&&(n.then((function(e){return e()})),n=void 0)},T=function(e){k();var n=t;if(n){var i=d-Date.now()+v;if(e&&i>0&&!r(n)){var o=setTimeout((function(){n.classList.remove(s),m.delete(n)}),d);m.set(n,o)}else n.classList.remove(s)}},R=document;R.addEventListener("ionGestureCaptured",L),R.addEventListener("touchstart",(function(e){l=(0,i.u)(e),w(e)}),!0),R.addEventListener("touchcancel",h,!0),R.addEventListener("touchend",h,!0),R.addEventListener("pointercancel",L,!0),R.addEventListener("mousedown",(function(e){if(2!==e.button){var t=(0,i.u)(e)-f;l<t&&w(e)}}),!0),R.addEventListener("mouseup",(function(e){var t=(0,i.u)(e)-f;l<t&&E(e)}),!0)},a=function(e){if(!e.composedPath)return e.target.closest(".ion-activatable");for(var t=e.composedPath(),n=0;n<t.length-2;n++){var i=t[n];if(!(i instanceof ShadowRoot)&&i.classList.contains("ion-activatable"))return i}},r=function(e){return e.classList.contains("ion-activatable-instant")},c=function(e){if(e.shadowRoot){var t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},s="ion-activated",u=200,d=200,f=2500}}]);
//# sourceMappingURL=344.ae0aaeda.chunk.js.map