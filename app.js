const $ = (id) => document.getElementById(id);
const chat = $("chat");
const memoryList = $("memory-list");
const STORAGE_KEY = "nova-survival-memory-v1";

function getMemories(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return []} }
function saveMemories(items){ localStorage.setItem(STORAGE_KEY,JSON.stringify(items)); renderMemories(); }
function addMessage(who,text){
  const wrap=document.createElement("div"); wrap.className="message "+who;
  const sender=document.createElement("div"); sender.className="sender"; sender.textContent=who==="nova"?"NOVA":"TOI";
  const bubble=document.createElement("div"); bubble.className="bubble"; bubble.textContent=text;
  wrap.append(sender,bubble); chat.appendChild(wrap); wrap.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function renderMemories(){
  const items=getMemories(); memoryList.replaceChildren();
  $("memory-count").textContent=items.length+" note"+(items.length>1?"s":"");
  items.forEach((item,index)=>{
    const li=document.createElement("li"); const span=document.createElement("span"); span.textContent=item;
    const del=document.createElement("button"); del.type="button"; del.textContent="×"; del.setAttribute("aria-label","Supprimer cette note");
    del.addEventListener("click",()=>{const next=getMemories();next.splice(index,1);saveMemories(next)});
    li.append(span,del);memoryList.append(li);
  });
}
function answer(input){
  const q=input.toLowerCase();
  if(q.includes("présente")||q.includes("qui es-tu")||q.includes("qui est tu")) return "Je suis NOVA SURVIVAL V1, une première interface locale. Je ne suis pas encore une IA générative complète : je peux conserver tes notes et t'aider avec quelques fonctions simples.";
  if(q.includes("blackout")||q.includes("panne")||q.includes("survie")) return "Pour préparer une panne : garde une lampe, de l'eau potable, une batterie externe chargée, les numéros importants sur papier et les informations essentielles disponibles hors ligne. Pour mon fonctionnement, l'iPhone doit rester alimenté : aucun logiciel ne peut fonctionner avec une batterie totalement vide.";
  if(q.includes("mémoire")||q.includes("note")||q.includes("souviens")) return "Tu peux enregistrer une information dans le panneau « Mémoire locale ». Elle sera conservée dans le stockage de ce navigateur sur cet appareil. Fais aussi une sauvegarde : vider les données du navigateur peut effacer ces notes.";
  if(q.includes("internet")||q.includes("hors ligne")) return "Après que l'application a été installée et ouverte une première fois avec sa connexion sécurisée, son interface peut être mise en cache et réouverte hors ligne. Les fonctions qui dépendent d'Internet ne seront pas disponibles.";
  const memories=getMemories();
  if(memories.length) return "Je n'ai pas encore de modèle d'IA intégré pour comprendre toutes les questions. Voici quelques éléments de ta mémoire locale : "+memories.slice(-3).join(" · ");
  return "Je suis encore en version 1 : je peux enregistrer tes informations dans « Mémoire locale », mais je n'ai pas encore de véritable modèle d'IA. La prochaine étape sera d'ajouter des capacités hors ligne adaptées à l'iPhone X.";
}
$("chat-form").addEventListener("submit",e=>{e.preventDefault();const input=$("user-input");const value=input.value.trim();if(!value)return;addMessage("user",value);input.value="";setTimeout(()=>addMessage("nova",answer(value)),120)});
$("memory-form").addEventListener("submit",e=>{e.preventDefault();const input=$("memory-input");const value=input.value.trim();if(!value)return;const items=getMemories();items.push(value);saveMemories(items);input.value="";addMessage("nova","C'est enregistré dans la mémoire locale de cet appareil.")});
document.querySelectorAll(".quick-btn").forEach(btn=>btn.addEventListener("click",()=>{const value=btn.dataset.prompt;addMessage("user",value);setTimeout(()=>addMessage("nova",answer(value)),120)}));
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
if(navigator.onLine){$("connection").textContent="LOCAL · CONNECTÉ"}else{$("connection").textContent="LOCAL · HORS LIGNE"}
window.addEventListener("online",()=>$("connection").textContent="LOCAL · CONNECTÉ");
window.addEventListener("offline",()=>$("connection").textContent="LOCAL · HORS LIGNE");
renderMemories();
