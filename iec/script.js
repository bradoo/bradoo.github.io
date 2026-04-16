// IT English Coach - Enhanced Version
// Data Models and State Management

const scenarios = [
    {
        id: 'standup',
        title: 'Daily Standup',
        level: 'Beginner Friendly',
        goal: '在 30 秒内清晰汇报昨天完成的工作、今天计划以及是否存在 blocker。',
        focusTitle: 'Daily Standup Update',
        focusDescription: '练习 yesterday / today / blocker 三段式表达，让站会发言更清楚。',
        phrases: [
            'Yesterday, I finished the API integration for the payment module.',
            'Today, I’m going to validate the test cases and prepare the deployment checklist.',
            'I’m currently blocked by the staging environment issue.'
        ],
        alternatives: [
            'I wrapped up...',
            'I’ll focus on...',
            'One thing slowing me down is...'
        ],
        tip: '站会发言尽量短句，先讲结果，再讲计划，最后补充风险或阻塞。',
        advice: '避免长篇背景说明；如果 blocker 需要协助，明确说明你需要谁支持。'
    },
    {
        id: 'bug',
        title: 'Bug Reporting',
        level: 'Core Workplace Skill',
        goal: '准确描述问题现象、影响范围、复现条件和优先级。',
        focusTitle: 'Bug Reporting',
        focusDescription: '用结构化表达汇报问题，而不是只说 “it doesn’t work”。',
        phrases: [
            'We found an issue where users are logged out unexpectedly after password reset.',
            'The bug only occurs in Safari and affects the checkout flow.',
            'We can reproduce it consistently in the staging environment.'
        ],
        alternatives: [
            'The issue seems to happen when...',
            'The impact is limited to...',
            'We’re treating this as high priority.'
        ],
        tip: 'Bug 报告常用 where / when / impact / reproduce 这四个维度。',
        advice: '如果你不能马上解释原因，也要先把影响与现象说清楚。'
    },
    {
        id: 'review',
        title: 'Code Review',
        level: 'Professional Tone',
        goal: '在评审代码时提出清晰、礼貌、可执行的建议。',
        focusTitle: 'Code Review Feedback',
        focusDescription: '学习如何表达建议，而不是给人命令感。',
        phrases: [
            'Could we simplify this logic by extracting it into a helper function?',
            'I think this variable name could be more descriptive.',
            'Would it make sense to add a test case for this edge case?'
        ],
        alternatives: [
            'One suggestion would be to...',
            'It might be clearer if we...',
            'We may want to consider...'
        ],
        tip: 'Code review 里尽量用 suggestion language，减少直接否定。',
        advice: '先认可优点，再提出建议，更容易建立协作氛围。'
    },
    {
        id: 'client',
        title: 'Client Communication',
        level: 'Business Critical',
        goal: '向客户同步进度、解释风险并管理预期。',
        focusTitle: 'Client Update',
        focusDescription: '练习如何在专业、透明的前提下管理客户预期。',
        phrases: [
            'We’re still on track for the planned release this Friday.',
            'There is one risk we’d like to highlight regarding third-party integration.',
            'We’ll keep you posted as soon as we complete the validation.'
        ],
        alternatives: [
            'At this stage, we expect...',
            'One point to note is...',
            'We’ll share the next update by...'
        ],
        tip: '客户沟通要避免太技术化，重点突出进度、风险和下一步。',
        advice: '不要只报好消息；适当提前暴露风险更能建立信任。'
    },
    {
        id: 'incident',
        title: 'Incident Response',
        level: 'High Pressure',
        goal: '在故障处理中快速同步状态、行动和下一次更新时间。',
        focusTitle: 'Incident Response',
        focusDescription: '练习故障期间的即时同步表达，减少混乱和重复沟通。',
        phrases: [
            'We’re currently investigating the production latency issue.',
            'The engineering team has identified a possible database bottleneck.',
            'We’ll provide the next update in 15 minutes.'
        ],
        alternatives: [
            'At the moment, we’re seeing...',
            'Our immediate priority is to...',
            'We’ll continue to post updates regularly.'
        ],
        tip: '故障沟通中最重要的是 current status、action taken、next update。',
        advice: '保持更新节奏，即使暂时没有根因，也要同步现状和下一步。'
    }
];

