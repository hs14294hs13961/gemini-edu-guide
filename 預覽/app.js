// 全站搜尋索引——新增內容時在這裡加一筆
const SEARCH_INDEX = [
  {kind:"教材", title:"PARTS 提示詞架構", desc:"五個要素寫出精準指令", href:"parts.html"},
  {kind:"任務", title:"用 PARTS 寫出第一個教案提示詞", desc:"把「幫我寫教案」升級成精準指令", href:"parts-task.html"},
  {kind:"工具", title:"研習提示詞庫", desc:"備課、簡報、測驗情境提示詞（GAS）", href:"https://script.google.com/macros/s/AKfycbxONvJkGInuIZo-evVJ6EIqAE7yJBgRfthjE7iU5bknE0dM3S4EpFBmguyh3S_U2f6Fcw/exec", ext:true},
  {kind:"工具", title:"十二年課綱課程計畫資料庫", desc:"總綱、領綱、議題融入一鍵複製（GAS）", href:"https://script.google.com/macros/s/AKfycbzqNkdEh7xv7PGkXEnulS9CpApb0oMkMu74x1s3Z9iHtDIxuBKk-XqoFZ8Un1jzeXzDqg/exec", ext:true},
  {kind:"工具", title:"薇糖紹冰的教學日誌", desc:"作品總入口（GAS）", href:"https://script.google.com/macros/s/AKfycbxEK3hZwPVPvRgPgf1a5Vl6BGB6bNu5sJTn0GPNwaTA8EYTmkVtbaHwEHkEW-RRqVwx/exec", ext:true},
  {kind:"工具", title:"PARTS 提示詞機器人", desc:"三步驟產出結構化提示詞", href:"https://sites.google.com/view/ailiteracy-partspromptword", ext:true},
  {kind:"工具", title:"CRAFT 提示詞產生器", desc:"提示詞合併與優化工具", href:"https://gemini.google.com/share/1de2b7a21af9", ext:true},
  {kind:"工具", title:"海報圖生成大師 Gem", desc:"三步驟生成教學海報", href:"https://gemini.google.com/gem/119RwSHHz3Q0chz478cyIuetg-pcz8DfD", ext:true},
  {kind:"工具", title:"公文小幫手 Gem", desc:"擬辦單與簽案草稿", href:"https://gemini.google.com/gem/1FWh70Ae6JX_4CZmrGh3dWk2R2_UCG-6I", ext:true},
  {kind:"工具", title:"聖誕小遊戲", desc:"Canvas 班級互動遊戲範例", href:"https://gemini.google.com/share/98ff1a97e01e", ext:true},
  {kind:"工具", title:"教師聯絡簿、考試專用投影系統", desc:"班級經營投影工具（Drive）", href:"https://drive.google.com/drive/folders/1N2M9RqCtSIKXJrm3l3Dm0RRV5v-bd21z", ext:true},
  {kind:"工具", title:"PDF 拆分合併小工具", desc:"通用版 PDF 處理（Drive）", href:"https://drive.google.com/drive/folders/1Kkm36z2DWdjNZ7ZNU226uL__yU3pAKFq", ext:true},
];

// 導覽列（含搜尋）
function renderNav(active){
  const nav=document.createElement("nav");nav.className="nav";
  nav.innerHTML=`<div class="nav-inner">
    <a href="index.html" class="brand">Gemini 教育應用指南</a>
    <div class="links">
      <a href="path.html" class="${active==="path"?"now":""}">學習路徑</a>
      <a href="tasks.html" class="${active==="tasks"?"now":""}">任務卡</a>
      <a href="toolbox.html" class="${active==="toolbox"?"now":""}">工具箱</a>
      <a href="passport.html" class="${active==="passport"?"now":""}">學習護照</a>
    </div>
    <div class="searchwrap">
      <input class="search" placeholder="搜尋教材、任務、工具…">
      <div class="results"></div>
    </div>
  </div>`;
  document.body.prepend(nav);
  const input=nav.querySelector(".search"),box=nav.querySelector(".results");
  input.addEventListener("input",()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){box.classList.remove("open");return}
    const hits=SEARCH_INDEX.filter(i=>(i.title+i.desc+i.kind).toLowerCase().includes(q)).slice(0,8);
    box.innerHTML=hits.length?hits.map(h=>
      `<a href="${h.href}" ${h.ext?'target="_blank"':""}>
        <span class="kind">${h.kind}</span><span class="rt">${h.title}${h.ext?" ↗":""}</span>
        <div class="rd">${h.desc}</div></a>`).join("")
      :'<p class="none">找不到符合的內容</p>';
    box.classList.add("open");
  });
  input.addEventListener("blur",()=>setTimeout(()=>box.classList.remove("open"),150));
  input.addEventListener("focus",()=>{if(input.value.trim())box.classList.add("open")});
}

