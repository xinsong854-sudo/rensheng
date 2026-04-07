// 捏 Ta 调试助手 - 自动注入 Eruda
(function() {
  'use strict';
  
  console.log('🐞 [捏 Ta 调试助手] 已激活');
  
  // 检查是否已经注入过
  if (window.erudaInjected) {
    console.log('[捏 Ta 调试助手] 已注入，跳过');
    return;
  }
  window.erudaInjected = true;
  
  // 加载 Eruda
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/eruda';
  script.onload = function() {
    console.log('[捏 Ta 调试助手] Eruda 加载成功');
    
    // 延迟初始化，确保页面完全加载
    setTimeout(function() {
      if (typeof eruda !== 'undefined') {
        eruda.init({
          defaults: {
            displaySize: 50,
            transparency: 0.9,
            theme: 'Dark'
          }
        });
        eruda.show();
        console.log('🔧 [捏 Ta 调试助手] 调试工具已就绪！');
        console.log('💡 点击右下角的 🐞 按钮打开控制台');
      }
    }, 800);
  };
  
  script.onerror = function() {
    console.error('[捏 Ta 调试助手] Eruda 加载失败');
  };
  
  document.head.appendChild(script);
})();
