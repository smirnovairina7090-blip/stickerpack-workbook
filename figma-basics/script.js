const flashcards = [
  {term:'Move / Select', category:'Инструмент', definition:'Основной инструмент выбора и перемещения объектов. Горячая клавиша V. С него обычно начинается любая работа с уже созданным элементом.'},
  {term:'Frame', category:'Структура', definition:'Контейнер для интерфейса или его части. Во фрейме удобно задавать размеры экрана, сетку, ограничения, Auto Layout и прототипирование.'},
  {term:'Text', category:'Инструмент', definition:'Инструмент добавления текста. Горячая клавиша T. Используется для заголовков, подписей, кнопок, описаний и любого текстового контента.'},
  {term:'Shape tools', category:'Инструмент', definition:'Набор простых фигур: прямоугольник, эллипс, линия и другие формы. Часто из них собирают карточки, кнопки, плашки и декоративные элементы.'},
  {term:'Layers', category:'Организация', definition:'Список всех объектов проекта. Понятные названия слоёв помогают быстро ориентироваться в макете и безопасно редактировать сложные экраны.'},
  {term:'Component', category:'Система', definition:'Повторно используемый элемент интерфейса. Изменение главного компонента позволяет обновлять связанные экземпляры и поддерживать единый стиль.'},
  {term:'Instance', category:'Система', definition:'Экземпляр компонента, который сохраняет связь с главным компонентом. В нём можно менять допустимый контент, не разрушая общую систему.'},
  {term:'Auto Layout', category:'Адаптивность', definition:'Правило автоматического расположения элементов: направление, отступы, расстояния, выравнивание и поведение размера. Помогает макету выдерживать изменение контента.'},
  {term:'Constraints', category:'Адаптивность', definition:'Ограничения, которые задают поведение объекта внутри фрейма при изменении размеров. Например, сохранить привязку к краю или растягиваться вместе с контейнером.'},
  {term:'Layout Grid', category:'Композиция', definition:'Сетка макета. Помогает выстраивать колонки, поля, ритм и единые линии выравнивания, чтобы интерфейс оставался организованным.'},
  {term:'Prototype', category:'Интерактив', definition:'Режим создания связей между экранами и состояниями. Здесь задают клики, переходы, оверлеи, прокрутку и другие пользовательские действия.'},
  {term:'Styles', category:'Система', definition:'Сохранённые правила оформления: цвет, текст, эффекты и другие параметры. Они позволяют менять повторяющиеся решения сразу во всём проекте.'}
];

