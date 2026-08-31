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
  const chapterId = mode.startsWith('chapter:') ? mode.split(':')[1] : null;
  let pool = chapterId
    ? items.filter((item) => item.chapterId === chapterId)
    : mode === 'review'
      ? items.filter((item) => normalized.missed.includes(item.id))
      : items.filter((item) => mode === 'scenario' ? item.mode === 'scenario' : item.mode !== 'chapter');
  if (!pool.length) pool = items;
  const unseen = pool.filter((item) => !normalized.attempted[item.id]);
  if (unseen.length) pool = unseen;
  return [...pool].sort((a, b) => {
    const masteryDifference = topicMastery(normalized, a.topic) - topicMastery(normalized, b.topic);
    return masteryDifference || a.difficulty - b.difficulty || a.id.localeCompare(b.id);
  })[0];
}

export function shuffleChoices(question, random = Math.random) {
  const indexed = question.choices.map((choice, index) => ({ choice, isCorrect: index === question.correctIndex }));
  for (let index = indexed.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [indexed[index], indexed[swapIndex]] = [indexed[swapIndex], indexed[index]];
  }
  return { ...question, choices: indexed.map((item) => item.choice), correctIndex: indexed.findIndex((item) => item.isCorrect) };
}

export function chapterProgress(items, state, chapterId) {
  const chapterItems = items.filter((item) => item.chapterId === chapterId);
  const attempted = chapterItems.filter((item) => state.attempted?.[item.id]);
  return { total: chapterItems.length, answered: attempted.length, correct: attempted.filter((item) => state.attempted[item.id].correct).length };
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
  const questions = [...(window.MASTERY_QUESTIONS || window.AITECH_QUESTIONS || []), ...(window.MASTERY_CHAPTER_QUESTIONS || [])];
  const chapters = window.MASTERY_CHAPTERS || [];
  let state = loadState();
  let mode = 'quick';
  let selectedChapterId = null;
  const nextQuestion = () => shuffleChoices(selectQuestion(questions, state, mode === 'chapter' ? `chapter:${selectedChapterId}` : mode));
  let question = nextQuestion();
  let answered = false;

  const render = () => {
    const seen = Object.keys(state.attempted).length;
    const mastery = seen ? Math.round((Object.values(state.topics).reduce((sum, topic) => sum + topic.correct, 0) / Object.values(state.topics).reduce((sum, topic) => sum + topic.total, 0)) * 100) : 0;
    const currentProgress = mode === 'chapter' && selectedChapterId ? chapterProgress(questions, state, selectedChapterId) : null;
    const chapterComplete = currentProgress && currentProgress.answered >= currentProgress.total;
    root.innerHTML = `
      <main class="shell">
        <header><div><p class="eyebrow">${config.eyebrow}</p><h1>${config.title}</h1><p class="subtitle">${config.subtitle}</p></div><button id="reset" class="quiet">Reset progress</button></header>
        <section class="stats" aria-label="Study progress"><div><span>XP</span><strong>${state.xp}</strong></div><div><span>Streak</span><strong>${state.streak} 🔥</strong></div><div><span>Mastery</span><strong>${mastery}%</strong></div><div><span>Answered</span><strong>${seen}/${questions.length}</strong></div></section>
        <nav class="modes" aria-label="Practice modes">${[['quick','Quick Drill'],['scenario','Scenario Lab'],['review','Recovery Queue'], ...(chapters.length ? [['chapter','Chapter Dump Exams']] : [])].map(([key,label]) => `<button data-mode="${key}" class="${mode === key ? 'active' : ''}">${label}${key === 'review' ? ` · ${state.missed.length}` : ''}</button>`).join('')}</nav>
        ${mode === 'chapter' && !selectedChapterId ? `<section class="question-card chapter-picker"><p class="eyebrow">FULL-DUMP PRACTICE</p><h2>Choose a Masterclass chapter</h2><p>Each chapter has 25 questions. Answers are shuffled every time, and missed concepts remain in your Recovery Queue.</p><div class="chapter-grid">${chapters.map((chapter) => `<button class="chapter-choice" data-chapter="${chapter.id}"><b>${chapter.id}</b><span>${chapter.title}</span><small>${chapterProgress(questions, state, chapter.id).answered}/25 answered</small></button>`).join('')}</div></section>` : chapterComplete ? `<section class="question-card"><p class="eyebrow">CHAPTER COMPLETE</p><h2>Chapter ${selectedChapterId}: ${currentProgress.correct}/${currentProgress.total}</h2><p>You completed this full-dump exam. Use the Recovery Queue to revisit misses, or choose another chapter.</p><button id="back-to-chapters" class="next">Choose another chapter →</button></section>` : `<section class="question-card">${mode === 'chapter' ? `<div class="exam-score">Chapter ${selectedChapterId} · ${currentProgress.answered}/25 answered · ${currentProgress.correct} correct</div>` : ''}<div class="question-meta"><span>${question.topic}</span><span>${'◆'.repeat(question.difficulty)}</span></div><h2>${question.prompt}</h2><div class="choices">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}"><b>${String.fromCharCode(65 + index)}</b><span>${choice}</span></button>`).join('')}</div><div id="feedback" class="feedback" aria-live="polite"></div><button id="next" class="next" disabled>Next challenge →</button></section>`}
        <section class="mastery"><div><h3>Your mastery map</h3><p>Incorrect answers return to the Recovery Queue, so weak areas receive more practice.</p></div><div class="topic-list">${(config.topics || ['Foundations', 'Prompting', 'Security & Governance', 'Verification & Analysis', 'RAG & Models', 'Workflows & Agents', 'Software Engineering']).map((topic) => { const score = topicMastery(state, topic); return `<div><span>${topic}</span><progress value="${Math.max(0, score) * 100}" max="100"></progress><em>${score < 0 ? 'Not started' : `${Math.round(score * 100)}%`}</em></div>`; }).join('')}</div></section>
        <section class="badges"><h3>Badges</h3>${state.badges.length ? state.badges.map((badge) => `<span>${badge}</span>`).join('') : '<p>Earn five correct answers in a topic to unlock a badge.</p>'}</section>
      </main>`;
    bind();
  };

  const bind = () => {
    root.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => { mode = button.dataset.mode; selectedChapterId = null; question = mode === 'chapter' ? null : nextQuestion(); answered = false; render(); }));
    root.querySelectorAll('[data-chapter]').forEach((button) => button.addEventListener('click', () => { selectedChapterId = button.dataset.chapter; question = nextQuestion(); answered = false; render(); }));
    const backToChapters = root.querySelector('#back-to-chapters');
    if (backToChapters) backToChapters.addEventListener('click', () => { selectedChapterId = null; question = null; render(); });
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
    const next = root.querySelector('#next');
    if (next) next.addEventListener('click', () => { question = nextQuestion(); answered = false; render(); });
    root.querySelector('#reset').addEventListener('click', () => { if (confirm('Reset all local study progress?')) { state = emptyState(); saveState(state); question = mode === 'chapter' && !selectedChapterId ? null : nextQuestion(); render(); } });
  };
  render();
}

if (typeof document !== 'undefined') startApp();
