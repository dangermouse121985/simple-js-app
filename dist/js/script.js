let pokemonRepository=function(){let e=[];function t(){return e}function n(t){var n;let o,i,r=(o=Object.keys(n=t),i=!1,o.forEach(function(e){if("name"!==e&&"type"!==e&&"species"!==e&&"height"!==e)return!1;i=!0}),i);"object"==typeof t&&r?e.push(t):console.log("Pokemon Type is not an object or contains incorrect keys and is invalid")}function o(e){return showLoadingMessage(),fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.other.dream_world.front_default,e.height=t.height,e.types=t.types;let n="";e.types.forEach(function(e){n=`${n} ${e.type.name}`}),setTimeout(function(){hideLoadingMessage()},500)}).catch(function(e){console.error(e),setTimeout(function(){hideLoadingMessage()},500)})}return{getAll:t,add:n,loadList:function e(){return showLoadingMessage(),fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){let t={name:e.name,detailsUrl:e.url};return n(t),fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){t.imageUrl=e.sprites.other.dream_world.front_default,t.types=e.types;let n="";t.types.forEach(function(e){n=`${n} ${e.type.name} `}),t.typesStr=n,console.log(n),setTimeout(function(){hideLoadingMessage()},500)}).catch(function(e){console.error(e)})})}).catch(function(e){console.error(e),setTimeout(function(){hideLoadingMessage()},500)})},loadDetails:o,addListItem:function e(t){var n;let i=document.querySelector(".pokemon-list"),r=document.createElement("li");r.classList.add("list__item");let a=document.createElement("button");a.classList.add("pokemon-tile","btn","btn-primary"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#pokemonModal");let l=document.createElement("div");l.innerText=t.name;let s=document.createElement("img");s.classList.add("pokemon-list--image"),(n=t,fetch(n.detailsUrl).then(function(e){return e.json()}).then(function(e){n.imageUrl=e.sprites.other.dream_world.front_default}).catch(function(e){console.error(e)})).then(function(){s.src=t.imageUrl,s.alt=`Thumbnail image of ${t.name}`}),function e(t,n){t.addEventListener("click",function(){var e;let t,i,r,a,l,s,c;e=n,t=document.querySelector(".modal-body"),i=document.querySelector(".modal-title"),i.innerHTML="",t.innerHTML="",i.classList.add("pokemon-title--modal"),r=document.createElement("img"),r.classList.add("pokemon-image"),a=document.createElement("h2"),a.classList.add("height-title"),l=document.createElement("p"),s=document.createElement("h2"),s.classList.add("types-title"),c=document.createElement("ul"),c.classList.add("list-group"),o(e).then(function(){i.innerText=e.name,r.src=e.imageUrl,r.alt=`Image of ${e.name}`,a.innerText="Height",e.height<=1?l.innerText=`${e.height} Decimeter`:l.innerText=`${e.height} Decimeters`,s.innerText="Types",e.types.forEach(function(e){let t=document.createElement("li");t.classList.add("list-group-item"),t.innerText=e.type.name,c.appendChild(t),console.log(`Pokemon Types: ${e.type.name}`)}),t.appendChild(r),t.appendChild(a),t.appendChild(l),t.appendChild(s),t.appendChild(c)})})}(a,t),a.appendChild(l),a.appendChild(s),r.appendChild(a),i.appendChild(r)}}}();function printArrayDetails(e){document.querySelector(".pokemon-list").innerHTML="",e.forEach(function(e){pokemonRepository.addListItem(e)})}function filterPokemonList(e,t){if(""===e)showLoadingMessage(),setTimeout(()=>{hideLoadingMessage()},500),printArrayDetails(pokemonRepository.getAll());else{let n=pokemonRepository.getAll().filter(function(n){let o="";"name"===t&&(o=n.name.toLowerCase()),"pokemonType"===t&&(o=n.typesStr.toLowerCase());let i=e.toLowerCase();return o.includes(i)});if(0===n.length){let o=document.querySelector(".pokemon-list");o.innerHTML="";let i=document.createElement("li");i.classList.add("list__item","no-results"),i.innerText="No Search Results Found",o.appendChild(i)}else printArrayDetails(n)}}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});let searchButton=document.querySelector(".filter");searchButton.addEventListener("click",function(){filterPokemonList(document.querySelector(".search-term").value,"name")});let clearButton=document.querySelector(".clear-filter");clearButton.addEventListener("click",function(){filterPokemonList("")});let typeDropdown=document.getElementById("pokemon-type__dropdown"),pokemonTypes=["Normal","Fire","Water","Grass","Electric","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Steel","Fairy",],dropdownToggle=document.querySelector(".dropdown-toggle");function showLoadingMessage(){document.querySelector(".waiting-screen").classList.add("is-visible")}function hideLoadingMessage(){document.querySelector(".waiting-screen").classList.remove("is-visible")}dropdownToggle.addEventListener("click",function(){let e=dropdownToggle.offsetWidth;document.querySelector("#pokemon-type__dropdown").setAttribute("style",`width: ${e}px`)}),pokemonTypes.forEach(function(e){let t=document.createElement("a");t.classList.add("dropdown-item",e),t.setAttribute("href","#"),t.innerText=e,t.addEventListener("click",function(){filterPokemonList(e,"pokemonType");let t=document.querySelector(`.${e}`),n=document.querySelector(".dropdown-item__active");n&&n.classList.remove("dropdown-item__active"),t.classList.add("dropdown-item__active")}),typeDropdown.appendChild(t)});