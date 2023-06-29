(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["kailo-landing-products-3"]) return;
  try {
    
$('.inline-popup').magnificPopup({
  type:'inline',
  midClick: true
});

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["kailo-landing-products-4"]) return;
  try {
    
$('.inline-popup').magnificPopup({
  type:'inline',
  midClick: true
});

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["kailo-landing-products"]) return;
  try {
    
$('.inline-popup').magnificPopup({
  type:'inline',
  midClick: true
});

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["product-template"]) return;
  try {
    
$('.inline-popup').magnificPopup({
  type:'inline',
  midClick: true
});

  } catch(e) { console.error(e); }
})();

})();