const expressionGroups = [
    {
        title: 'Opening',
        items: [
            "Let's get started.",
            "Thanks everyone for joining.",
            "The main purpose of today's meeting is to..."
        ]
    },
    {
        title: 'Clarifying',
        items: [
            "Just to clarify, do you mean...?",
            "Could you elaborate on that point?",
            "If I understand correctly, you're saying that..."
        ]
    },
    {
        title: 'Suggesting',
        items: [
            "One option could be to...",
            "It might help if we...",
            "I'd recommend starting with..."
        ]
    },
    {
        title: 'Disagreeing Politely',
        items: [
            "I see your point, but I have a slightly different view.",
            "I'm not sure that approach would solve the root cause.",
            "Could we consider an alternative?"
        ]
    },
    {
        title: 'Summarizing',
        items: [
            "So, to summarize, we have three next steps.",
            "It sounds like we're aligned on the priority.",
            "The key takeaway is that we need..."
        ]
    },
    {
        title: 'Following Up',
        items: [
            "I'll send out the notes after the meeting.",
            "Let's reconnect tomorrow to review the progress.",
            "Please feel free to message me if anything changes."
        ]
    }
];

const speakingCards = [
    {
        sentence: 'I’m still waiting on confirmation from the infrastructure team.',
        meaning: '我还在等待基础设施团队的确认。',
        pronunciation: '重音建议：still / waiting / confirmation / infrastructure',
        usage: '适用于说明依赖他人反馈、自己暂时无法继续推进的情况。'
    },
    {
        sentence: 'We may need to revisit the timeline based on the latest findings.',
        meaning: '根据最新发现，我们可能需要重新评估时间线。',
        pronunciation: '注意 may need to、revisit、timeline 的连读和停顿。',
        usage: '适用于项目风险暴露后，温和调整预期。'
    },
    {
        sentence: 'I’d like to walk you through the root cause and the proposed fix.',
        meaning: '我想带你过一遍根因和建议的修复方案。',
        pronunciation: '重点练习 walk you through 的自然连读。',
        usage: '适用于故障复盘、技术说明和方案讲解。'
    }
];

const quizData = {
    question: '在英文站会中，如果你想表达“我现在被测试环境问题卡住了”，哪句最自然？',
    options: [
        'I am very difficult because the environment has problem.',
        'I’m currently blocked by an issue in the test environment.',
        'The test environment makes me not continue.',
        'I have no way because test env is bad now.'
    ],
    answer: 1,
    explanation: 'blocked by an issue in... 是外企工作中非常自然的表达，简洁且专业。'
};

const learningPlan = [
    {
        day: 'Day 1',
        title: '站会表达基础',
        description: '学习 yesterday / today / blocker 三段式，并大声跟读 5 次。'
    },
    {
        day: 'Day 2',
        title: '邮件与即时消息改写',
        description: '把 3 句中文工作表达改写成更职业的英文。'
    },
    {
        day: 'Day 3',
        title: 'Bug Reporting',
        description: '练习 how it happens / impact / next step 三个维度。'
    },
    {
        day: 'Day 4',
        title: 'Code Review 礼貌表达',
        description: '重点学习 suggestion language，如 Could we... / It might help if...'
    },
    {
        day: 'Day 5',
        title: '客户同步',
        description: '练习如何同步进度、风险和下一次更新时间。'
    },
    {
        day: 'Day 6',
        title: '故障沟通',
        description: '练习 incident 状态更新模板，提升高压场景表达稳定性。'
    },
    {
        day: 'Day 7',
        title: '复盘与自测',
        description: '完成一次小测，并复述 5 句你最常用的工作表达。'
    }
];

