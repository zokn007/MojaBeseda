
window.addEventListener('error', event => {
  console.error('MojaBeseda runtime error:', event.error || event.message);
  const toastEl = document.querySelector('#toast');
  if (toastEl) {
    toastEl.textContent = 'Napaka pri zagonu aplikacije. Osveži stran.';
    toastEl.classList.add('show');
  }
});
(async()=>{
  try{
    if('caches' in window){
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>k.startsWith('mojabeseda-')&&k!=='mojabeseda-1.4.1').map(k=>caches.delete(k)));
    }
  }catch(e){ console.warn('Cache cleanup',e); }
})();

const foundations=[
{key:'vera',name:'Vera',refs:['Hebrejcem 11','Jakob 1','Rimljanom 4','Habakuk 2,4'],summary:'Zaupanje Bogu, ki se pokaže v poslušnosti in vztrajnosti.'},
{key:'upanje',name:'Upanje',refs:['Rimljanom 8','Psalm 42','Izaija 40','Razodetje 21'],summary:'Trdno pričakovanje Božje zvestobe in obnove.'},
{key:'ljubezen',name:'Ljubezen',refs:['1 Korinčanom 13','1 Janez 4','Janez 13','Rimljanom 5'],summary:'Ljubezen, ki izvira iz Boga in postane vidna v dejanjih.'},
{key:'mir',name:'Mir',refs:['Filipljanom 4','Janez 14','Psalm 23','Izaija 26'],summary:'Božja navzočnost in varnost sredi nemira.'},
{key:'molitev',name:'Molitev',refs:['Matej 6','Luka 11','Psalm 5','Filipljanom 4'],summary:'Iskren pogovor z Bogom, poslušanje in zaupanje.'},
{key:'odpuscanje',name:'Odpuščanje',refs:['Matej 18','Luka 23','Kološanom 3','1 Mojzesova 50'],summary:'Milost, resnica in izročitev sodbe Bogu.'},
{key:'druzina',name:'Družina',refs:['Jozue 24','Psalm 127','Efežanom 5','Efežanom 6'],summary:'Dom kot prostor zvestobe, služenja in duhovne rasti.'},
{key:'modrost',name:'Modrost',refs:['Pregovori 3','Jakob 3','1 Kralji 3','Pridigar 3'],summary:'Življenje, ki se uči gledati z Božje perspektive.'},
{key:'pogum',name:'Pogum',refs:['Jozue 1','Daniel 3','Psalm 27','2 Timoteju 1'],summary:'Pogum, ki ne temelji na sebi, ampak na Božji bližini.'},
{key:'milost',name:'Milost',refs:['Efežanom 2','Luka 15','Rimljanom 3','Titu 3'],summary:'Nezaslužen Božji dar, ki spreminja življenje.'},
{key:'sveti-duh',name:'Sveti Duh',refs:['Janez 14','Apostolska dela 2','Rimljanom 8','Galačanom 5'],summary:'Božja navzočnost, vodstvo, moč in sad v verniku.'},
{key:'jezus',name:'Jezus Kristus',refs:['Janez 1','Filipljanom 2','Kološanom 1','Hebrejcem 1'],summary:'Kristusova oseba, delo in popolna podoba nevidnega Boga.'},
{key:'kriz',name:'Križ',refs:['Izaija 53','Marko 15','1 Korinčanom 1','Galačanom 6'],summary:'Božja moč in ljubezen, razodeti v Kristusovi daritvi.'},
{key:'vstajenje',name:'Vstajenje',refs:['Matej 28','Janez 20','1 Korinčanom 15','1 Peter 1'],summary:'Zmaga nad smrtjo in živo upanje v Kristusu.'},
{key:'preizkusnja',name:'Preizkušnje',refs:['Job 1','Jakob 1','1 Peter 1','Rimljanom 5'],summary:'Vztrajnost in rast vere v težkih obdobjih.'},
{key:'hvaleznost',name:'Hvaležnost',refs:['Psalm 100','Luka 17','Kološanom 3','1 Tesaloničanom 5'],summary:'Srce, ki prepoznava Božje darove in zvestobo.'},
{key:'služenje',name:'Služenje',refs:['Marko 10','Janez 13','Rimljanom 12','1 Peter 4'],summary:'Ljubezen, ki se ponižno podarja drugim.'},
{key:'pravičnost',name:'Pravičnost',refs:['Mihej 6','Matej 5','Rimljanom 3','Jakob 2'],summary:'Božja pravičnost, usmiljenje in pošteno ravnanje.'},
{key:'identiteta',name:'Identiteta v Kristusu',refs:['2 Korinčanom 5','Efežanom 1','Kološanom 3','1 Peter 2'],summary:'Kdo smo zaradi Kristusovega dela in Božjega klica.'},
{key:'obljube',name:'Božje obljube',refs:['1 Mojzesova 12','Jozue 1','Izaija 41','2 Korinčanom 1'],summary:'Bog ostaja zvest svojim besedam skozi vse rodove.'}
];
const angles=[
'za vsak dan','v času sprememb','v družini','na delovnem mestu','v preizkušnji',
'v odnosih','za mlade','za zakonce','za voditelje','za skupino',
'ob začetku dneva','ob koncu dneva','ko iščemo odgovor','ko nas je strah','ko čakamo na Boga'
];
const topics=[];
let ti=0;
for(const f of foundations){
  for(const angle of angles){
    topics.push({
      id:`tema-${++ti}`,
      name:`${f.name} ${angle}`,
      keywords:[f.key,f.name.toLowerCase(),...angle.toLowerCase().split(/\s+/)],
      chapters:[...f.refs],
      verse:f.refs[0],
      quote:`Preberi ${f.refs[0]} in razmisli, kako Bog govori v tvoje današnje okoliščine.`,
      summary:`${f.summary} Poudarek: ${angle}.`,
      context:`Odlomki ${f.refs.join(', ')} osvetljujejo temo »${f.name}« iz različnih delov Svetega pisma.`,
      links:f.refs.slice(1),
      today:`Poišči en konkreten korak, s katerim lahko temo »${f.name}« živiš ${angle}.`,
      questions:[
        `Kaj mi Bog razodeva o temi »${f.name}«?`,
        `Kaj moram danes sprejeti, opustiti ali spremeniti?`,
        `Kako lahko to sporočilo uporabim ${angle}?`
      ]
    });
  }
}
const pathThemes=[
['Jezus v Stari zavezi',['1 Mojzesova 3,15','1 Mojzesova 22','2 Mojzesova 12','4 Mojzesova 21','Psalm 22','Izaija 7','Izaija 9','Izaija 53','Mihej 5','Zaharija 9']],
['Vera v preizkušnjah',['Job 1','Psalm 13','Daniel 3','Habakuk 3','Jakob 1','Rimljanom 5','1 Peter 1']],
['Božje obljube',['1 Mojzesova 12','2 Mojzesova 6','Jozue 1','Psalm 23','Izaija 40','Jeremija 31','Janez 14','Rimljanom 8','Razodetje 21']],
['Molitev',['1 Samuel 1','Psalm 5','Psalm 51','Daniel 9','Matej 6','Luka 11','Janez 17','Filipljanom 4']],
['Sveti Duh',['Ezekiel 36','Joel 3','Janez 14','Janez 16','Apostolska dela 2','Rimljanom 8','Galačanom 5']],
['Jezusove prilike',['Matej 13','Matej 18','Matej 20','Matej 25','Marko 4','Luka 10','Luka 15','Luka 18']],
['Psalmi za življenje',['Psalm 1','Psalm 8','Psalm 19','Psalm 23','Psalm 27','Psalm 42','Psalm 51','Psalm 91','Psalm 103','Psalm 121']],
['Modrost Pregovorov',['Pregovori 1','Pregovori 3','Pregovori 4','Pregovori 8','Pregovori 10','Pregovori 15','Pregovori 16','Pregovori 18','Pregovori 27','Pregovori 31']],
['Življenje apostola Pavla',['Apostolska dela 9','Apostolska dela 13','Apostolska dela 16','Apostolska dela 20','Apostolska dela 27','Rimljanom 1','Filipljanom 3','2 Timoteju 4']],
['Razodetje in upanje',['Razodetje 1','Razodetje 2','Razodetje 3','Razodetje 4','Razodetje 5','Razodetje 7','Razodetje 19','Razodetje 21','Razodetje 22']],
['Družina po Božjem srcu',['1 Mojzesova 2','Jozue 24','Ruta 1','Psalm 127','Pregovori 22','Efežanom 5','Efežanom 6','Kološanom 3']],
['Odpuščanje in sprava',['1 Mojzesova 33','1 Mojzesova 50','Matej 5','Matej 18','Luka 15','Luka 23','Filemonu 1','Kološanom 3']]
];
const lengths=[7,10,14,21,30];
const paths=[];
let pi=0;
for(const [title,base] of pathThemes){
  for(let v=1;v<=4;v++){
    for(const len of lengths){
      const days=Array.from({length:len},(_,i)=>base[(i+(v-1))%base.length]);
      paths.push({
        id:`pot-${++pi}`,
        title:`${title} · ${len} dni${v>1?` (${v})`:''}`,
        desc:`Vodena pot z ${len} dnevi branja in premišljevanja.`,
        days
      });
    }
  }
}

