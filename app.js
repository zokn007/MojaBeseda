import { topics, paths } from './content.js';

const FIREBASE_VERSION = '12.16.0';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const state = { user:null, view:'home', firebase:null, unsubscribers:[], activeGroup:null };
const store = {
  get:(k,d)=>{ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};

function toast(message, timeout=2500){
  const el=$('#toast'); el.textContent=message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),timeout);
}
function escapeHtml(value=''){ return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function formatDate(value){
  const d=value?.toDate ? value.toDate() : new Date(value);
  return Number.isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat('sl-SI',{dateStyle:'medium',timeStyle:'short'}).format(d);
}
function nav(name){
  state.view=name; $$('.view').forEach(v=>v.classList.remove('active')); $(`#${name}View`)?.classList.add('active');
  $$('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===name)); window.scrollTo({top:0,behavior:'smooth'});
}
function clearSubscriptions(){ state.unsubscribers.forEach(fn=>{try{fn()}catch{}}); state.unsubscribers=[]; }
function initTheme(){ if(store.get('theme','dark')==='light') document.documentElement.classList.add('light'); }
function renderTopics(){
  const options=topics.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  $('#topicSelect').innerHTML=options; $('#notificationKeyword').innerHTML=options;
  $('#keywordChips').innerHTML=topics.slice(0,6).map((t,i)=>`<button class="chip ${i===0?'active':''}" data-keyword="${t.id}">${t.name}</button>`).join('');
}
function renderPaths(){
  const progress=store.get('pathProgress',{});
  $('#pathsList').innerHTML=paths.map((p,i)=>{
    const done=progress[i]||0, pct=Math.min(100,Math.round(done/p.days*100));
    return `<article class="list-card"><div class="section-heading"><div><h3>${p.title}</h3><p class="muted">${p.desc}</p></div><span class="pill">${p.days} dni</span></div><div class="progress"><span style="width:${pct}%"></span></div><button class="text-btn" data-path-start="${i}">${done?'Nadaljuj':'Začni pot'} →</button></article>`;
  }).join('');
}
function chooseTopic(){
  const mode=$('#modeSelect').value, testament=$('#testamentSelect').value;
  let pool=[...topics];
  if(testament==='old') pool=pool.filter(t=>t.chapters.some(c=>/^(1|2|3|4|5) Mojzesova|Psalm|Izaija|Žalostinke|Habakuk/.test(c)));
  if(testament==='new') pool=pool.filter(t=>t.chapters.some(c=>/Janez|Rimljanom|Korinčanom|Hebrejcem|Jakob|Filipljanom|Matej|Filemonu/.test(c)));
  if(mode==='random'||mode==='covenant') return pool[Math.floor(Math.random()*pool.length)]||topics[0];
  return topics.find(t=>t.id===$('#topicSelect').value)||topics[0];
}
function renderStudy(topic){
  const count=Number($('#chapterCount').value), chapters=[...topic.chapters];
  while(chapters.length<count) chapters.push(topic.links[(chapters.length-topic.chapters.length)%topic.links.length]);
  const depth=$('#depthSelect').value;
  const extras=depth==='sermon' ? `<h4>Predlog zgradbe</h4><ol><li>Svetopisemski temelj in kontekst</li><li>Jedro sporočila v izbranih poglavjih</li><li>Povezava z evangelijem</li><li>Pomen za naše življenje danes</li></ol>` : depth==='group' ? `<h4>Za pogovor v skupini</h4><p>Vsak naj izbere eno vrstico, ki ga je posebej nagovorila, in pojasni zakaj.</p>` : '';
  $('#studyResult').innerHTML=`<article class="study-output panel"><div class="section-heading"><div><p class="eyebrow">${escapeHtml($('#translationSelect').value)} · ${count} ${count===1?'poglavje':'poglavji'}</p><h2>${escapeHtml(topic.name)}</h2></div><button class="secondary speak-all">▶ Poslušaj vse</button></div><div class="chapter-tags">${chapters.slice(0,count).map(c=>`<span>${escapeHtml(c)}</span>`).join('')}</div><h4>Povzetek</h4><p>${escapeHtml(topic.summary)}</p><h4>Zgodovinski in svetopisemski kontekst</h4><p>${escapeHtml(topic.context)}</p><h4>Povezane vrstice</h4><ul>${topic.links.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul><h4>Pomen za nas danes</h4><p>${escapeHtml(topic.today)}</p><h4>Vprašanja za razmislek</h4><ol>${topic.questions.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol>${extras}<div class="hero-actions"><button class="primary save-study-note">Zapiši svoje razmišljanje</button><button class="secondary share-study">Deli v skupino</button></div></article>`;
  $('#studyResult').scrollIntoView({behavior:'smooth'});
}

function speak(text){
  if(!('speechSynthesis' in window)){ toast('Ta naprava ne podpira glasovnega branja.'); return; }
  speechSynthesis.cancel(); const utterance=new SpeechSynthesisUtterance(text); utterance.lang='sl-SI';
  const voices=speechSynthesis.getVoices(); utterance.voice=voices.find(v=>v.lang?.toLowerCase().startsWith('sl'))||null;
  utterance.rate=Number(store.get('speechRate',0.95)); speechSynthesis.speak(utterance); toast('Predvajanje se je začelo.');
}

async function loadFirebase(){
  const config=window.MOJABESEDA_FIREBASE_CONFIG;
  if(!config?.apiKey || !config?.projectId){ setSyncStatus('Lokalno – dodaj Firebase config'); return null; }
  try{
    const [appMod,authMod,dbMod]=await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)
    ]);
    const app=appMod.initializeApp(config), auth=authMod.getAuth(app), db=dbMod.getFirestore(app);
    try { await dbMod.enableMultiTabIndexedDbPersistence(db); } catch(err){ console.info('Firestore persistence:',err.code); }
    state.firebase={app,auth,db,...authMod,...dbMod};
    authMod.onAuthStateChanged(auth,onAuthChanged);
    setSyncStatus('Firebase pripravljen');
    return state.firebase;
  }catch(error){ console.error(error); setSyncStatus('Napaka povezave'); toast('Firebase se ni mogel povezati. Preveri konfiguracijo.'); return null; }
}
function setSyncStatus(text){ $('#syncStatus').textContent=text; }
async function onAuthChanged(user){
  clearSubscriptions(); state.user=user||null;
  $('#googleLoginBtn').classList.toggle('hidden',!!user); $('#logoutBtn').classList.toggle('hidden',!user);
  if(!user){ $('#profileName').textContent='Gostujoči uporabnik'; $('#profileEmail').textContent='Lokalni način'; $('#profileBtn').textContent='DG'; setSyncStatus(state.firebase?'Odjavljen':'Lokalno'); renderJournal(); renderGroups(); return; }
  $('#profileName').textContent=user.displayName||'Uporabnik'; $('#profileEmail').textContent=user.email||''; $('#profileBtn').textContent=(user.displayName||'MB').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase(); setSyncStatus('Sinhronizirano');
  const {db,doc,setDoc,serverTimestamp}=state.firebase;
  await setDoc(doc(db,'users',user.uid),{uid:user.uid,displayName:user.displayName||'',email:user.email||'',photoURL:user.photoURL||'',lastLoginAt:serverTimestamp(),active:true},{merge:true});
  subscribeUserData(); subscribeJournal(); subscribeGroups();
}
async function googleLogin(){
  if(!state.firebase){ toast('Najprej vnesi Firebase konfiguracijo.'); return; }
  const {auth,GoogleAuthProvider,signInWithPopup,signInWithRedirect}=state.firebase;
  const provider=new GoogleAuthProvider(); provider.setCustomParameters({prompt:'select_account'});
  try{
    const mobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if(mobile) await signInWithRedirect(auth,provider); else await signInWithPopup(auth,provider);
  }catch(error){ console.error(error); toast(error.code==='auth/popup-blocked'?'Brskalnik je blokiral prijavno okno.':'Prijava ni uspela.'); }
}
async function logout(){ if(state.firebase) await state.firebase.signOut(state.firebase.auth); }
function subscribeUserData(){
  const {db,doc,onSnapshot}=state.firebase;
  state.unsubscribers.push(onSnapshot(doc(db,'users',state.user.uid),snap=>{
    const data=snap.data()||{}; const n=data.notifications||store.get('notifications',{});
    if(n.keyword) $('#notificationKeyword').value=n.keyword; if(n.time) $('#notificationTime').value=n.time; $('#notificationEnabled').checked=n.enabled!==false;
  }));
}

