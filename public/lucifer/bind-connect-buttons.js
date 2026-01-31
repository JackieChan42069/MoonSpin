(function(){
  function bindButtons(root){
    if(!root) return;
    const buttons = root.querySelectorAll ? root.querySelectorAll('button') : [];
    buttons.forEach(btn=>{
      if(btn.__luciferBound) return;
      const text = (btn.textContent || '').trim().toLowerCase();
      if(text === 'connect wallet'){
        btn.addEventListener('click', function(e){
          try{
            if(typeof window.luciferConnect === 'function'){
              window.luciferConnect().catch(function(err){ console.error('luciferConnect error', err); });
            } else {
              console.warn('luciferConnect function not found on window');
            }
          }catch(err){
            console.error('lucifer binding error', err);
          }
        });
        btn.__luciferBound = true;
      }
    });
  }
  bindButtons(document);
  const mo = new MutationObserver((mutations)=>{
    for(const m of mutations){
      m.addedNodes.forEach(node=>{
        if(node.nodeType === 1){
          bindButtons(node);
        }
      });
    }
  });
  mo.observe(document.body || document.documentElement, { childList: true, subtree: true });
})();