const FIREBASE_VERSION='12.16.0';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const state={user:null,firebase:null,utterance:null};
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
function toast(m,ms=2800){const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),ms)}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function nav(n){$$('.view').forEach(v=>v.classList.remove('active'));$(`#${n}View`)?.classList.add('active');$$('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===n));window.scrollTo({top:0,behavior:'smooth'})}
function initTheme(){if(store.get('theme','dark')==='light')document.documentElement.classList.add('light')}
function topicMatches(t,q){if(!q)return true;const x=q.toLowerCase();return [t.name,t.summary,t.context,...t.keywords,...t.chapters].join(' ').toLowerCase().includes(x)}
function renderTopics(q=''){const list=topics.filter(t=>topicMatches(t,q));$('#topicSelect').innerHTML=list.map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('');if(!list.length)$('#topicSelect').innerHTML='<option>Ni zadetkov</option>'}
function chooseTopic(){if($('#modeSelect').value==='random')return topics[Math.floor(Math.random()*topics.length)];return topics.find(t=>t.id===$('#topicSelect').value)||topics[0]}
function renderStudy(t){const n=Number($('#chapterCount').value);const refs=[...t.chapters,...t.links].slice(0,n);$('#studyResult').innerHTML=`<article class="study-output section-block"><div class="section-heading"><div><p class="eyebrow">${esc($('#translationSelect').value)}</p><h2>${esc(t.name)}</h2></div><button id="studySpeakBtn" class="secondary">▶ Poslušaj vse</button></div><p><b>${esc(t.verse)}</b> — ${esc(t.quote)}</p><h4>Izbrana poglavja</h4><div class="chapter-links">${refs.map(r=>`<button class="secondary open-bible" data-ref="${esc(r)}">📖 ${esc(r)}</button>`).join('')}</div><h4>Povzetek</h4><p>${esc(t.summary)}</p><h4>Kontekst</h4><p>${esc(t.context)}</p><h4>Pomen za nas danes</h4><p>${esc(t.today)}</p><h4>Vprašanja za razmislek</h4><ol>${t.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ol><div class="hero-actions"><button class="primary" id="studyToJournal">Zapiši svoje razmišljanje</button></div></article>`;$('#studyResult').scrollIntoView({behavior:'smooth'})}
function bibleUrl(ref){return `https://www.biblija.net/biblija.cgi?m=${encodeURIComponent(ref)}&id13=1&pos=0&set=2&l=sl`}
function openBible(ref){const w=window.open(bibleUrl(ref),'_blank','noopener,noreferrer');if(!w)location.href=bibleUrl(ref)}
async function voicesReady(){let v=speechSynthesis.getVoices();if(v.length)return v;await new Promise(r=>{let done=false;const finish=()=>{if(!done){done=true;r()}};speechSynthesis.addEventListener('voiceschanged',finish,{once:true});setTimeout(finish,900)});return speechSynthesis.getVoices()}
function splitSpeech(text,max=180){const sentences=text.replace(/\s+/g,' ').match(/[^.!?]+[.!?]?/g)||[text];const out=[];let part='';for(const s of sentences){if((part+s).length>max&&part){out.push(part.trim());part=''}part+=s}if(part.trim())out.push(part.trim());return out}
async function speak(text){if(!('speechSynthesis'in window)){toast('Ta brskalnik ne podpira zvočnega branja.');return}speechSynthesis.cancel();const voices=await voicesReady();const voice=voices.find(v=>/^sl[-_]/i.test(v.lang))||voices.find(v=>/^hr[-_]/i.test(v.lang))||voices.find(v=>/^en[-_]/i.test(v.lang))||voices[0];const chunks=splitSpeech(text);let i=0;const next=()=>{if(i>=chunks.length){state.utterance=null;toast('Predvajanje je končano.');return}const u=new SpeechSynthesisUtterance(chunks[i++]);u.lang=voice?.lang||'sl-SI';if(voice)u.voice=voice;u.rate=.9;u.pitch=1;u.volume=1;u.onend=next;u.onerror=e=>{console.error('speech',e);if(e.error==='interrupted'||e.error==='canceled')return;toast('Glasovno branje na tej napravi ni na voljo. Poskusi v Safariju.')};state.utterance=u;speechSynthesis.speak(u)};next();toast(voice?`Predvaja glas: ${voice.name}`:'Predvajanje se je začelo.')}
function stopSpeak(){if('speechSynthesis'in window)speechSynthesis.cancel();state.utterance=null;toast('Predvajanje ustavljeno.')}
function renderKeywordResults(query=''){const q=query.trim().toLowerCase();if(!q){$('#keywordResults').innerHTML='';return}const found=topics.filter(t=>topicMatches(t,q)).slice(0,20);$('#keywordResults').innerHTML=found.length?found.map(t=>`<article class="list-card keyword-result"><div><b>${esc(t.verse)} · ${esc(t.name)}</b><p>${esc(t.summary)}</p></div><button class="text-btn use-keyword" data-topic="${t.id}">Odpri →</button></article>`).join(''):`<p class="empty-state">Ni zadetkov za »${esc(query)}«.</p>`}
function pathState(){return store.get('pathProgress',{})}
function isCompleted(p,progress){return (progress[p.id]||0)>=p.days.length}
function renderPaths(){const progress=pathState(),q=($('#pathSearch')?.value||'').trim().toLowerCase(),filter=$('#pathFilter')?.value||'active';let list=paths.filter(p=>!q||[p.title,p.desc,...p.days].join(' ').toLowerCase().includes(q));if(filter==='completed')list=list.filter(p=>isCompleted(p,progress));list.sort((a,b)=>Number(isCompleted(a,progress))-Number(isCompleted(b,progress))||a.title.localeCompare(b.title,'sl'));$('#pathCount').textContent=`Prikazanih ${list.length} od ${paths.length} poti. Končane poti so na koncu seznama.`;$('#pathsList').innerHTML=list.map(p=>{const done=Math.min(progress[p.id]||0,p.days.length),completed=done>=p.days.length,pct=Math.round(done/p.days.length*100),next=p.days[done]||p.days[p.days.length-1];return `<article class="list-card ${completed?'completed-card':''}"><div class="section-heading"><div><h3>${completed?'✓ ':''}${esc(p.title)}</h3><p class="muted">${esc(p.desc)}</p></div><span class="pill">${completed?'Končano':`${done}/${p.days.length}`}</span></div><div class="progress"><span style="width:${pct}%"></span></div><p><b>${completed?'Zadnje branje':'Naslednje branje'}:</b> ${esc(next)}</p><div class="hero-actions"><button class="primary open-bible" data-ref="${esc(next)}">Odpri besedilo</button>${!completed?`<button class="secondary path-step" data-path="${p.id}">Označi prebrano</button>`:''}<button class="text-btn path-reset" data-path="${p.id}">Ponastavi</button></div></article>`}).join('')||'<p class="empty-state">Ni poti, ki bi ustrezale filtru.</p>';renderContinue()}
function renderContinue(){const progress=pathState(),active=store.get('activePath',null),p=paths.find(x=>x.id===active);if(!p){$('#continuePill').textContent='Ni začete poti';$('#continueTitle').textContent='Izberi bralno pot';$('#continueText').textContent='Začni v razdelku Moje poti.';$('#continueProgress').style.width='0%';return}const done=Math.min(progress[p.id]||0,p.days.length),pct=Math.round(done/p.days.length*100),ref=p.days[Math.min(done,p.days.length-1)];$('#continuePill').textContent=done>=p.days.length?'Končano':`${done}. dan od ${p.days.length}`;$('#continueTitle').textContent=p.title;$('#continueText').textContent=done<p.days.length?`Naslednje: ${ref}`:'Pot je zaključena.';$('#continueProgress').style.width=`${pct}%`;$('#continueBtn').textContent=done<p.days.length?'Odpri naslednje branje →':'Odpri poti →';$('#continueBtn').dataset.ref=done<p.days.length?ref:''}
function renderJournal(){const a=store.get('journal',[]);$('#journalEntries').innerHTML=a.length?a.map((e,i)=>`<article class="list-card"><div class="section-heading"><div><h3>${esc(e.title)}</h3><p class="muted">${new Date(e.date).toLocaleString('sl-SI')}</p></div><button class="icon-btn delete-journal" data-i="${i}">×</button></div><p>${esc(e.text).replace(/\n/g,'<br>')}</p>${e.prayer?`<p><b>Moja molitev:</b><br>${esc(e.prayer).replace(/\n/g,'<br>')}</p>`:''}</article>`).join(''):'<p class="empty-state">Še nimaš shranjenih zapisov.</p>'}
function saveJournal(){const e={title:$('#journalTitle').value.trim()||'Moje razmišljanje',text:$('#journalText').value.trim(),prayer:$('#prayerText').value.trim(),date:new Date().toISOString()};if(!e.text&&!e.prayer){toast('Vnesi zapis ali molitev.');return}const a=store.get('journal',[]);a.unshift(e);store.set('journal',a);renderJournal();$('#journalTitle').value=$('#journalText').value=$('#prayerText').value='';syncUserData();toast('Zapis je shranjen.')}
function renderGroups(){$('#groupsList').innerHTML='<p class="empty-state">Prijavi se z Googlom za sinhronizirane skupine.</p>'}
function setSync(s){$('#syncStatus').textContent=s;$('#lastSync').textContent=new Date().toLocaleString('sl-SI')}
async function loadFirebase(){const c=window.MOJABESEDA_FIREBASE_CONFIG;if(!c?.apiKey){setSync('Lokalno');return}try{const [a,au,d]=await Promise.all([import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)]);const app=a.initializeApp(c),auth=au.getAuth(app),db=d.getFirestore(app);await au.setPersistence(auth,au.browserLocalPersistence);state.firebase={auth,db,...au,...d};au.onAuthStateChanged(auth,onAuth);setSync('Firebase pripravljen')}catch(e){console.error(e);setSync('Napaka povezave');toast('Firebase povezava ni uspela.')}}
async function googleLogin(){if(!state.firebase){toast('Firebase povezava ni pripravljena.');return}const {auth,GoogleAuthProvider,signInWithPopup}=state.firebase;const p=new GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});try{await signInWithPopup(auth,p)}catch(e){console.error(e);const messages={'auth/unauthorized-domain':'Ta spletni naslov ni dodan med Firebase Authorized domains.','auth/operation-not-allowed':'Google prijava v Firebase Authentication še ni omogočena.','auth/popup-blocked':'Brskalnik je blokiral prijavno okno. Odpri aplikacijo v Safariju.','auth/popup-closed-by-user':'Prijavno okno je bilo zaprto.'};toast(messages[e.code]||`Prijava ni uspela: ${e.code||'neznana napaka'}`,5000);$('#authHelp').textContent=messages[e.code]||'Preveri Firebase Authentication in dovoljene domene.'}}
async function onAuth(u){state.user=u;$('#googleLoginBtn').classList.toggle('hidden',!!u);$('#logoutBtn').classList.toggle('hidden',!u);$('#profileName').textContent=u?.displayName||'Gostujoči uporabnik';$('#profileEmail').textContent=u?.email||'Lokalni način';$('#profileBtn').textContent=u?(u.displayName||'MB').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase():'DG';$('#accountStatus').textContent=u?'Prijavljen':'Neprijavljen';if(u){await syncUserData();await loadUserData();setSync('Sinhronizirano')}else setSync('Lokalno')}
async function syncUserData(){if(!state.user||!state.firebase)return;try{const {db,doc,setDoc,serverTimestamp}=state.firebase;await setDoc(doc(db,'users',state.user.uid),{uid:state.user.uid,email:state.user.email||'',displayName:state.user.displayName||'',pathProgress:pathState(),activePath:store.get('activePath',null),journal:store.get('journal',[]),updatedAt:serverTimestamp()},{merge:true})}catch(e){console.error(e);setSync('Napaka sinhronizacije')}}
async function loadUserData(){if(!state.user||!state.firebase)return;try{const {db,doc,getDoc}=state.firebase,s=await getDoc(doc(db,'users',state.user.uid));if(s.exists()){const d=s.data();if(d.pathProgress)store.set('pathProgress',d.pathProgress);if(d.activePath)store.set('activePath',d.activePath);if(Array.isArray(d.journal))store.set('journal',d.journal);renderPaths();renderJournal()}}catch(e){console.error(e)}}
function bind(){document.addEventListener('click',async e=>{const n=e.target.closest('[data-nav]');if(n&&!n.dataset.ref)nav(n.dataset.nav);if(e.target.closest('#profileBtn'))nav('profile');if(e.target.closest('#dailySpeakBtn'))speak(`${$('#dailyTitle').textContent}. ${$('#dailyVerse').textContent}. ${$('#dailyReference').textContent}`);if(e.target.closest('#dailyStopBtn'))stopSpeak();if(e.target.closest('#studySpeakBtn'))speak($('#studyResult').innerText);if(e.target.closest('#studyToJournal')){nav('journal');$('#journalTitle').value=`Razmišljanje: ${$('#studyResult h2')?.textContent||''}`};const ob=e.target.closest('.open-bible');if(ob)openBible(ob.dataset.ref);const cb=e.target.closest('#continueBtn');if(cb?.dataset.ref)openBible(cb.dataset.ref);const k=e.target.closest('.use-keyword');if(k){const t=topics.find(x=>x.id===k.dataset.topic);$('#topicSelect').value=t.id;nav('study');renderStudy(t)}const ps=e.target.closest('.path-step');if(ps){const p=paths.find(x=>x.id===ps.dataset.path),pr=pathState();pr[p.id]=Math.min((pr[p.id]||0)+1,p.days.length);store.set('pathProgress',pr);store.set('activePath',p.id);renderPaths();await syncUserData();toast(pr[p.id]>=p.days.length?'Pot je končana in prestavljena na konec.':'Napredek poti je shranjen.')}const pr=e.target.closest('.path-reset');if(pr){const x=pathState();x[pr.dataset.path]=0;store.set('pathProgress',x);renderPaths();await syncUserData()}const dj=e.target.closest('.delete-journal');if(dj){const a=store.get('journal',[]);a.splice(Number(dj.dataset.i),1);store.set('journal',a);renderJournal();await syncUserData()}});$('#themeToggle').onclick=()=>{document.documentElement.classList.toggle('light');store.set('theme',document.documentElement.classList.contains('light')?'light':'dark')};$('#chapterCount').oninput=e=>$('#chapterCountValue').textContent=e.target.value;$('#studyForm').onsubmit=e=>{e.preventDefault();renderStudy(chooseTopic())};$('#topicSearch').oninput=e=>renderTopics(e.target.value);$('#keywordSearchBtn').onclick=()=>renderKeywordResults($('#keywordSearch').value);$('#keywordSearch').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();renderKeywordResults(e.target.value)}};$('#pathSearch').oninput=renderPaths;$('#pathFilter').onchange=renderPaths;$('#saveJournalBtn').onclick=saveJournal;$('#googleLoginBtn').onclick=googleLogin;$('#logoutBtn').onclick=()=>state.firebase?.signOut(state.firebase.auth);$('#addGroupBtn').onclick=()=>$('#groupDialog').showModal();$('#createGroupConfirm').onclick=e=>{e.preventDefault();toast('Skupine bodo na voljo po prijavi in potrjeni Firestore povezavi.');$('#groupDialog').close()}}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(console.error);
initTheme();renderTopics();renderPaths();renderJournal();renderGroups();bind();loadFirebase();