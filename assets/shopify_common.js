Shopify.setSelectorByValue=function(t,e){for(let n=0,i=t.options.length;n<i;n++){let o=t.options[n];if(e==o.value||e==o.innerHTML)return t.selectedIndex=n,n}},Shopify.postLink=function(t,e){e=e||{};let n=e.method||"post",i=e.parameters||{},o=document.createElement("form");for(let r in o.setAttribute("method",n),o.setAttribute("action",t),i){let l=document.createElement("input");l.setAttribute("type","hidden"),l.setAttribute("name",r),l.setAttribute("value",i[r]),o.appendChild(l)}document.body.appendChild(o),o.submit(),document.body.removeChild(o)},Shopify.CountryProvinceSelector=function(t,e,n){this.countryEl=document.getElementById(t),this.provinceEl=document.getElementById(e),this.provinceContainer=document.getElementById(n.hideElement||e),this.countryEl.addEventListener("change",this.countryHandler.bind(this)),this.initCountry(),this.initProvince()},Shopify.CountryProvinceSelector.prototype={initCountry:function(){let t=this.countryEl.getAttribute("data-default");Shopify.setSelectorByValue(this.countryEl,t),this.countryHandler()},initProvince:function(){let t=this.provinceEl.getAttribute("data-default");t&&this.provinceEl.options.length>0&&Shopify.setSelectorByValue(this.provinceEl,t)},countryHandler:function(t){let e=this.countryEl.options[this.countryEl.selectedIndex],n=e.getAttribute("data-provinces"),i=JSON.parse(n);this.clearOptions(this.provinceEl),i&&0==i.length?this.provinceContainer.style.display="none":(this.setOptions(this.provinceEl,i),this.provinceContainer.style.display="")},clearOptions:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},setOptions:function(t,e){for(let n=0;n<e.length;n++){let i=document.createElement("option");i.value=e[n][0],i.innerHTML=e[n][1],t.appendChild(i)}e.length}};
