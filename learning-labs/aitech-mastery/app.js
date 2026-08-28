export const STORAGE_KEY = 'aitech-mastery-v1';

function storageKey() { return typeof window !== 'undefined' ? (window.MASTERY_CONFIG?.storageKey || STORAGE_KEY) : STORAGE_KEY; }

export function emptyState() {
  return { xp: 0, streak: 0, attempted: {}, topics: {}, missed: [], badges: [] };
}

export function normalizeState(state = {}) {
  return { ...emptyState(), ...state, attempted: state.attempted || {}, topics: state.topics || {}, missed: state.missed || [], badges: state.badges || [] };
}

export function topicMastery(state, topic) {
  const record = state.topics?.[topic];
  return record?.total ? record.correct / record.total : -1;
}

export function selectQuestion(items, state, mode = 'quick') {
  const normalized = normalizeState(state);
  let pool = mode === 'review'
    ? items.filter((item) => normalized.missed.includes(item.id))
    : items.filter((item) => mode === 'scenario' ? item.mode === 'scenario' : true);
  if (!pool.length) pool = items;
  const unseen = pool.filter((item) => !normalized.attempted[item.id]);
  if (unseen.length) pool = unseen;
  return [...pool].sort((a, b) => {
    const masteryDifference = topicMastery(normalized, a.topic) - topicMastery(normalized, b.topic);
    return masteryDifference || a.difficulty - b.difficulty || a.id.localeCompare(b.id);
  })[0];
}

export function gradeAttempt(question, selectedIndex) {
  const correct = selectedIndex === question.correctIndex;
  return { correct, xp: correct ? question.difficulty * 10 : 0 };
}

export function applyAttempt(state, question, selectedIndex) {
  const next = normalizeState(state);
  const result = gradeAttempt(question, selectedIndex);
  const previous = next.attempted[question.id] || { count: 0 };
  next.attempted[question.id] = { count: previous.count + 1, correct: result.correct };
  const topic = next.topics[question.topic] || { correct: 0, total: 0 };
  next.topics[question.topic] = { correct: topic.correct + Number(result.correct), total: topic.total + 1 };
  next.xp += result.xp;
  next.streak = result.correct ? next.streak + 1 : 0;
  next.missed = result.correct ? next.missed.filter((id) => id !== question.id) : [...new Set([...next.missed, question.id])];
  const badgeRules = (typeof window !== 'undefined' && window.MASTERY_CONFIG?.badgeRules) || { 'Foundations': 'Model Literate', 'Prompting': 'Prompt Architect', 'RAG & Models': 'RAG Builder', 'Workflows & Agents': 'Workflow Designer', 'Security & Governance': 'AI Defender', 'Verification & Analysis': 'Evidence Engineer', 'Software Engineering': 'AI Engineering Ally' };
  Object.entries(badgeRules).forEach(([topicName, badge]) => {
    if ((next.topics[topicName]?.correct || 0) >= 5 && !next.badges.includes(badge)) next.badges.push(badge);
  });
  return { state: next, result };
}

export function loadState() {
  try { return normalizeState(JSON.parse(localStorage.getItem(storageKey()) || '{}')); } catch { return emptyState(); }
}

export function saveState(state) { localStorage.setItem(storageKey(), JSON.stringify(state)); }

function startApp() {
  const root = document.querySelector('#app');
  const config = window.MASTERY_CONFIG || { eyebrow: 'AI TECHNICAL PRACTITIONER', title: 'Mastery Lab', subtitle: 'Study the concepts. Diagnose the trade-offs. Build reliable AI systems.' };
  const questions = window.MASTERY_QUESTIONS || window.AITECH_QUESTIONS || [];
  let state = loadState();
  let mode = 'quick';
  let question = selectQuestion(questions, state, mode);
  let answered = false;

  const render = () => {
    const seen = Object.keys(state.attempted).length;
    const mastery = seen ? Math.round((Object.values(state.topics).reduce((sum, topic) => sum + topic.correct, 0) / Object.values(state.topics).reduce((sum, topic) => sum + topic.total, 0)) * 100) : 0;
    root.innerHTML = `
      <main class="shell">
        <header><div><p class="eyebrow">${config.eyebrow}</p><h1>${config.title}</h1><p class="subtitle">${config.subtitle}</p></div><button id="reset" class="quiet">Reset progress</button></header>
        <section class="stats" aria-label="Study progress"><div><span>XP</span><strong>${state.xp}</strong></div><div><span>Streak</span><strong>${state.streak} 🔥</strong></div><div><span>Mastery</span><strong>${mastery}%</strong></div><div><span>Answered</span><strong>${seen}/${questions.length}</strong></div></section>
        <nav class="modes" aria-label="Practice modes">${[['quick','Quick Drill'],['scenario','Scenario Lab'],['review','Recovery Queue']].map(([key,label]) => `<button data-mode="${key}" class="${mode === key ? 'active' : ''}">${label}${key === 'review' ? ` · ${state.missed.length}` : ''}</button>`).join('')}</nav>
        <section class="question-card"><div class="question-meta"><span>${question.topic}</span><span>${'◆'.repeat(question.difficulty)}</span></div><h2>${question.prompt}</h2><div class="choices">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}"><b>${String.fromCharCode(65 + index)}</b><span>${choice}</span></button>`).join('')}</div><div id="feedback" class="feedback" aria-live="polite"></div><button id="next" class="next" disabled>Next challenge →</button></section>
        <section class="mastery"><div><h3>Your mastery map</h3><p>Incorrect answers return to the Recovery Queue, so weak areas receive more practice.</p></div><div class="topic-list">${(config.topics || ['Foundations', 'Prompting', 'Security & Governance', 'Verification & Analysis', 'RAG & Models', 'Workflows & Agents', 'Software Engineering']).map((topic) => { const score = topicMastery(state, topic); return `<div><span>${topic}</span><progress value="${Math.max(0, score) * 100}" max="100"></progress><em>${score < 0 ? 'Not started' : `${Math.round(score * 100)}%`}</em></div>`; }).join('')}</div></section>
        <section class="badges"><h3>Badges</h3>${state.badges.length ? state.badges.map((badge) => `<span>${badge}</span>`).join('') : '<p>Earn five correct answers in a topic to unlock a badge.</p>'}</section>
      </main>`;
    bind();
  };

  const bind = () => {
    root.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => { mode = button.dataset.mode; question = selectQuestion(questions, state, mode); answered = false; render(); }));
    root.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const { state: next, result } = applyAttempt(state, question, Number(button.dataset.choice));
      state = next; saveState(state);
      const feedback = root.querySelector('#feedback');
      root.querySelectorAll('[data-choice]').forEach((choice, index) => { choice.disabled = true; if (index === question.correctIndex) choice.classList.add('correct'); if (index === Number(button.dataset.choice) && !result.correct) choice.classList.add('incorrect'); });
      feedback.innerHTML = `<strong>${result.correct ? `Correct · +${result.xp} XP` : 'Not quite — keep this in your recovery queue.'}</strong><p>${question.explanation}</p><p class="contrast">${question.contrast || ''}</p>`;
      root.querySelector('#next').disabled = false;
    }));
    root.querySelector('#next').addEventListener('click', () => { question = selectQuestion(questions, state, mode); answered = false; render(); });
    root.querySelector('#reset').addEventListener('click', () => { if (confirm('Reset all local study progress?')) { state = emptyState(); saveState(state); question = selectQuestion(questions, state, mode); render(); } });
  };
  render();
}

if (typeof document !== 'undefined') startApp();