const rewriteRules = [
    {
        match: /登录|login|sign\s*in/i,
        result: "I'll first work on the login issue today and share an update with you this afternoon.",
        tips: [
            "用 I'll first work on... 体现清晰行动顺序。",
            "用 share an update 更符合外企语境。",
            "this afternoon 比 later today 更具体。"
        ]
    },
    {
        match: /延迟|delay|risk|风险|timeline|时间/i,
        result: "There may be a risk to the current timeline, and I'd like to keep you posted as we validate the impact.",
        tips: [
            "There may be a risk to... 是更温和、专业的风险提示。",
            "keep you posted 是常见的外企同步表达。",
            "validate the impact 表示先确认影响，再给出结论。"
        ]
    },
    {
        match: /会议|meeting|讨论/i,
        result: 'Could we set up a quick meeting to align on the next steps and responsibilities?',
        tips: [
            "set up a quick meeting 很自然。",
            "align on... 表示对齐共识，是会议高频表达。",
            "next steps and responsibilities 让诉求更完整。"
        ]
    },
    {
        match: /修复|fix|bug|问题/i,
        result: "We've identified the issue and are currently working on a fix. I'll keep you updated on the progress.",
        tips: [
            "identified the issue 说明问题已被定位。",
            "currently working on a fix 表达当前处理状态。",
            "keep you updated 是稳定、职业的沟通方式。"
        ]
    },
    {
        match: /测试|test|qa/i,
        result: "I'll coordinate with the QA team to ensure we have proper test coverage before the release.",
        tips: [
            "coordinate with 表示协调配合。",
            "proper test coverage 是测试覆盖率的专业表达。",
            "before the release 明确时间节点。"
        ]
    },
    {
        match: /部署|deploy|release|发布/i,
        result: "We're planning to deploy this to production on Friday, pending final approval from the team.",
        tips: [
            "deploy to production 是部署到生产环境的标准说法。",
            "pending approval 表示等待批准。",
            "明确时间点让沟通更清晰。"
        ]
    }
];

const dayTwoPrompts = [
    {
        title: '进度同步',
        type: 'Update',
        source: '中文原句：这个任务我今天下午完成后同步给你。',
        input: '这个任务我今天下午完成后同步给你。',
        rewrite: 'I’ll complete this task this afternoon and share an update with you right after that.',
        tips: [
            '先说明完成时间，再说明你会如何同步。',
            'share an update 比 tell you 更职业。',
            'right after that 让下一步动作更明确。'
        ]
    },
    {
        title: '风险提醒',
        type: 'Delay',
        source: '中文原句：这个问题可能会影响当前时间线，我确认后再同步给你。',
        input: '这个问题可能会影响当前时间线，我确认后再同步给你。',
        rewrite: 'There may be a risk to the current timeline, and I’ll share another update once I confirm the impact.',
        tips: [
            'There may be a risk to... 是更稳妥的风险表达。',
            'confirm the impact 强调先确认、再同步。',
            'another update 让后续动作更具体。'
        ]
    },
    {
        title: '请求支持',
        type: 'Request',
        source: '中文原句：你今天可以帮我确认一下这个需求吗？这样我就能继续推进。',
        input: '你今天可以帮我确认一下这个需求吗？这样我就能继续推进。',
        rewrite: 'Could you help confirm this requirement today so I can keep moving this forward?',
        tips: [
            'Could you help... 语气更礼貌。',
            'confirm this requirement today 点明对象和时间。',
            'keep moving this forward 常用于推进协作事项。'
        ]
    }
];

// Application State
let currentScenarioIndex = 0;
let currentSpeakingIndex = 0;
let currentDayTwoIndex = 0;
let quizAnswered = false;
let userProgress = {
    streak: 6,
    todayCompleted: 4,
    todayGoal: 5,
    masteredPhrases: 128,
    confidenceScore: 82
};

