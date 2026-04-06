// ===== 粒子背景系统 =====
(function(){
  // --- 注入 Canvas ---
  var cv=document.createElement('canvas');
  cv.id='particles';
  cv.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0';
  document.body.appendChild(cv);

  // --- 注入 CSS ---
  var s=document.createElement('style');
  s.textContent='body{position:relative;overflow-x:hidden}#particles{z-index:0}.screen{position:relative;z-index:1}';
  document.head.appendChild(s);

  // --- 粒子系统 ---
  var c=cv.getContext('2d');
  var W,H,particles=[];
  var COUNT=60;
  var COLORS=['#7b2ff2','#e74c6f','#ffffff','#a855f7','#f472b6','#c084fc'];

  function resize(){
    W=cv.width=cv.offsetWidth;
    H=cv.height=cv.offsetHeight;
  }

  function Particle(){
    this.x=Math.random()*W;
    this.y=Math.random()*H;
    this.r=2+Math.random()*2;
    this.color=COLORS[Math.floor(Math.random()*COLORS.length)];
    this.speed=0.15+Math.random()*0.3;
    this.wobbleAmp=0.3+Math.random()*0.5;
    this.wobbleSpeed=0.005+Math.random()*0.015;
    this.wobbleOff=Math.random()*Math.PI*2;
    this.pulseSpeed=0.003+Math.random()*0.008;
    this.pulseOff=Math.random()*Math.PI*2;
    this.minOp=0.1;
    this.maxOp=0.4;
  }

  Particle.prototype.update=function(t){
    this.y-=this.speed;
    this.x+=Math.sin(t*this.wobbleSpeed+this.wobbleOff)*this.wobbleAmp;
    if(this.y<-this.r){this.y=H+this.r;this.x=Math.random()*W;}
    if(this.x<-this.r)this.x=W+this.r;
    if(this.x>W+this.r)this.x=-this.r;
    var p=this.minOp+(Math.sin(t*this.pulseSpeed+this.pulseOff)+1)/2*(this.maxOp-this.minOp);
    this.opacity=p;
  };

  Particle.prototype.draw=function(){
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,Math.PI*2);
    c.fillStyle=this.color;
    c.globalAlpha=this.opacity;
    c.fill();
    c.globalAlpha=1;
  };

  function init(){
    resize();
    particles=[];
    for(var i=0;i<COUNT;i++)particles.push(new Particle());
  }

  var t=0;
  function loop(){
    t++;
    c.clearRect(0,0,W,H);
    for(var i=0;i<particles.length;i++){
      particles[i].update(t);
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize',resize);
  document.addEventListener('DOMContentLoaded',function(){
    init();
    loop();
  });

  // 如果 DOM 已经就绪（脚本延迟加载的情况）
  if(document.readyState!=='loading'){init();loop();}
})();
