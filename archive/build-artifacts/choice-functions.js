function checkChoiceRequirements(choice,stats){
if(!choice||!choice.requirements)return{allowed:true,reason:''};
const r=choice.requirements,reasons=[];
if(r.minCb!=null&&stats.cb<r.minCb)reasons.push(`战力不足(需${r.minCb}/当前${stats.cb})`);
if(r.minWl!=null&&stats.wl<r.minWl)reasons.push(`财富不足(需${r.minWl}/当前${stats.wl})`);
if(r.minSp!=null&&stats.sp<r.minSp)reasons.push(`理智不足(需${r.minSp}/当前${stats.sp})`);
return reasons.length?{allowed:false,reason:'🔒 '+reasons.join('，')}:{allowed:true,reason:''};
}

function calcChoiceOutcome(type,stats){
let score=0;const t=stats.traits||[];
const has=x=>t.includes(x);
switch(type){
case'combat':
score=30+stats.cb*0.8+stats.lk*0.1-30;
if(has('战斗能手'))score+=10;
if(has('清劣者'))score+=5;
if(has('理智脆弱'))score-=5;
score=clamp(score,0,95);
break;
case'bribe':
score=20+stats.wl*0.6+stats.lk*0.1;
if(has('天选之人'))score+=10;
score=clamp(score,0,90);
break;
case'social':
score=40+stats.sp*0.3+stats.lk*0.2;
if(has('异常感知者'))score-=5;
if(has('天选之人'))score+=5;
score=clamp(score,0,95);
break;
case'luck':
score=20+stats.lk*1.0;
if(has('天选之人'))score+=15;
if(has('理智脆弱'))score-=5;
score=clamp(score,0,85);
break;
case'explore':
score=50+stats.sp*0.15+stats.lk*0.15;
if(has('异常感知者'))score+=5;
if(has('里界见证者'))score+=5;
score=clamp(score,0,95);
break;
case'normal':
default:
score=70;
if(has('里界见证者'))score-=5;
score=clamp(score,0,95);
break;
}
return{score:Math.round(score*10)/10,success:Math.random()*100<score};
}