// 頁尾
function renderFooter(){
  const f=document.createElement("footer");
  f.innerHTML=`<div class="wrap">
    <p class="t">Gemini 教育應用指南</p>
    <p>由《薇糖紹冰的教學日誌》整理而成，供教育用途學習參考。</p>
    <p>非 Google 官方出版品；Gemini 功能迭代快速，操作介面以官方最新版本為準。</p>
    <p style="margin-top:16px">AI 會出錯——所有生成內容請以教師專業查證後再使用。</p>
  </div>`;
  document.body.append(f);
}

// 一鍵複製
function bindCopy(){
  document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",async()=>{
    const t=b.closest(".prompt").querySelector(".text").innerText;
    await navigator.clipboard.writeText(t);
    b.textContent="已複製 ✓";setTimeout(()=>b.textContent="一鍵複製",1600);
  }));
}

// ===== 學習護照（記錄存在瀏覽器 localStorage）=====
const PP_KEY="gemini-edu-passport";
const PASSPORT_ITEMS=[
  {id:"module-parts",kind:"學習路徑",title:"PARTS 提示詞架構",href:"parts.html"},
  {id:"task-parts-first",kind:"任務卡",title:"用 PARTS 寫出第一個教案提示詞",href:"parts-task.html"},
];
const PASSPORT_TOTALS={path:{online:1,all:7},tasks:{online:1,all:4}};
function ppLoad(){try{return JSON.parse(localStorage.getItem(PP_KEY))||{}}catch(e){return{}}}
function ppSave(d){localStorage.setItem(PP_KEY,JSON.stringify(d))}
function ppIsDone(id){const d=ppLoad();return !!(d.done&&d.done[id])}
function ppDoneDate(id){const d=ppLoad();return d.done&&d.done[id]?d.done[id].at:""}
function ppSetDone(id,v){const d=ppLoad();d.done=d.done||{};
  if(v)d.done[id]={at:new Date().toLocaleDateString("zh-TW")};else delete d.done[id];ppSave(d)}
function ppCheck(id,i,v){const d=ppLoad();d.checks=d.checks||{};d.checks[id]=d.checks[id]||{};d.checks[id][i]=v;ppSave(d)}
function ppGetChecks(id){const d=ppLoad();return (d.checks&&d.checks[id])||{}}
function ppNote(id,t){const d=ppLoad();d.notes=d.notes||{};if(t.trim())d.notes[id]=t;else delete d.notes[id];ppSave(d)}
function ppGetNote(id){const d=ppLoad();return (d.notes&&d.notes[id])||""}
function ppClear(){localStorage.removeItem(PP_KEY)}
// 蓋章按鈕
function bindStamp(id){
  const b=document.getElementById("stampBtn");if(!b)return;
  const paint=()=>{const done=ppIsDone(id);
    b.classList.toggle("done",done);
    b.innerHTML=done?"✓ 已完成，蓋章於 "+ppDoneDate(id)+"（點擊取消）":"完成了嗎？點我蓋章";};
  b.addEventListener("click",()=>{ppSetDone(id,!ppIsDone(id));paint();});
  paint();
}
// 自我檢核清單
function bindChecks(id){
  document.querySelectorAll(".checkrow input").forEach((c,i)=>{
    c.checked=!!ppGetChecks(id)[i];
    c.addEventListener("change",()=>ppCheck(id,i,c.checked));
  });
}
// 學習成果記錄
function bindNote(id){
  const t=document.getElementById("noteBox");if(!t)return;
  t.value=ppGetNote(id);
  let timer;t.addEventListener("input",()=>{clearTimeout(timer);timer=setTimeout(()=>ppNote(id,t.value),400)});
}
// 路徑/任務卡頁：標記已完成的卡片與進度條
function paintProgress(scope){
  document.querySelectorAll("[data-pp]").forEach(c=>{
    if(ppIsDone(c.dataset.pp)){c.classList.add("isdone");
      if(!c.querySelector(".donemark")){const m=document.createElement("span");
        m.className="stamp donemark";m.textContent="✓";c.appendChild(m);}}
  });
  const bar=document.getElementById("ppBar");if(!bar)return;
  const total=PASSPORT_TOTALS[scope];
  const done=PASSPORT_ITEMS.filter(i=>(scope==="path"?i.kind==="學習路徑":i.kind==="任務卡")&&ppIsDone(i.id)).length;
  bar.querySelector("div").style.width=(total.online?done/total.online*100:0)+"%";
  document.getElementById("ppNum").textContent=`已完成 ${done} / 已上線 ${total.online}（全部 ${total.all} 站規劃中）`;
}