function renderJournal(entries=null){
  const list=entries||store.get('journal',[]);
  $('#journalEntries').innerHTML=list.length?list.map(e=>`<article class="list-card"><div class="section-heading"><div><h3>${escapeHtml(e.title||'Brez naslova')}</h3><p class="muted">${formatDate(e.createdAt||e.date)}</p></div>${e.id?`<button class="icon-btn delete-journal" data-id="${e.id}" aria-label="Izbriši">×</button>`:''}</div><p>${escapeHtml(e.text||'').replace(/\n/g,'<br>')}</p>${e.prayer?`<details><summary>Moja molitev (zasebno)</summary><p>${escapeHtml(e.prayer).replace(/\n/g,'<br>')}</p></details>`:''}</article>`).join(''):'<p class="empty-state">Še nimaš shranjenih zapisov.</p>';
}
function subscribeJournal(){
  const {db,collection,query,where,orderBy,onSnapshot}=state.firebase;
  const q=query(collection(db,'journalEntries'),where('ownerId','==',state.user.uid),orderBy('createdAt','desc'));
  state.unsubscribers.push(onSnapshot(q,snap=>renderJournal(snap.docs.map(d=>({id:d.id,...d.data()}))),err=>{console.error(err);toast('Za dnevnik je morda treba ustvariti Firestore indeks.');}));
}
async function saveJournal(){
  const entry={title:$('#journalTitle').value.trim()||'Moje razmišljanje',text:$('#journalText').value.trim(),prayer:$('#prayerText').value.trim()};
  if(!entry.text&&!entry.prayer){ toast('Vnesi zapis ali molitev.'); return; }
  if(state.user&&state.firebase){ const {db,collection,addDoc,serverTimestamp}=state.firebase; await addDoc(collection(db,'journalEntries'),{...entry,ownerId:state.user.uid,createdAt:serverTimestamp(),updatedAt:serverTimestamp()}); toast('Zapis je sinhroniziran.'); }
  else { const list=store.get('journal',[]); list.unshift({...entry,date:new Date().toISOString()}); store.set('journal',list); renderJournal(); toast('Zapis je shranjen lokalno.'); }
  $('#journalTitle').value=$('#journalText').value=$('#prayerText').value='';
}
async function deleteJournal(id){ if(!state.user||!state.firebase)return; if(!confirm('Izbrišem ta zapis?'))return; const {db,doc,deleteDoc}=state.firebase; await deleteDoc(doc(db,'journalEntries',id)); }

