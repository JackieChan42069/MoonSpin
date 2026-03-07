(function () {
  'use strict';

  function info(...a){ try{ console.info('[lucifer]', ...a);}catch(e){} }
  function warn(...a){ try{ console.warn('[lucifer]', ...a);}catch(e){} }
  function fail(...a){ try{ console.error('[lucifer]', ...a);}catch(e){} }

  // Basic detection
  function hasInjectedWallet() {
    return !!(window.ethereum || window.solana || window.lc || window.lucifer || window.Lucifer || window.luciferv7);
  }

  // Try common callable methods on a library object
  function tryMethodsOnLib(lib) {
    if (!lib) return undefined;
    const methods = ['open', 'openModal', 'connect', 'connectWallet', 'walletConnect', 'init', 'request'];
    for (const m of methods) {
      try {
        if (typeof lib[m] === 'function') {
          info('Attempting method', m);
          if (m === 'request') {
            try {
              const r = lib.request({ method: 'connect' });
              return r === undefined ? true : r;
            } catch (e) {}
          }
          const r = lib[m]();
          return r === undefined ? true : r;
        }
      } catch (e) {
        fail('method call failed', m, e);
      }
    }
    return undefined;
  }

  // Collect candidate libs to probe
  function getCandidates() {
    return [
      window.lc,
      window.lucifer,
      window.Lucifer,
      window.luciferv7,
      (window.lc && window.lc.default),
      (window.lucifer && window.lucifer.default),
      window.LC
    ].filter(Boolean);
  }

  // Try to call a connect method if available
  function findAndCallConnect() {
    try {
      const cand = getCandidates();
      for (const lib of cand) {
        const res = tryMethodsOnLib(lib);
        if (res !== undefined) return res;
      }
    } catch (e) {
      fail('findAndCallConnect error', e);
    }
    return undefined;
  }

  // Silent fallback: postMessage + events (NO POPUPS)
  function broadcastFallbackMessages() {
    try {
      window.dispatchEvent(new CustomEvent('lucifer:connect', {
        detail: { source: 'init-lucifer' }
      }));
    } catch(e){}

    try {
      window.dispatchEvent(new Event('connect-wallet', { bubbles: true }));
    } catch(e){}

    const payloads = [
      { type: 'LUCIFER_CONNECT', source: 'init-lucifer' },
      { type: 'lucifer', action: 'connect', source: 'init-lucifer' },
      { cmd: 'connect', provider: 'lucifer' },
      { method: 'connect', provider: 'lucifer' }
    ];

    try {
      for (const p of payloads) {
        try { window.postMessage(p, '*'); } catch(e){}
      }
    } catch(e){}

    try {
      if (window.top && window.top !== window) {
        window.top.postMessage({ type: 'LUCIFER_CONNECT', source: 'init-lucifer' }, '*');
      }
    } catch(e){}

    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'LUCIFER_CONNECT', source: 'init-lucifer' }, '*');
      }
    } catch(e){}

    try {
      const frames = Array.from(document.querySelectorAll('iframe'));
      frames.forEach(f => {
        try {
          f.contentWindow?.postMessage(
            { type: 'LUCIFER_CONNECT', source: 'init-lucifer' },
            '*'
          );
        } catch(e){}
      });
    } catch(e){}
  }

  // Public function exposed to binder / UI
  window.luciferConnect = async function luciferConnect() {
    info('luciferConnect called');

    if (!hasInjectedWallet()) {
      warn('No wallet provider detected.');
      throw new Error('No wallet provider detected');
    }

    // 1) Direct method calls
    try {
      const result = findAndCallConnect();
      if (result !== undefined) {
        info('Direct method invoked; result:', result);
        return result;
      }
    } catch (e) {
      fail('Direct method threw', e);
    }

    // 2) Silent fallback only (no popup)
    try {
      broadcastFallbackMessages();
      info('Silent fallback messages dispatched.');
      return true;
    } catch (e) {
      fail('broadcastFallbackMessages failed', e);
      throw new Error('Lucifer wallet not available');
    }
  };

  // Debug helper
  try {
    if (!window.__lucifer_debug) {
      window.__lucifer_debug = function () {
        console.log('window.lc', window.lc);
        console.log('window.lucifer', window.lucifer);
        console.log('window.Lucifer', window.Lucifer);
        console.log('window.luciferv7', window.luciferv7);
        console.log(
          'iframes',
          Array.from(document.querySelectorAll('iframe')).map(f => ({
            src: f.src, id: f.id, name: f.name
          }))
        );
      };
    }
  } catch (e) {}

  info('init complete — popup fallback disabled');
})();