const quiz = [
  {
    tag:'Инструменты',
    question:'Какой инструмент лучше всего использовать, чтобы задать границы мобильного экрана?',
    options:['Frame','Text','Pen','Comment'],
    answer:0,
    explanation:'Frame задаёт рабочую область экрана и становится контейнером для остальных элементов.'
  },
  {
    tag:'Инструменты',
    question:'Какой горячей клавишей включается инструмент Text?',
    options:['F','T','V','R'],
    answer:1,
    explanation:'T включает инструмент Text.'
  },
  {
    tag:'Организация',
    question:'В проекте двадцать слоёв с названиями Rectangle 14 и Text 28. Что стоит сделать первым?',
    options:['Добавить больше цветов','Переименовать слои по смыслу','Сделать всё компонентами','Удалить сетку'],
    answer:1,
    explanation:'Осмысленные названия слоёв делают структуру проекта понятной и уменьшают риск случайных изменений.'
  },
  {
    tag:'Система',
    question:'Одинаковая кнопка используется на восьми экранах. Какое решение наиболее системное?',
    options:['Скопировать её восемь раз','Сделать главным компонентом и использовать экземпляры','Сохранить восемь PNG','Нарисовать заново на каждом экране'],
    answer:1,
    explanation:'Компонент позволяет менять общие свойства один раз и обновлять связанные экземпляры.'
  },
  {
    tag:'Адаптивность',
    question:'Текст в кнопке стал длиннее, и кнопка сломалась. Какой инструмент чаще всего помогает решить такую проблему системно?',
    options:['Auto Layout','Comment','Eyedropper','Slice'],
    answer:0,
    explanation:'Auto Layout позволяет контейнеру подстраиваться под содержимое и сохранять заданные отступы.'
  },
  {
    tag:'Композиция',
    question:'Что лучше всего помогает выстроить повторяющиеся блоки по единым линиям и колонкам?',
    options:['Layout Grid','Prototype','Export','Pen'],
    answer:0,
    explanation:'Layout Grid задаёт устойчивую структуру колонок, полей и выравниваний.'
  },
  {
    tag:'Интерактив',
    question:'Где в Figma настраивают переход по нажатию кнопки на другой экран?',
    options:['Design','Prototype','Layers','Assets'],
    answer:1,
    explanation:'Связи, триггеры и переходы задаются в режиме Prototype.'
  },
  {
    tag:'Цвет',
    question:'Какие три роли цвета особенно важно различать в интерфейсе?',
    options:['Любимый, модный и случайный','Основной, акцентный и статусный','Тёплый, холодный и серый','Яркий, тусклый и чёрный'],
    answer:1,
    explanation:'Основной поддерживает систему и бренд, акцентный выделяет главное действие, статусный сообщает об успехе, предупреждении или ошибке.'
  },
  {
    tag:'Типографика',
    question:'Зачем нужны текстовые стили?',
    options:['Чтобы каждый заголовок оформлять по-разному','Чтобы хранить единые правила текста и быстро обновлять их','Чтобы превращать текст в картинку','Только ради красивых названий'],
    answer:1,
    explanation:'Текстовый стиль хранит повторяемое решение и помогает поддерживать единообразную иерархию.'
  },
  {
    tag:'Читаемость',
    question:'Какой способ проверки читаемости наиболее полезен?',
    options:['Спросить автора, нравится ли ему шрифт','Проверить реальный текст, контраст и иерархию на экране','Добавить декоративный шрифт','Увеличить всё одинаково'],
    answer:1,
    explanation:'Читаемость проверяют на реальном содержании: важны контраст, размер, длина строки, иерархия и условия просмотра.'
  },
  {
    tag:'UX-наблюдение',
    question:'Какая формулировка описывает правку на основе наблюдения, а не вкуса?',
    options:['Мне не нравится этот фиолетовый','Кнопку не заметили за 10 секунд, поэтому усиливаем её контраст','Мне хочется другой шрифт','Эта карточка какая-то скучная'],
    answer:1,
    explanation:'Наблюдаемая проблема связана с поведением пользователя и позволяет сформулировать проверяемую правку.'
  },
  {
    tag:'Выбор инструмента',
    question:'Нужно, чтобы карточка оставалась у правого края при изменении ширины фрейма. Что проверяем?',
    options:['Constraints','Comments','Version history','Export settings'],
    answer:0,
    explanation:'Constraints определяют привязку и поведение объекта внутри изменяющегося фрейма.'
  }
];

const flashCardEl = document.getElementById('flashCard');
const cardTerm = document.getElementById('cardTerm');
const cardDefinition = document.getElementById('cardDefinition');
const cardCategory = document.getElementById('cardCategory');
const tapHint = document.getElementById('tapHint');
const startFlash = document.getElementById('startFlash');
const repeatCard = document.getElementById('repeatCard');
const knowCard = document.getElementById('knowCard');
const resetFlash = document.getElementById('resetFlash');
const flashProgress = document.getElementById('flashProgress');
const progressBar = document.getElementById('progressBar');
const timerEl = document.getElementById('timer');
const flashResult = document.getElementById('flashResult');
const studentName = document.getElementById('studentName');
const leaderboard = document.getElementById('leaderboard');
const clearLeaderboard = document.getElementById('clearLeaderboard');

let flashDeck = [];
let currentFlash = null;
let learned = 0;
let timerStart = 0;
let timerFrame = null;
let flashRunning = false;

