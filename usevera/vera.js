/* A Vera na vitrine: a esfera e os cartões que explicam, como na chegada do app
   (design aprovado em 01/10/2026). A vitrine só mostra o que já existe no app:
   o cartão do e-mail e a bolha da Vera que conversa ficam de fora até existirem. */
(function(){
'use strict';
var REDUZ=function(){return matchMedia('(prefers-reduced-motion: reduce)').matches};
if(REDUZ())document.documentElement.classList.add('reduz');
var NB=' ';
function brl(n){return 'R$'+NB+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
var IC={
 ok:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 ok14:['<path d="M5 12.5l4.5 4.5L19 7.5"/>',14,3],
 pausa:['<path d="M9 6v12M15 6v12"/>',18,2.6],
 toca:['<path d="M8 5.5v13l11-6.5z"/>',18,2.2],
 barrado:['<path d="M5 6v12M8 6v12M11 6v12M14 6v12M17 6v12M19 6v12"/><path d="M3 20L21 4" stroke-width="2.6"/>',22,1.6],
 casa:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
 caixa:'<path d="M4 8l8-4 8 4v9l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v9"/>'
};
function sv(p,s,w){s=s||20;w=w||2;return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}
function ic(k,s,w){var d=IC[k];return Array.isArray(d)?sv(d[0],d[1],d[2]):sv(d,s,w)}

/* a esfera da Vera */
var ESF=(function(){var n=34,p=[],g=Math.PI*(3-Math.sqrt(5));for(var i=0;i<n;i++){var y=1-(i/(n-1))*2,r=Math.sqrt(1-y*y),t=g*i;p.push([Math.cos(t)*r,y,Math.sin(t)*r])}return p})();
function esfera(t,mini){var ang=t*2*Math.PI/16,inc=20*Math.PI/180;var R=11.5*(.94+.06*Math.sin(t*2*Math.PI/2.4));
 return ESF.map(function(q){var x=q[0],y=q[1],z=q[2];var x1=x*Math.cos(ang)+z*Math.sin(ang),z1=-x*Math.sin(ang)+z*Math.cos(ang);var y2=y*Math.cos(inc)-z1*Math.sin(inc),z2=y*Math.sin(inc)+z1*Math.cos(inc);return [20+x1*R,20+y2*R,z2]})
  .sort(function(a,b){return a[2]-b[2]}).map(function(q){var z=q[2];return '<circle cx="'+q[0].toFixed(2)+'" cy="'+q[1].toFixed(2)+'" r="'+((mini?1.35:1.05)+.75*(z+1)/2).toFixed(2)+'" fill="currentColor" opacity="'+(.55+.45*(z+1)/2).toFixed(2)+'"/>'}).join('')}
var sinais=[].slice.call(document.querySelectorAll('[data-sinal]'));
if(sinais.length){(function relogio(){var t=performance.now()/1000*(REDUZ()?.5:1);sinais.forEach(function(s){if(s.getClientRects().length)s.innerHTML=esfera(t,'mini' in s.dataset)});requestAnimationFrame(relogio)})()}

/* o céu amanhece quando o bloco aparece */
document.querySelectorAll('.vera').forEach(function(v){v.classList.add('amanhece')});

/* os cartões que explicam */
var deck=document.getElementById('deck');
if(deck){
 var dots=document.getElementById('dots'),pausaB=document.getElementById('pausa');
 var sel='<span class="selo">'+ic('ok14')+'</span>';
 var CENAS=[
 {t:'Do boleto à conta, numa foto.',a:'Do boleto à conta, numa foto. Exemplo: Distribuidora Aurora, R$ 3.500,00, vence dia 20.',
  h:'<div class="cena c1"><div class="papel"><b style="top:10px;width:34px"></b><b style="top:20px;width:52px"></b><b style="top:34px;width:28px;background:#0F766E;opacity:.55"></b><b style="top:44px;width:44px"></b><b style="top:54px;width:30px;background:#C44B0A;opacity:.55"></b><i class="cb"></i><i class="scan"></i></div>'+
   '<div class="lnS"><div class="tile" style="background-color:#0F766E">'+ic('caixa',22)+'</div><div class="lnTx"><div class="lnN">Distribuidora Aurora</div><div class="lnQ2"><span class="lnQ">vence dia 20</span><span class="lnV">R$'+NB+'3.500,00</span></div></div>'+sel+'</div></div>',
  tl:[[150,'e1'],[900,'e2'],[2600,'e3'],[3200,'e4']],d:6800},
 {t:'Boleto estranho? A Vera avisa.',a:'Boleto estranho? A Vera avisa. Exemplo: o boleto veio de um banco diferente do de sempre, e aparece o alerta de possível fraude.',
  h:'<div class="cena c2"><div class="papel pA"><div><span class="k">Aurora</span><span class="ok">✓</span></div><div><span class="k">Banco Ipê</span><span class="ok">✓</span></div><div><span class="k">R$ 3.500</span><span class="ok">✓</span></div></div>'+
   '<div class="papel pB"><div><span class="k">Aurora</span><span class="ok">✓</span></div><div class="troca"><span class="k">Banco Sol</span><span class="ok">✓</span></div><div><span class="k">R$ 3.500</span><span class="ok">✓</span></div></div>'+
   '<span class="rot rA">De sempre</span><span class="rot rB">Este</span>'+
   '<div class="lnS"><div class="barrado">'+ic('barrado')+'</div><div class="lnTx"><div class="lnN" style="white-space:normal">Alerta de possível fraude!</div><div class="lnQ">Dados diferentes do habitual</div></div></div></div>',
  tl:[[150,'e1'],[1200,'e2'],[2300,'e3'],[3700,'e4']],d:7400},
 {t:'Tudo o que vence, num lugar só.',a:'Tudo o que vence, num lugar só. Exemplo: ao tocar em Paguei, a conta sai da lista e o total do mês diminui.',
  h:'<div class="cena c4"><div class="tot"><span>Este mês</span><b class="totV">R$'+NB+'6.300,00</b></div>'+
   '<div class="lnS r1"><div class="tile p" style="background-color:#6D5BD0">'+ic('casa',20)+'</div><div class="lnTx"><div class="lnN">Imobiliária Ipê</div><div class="lnQ">R$'+NB+'2.800,00</div></div><span class="pag">'+sv(IC.ok,16,2.8)+'<span class="pt">Paguei</span></span></div>'+
   '<div class="lnS r2"><div class="tile p" style="background-color:#0F766E">'+ic('caixa',20)+'</div><div class="lnTx"><div class="lnN">Gráfica Ponto</div><div class="lnQ">R$'+NB+'3.500,00</div></div><span class="pag">'+sv(IC.ok,16,2.8)+'<span class="pt">Paguei</span></span></div></div>',
  tl:[[150,'e1'],[1700,'e2'],[2400,'e3']],d:6600,hook:function(e,c){if(e==='e3')rola(c.querySelector('.totV'),6300,3500,800)},reset:function(c){c.querySelector('.totV').textContent=brl(6300)}},
 {t:'Quanto falta vender, na hora.',a:'Quanto falta vender, na hora. Exemplo: com R$ 1.640,00 no caixa, faltam R$ 210,00 para a meta do dia.',
  h:'<div class="cena c5"><span class="k">Caixa de hoje</span><span class="v">R$'+NB+'0,00</span><div class="barraM"><i></i></div><div class="fx2"><span>Quanto falta vender</span><b>R$'+NB+'210,00</b></div></div>',
  tl:[[300,'e1'],[2000,'e2']],d:6400,hook:function(e,c){if(e==='e1')rola(c.querySelector('.v'),0,1640,1400)},reset:function(c){c.querySelector('.v').textContent=brl(0)}},
 {t:'Compromissos e tarefas, juntos.',a:'Compromissos e tarefas, juntos. Exemplo: na quinta, a visita das 10:00 e a tarefa de pagar o aluguel, marcada como feita.',
  h:'<div class="cena c6"><div class="sem">'+[['S',28],['T',29],['Q',30],['Q',1],['S',2],['S',3],['D',4]].map(function(d,i){return '<div'+(i===3?' class="hj"':'')+'>'+d[0]+'<b>'+d[1]+'</b></div>'}).join('')+'</div>'+
   '<div class="ev e"><span class="h">10:00</span><span>Visita da Célia</span></div>'+
   '<div class="ev t"><span class="circ">'+sv(IC.ok,12,3.2)+'</span><span class="tx">Pagar o aluguel</span></div></div>',
  tl:[[150,'e1'],[1100,'e2'],[2000,'e3'],[3300,'e4']],d:7000},
 {t:'Anote em lista, passos ou foto.',a:'Anote em lista, passos ou foto. Exemplo: a anotação Pedido de sábado, com uma lista e uma foto.',
  h:'<div class="cena c7"><div class="pg"><div class="tt"></div>'+
   '<div class="it it1"><span class="circ">'+sv(IC.ok,11,3.4)+'</span><span>Bolo de cenoura</span></div>'+
   '<div class="it it2"><span class="circ">'+sv(IC.ok,11,3.4)+'</span><span>Velas</span></div></div><div class="foto"></div></div>',
  tl:[[200,'e1'],[1800,'e2'],[2800,'e3'],[3600,'e4']],d:7000,
  hook:function(e,c){if(e!=='e1')return;var el=c.querySelector('.tt'),s='Pedido de sábado';if(REDUZ()){el.textContent=s;return}var i=0;(function d(){el.innerHTML=s.slice(0,i)+'<i></i>';if(i++<s.length)c._ty=setTimeout(d,60)})()},
  reset:function(c){clearTimeout(c._ty);c.querySelector('.tt').innerHTML=''}}
 ];
 function rola(el,de,para,D){if(!el)return;var DD=REDUZ()?D*1.5:D,t0=performance.now();(function q(){var k=Math.min(1,(performance.now()-t0)/DD),e=1-Math.pow(1-k,3);el.textContent=brl(de+(para-de)*e);if(k<1)requestAnimationFrame(q)})()}
 var DI=0,TM=[],PAUSA=false,VISIVEL=true,cards=[];
 deck.innerHTML=CENAS.map(function(c,i){return '<div class="cartaoP espera" data-i="'+i+'" role="img" aria-label="'+c.a+'"><div class="pvTopo">'+c.t+'</div>'+c.h+'</div>'}).join('');
 dots.innerHTML=CENAS.map(function(){return '<i></i>'}).join('');
 cards=[].slice.call(deck.children);
 function mede(){var h=0;cards.forEach(function(c){h=Math.max(h,c.offsetHeight)});deck.style.height=h+'px'}
 function marca(){[].forEach.call(dots.children,function(d,i){d.classList.toggle('on',i===DI)})}
 function posiciona(){var N=cards.length;cards.forEach(function(c,i){c.classList.remove('frente','atras','espera','sai');c.style.transform='';c.classList.add(i===DI?'frente':i===(DI+1)%N?'atras':'espera')});marca()}
 function limpa(){TM.forEach(clearTimeout);TM=[]}
 function zera(c){c.classList.remove('e1','e2','e3','e4');var s=CENAS[+c.dataset.i];if(s.reset)s.reset(c)}
 function toca(){limpa();var c=cards[DI],s=CENAS[DI];zera(c);void c.offsetWidth;var k=REDUZ()?1.45:1;
  s.tl.forEach(function(p){TM.push(setTimeout(function(){c.classList.add(p[1]);if(s.hook)s.hook(p[1],c)},p[0]*k))});
  if(!PAUSA&&VISIVEL)TM.push(setTimeout(proximo,s.d*k))}
 function proximo(){limpa();var N=cards.length,c=cards[DI];c.classList.remove('frente','arrasta');c.style.transform='';c.classList.add('sai');
  DI=(DI+1)%N;var n=cards[DI];n.classList.remove('atras','espera');n.classList.add('frente');var a=cards[(DI+1)%N];if(a!==c){a.classList.remove('espera');a.classList.add('atras')}
  marca();
  setTimeout(function(){c.classList.remove('sai');zera(c);if(!c.classList.contains('frente')&&!c.classList.contains('atras'))c.classList.add('espera')},REDUZ()?1300:600);
  TM.push(setTimeout(toca,REDUZ()?700:380))}
 function pintaPausa(){pausaB.innerHTML=ic(PAUSA?'toca':'pausa');pausaB.setAttribute('aria-label',PAUSA?'Continuar os exemplos':'Pausar os exemplos')}
 pausaB.addEventListener('click',function(){PAUSA=!PAUSA;pintaPausa();limpa();if(!PAUSA)toca()});
 /* puxar para a esquerda passa para o próximo; para a direita, o cartão volta ao lugar */
 (function(){var x0=null,dx=0,c=null;
  deck.addEventListener('pointerdown',function(e){c=cards[DI];x0=e.clientX;dx=0;c.classList.add('arrasta');deck.setPointerCapture(e.pointerId)});
  deck.addEventListener('pointermove',function(e){if(x0===null)return;dx=e.clientX-x0;var d=dx>0?dx*.3:dx;if(!REDUZ())c.style.transform='translateX('+d+'px) rotate('+(d/24)+'deg)'});
  function fim(){if(x0===null)return;x0=null;c.classList.remove('arrasta');if(dx<-60)proximo();else c.style.transform=''}
  deck.addEventListener('pointerup',fim);deck.addEventListener('pointercancel',fim)})();
 /* fora da tela, os filmes param (economia de bateria) */
 if('IntersectionObserver' in window){new IntersectionObserver(function(en){en.forEach(function(e){var era=VISIVEL;VISIVEL=e.isIntersecting;if(VISIVEL&&!era&&!PAUSA)toca();if(!VISIVEL)limpa()})},{threshold:.15}).observe(deck)}
 pintaPausa();mede();posiciona();toca();
 window.addEventListener('resize',mede);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(mede);
}

/* a entrada dos blocos, como na página inicial */
var els=document.querySelectorAll('.rv');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.04});
var i=0;els.forEach(function(e){e.style.transitionDelay=(Math.min(i++,5)*70)+'ms';io.observe(e)});
})();
