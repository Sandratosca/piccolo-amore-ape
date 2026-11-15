(function () {
  'use strict';
  var dictionary = window.PICCOLO_TRANSLATIONS || {};
  var STORAGE_KEY = 'piccolo-amore-language';
  function getStored() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function store(lang) { try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {} }
  function phrase(key, lang) { return dictionary[key] && dictionary[key][lang]; }
  function setLanguage(lang) {
    lang = lang === 'en' ? 'en' : 'de';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = phrase(el.getAttribute('data-i18n'), lang);
      if (typeof value === 'string') el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = phrase(el.getAttribute('data-i18n-alt'), lang);
      if (typeof value === 'string') el.setAttribute('alt', value);
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var value = phrase(el.getAttribute('data-i18n-content'), lang);
      if (typeof value === 'string') el.setAttribute('content', value);
    });
    document.querySelectorAll('[data-lang]').forEach(function (button) {
      var selected = button.getAttribute('data-lang') === lang;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-active', selected);
    });
    var subject = lang === 'de' ? 'Anfrage an piccolo amore' : 'Enquiry for piccolo amore';
    var body = lang === 'de'
      ? 'Hallo piccolo amore,\n\nIch möchte einen Anlass anfragen.\n\nArt des Anlasses: \nDatum: \nOrt: \nUngefähre Gästezahl: \nGewünschte Getränke: \nWeitere Informationen: \n\nFreundliche Grüsse\n'
      : 'Hello piccolo amore,\n\nI would like to enquire about an event.\n\nType of event: \nDate: \nLocation: \nApproximate number of guests: \nPreferred drinks: \nAdditional information: \n\nKind regards\n';
    var url = 'mailto:piccolo.amore.ape@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.querySelectorAll('[data-mailto="request"]').forEach(function (link) { link.href = url; });
    store(lang);
  }
  document.querySelectorAll('[data-lang]').forEach(function (button) {
    button.addEventListener('click', function () { setLanguage(button.getAttribute('data-lang')); });
  });
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  setLanguage(getStored() === 'en' ? 'en' : 'de');
}());
