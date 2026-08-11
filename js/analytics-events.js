/**
 * Lightweight GA4 event tracking (complements Enhanced Measurement).
 * Tracks: file downloads (pdf/vcf/apk/zip), outbound link clicks,
 * mailto clicks, and language switches.
 */
(function () {
  'use strict';

  function track(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  }

  document.addEventListener('click', function (e) {
    var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim().slice(0, 100);

    // Mail links
    if (href.indexOf('mailto:') === 0) {
      track('contact_click', { method: 'email', link_text: text });
      return;
    }

    // File downloads (resumes, vCard, etc.)
    if (/\.(pdf|vcf|apk|zip)(\?|#|$)/i.test(href)) {
      track('file_download', {
        file_name: href.split('/').pop().split('?')[0],
        link_text: text,
        page_path: location.pathname
      });
      return;
    }

    // Outbound links (social profiles, external sites)
    if (/^https?:\/\//i.test(href)) {
      var host;
      try { host = new URL(href).hostname; } catch (err) { return; }
      if (host && host !== location.hostname) {
        track('outbound_click', {
          link_domain: host,
          link_url: href,
          link_text: text,
          page_path: location.pathname
        });
      }
    }
  }, true);

  // Language switcher (index page)
  document.addEventListener('click', function (e) {
    var langBtn = e.target && e.target.closest ? e.target.closest('[data-lang], .lang-switch, .language-selector a, .language-selector button') : null;
    if (langBtn) {
      track('language_change', {
        language: langBtn.getAttribute('data-lang') || (langBtn.textContent || '').trim().slice(0, 20)
      });
    }
  }, true);
})();