const scenarioTabsEl = document.getElementById('scenarioTabs');
const scenarioTitleEl = document.getElementById('scenarioTitle');
const scenarioLevelEl = document.getElementById('scenarioLevel');
const scenarioGoalEl = document.getElementById('scenarioGoal');
const scenarioPhrasesEl = document.getElementById('scenarioPhrases');
const scenarioAlternativesEl = document.getElementById('scenarioAlternatives');
const scenarioTipEl = document.getElementById('scenarioTip');
const scenarioAdviceEl = document.getElementById('scenarioAdvice');
const focusTitleEl = document.getElementById('focusTitle');
const focusDescriptionEl = document.getElementById('focusDescription');

const rewriteInputEl = document.getElementById('rewriteInput');
const rewriteBtnEl = document.getElementById('rewriteBtn');
const loadSampleBtnEl = document.getElementById('loadSampleBtn');
const rewriteResultEl = document.getElementById('rewriteResult');
const rewriteTipsEl = document.getElementById('rewriteTips');
const feedbackToneEl = document.getElementById('feedbackTone');
const feedbackScenarioEl = document.getElementById('feedbackScenario');
const feedbackActionEl = document.getElementById('feedbackAction');

const expressionGroupsEl = document.getElementById('expressionGroups');

const speakingSentenceEl = document.getElementById('speakingSentence');
const speakingMeaningEl = document.getElementById('speakingMeaning');
const speakingPronunciationEl = document.getElementById('speakingPronunciation');
const speakingUsageEl = document.getElementById('speakingUsage');
const prevSpeakingBtnEl = document.getElementById('prevSpeakingBtn');
const nextSpeakingBtnEl = document.getElementById('nextSpeakingBtn');

const quizQuestionEl = document.getElementById('quizQuestion');
const quizOptionsEl = document.getElementById('quizOptions');
const quizFeedbackEl = document.getElementById('quizFeedback');

const planListEl = document.getElementById('planList');
const themeToggleEl = document.getElementById('themeToggle');
const startLearningBtnEl = document.getElementById('startLearningBtn');
const jumpRewriteBtnEl = document.getElementById('jumpRewriteBtn');
const dailyFocusBtnEl = document.getElementById('dailyFocusBtn');
const showFavoritesBtnEl = document.getElementById('showFavoritesBtn');
const randomPracticeBtnEl = document.getElementById('randomPracticeBtn');
const exportProgressBtnEl = document.getElementById('exportProgressBtn');
const importProgressBtnEl = document.getElementById('importProgressBtn');
const importProgressInputEl = document.getElementById('importProgressInput');

const day2PromptTitleEl = document.getElementById('day2PromptTitle');
const day2PromptTypeEl = document.getElementById('day2PromptType');
const day2PromptSourceEl = document.getElementById('day2PromptSource');
const day2RewriteResultEl = document.getElementById('day2RewriteResult');
const day2CoachTipsEl = document.getElementById('day2CoachTips');
const day2PrevBtnEl = document.getElementById('day2PrevBtn');
const day2NextBtnEl = document.getElementById('day2NextBtn');
const day2UsePromptBtnEl = document.getElementById('day2UsePromptBtn');

function renderScenarioTabs() {
    scenarioTabsEl.innerHTML = scenarios
        .map((scenario, index) => `
            <button class="scenario-tab ${index === currentScenarioIndex ? 'active' : ''}" data-index="${index}">
                ${scenario.title}
            </button>
        `)
        .join('');

    document.querySelectorAll('.scenario-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            currentScenarioIndex = Number(tab.dataset.index);
            renderScenarioTabs();
            renderScenarioDetail();
        });
    });
}

function renderScenarioDetail() {
    const scenario = scenarios[currentScenarioIndex];
    scenarioTitleEl.textContent = scenario.title;
    scenarioLevelEl.textContent = scenario.level;
    scenarioGoalEl.textContent = scenario.goal;
    scenarioTipEl.textContent = scenario.tip;
    scenarioAdviceEl.textContent = scenario.advice;
    focusTitleEl.textContent = scenario.focusTitle;
    focusDescriptionEl.textContent = scenario.focusDescription;

    scenarioPhrasesEl.innerHTML = scenario.phrases.map((item) => `<li>${item}</li>`).join('');
    scenarioAlternativesEl.innerHTML = scenario.alternatives.map((item) => `<li>${item}</li>`).join('');
}