function shuffle(arr){
  const copy=[...arr];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function formatTime(ms){
  const total=Math.max(0,ms);
  const min=Math.floor(total/60000);
  const sec=Math.floor((total%60000)/1000);
  const tenth=Math.floor((total%1000)/100);
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${tenth}`;
}

function tick(){
  if(!flashRunning)return;
  timerEl.textContent=formatTime(performance.now()-timerStart);
  timerFrame=requestAnimationFrame(tick);
}

function updateFlashProgress(){
  flashProgress.textContent=`${learned} / ${flashcards.length}`;
  progressBar.style.width=`${(learned/flashcards.length)*100}%`;
}

function showFlashCard(){
  if(!flashDeck.length){
    finishFlash();
    return;
  }
  currentFlash=flashDeck.shift();
  flashCardEl.classList.remove('revealed');
  cardTerm.textContent=currentFlash.term;
  cardDefinition.textContent=currentFlash.definition;
  cardCategory.textContent=currentFlash.category;
  tapHint.textContent='Нажмите на карточку, чтобы открыть ответ';
  knowCard.disabled=false;
  repeatCard.disabled=false;
}

function startFlashGame(){
  const name=studentName.value.trim();
  if(!name){
    studentName.focus();
    studentName.placeholder='Сначала введите имя';
    return;
  }
  cancelAnimationFrame(timerFrame);
  flashDeck=shuffle(flashcards);
  learned=0;
  currentFlash=null;
  flashRunning=true;
  timerStart=performance.now();
  timerEl.textContent='00:00.0';
  flashResult.hidden=true;
  startFlash.disabled=true;
  updateFlashProgress();
  showFlashCard();
  tick();
}

function finishFlash(){
  flashRunning=false;
  cancelAnimationFrame(timerFrame);
  const elapsed=performance.now()-timerStart;
  timerEl.textContent=formatTime(elapsed);
  currentFlash=null;
  cardTerm.textContent='Готово!';
  cardDefinition.textContent='Все 12 терминов пройдены. Можно сравнить результат с рейтингом или запустить новую попытку.';
  cardCategory.textContent='Финиш';
  flashCardEl.classList.add('revealed');
  tapHint.textContent='Отличная работа';
  knowCard.disabled=true;
  repeatCard.disabled=true;
  startFlash.disabled=false;
  saveScore(studentName.value.trim(),elapsed);
  flashResult.hidden=false;
  flashResult.innerHTML=`<strong>${studentName.value.trim()}</strong>, результат: <strong>${formatTime(elapsed)}</strong>. Лучшие попытки сохранены справа.`;
  renderLeaderboard();
}

function resetFlashGame(){
  flashRunning=false;
  cancelAnimationFrame(timerFrame);
  flashDeck=[];
  currentFlash=null;
  learned=0;
  timerEl.textContent='00:00.0';
  updateFlashProgress();
  startFlash.disabled=false;
  knowCard.disabled=true;
  repeatCard.disabled=true;
  flashResult.hidden=true;
  flashCardEl.classList.remove('revealed');
  cardCategory.textContent='Инструмент';
  cardTerm.textContent='Нажмите «Начать игру»';
  cardDefinition.textContent='После запуска здесь появится термин. Сначала объясните его своими словами, затем переверните карточку.';
  tapHint.textContent='Нажмите на карточку, чтобы открыть ответ';
}

flashCardEl.addEventListener('click',()=>{
  if(!currentFlash)return;
  flashCardEl.classList.toggle('revealed');
  tapHint.textContent=flashCardEl.classList.contains('revealed')?'Ответ открыт':'Нажмите на карточку, чтобы открыть ответ';
});

startFlash.addEventListener('click',startFlashGame);
resetFlash.addEventListener('click',resetFlashGame);
knowCard.addEventListener('click',()=>{
  if(!currentFlash)return;
  learned++;
  updateFlashProgress();
  showFlashCard();
});
repeatCard.addEventListener('click',()=>{
  if(!currentFlash)return;
  flashDeck.push(currentFlash);
  showFlashCard();
});

const SCORE_KEY='figma-basics-leaderboard-v1';
function getScores(){
  try{return JSON.parse(localStorage.getItem(SCORE_KEY))||[];}catch{return[];}
}
function saveScore(name,time){
  const scores=getScores();
  scores.push({name,time,date:Date.now()});
  scores.sort((a,b)=>a.time-b.time);
  localStorage.setItem(SCORE_KEY,JSON.stringify(scores.slice(0,8)));
}
function renderLeaderboard(){
  const scores=getScores();
  leaderboard.innerHTML='';
  if(!scores.length){
    const div=document.createElement('div');
    div.className='empty-score';
    div.textContent='Пока нет результатов. Начните первую попытку.';
    leaderboard.appendChild(div);
    return;
  }
  scores.forEach(item=>{
    const li=document.createElement('li');
    li.innerHTML=`<span class="score-name"></span><span class="score-time">${formatTime(item.time)}</span>`;
    li.querySelector('.score-name').textContent=item.name;
    leaderboard.appendChild(li);
  });
}
clearLeaderboard.addEventListener('click',()=>{
  localStorage.removeItem(SCORE_KEY);
  renderLeaderboard();
});
renderLeaderboard();

const quizScore = document.getElementById('quizScore');
const quizCounter = document.getElementById('quizCounter');
const quizDots = document.getElementById('quizDots');
const questionTag = document.getElementById('questionTag');
const questionText = document.getElementById('questionText');
const answers = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const startQuiz = document.getElementById('startQuiz');
const nextQuestion = document.getElementById('nextQuestion');
const restartQuiz = document.getElementById('restartQuiz');

let quizDeck=[];
let quizIndex=0;
let score=0;
let answered=false;
let quizResults=[];

function buildDots(){
  quizDots.innerHTML='';
  quizDeck.forEach((_,i)=>{
    const dot=document.createElement('span');
    dot.className='dot';
    dot.dataset.index=i;
    quizDots.appendChild(dot);
  });
}

function renderQuestion(){
  answered=false;
  feedback.hidden=true;
  nextQuestion.hidden=true;
  const q=quizDeck[quizIndex];
  quizCounter.textContent=`Вопрос ${quizIndex+1} из ${quizDeck.length}`;
  questionTag.textContent=q.tag;
  questionText.textContent=q.question;
  answers.innerHTML='';
  [...quizDots.children].forEach((dot,i)=>dot.classList.toggle('active',i===quizIndex));
  q.options.forEach((option,i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='answer-btn';
    btn.textContent=option;
    btn.addEventListener('click',()=>answerQuestion(i,btn));
    answers.appendChild(btn);
  });
}

function answerQuestion(choice,button){
  if(answered)return;
  answered=true;
  const q=quizDeck[quizIndex];
  const correct=choice===q.answer;
  if(correct)score++;
  quizResults[quizIndex]=correct;
  quizScore.textContent=`${score} / ${quizDeck.length}`;
  [...answers.children].forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.answer)btn.classList.add('correct');
  });
  if(!correct)button.classList.add('wrong');
  const dot=quizDots.children[quizIndex];
  dot.classList.remove('active');
  dot.classList.add(correct?'correct':'wrong');
  feedback.hidden=false;
  feedback.innerHTML=`<strong>${correct?'Верно.':'Не совсем.'}</strong> ${q.explanation}`;
  if(quizIndex<quizDeck.length-1)nextQuestion.hidden=false;
  else finishQuiz();
}

function startQuizGame(){
  quizDeck=shuffle(quiz);
  quizIndex=0;
  score=0;
  answered=false;
  quizResults=[];
  quizScore.textContent=`0 / ${quizDeck.length}`;
  startQuiz.hidden=true;
  restartQuiz.hidden=true;
  buildDots();
  renderQuestion();
}

function finishQuiz(){
  nextQuestion.hidden=true;
  restartQuiz.hidden=false;
  quizCounter.textContent='Квиз завершён';
  let title='Хорошая база';
  if(score===quiz.length)title='Идеально';
  else if(score>=10)title='Очень уверенно';
  else if(score<7)title='Есть что повторить';
  feedback.hidden=false;
  feedback.innerHTML=`<strong>${title}: ${score} из ${quiz.length}.</strong> ${score>=10?'Основные инструменты и логика интерфейса уже хорошо закреплены.':'Вернитесь к карточкам с темами, в которых были ошибки, и попробуйте квиз ещё раз.'}`;
}

startQuiz.addEventListener('click',startQuizGame);
nextQuestion.addEventListener('click',()=>{
  quizIndex++;
  renderQuestion();
});
restartQuiz.addEventListener('click',startQuizGame);
