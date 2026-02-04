// public/lucifer/bind-connect-buttons.js
(function(){
  'use strict';

  const BOUND_FLAG = '__luciferBound_v2';

  // candidate global function names to try if present
  const DEFAULT_FN_CANDIDATES = [
    'luciferConnect',
    'connectWallet',
    'onConnectWallet',
    'walletConnect',
    'connect',
  ];

  function hasAncestorMatching(el, selector) {
    let p = el;
    while (p && p !== document) {
      try {
        if (p.matches && p.matches(selector)) return true;
      } catch (e) {
        return false;
      }
      p = p.parentNode;
    }
    return false;
  }

  function callGlobalFunctionByName(fnName) {
    try {
      const fn = fnName.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), window);
      if (typeof fn === 'function') {
        const result = fn();
        if (result && typeof result.catch === 'function') {
          result.catch(err => console.error('[lucifer] ' + fnName + ' rejected:', err));
        }
        return true;
      }
    } catch (err) {
      console.error('[lucifer] error calling function', fnName, err);
    }
    return false;
  }

  // Fallback that dispatches events / postMessage if no global function exists
  function dispatchFallbackConnect() {
    try {
      window.dispatchEvent(new CustomEvent('lucifer:connect', { detail: { source: 'binder' } }));
    } catch (e) {}
    try {
      window.dispatchEvent(new Event('connect-wallet', { bubbles: true }));
    } catch (e) {}
    try {
      const iframe = document.querySelector('iframe[src*="lucifer"], iframe[src*="lc"]');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage({ type: 'LUCIFER_CONNECT', source: 'binder' }, '*');
        } catch (e) {}
      }
    } catch (e) {}
    return true;
  }

  function invokeConnect(el) {
    // if element has explicit function name, try that first
    const explicitFn = el.getAttribute && el.getAttribute('data-lucifer-fn');
    if (explicitFn) {
      if (callGlobalFunctionByName(explicitFn)) return;
      console.warn('[lucifer] data-lucifer-fn="' + explicitFn + '" set but not found on window.');
    }

    // try default candidate functions
    for (const name of DEFAULT_FN_CANDIDATES) {
      if (callGlobalFunctionByName(name)) return;
    }

    // try a direct window.lucifer.connect fallback
    try {
      if (window.lucifer && typeof window.lucifer.connect === 'function') {
        const res = window.lucifer.connect();
        if (res && typeof res.catch === 'function') {
          res.catch(err => console.error('[lucifer] lucifer.connect rejected:', err));
        }
        return;
      }
    } catch (err) {
      console.error('[lucifer] lucifer.connect call failed', err);
    }

    // final fallback: dispatch the event-based trigger so iframe/event-driven injectors can respond
    dispatchFallbackConnect();
  }

  function isConnectText(node) {
    const raw = (node.textContent || '').trim().toLowerCase();
    if (!raw) return false;
    const normalized = raw.replace(/\s+/g, ' ');
    return normalized === 'connect wallet' || normalized === 'connect' || normalized === 'connect-wallet';
  }

  function shouldIgnore(node) {
    const IGNORE_ANCESTOR_SELECTOR = [
      '[data-lucifer-ignore]',
      '[data-lucifer-ignore="true"]',
      '.token-selector',
      '.token-dropdown',
      '.token-list',
      '.token-item',
      '.tw-coin-dropdown'
    ].join(',');
    return hasAncestorMatching(node, IGNORE_ANCESTOR_SELECTOR);
  }

  function bindElement(el) {
    if (!el || el[BOUND_FLAG]) return;
    el.addEventListener('click', function (evt) {
      try {
        invokeConnect(el);
      } catch (err) {
        console.error('[lucifer] error invoking connect', err);
      }
    }, { passive: true });
    try { el[BOUND_FLAG] = true; } catch (e) {}
  }

  function bindButtons(root) {
    if (!root) return;

    // 1) Explicit targets with data-lucifer attribute
    const explicit = Array.from(root.querySelectorAll ? root.querySelectorAll('[data-lucifer]') : []);
    explicit.forEach(el => {
      if (shouldIgnore(el)) return;
      bindElement(el);
    });

    // 2) Fallback: match buttons/anchors by visible text
    const fallbackSelector = 'button, [role="button"], a';
    const candidates = Array.from(root.querySelectorAll ? root.querySelectorAll(fallbackSelector) : []);
    candidates.forEach(node => {
      if (node[BOUND_FLAG]) return;
      if (shouldIgnore(node)) return;
      if (isConnectText(node)) bindElement(node);
    });
  }

  // initial bind
  try { bindButtons(document); } catch (e) { console.error('[lucifer] initial bind failed', e); }

  // observe DOM changes
  try {
    const mo = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          try { bindButtons(node); } catch (e) { console.error('[lucifer] mutation bind error', e); }
        });
      }
    });
    mo.observe(document.body || document.documentElement, { childList: true, subtree: true });
  } catch (e) { console.error('[lucifer] MutationObserver failed to start', e); }

  // expose manual rebind
  try {
    if (!window.__luciferRebind) {
      window.__luciferRebind = function () {
        try { bindButtons(document); console.info('[lucifer] manual rebind complete'); } catch (e) { console.error('[lucifer] manual rebind failed', e); }
      };
    }
  } catch (e) {}
})();
