const views = ['map','lesson','practice','feedback','recovery','mastery','review','profile'];
const labels = {map:'Skill map', lesson:'Visual hierarchy', practice:'Practice', feedback:'Feedback', recovery:'Recovery', mastery:'Milestone', review:'Mistake review', profile:'My progress'};
const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message){ toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove('show'), 2600); }
function showView(name){
  views.forEach(v => document.querySelector(`#${v}-view`)?.classList.toggle('active', v === name));
  document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('active', el.dataset.view === name));
  document.querySelector('#crumb').textContent = labels[name] || 'Skill map';
  window.scrollTo({top:0, behavior:'smooth'});
}
function bindViewButtons(){
  document.querySelectorAll('[data-view]').forEach(el => el.addEventListener('click', () => showView(el.dataset.view)));
}
bindViewButtons();
document.querySelector('#startLesson').addEventListener('click', () => showView('lesson'));
document.querySelector('#lessonPractice').addEventListener('click', () => showView('practice'));
document.querySelectorAll('.skill-node').forEach(node => node.addEventListener('click', () => {
  const skill = node.dataset.skill;
  if(skill === 'hierarchy') showView('lesson');
  else if(skill === 'typography' || skill === 'components') showToast(`${skill[0].toUpperCase()+skill.slice(1)} unlocks after your current milestone.`);
  else if(skill === 'principles') showToast('Design principles mastered at 92%. Nice foundation.');
  else showToast('Keep going — this skill unlocks as your path grows.');
}));
document.querySelector('#diagnosticBtn').addEventListener('click', () => showToast('Diagnostic refresh is ready for your next session.'));
document.querySelector('#seeWhy').addEventListener('click', () => showToast('PATH chose this because hierarchy is your closest unlock.'));
document.querySelectorAll('.answer-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.answer-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  if(card.dataset.answer === 'wrong') setTimeout(() => showView('feedback'), 420);
  else setTimeout(() => showToast('Good eye. You found the clearest signal.'), 420);
}));
document.querySelector('#recoveryBtn').addEventListener('click', () => showView('recovery'));
document.querySelector('#repairAction').addEventListener('click', () => {
  document.querySelector('.repair-card').classList.add('repaired');
  showToast('That’s the signal. One clear action, easy to find.');
});
document.querySelector('#masterBtn').addEventListener('click', () => showView('mastery'));
document.querySelector('#nextSkill').addEventListener('click', () => { showView('map'); showToast('Typography is now ready on your path.'); });
