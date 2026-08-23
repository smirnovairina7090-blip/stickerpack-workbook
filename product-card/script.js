(() => {
  const STORAGE_KEY = "kreaytivika-product-card-v1";
  const state = loadState();
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const dot = $(".autosave-dot");
    if (dot) {
      dot.animate([{ transform: "scale(1)" }, { transform: "scale(1.7)" }, { transform: "scale(1)" }], { duration: 350 });
    }
  }

  function jumpTo(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $$(".jump-button,.stage-link").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.target !== "start") state.started = true;
      saveState();
      updateProgress();
      jumpTo(button.dataset.target);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    $$(".stage-link").forEach((link) => link.classList.toggle("is-active", link.dataset.target === visible.target.id));
  }, { rootMargin: "-20% 0px -58% 0px", threshold: [0.08, 0.35] });
  $$('[data-stage]').forEach((section) => observer.observe(section));

  $$('[data-save]').forEach((field) => {
    const key = field.dataset.save;
    if (state[key] !== undefined) field.value = state[key];
    field.addEventListener("input", () => {
      state[key] = field.value;
      saveState();
      updateBrief();
      if (key === "mainBenefit") updateBenefitCounter();
    });
  });

  $$('[data-choice-group]').forEach((group) => {
    const key = `choice_${group.dataset.choiceGroup}`;
    $$('button[data-value]', group).forEach((button) => {
      if (state[key] === button.dataset.value) button.classList.add("is-selected");
      button.addEventListener("click", () => {
        $$('button[data-value]', group).forEach((item) => item.classList.remove("is-selected"));
        button.classList.add("is-selected");
        state[key] = button.dataset.value;
        if (group.dataset.choiceGroup === "product") {
          $("#customProduct").value = "";
          state.customProduct = "";
        }
        saveState();
        updateBrief();
      });
    });
  });

  function currentProduct() {
    return ($("#customProduct")?.value || state.choice_product || "").trim();
  }

  function updateBrief() {
    const product = currentProduct() || "...";
    const audience = $("#audience")?.value.trim() || "...";
    const benefit = $("#mainBenefit")?.value.trim() || "...";
    const mood = state.choice_mood || "...";
    const brief = { товар: product, аудитория: audience, польза: benefit, характер: mood };
    const code = $("#briefCode code");
    if (code) code.textContent = JSON.stringify(brief, null, 2);

    const productPreview = $('[data-preview="product"]');
    const headlinePreview = $('[data-preview="headline"]');
    const factsPreview = $('[data-preview="facts"]');
    if (productPreview) {
      const productLabel = product === "..." ? "ВАШ ТОВАР" : product.toUpperCase();
      productPreview.textContent = productLabel.length > 28 ? `${productLabel.slice(0, 28)}…` : productLabel;
      productPreview.title = productLabel;
    }
    if (headlinePreview) {
      const headlineLabel = benefit === "..." ? "ГЛАВНАЯ ПОЛЬЗА" : benefit.toUpperCase();
      headlinePreview.textContent = headlineLabel;
      headlinePreview.title = headlineLabel;
    }
    if (factsPreview) {
      const facts = ["fact1", "fact2", "fact3"]
        .map((key) => $(`[data-save="${key}"]`)?.value.trim())
        .filter(Boolean);
      factsPreview.replaceChildren();
      (facts.length ? facts : ["факт 01", "факт 02", "факт 03"]).forEach((fact) => {
        const chip = document.createElement("span");
        chip.textContent = fact.length > 20 ? `${fact.slice(0, 20)}…` : fact;
        chip.title = fact;
        factsPreview.append(chip);
      });
    }
  }

  function updateBenefitCounter() {
    const count = $("#mainBenefit")?.value.length || 0;
    $("#benefitCount").textContent = String(count);
  }

  $$('[data-quiz="focus"] button').forEach((button) => {
    if (state.focusQuiz === button.dataset.answer) button.classList.add(button.dataset.answer === "correct" ? "is-correct" : "is-wrong");
    button.addEventListener("click", () => {
      $$('[data-quiz="focus"] button').forEach((item) => item.classList.remove("is-correct", "is-wrong"));
      const correct = button.dataset.answer === "correct";
      button.classList.add(correct ? "is-correct" : "is-wrong");
      $("#focusFeedback").textContent = correct
        ? "Точно! Товар и главная польза создают точку входа, а декор только направляет взгляд."
        : "Почти. Если всё одинаково заметно, зритель не знает, куда смотреть. Найди один главный смысл.";
      state.focusQuiz = button.dataset.answer;
      saveState();
    });
  });
  if (state.focusQuiz) {
    $("#focusFeedback").textContent = state.focusQuiz === "correct"
      ? "Точно! Товар и главная польза создают точку входа, а декор только направляет взгляд."
      : "Попробуй ещё: главный смысл должен быть один.";
  }

  const hierarchyList = $("#hierarchyList");
  if (Array.isArray(state.hierarchyOrder)) {
    state.hierarchyOrder.forEach((key) => {
      const item = hierarchyList.querySelector(`[data-key="${key}"]`);
      if (item) hierarchyList.append(item);
    });
  }

  hierarchyList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-move]");
    if (!button) return;
    const item = button.closest("li");
    if (button.dataset.move === "up" && item.previousElementSibling) item.parentNode.insertBefore(item, item.previousElementSibling);
    if (button.dataset.move === "down" && item.nextElementSibling) item.parentNode.insertBefore(item.nextElementSibling, item);
    saveHierarchyOrder();
  });

  function saveHierarchyOrder() {
    state.hierarchyOrder = $$("li", hierarchyList).map((item) => item.dataset.key);
    $$("li", hierarchyList).forEach((item, index) => item.querySelector(".rank").textContent = String(index + 1));
    updateMoveButtons();
    renderHierarchyPreview();
    saveState();
  }

  function updateMoveButtons() {
    const items = $$("li", hierarchyList);
    items.forEach((item, index) => {
      item.querySelector('[data-move="up"]').disabled = index === 0;
      item.querySelector('[data-move="down"]').disabled = index === items.length - 1;
    });
  }

  function renderHierarchyPreview() {
    const order = state.hierarchyOrder || ["product", "headline", "facts", "decor"];
    const rank = Object.fromEntries(order.map((key, index) => [key, index]));
    const labels = { product: "Фото товара", headline: "Главная польза", facts: "Факты", decor: "Декор" };
    $$('[data-preview-key]').forEach((element) => {
      const index = rank[element.dataset.previewKey] ?? 3;
      element.dataset.rank = String(index + 1);
      const badge = element.querySelector(".attention-rank");
      if (badge) badge.textContent = String(index + 1);
    });
    const route = $("#attentionRoute");
    if (route) route.textContent = order.map((key, index) => `${index + 1}. ${labels[key]}`).join(" → ");
  }

  $("#checkHierarchy").addEventListener("click", () => {
    const order = $$("li", hierarchyList).map((item) => item.dataset.key);
    const firstPairOkay = order.slice(0, 2).includes("product") && order.slice(0, 2).includes("headline");
    const correct = firstPairOkay && order[2] === "facts" && order[3] === "decor";
    $("#hierarchyFeedback").textContent = correct
      ? "Отлично: товар и польза ведут взгляд, факты объясняют, декор поддерживает."
      : "Исправь маршрут: товар и польза должны занять первые два места, факты - третье, декор - четвёртое.";
  });

  $$('[data-layout]').forEach((button) => {
    if ((state.layout || "diagonal") === button.dataset.layout) button.classList.add("is-selected");
    else button.classList.remove("is-selected");
    button.addEventListener("click", () => {
      $$('[data-layout]').forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      state.layout = button.dataset.layout;
      applyLayout();
      saveState();
    });
  });

  function applyLayout() {
    const poster = $("#livePoster");
    poster.classList.remove("layout-diagonal", "layout-split", "layout-center");
    const layout = state.layout || "diagonal";
    poster.classList.add(`layout-${layout}`);
    const messages = {
      diagonal: "Диагональ ведёт взгляд от заголовка к товару и фактам.",
      split: "Разделение собирает элементы в ровные смысловые зоны.",
      center: "Центр сначала показывает товар, затем объясняет его пользу."
    };
    $("#layoutFeedback").textContent = messages[layout];
  }

  const canvaChecks = $$('[data-canva-step]');
  const savedCanva = new Set(state.canvaSteps || []);
  canvaChecks.forEach((check) => {
    check.checked = savedCanva.has(check.dataset.canvaStep);
    check.addEventListener("change", () => {
      state.canvaSteps = canvaChecks.filter((item) => item.checked).map((item) => item.dataset.canvaStep);
      updateCanvaMeter();
      saveState();
    });
  });

  function updateCanvaMeter() {
    const done = canvaChecks.filter((item) => item.checked).length;
    $("#canvaMeterText").textContent = `${done} / ${canvaChecks.length}`;
    $("#canvaMeterBar").style.width = `${done / canvaChecks.length * 100}%`;
  }

  $("#generatePrompt").addEventListener("click", generatePrompt);
  function generatePrompt() {
    const product = currentProduct() || "выбранного товара";
    const audience = $("#audience").value.trim() || "целевой аудитории";
    const task = $("#promptTask").value.trim() || `Создай рекламный фон для карточки товара «${product}»`;
    const style = $("#promptStyle").value.trim() || state.choice_mood || "современный минималистичный стиль";
    const composition = $("#promptComposition").value.trim() || "вертикальная композиция, свободное место под товар и заголовок, акценты по краям";
    const colors = $("#promptColors").value.trim() || "светлая спокойная палитра с одним цветным акцентом";
    const limits = $("#promptLimits").value.trim() || "без текста, без людей, без логотипов, без водяных знаков";
    const prompt = `${task}. Аудитория: ${audience}. Стиль: ${style}. Композиция: ${composition}. Цвета: ${colors}. Ограничения: ${limits}. Формат вертикальный 3:4, чистые края, достаточно свободного пространства для ручной сборки карточки.`;
    $("#promptResult").textContent = prompt;
    state.generatedPrompt = prompt;
    saveState();
  }

  $("#copyPrompt").addEventListener("click", async () => {
    const text = $("#promptResult").textContent;
    if (!text || text.startsWith("Заполни")) return;
    try {
      await navigator.clipboard.writeText(text);
      $("#copyPrompt").textContent = "Скопировано ✓";
      setTimeout(() => $("#copyPrompt").textContent = "Копировать промт", 1500);
    } catch {
      $("#copyPrompt").textContent = "Выдели текст вручную";
    }
  });

  const qualityChecks = $$('[data-quality-step]');
  const savedQuality = new Set(state.qualitySteps || []);
  qualityChecks.forEach((check) => {
    check.checked = savedQuality.has(check.dataset.qualityStep);
    check.addEventListener("change", () => {
      state.qualitySteps = qualityChecks.filter((item) => item.checked).map((item) => item.dataset.qualityStep);
      updateQualityMeter();
      saveState();
    });
  });

  function updateQualityMeter() {
    const done = qualityChecks.filter((item) => item.checked).length;
    $("#qualityMeterText").textContent = `${done} / ${qualityChecks.length}`;
    $("#qualityMeterBar").style.width = `${done / qualityChecks.length * 100}%`;
  }

  $$('[data-progress]').forEach((check) => {
    const key = check.dataset.progress;
    check.checked = Boolean(state.progress?.[key]);
    check.addEventListener("change", () => {
      state.progress = state.progress || {};
      state.progress[key] = check.checked;
      saveState();
      updateProgress();
    });
  });

  function updateProgress() {
    const checks = $$('[data-progress]');
    const completed = checks.filter((check) => check.checked).length;
    const done = completed + (state.started ? 1 : 0);
    const percent = Math.round(done / 8 * 100);
    $("#progressText").textContent = `${percent}% готово`;
    $("#progressBar").style.width = `${percent}%`;
    $("#doneCounter").textContent = `${done} / 8`;
    $$(".stage-link").forEach((link) => {
      const target = link.dataset.target;
      const isDone = target === "start" ? Boolean(state.started) : Boolean(state.progress?.[target]);
      link.classList.toggle("is-done", isDone);
    });
  }

  const scoreInputs = $$('[data-score]');
  scoreInputs.forEach((input) => {
    const key = input.dataset.score;
    if (state.scores?.[key] !== undefined) input.value = state.scores[key];
    input.nextElementSibling.value = input.value;
    input.addEventListener("input", () => {
      state.scores = state.scores || {};
      state.scores[key] = Number(input.value);
      input.nextElementSibling.value = input.value;
      updateScore();
      saveState();
    });
  });

  function updateScore() {
    const total = scoreInputs.reduce((sum, input) => sum + Number(input.value), 0);
    $("#totalScore").textContent = String(total);
    let title = "Версия 0.1";
    let hint = "Двигай ползунки и найди следующий шаг улучшения.";
    if (total >= 10) { title = "Готово к показу"; hint = "Сильная работа. Подготовь короткое объяснение своих решений."; }
    else if (total >= 7) { title = "Почти готово"; hint = "Исправь один самый слабый критерий - этого достаточно для версии 2.0."; }
    else if (total >= 4) { title = "Есть основа"; hint = "Начни с фокуса и иерархии, потом возвращай декор."; }
    $("#scoreTitle").textContent = title;
    $("#scoreHint").textContent = hint;
  }

  $("#finishProject").addEventListener("click", () => {
    const completed = $$('[data-progress]').filter((check) => check.checked).length;
    const score = scoreInputs.reduce((sum, input) => sum + Number(input.value), 0);
    const product = currentProduct() || "товар";
    const message = $("#finalMessage");
    if (completed < 5) {
      message.innerHTML = `<b>Проект ещё собирается.</b><br>Готово этапов: ${completed} из 7. Вернись к серым точкам в маршруте и закрой самые важные шаги.`;
    } else {
      message.innerHTML = `<b>Проект «${escapeHtml(product)}» готов к презентации!</b><br>Самооценка: ${score}/12. Покажи PNG и за 20 секунд объясни: кто аудитория, где главный фокус и какое решение ты принял(а) сам(а), а не отдал(а) нейросети.`;
    }
    message.classList.remove("is-visible");
    requestAnimationFrame(() => message.classList.add("is-visible"));
  });

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
  }

  $("#resetButton").addEventListener("click", () => {
    const okay = window.confirm("Очистить все ответы и начать лист заново?");
    if (!okay) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });

  if (state.generatedPrompt) $("#promptResult").textContent = state.generatedPrompt;
  updateBenefitCounter();
  updateBrief();
  saveHierarchyOrder();
  applyLayout();
  updateCanvaMeter();
  updateQualityMeter();
  updateProgress();
  updateScore();
})();
