const e=document.querySelector('[name="delay"]'),t=document.querySelector('[name="step"]'),o=document.querySelector('[name="amount"]');function n(e,t){const o=Math.random()>.3;return new Promise(o?(o,n)=>setInterval((()=>o({position:e,delay:t})),t):(o,n)=>setInterval((()=>n({position:e,delay:t})),t))}document.querySelector('[class="form"]').addEventListener("submit",(l=>{l.preventDefault();const{value:r}=e,{value:s}=t,{value:a}=o;let u=Number(r);for(let e=0;e<a;e++)setTimeout((()=>{n(e+1,u).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)})),u+=Number(s)}),u)}));
//# sourceMappingURL=03-promises.e8af05a4.js.map