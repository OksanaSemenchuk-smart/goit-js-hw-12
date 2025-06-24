import{a as u,S as d,i as s}from"./assets/vendor-67BWzQEt.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const f="https://pixabay.com/api/",m="51015226-beaf55d01e034eca2e3702ad7";function p(i){const o={key:m,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};return u.get(f,{params:o}).then(e=>e.data)}const c=document.querySelector(".gallery"),h=new d(".gallery a",{captionsData:"alt",captionDelay:250});function y(i){const o=i.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <h4>Likes</h4>
          <p>${e.likes}</p>
        </div>
        <div class="info-item">
          <h4>Views</h4>
          <p>${e.views}</p>
        </div>
        <div class="info-item">
          <h4>Comments</h4>
          <p>${e.comments}</p>
        </div>
        <div class="info-item">
          <h4>Downloads</h4>
          <p>${e.downloads}</p>
        </div>
      </div>
    </li>
    `).join("");c.insertAdjacentHTML("beforeend",o),h.refresh()}function g(){c.innerHTML=""}function v(){document.querySelector(".loader").classList.add("visible")}function L(){setTimeout(()=>{document.querySelector(".loader").classList.remove("visible")},700)}const l=document.querySelector(".form"),b=l.elements["search-text"];l.addEventListener("submit",function(i){i.preventDefault();const o=b.value.trim();if(o===""){s.warning({message:"Please enter a search term!",position:"topRight"});return}g(),v(),p(o).then(e=>{if(e.hits.length===0){s.info({message:"Sorry, no images found. Please try again!",position:"center"});return}y(e.hits)}).catch(e=>{s.error({message:"Oops! Something went wrong. Please try again later.",position:"center"}),console.error("Помилка під час запиту:",e)}).finally(()=>{L()})});
//# sourceMappingURL=index.js.map
