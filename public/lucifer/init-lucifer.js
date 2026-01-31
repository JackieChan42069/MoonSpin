(function(){
  function findAndCallConnect(){
    const candidates = [
      window.lucifer, window.Lucifer, window.lc, window.LC, window.luciferv7,
      window['lucifer'], window['Lucifer'], window['luciferv7'], window.default
    ];
    const methods = ['connect','connectWallet','walletConnect','open','init','connectWalletConnect'];
    for(const lib of candidates){
      if(!lib) continue;
      for(const m of methods){
        try{
          if(typeof lib[m] === 'function'){
            return lib[m]();
          }
        }catch(e){
          console.error('lucifer wrapper call error', e);
        }
      }
    }
    for(const name of ['luciferConnect','lucifer','connectLucifer']){
      if(typeof window[name] === 'function'){
        try { return window[name](); } catch(e){ console.error(e); }
      }
    }
    console.warn('lucifer: no connect method found. Library loaded?');
  }
  window.luciferConnect = function(){
    return new Promise((resolve, reject)=>{
      try{
        const r = findAndCallConnect();
        resolve(r);
      }catch(e){
        reject(e);
      }
    });
  };
})();