function renderExpressionGroups() {
    expressionGroupsEl.innerHTML = expressionGroups
        .map((group) => `
            <article class="expression-card expression-group">
                <h3>${group.title}</h3>
                <ul>
                    ${group.items.map((item) => `
                        <li class="expression-item">
                            <span>${item}</span>
                            <button
                                class="favorite-btn"
                                type="button"
                                aria-label="收藏表达：${item}"
                                data-phrase="${item.replace(/"/g, '"')}"
                            >
                                ⭐
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </article>
        `)
        .join('');

    document.querySelectorAll('.favorite-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const phrase = button.dataset.phrase;
            if (window.toggleFavorite) {
                window.toggleFavorite(phrase);
                return;
            }

            button.classList.toggle('active');
            button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
        });
    });
}

function renderSpeakingCard() {
    const card = speakingCards[currentSpeakingIndex];
    speakingSentenceEl.textContent = card.sentence;
    speakingMeaningEl.textContent = card.meaning;
    speakingPronunciationEl.textContent = `发音提示：${card.pronunciation}`;
    speakingUsageEl.textContent = `适用场景：${card.usage}`;
}

function renderQuiz() {
    quizQuestionEl.textContent = quizData.question;
    quizOptionsEl.innerHTML = quizData.options
        .map((option, index) => `<button class="quiz-option" data-index="${index}">${option}</button>`)
        .join('');
    quizFeedbackEl.textContent = '请选择一个最自然的表达。';

    document.querySelectorAll('.quiz-option').forEach((button) => {
        button.addEventListener('click', () => {
            if (quizAnswered) {
                return;
            }

            const selectedIndex = Number(button.dataset.index);
            quizAnswered = true;

            document.querySelectorAll('.quiz-option').forEach((optionButton, optionIndex) => {
                if (optionIndex === quizData.answer) {
                    optionButton.classList.add('correct');
                } else if (optionIndex === selectedIndex) {
                    optionButton.classList.add('wrong');
                }
            });

            quizFeedbackEl.textContent =
                selectedIndex === quizData.answer
                    ? `回答正确：${quizData.explanation}`
                    : `再想想看：${quizData.explanation}`;
        });
    });
}

function renderPlan() {
    planListEl.innerHTML = learningPlan
        .map((item, index) => `
            <article class="plan-item" data-plan-index="${index}" tabindex="0" role="button" aria-label="查看${item.day}：${item.title}">
                <div class="plan-day">${item.day}</div>
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </article>
        `)
        .join('');

    document.querySelectorAll('.plan-item').forEach((item) => {
        item.addEventListener('click', () => {
            const planIndex = Number(item.dataset.planIndex);
            if (planIndex === 1) {
                document.getElementById('day2').scrollIntoView({ behavior: 'smooth' });
                return;
            }

            document.getElementById('rewrite').scrollIntoView({ behavior: 'smooth' });
        });

        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                item.click();
            }
        });
    });
}

function renderDayTwoPrompt() {
    if (!day2PromptTitleEl) {
        return;
    }

    const prompt = dayTwoPrompts[currentDayTwoIndex];
    day2PromptTitleEl.textContent = prompt.title;
    day2PromptTypeEl.textContent = prompt.type;
    day2PromptSourceEl.textContent = prompt.source;
    day2RewriteResultEl.textContent = prompt.rewrite;
    day2CoachTipsEl.innerHTML = prompt.tips.map((tip) => `<li>${tip}</li>`).join('');
}

function loadCurrentDayTwoPrompt() {
    const prompt = dayTwoPrompts[currentDayTwoIndex];
    rewriteInputEl.value = prompt.input;
    rewriteInputEl.focus();
    document.getElementById('rewrite').scrollIntoView({ behavior: 'smooth' });
    rewriteInputText();
}

function updateRewriteFeedback(tone, scenario, action) {
    if (feedbackToneEl) {
        feedbackToneEl.textContent = tone;
    }

    if (feedbackScenarioEl) {
        feedbackScenarioEl.textContent = scenario;
    }

    if (feedbackActionEl) {
        feedbackActionEl.textContent = action;
    }
}

function rewriteInputText() {
    const input = rewriteInputEl.value.trim();

    if (!input) {
        rewriteResultEl.textContent = 'Please enter a sentence first so I can help rewrite it into more professional workplace English.';
        rewriteTipsEl.innerHTML = `
            <li>可以输入中文，例如"我下午会给你更新"。</li>
            <li>也可以输入基础英文，例如"we have some risk"。</li>
            <li>系统会给出更职业的英文表达方向。</li>
        `;
        updateRewriteFeedback('Needs input', 'General workplace English', 'Write one sentence first');
        return;
    }

    const matchedRule = rewriteRules.find((rule) => rule.match.test(input));

    if (matchedRule) {
        rewriteResultEl.textContent = matchedRule.result;
        rewriteTipsEl.innerHTML = matchedRule.tips.map((tip) => `<li>${tip}</li>`).join('');
        updateRewriteFeedback('Professional', scenarios[currentScenarioIndex].title, 'Use it in your next update');
        
        // Update progress
        updateProgress();
        return;
    }

    // Default fallback response
    rewriteResultEl.textContent = "Thanks for the context. Here is a more professional version: I'd like to share a quick update and align on the next steps so we can move this forward efficiently.";
    rewriteTipsEl.innerHTML = `
        <li>share a quick update 常用于同步进度。</li>
        <li>align on the next steps 是高频协作表达。</li>
        <li>move this forward efficiently 让语气更积极、更职业。</li>
    `;
    updateRewriteFeedback('Neutral to professional', 'Cross-team collaboration', 'Refine and send');
    
    updateProgress();
}

function startRandomPractice() {
    currentScenarioIndex = Math.floor(Math.random() * scenarios.length);
    currentSpeakingIndex = Math.floor(Math.random() * speakingCards.length);
    quizAnswered = false;
    renderScenarioTabs();
    renderScenarioDetail();
    renderSpeakingCard();
    renderQuiz();
    document.getElementById('scenarios').scrollIntoView({ behavior: 'smooth' });
}

function updateFavoritesButtonLabel(count) {
    if (!showFavoritesBtnEl) {
        return;
    }

    showFavoritesBtnEl.textContent = count > 0 ? `查看收藏 (${count})` : '查看收藏';
}

function triggerImportProgress() {
    if (importProgressInputEl) {
        importProgressInputEl.value = '';
        importProgressInputEl.click();
    }
}

function updateProgress() {
    // Increment today's completed tasks
    if (userProgress.todayCompleted < userProgress.todayGoal) {
        userProgress.todayCompleted++;
        document.querySelector('.stat-card:nth-child(2) .stat-value').textContent =
            `${userProgress.todayCompleted} / ${userProgress.todayGoal}`;
    }
}

function loadSample() {
    rewriteInputEl.value = '这个问题可能会影响当前时间线，我确认后再同步给你。';
    rewriteInputText();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggleEl.textContent = isLight ? '切换深色' : '切换主题';
    localStorage.setItem('itEnglishCoachTheme', isLight ? 'light' : 'dark');
}

function handleThemeToggle() {
    if (window.enhancedToggleTheme) {
        window.enhancedToggleTheme();
        return;
    }

    toggleTheme();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('itEnglishCoachTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleEl.textContent = '切换深色';
    }
}

function loadProgress() {
    const savedProgress = localStorage.getItem('itEnglishCoachProgress');
    if (savedProgress) {
        try {
            userProgress = JSON.parse(savedProgress);
            updateProgressDisplay();
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
    }
}

function saveProgress() {
    localStorage.setItem('itEnglishCoachProgress', JSON.stringify(userProgress));
}

function updateProgressDisplay() {
    document.getElementById('streakValue').textContent = `${userProgress.streak} 天`;
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent =
        `${userProgress.todayCompleted} / ${userProgress.todayGoal}`;
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent =
        userProgress.masteredPhrases;
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent =
        `${userProgress.confidenceScore}%`;
}

function bindEvents() {
    rewriteBtnEl.addEventListener('click', () => {
        if (window.enhancedRewriteInputText) {
            window.enhancedRewriteInputText();
            return;
        }

        rewriteInputText();
    });

    loadSampleBtnEl.addEventListener('click', loadSample);

    prevSpeakingBtnEl.addEventListener('click', () => {
        currentSpeakingIndex = (currentSpeakingIndex - 1 + speakingCards.length) % speakingCards.length;
        renderSpeakingCard();
    });

    nextSpeakingBtnEl.addEventListener('click', () => {
        currentSpeakingIndex = (currentSpeakingIndex + 1) % speakingCards.length;
        renderSpeakingCard();
    });

    themeToggleEl.addEventListener('click', handleThemeToggle);

    if (showFavoritesBtnEl) {
        showFavoritesBtnEl.addEventListener('click', () => {
            if (window.showFavorites) {
                window.showFavorites();
            }
        });
    }

    if (randomPracticeBtnEl) {
        randomPracticeBtnEl.addEventListener('click', startRandomPractice);
    }

    if (exportProgressBtnEl) {
        exportProgressBtnEl.addEventListener('click', () => {
            if (window.exportProgress) {
                window.exportProgress();
            }
        });
    }

    if (importProgressBtnEl) {
        importProgressBtnEl.addEventListener('click', triggerImportProgress);
    }

    if (importProgressInputEl) {
        importProgressInputEl.addEventListener('change', (event) => {
            const [file] = event.target.files;
            if (file && window.importProgress) {
                window.importProgress(file);
            }
        });
    }

    if (day2PrevBtnEl) {
        day2PrevBtnEl.addEventListener('click', () => {
            currentDayTwoIndex = (currentDayTwoIndex - 1 + dayTwoPrompts.length) % dayTwoPrompts.length;
            renderDayTwoPrompt();
        });
    }

    if (day2NextBtnEl) {
        day2NextBtnEl.addEventListener('click', () => {
            currentDayTwoIndex = (currentDayTwoIndex + 1) % dayTwoPrompts.length;
            renderDayTwoPrompt();
        });
    }

    if (day2UsePromptBtnEl) {
        day2UsePromptBtnEl.addEventListener('click', loadCurrentDayTwoPrompt);
    }

    startLearningBtnEl.addEventListener('click', () => {
        document.getElementById('scenarios').scrollIntoView({ behavior: 'smooth' });
    });

    jumpRewriteBtnEl.addEventListener('click', () => {
        document.getElementById('rewrite').scrollIntoView({ behavior: 'smooth' });
    });

    dailyFocusBtnEl.addEventListener('click', () => {
        if (window.showDailyFocusModal) {
            window.showDailyFocusModal();
            return;
        }

        alert(`Today's focus: ${scenarios[currentScenarioIndex].focusTitle}\n\n${scenarios[currentScenarioIndex].focusDescription}`);
    });
}

function init() {
    loadTheme();
    loadProgress();
    renderScenarioTabs();
    renderScenarioDetail();
    renderDayTwoPrompt();
    renderExpressionGroups();
    renderSpeakingCard();
    renderQuiz();
    renderPlan();
    updateRewriteFeedback('Professional', 'Daily update', 'Send in chat or email');
    bindEvents();
    
    // Save progress periodically
    setInterval(saveProgress, 30000); // Save every 30 seconds
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Made with Bob
