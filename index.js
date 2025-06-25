import{a as b,S,i as a}from"./assets/vendor-DqB7j7Ix.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const q="https://pixabay.com/api/",B="51015226-beaf55d01e034eca2e3702ad7";async function m(n,t){const o={key:B,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await b.get(q,{params:o})).data}const p=document.querySelector(".gallery"),h=document.querySelector(".loader"),y=document.querySelector(".load-more"),$=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(n){const t=n.map(o=>`
    <li class="gallery-item">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" />
      </a>
      <div class="info">
        <div class="info-item">
          <h4>Likes</h4>
          <p>${o.likes}</p>
        </div>
        <div class="info-item">
          <h4>Views</h4>
          <p>${o.views}</p>
        </div>
        <div class="info-item">
          <h4>Comments</h4>
          <p>${o.comments}</p>
        </div>
        <div class="info-item">
          <h4>Downloads</h4>
          <p>${o.downloads}</p>
        </div>
      </div>
    </li>
  `).join("");p.insertAdjacentHTML("beforeend",t),$.refresh()}function M(){p.innerHTML=""}function v(){h.classList.add("visible")}function c(){setTimeout(()=>h.classList.remove("visible"),700)}function L(){y.style.display="block"}function l(){y.style.display="none"}const w=document.querySelector(".form"),O=w.elements["search-text"],P=document.querySelector(".load-more");let s="",i=1,f=0;w.addEventListener("submit",async function(n){if(n.preventDefault(),s=O.value.trim(),s!==""){i=1,M(),l(),v();try{const t=await m(s,i);if(f=t.totalHits,c(),t.hits.length===0){a.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}g(t.hits),f>i*15?L():l()}catch{c(),a.error({message:"Something went wrong. Try again later.",position:"center"})}}});P.addEventListener("click",async function(){i+=1,l(),v();try{const n=await m(s,i);g(n.hits),c();const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),i*15>=f?(l(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"})):L()}catch{c(),a.error({message:"Something went wrong. Try again later.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