function renderGroups(groups=null){
  const list=groups||store.get('groups',[]);
  $('#groupsList').innerHTML=list.length?list.map(g=>`<article class="list-card group-card" data-group-id="${g.id||''}"><div class="section-heading"><div><h3>${escapeHtml(g.name)}</h3><p class="muted">${escapeHtml(g.topic||'Skupno razmišljanje')}</p></div><span class="pill">${g.memberIds?.length||g.members||1} članov</span></div><button class="text-btn open-group" data-group-id="${g.id||''}">Odpri skupino →</button></article>`).join(''):'<p class="empty-state">Še nisi član nobene skupine.</p>';
}
function subscribeGroups(){
  const {db,collection,query,where,onSnapshot}=state.firebase;
  const q=query(collection(db,'groups'),where('memberIds','array-contains',state.user.uid));
  state.unsubscribers.push(onSnapshot(q,snap=>renderGroups(snap.docs.map(d=>({id:d.id,...d.data()}))),console.error));
}
async function createGroup(){
  const name=$('#groupName').value.trim(), inviteEmail=$('#inviteEmail').value.trim();
  if(!name){toast('Vnesi ime skupine.');return;}
  if(!state.user||!state.firebase){ const groups=store.get('groups',[]);groups.unshift({name,members:1,topic:'Še ni izbrano'});store.set('groups',groups);renderGroups();$('#groupDialog').close();toast('Skupina je shranjena lokalno.');return; }
  const {db,collection,query,where,getDocs,addDoc,serverTimestamp}=state.firebase;
  const memberIds=[state.user.uid], memberNames={[state.user.uid]:state.user.displayName||state.user.email};
  if(inviteEmail){
    const found=await getDocs(query(collection(db,'users'),where('email','==',inviteEmail)));
    if(found.empty){toast('Ta oseba se mora najprej prijaviti v MojaBeseda.');return;}
    const invited=found.docs[0].data(); memberIds.push(invited.uid); memberNames[invited.uid]=invited.displayName||invited.email;
  }
  await addDoc(collection(db,'groups'),{name,topic:'Skupno razmišljanje',ownerId:state.user.uid,memberIds:[...new Set(memberIds)],memberNames,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
  $('#groupName').value=$('#inviteEmail').value=''; $('#groupDialog').close(); toast('Skupina je ustvarjena in sinhronizirana.');
}
async function openGroup(groupId){
  if(!state.user||!state.firebase){toast('Za skupinska razmišljanja se prijavi z Googlom.');return;}
  state.activeGroup=groupId; const {db,doc,getDoc,collection,query,orderBy,onSnapshot}=state.firebase;
  const groupSnap=await getDoc(doc(db,'groups',groupId)); if(!groupSnap.exists())return;
  const g=groupSnap.data(); $('#groupDetailTitle').textContent=g.name; $('#groupDetailMembers').textContent=Object.values(g.memberNames||{}).join(', ');
  $('#groupDetailDialog').showModal();
  const q=query(collection(db,'groups',groupId,'reflections'),orderBy('createdAt','desc'));
  if(state.groupUnsub)state.groupUnsub(); state.groupUnsub=onSnapshot(q,snap=>{
    $('#groupReflections').innerHTML=snap.empty?'<p class="empty-state">Še ni skupnih zapisov.</p>':snap.docs.map(d=>{const r=d.data();return `<article class="list-card"><div class="section-heading"><b>${escapeHtml(r.authorName||'Član')}</b><span class="muted">${formatDate(r.createdAt)}</span></div><p>${escapeHtml(r.text).replace(/\n/g,'<br>')}</p></article>`}).join('');
  });
}
async function postGroupReflection(){
  const text=$('#groupReflectionText').value.trim(); if(!text||!state.activeGroup)return;
  const {db,collection,addDoc,serverTimestamp}=state.firebase;
  await addDoc(collection(db,'groups',state.activeGroup,'reflections'),{text,authorId:state.user.uid,authorName:state.user.displayName||state.user.email,createdAt:serverTimestamp()});
  $('#groupReflectionText').value=''; toast('Razmišljanje je objavljeno skupini.');
}
async function shareStudy(){
  if(!state.user){toast('Za deljenje se prijavi z Googlom.');return;} nav('groups'); toast('Odpri skupino in prilepi ali napiši svoje razmišljanje.');
}
async function saveSettings(){
  const notifications={keyword:$('#notificationKeyword').value,time:$('#notificationTime').value,enabled:$('#notificationEnabled').checked}; store.set('notifications',notifications);
  if(state.user&&state.firebase){const {db,doc,setDoc,serverTimestamp}=state.firebase;await setDoc(doc(db,'users',state.user.uid),{notifications,updatedAt:serverTimestamp()},{merge:true});}
  if(notifications.enabled&&'Notification'in window&&Notification.permission==='default')await Notification.requestPermission(); toast('Nastavitve so shranjene in sinhronizirane.');
}

function bind(){
  document.addEventListener('click',async e=>{
    const navEl=e.target.closest('[data-nav]'); if(navEl)nav(navEl.dataset.nav);
    if(e.target.closest('[data-action="new-study"]'))nav('study'); if(e.target.closest('#profileBtn'))nav('profile');
    const s=e.target.closest('.speak-btn'); if(s)speak($(s.dataset.speakTarget)?.textContent||''); if(e.target.closest('.speak-all'))speak($('#studyResult').innerText);
    const keyword=e.target.closest('[data-keyword]'); if(keyword){$$('[data-keyword]').forEach(x=>x.classList.remove('active'));keyword.classList.add('active');store.set('dailyKeyword',keyword.dataset.keyword);toast('Ključna beseda je shranjena.');}
    const path=e.target.closest('[data-path-start]'); if(path){const p=store.get('pathProgress',{});p[path.dataset.pathStart]=(p[path.dataset.pathStart]||0)+1;store.set('pathProgress',p);renderPaths();toast('Napredek bralne poti je shranjen.');}
    if(e.target.closest('.save-study-note')){nav('journal');$('#journalTitle').value=`Razmišljanje: ${$('#studyResult h2')?.textContent||''}`;toast('Pripravljeno za tvoj osebni zapis.');}
    if(e.target.closest('.share-study'))shareStudy();
    const del=e.target.closest('.delete-journal');if(del)deleteJournal(del.dataset.id);
    const group=e.target.closest('.open-group');if(group)openGroup(group.dataset.groupId);
  });
  $('#themeToggle').onclick=()=>{document.documentElement.classList.toggle('light');store.set('theme',document.documentElement.classList.contains('light')?'light':'dark');};
  $('#chapterCount').oninput=e=>$('#chapterCountValue').textContent=e.target.value;
  $('#studyForm').onsubmit=e=>{e.preventDefault();renderStudy(chooseTopic());};
  $('#saveJournalBtn').onclick=saveJournal; $('#addGroupBtn').onclick=()=>$('#groupDialog').showModal(); $('#createGroupConfirm').onclick=e=>{e.preventDefault();createGroup();};
  $('#postGroupReflection').onclick=e=>{e.preventDefault();postGroupReflection();}; $('#saveSettingsBtn').onclick=saveSettings;
  $('#googleLoginBtn').onclick=googleLogin; $('#logoutBtn').onclick=logout;
}

if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(console.error);
initTheme(); renderTopics(); renderPaths(); renderGroups(); renderJournal(); bind(); loadFirebase();
