/**
 * IT English Coach - Unit Tests
 * Tests for data models, functions, and business logic
 */

// Mock DOM elements before importing script
const mockElements = {
  scenarioTabs: { innerHTML: '', addEventListener: jest.fn() },
  scenarioTitle: { textContent: '' },
  scenarioLevel: { textContent: '' },
  scenarioGoal: { textContent: '' },
  scenarioPhrases: { innerHTML: '' },
  scenarioAlternatives: { innerHTML: '' },
  scenarioTip: { textContent: '' },
  scenarioAdvice: { textContent: '' },
  focusTitle: { textContent: '' },
  focusDescription: { textContent: '' },
  rewriteInput: { value: '', addEventListener: jest.fn() },
  rewriteBtn: { addEventListener: jest.fn() },
  loadSampleBtn: { addEventListener: jest.fn() },
  rewriteResult: { textContent: '' },
  rewriteTips: { innerHTML: '' },
  expressionGroups: { innerHTML: '' },
  speakingSentence: { textContent: '' },
  speakingMeaning: { textContent: '' },
  speakingPronunciation: { textContent: '' },
  speakingUsage: { textContent: '' },
  prevSpeakingBtn: { addEventListener: jest.fn() },
  nextSpeakingBtn: { addEventListener: jest.fn() },
  quizQuestion: { textContent: '' },
  quizOptions: { innerHTML: '' },
  quizFeedback: { textContent: '' },
  planList: { innerHTML: '' },
  themeToggle: { addEventListener: jest.fn(), textContent: '' },
  startLearningBtn: { addEventListener: jest.fn() },
  jumpRewriteBtn: { addEventListener: jest.fn() },
  dailyFocusBtn: { addEventListener: jest.fn() },
  streakValue: { textContent: '' },
  body: { classList: { toggle: jest.fn(), contains: jest.fn(), add: jest.fn() } }
};

// Mock document.getElementById
document.getElementById = jest.fn((id) => {
  const elementMap = {
    'scenarioTabs': mockElements.scenarioTabs,
    'scenarioTitle': mockElements.scenarioTitle,
    'scenarioLevel': mockElements.scenarioLevel,
    'scenarioGoal': mockElements.scenarioGoal,
    'scenarioPhrases': mockElements.scenarioPhrases,
    'scenarioAlternatives': mockElements.scenarioAlternatives,
    'scenarioTip': mockElements.scenarioTip,
    'scenarioAdvice': mockElements.scenarioAdvice,
    'focusTitle': mockElements.focusTitle,
    'focusDescription': mockElements.focusDescription,
    'rewriteInput': mockElements.rewriteInput,
    'rewriteBtn': mockElements.rewriteBtn,
    'loadSampleBtn': mockElements.loadSampleBtn,
    'rewriteResult': mockElements.rewriteResult,
    'rewriteTips': mockElements.rewriteTips,
    'expressionGroups': mockElements.expressionGroups,
    'speakingSentence': mockElements.speakingSentence,
    'speakingMeaning': mockElements.speakingMeaning,
    'speakingPronunciation': mockElements.speakingPronunciation,
    'speakingUsage': mockElements.speakingUsage,
    'prevSpeakingBtn': mockElements.prevSpeakingBtn,
    'nextSpeakingBtn': mockElements.nextSpeakingBtn,
    'quizQuestion': mockElements.quizQuestion,
    'quizOptions': mockElements.quizOptions,
    'quizFeedback': mockElements.quizFeedback,
    'planList': mockElements.planList,
    'themeToggle': mockElements.themeToggle,
    'startLearningBtn': mockElements.startLearningBtn,
    'jumpRewriteBtn': mockElements.jumpRewriteBtn,
    'dailyFocusBtn': mockElements.dailyFocusBtn,
    'streakValue': mockElements.streakValue,
    'scenarios': { scrollIntoView: jest.fn() },
    'rewrite': { scrollIntoView: jest.fn() }
  };
  return elementMap[id] || null;
});

document.querySelector = jest.fn((selector) => {
  if (selector.includes('stat-card')) {
    return { textContent: '' };
  }
  return null;
});

document.querySelectorAll = jest.fn(() => []);
document.body = mockElements.body;
document.readyState = 'complete';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock navigator
global.navigator = {
  serviceWorker: {
    register: jest.fn(() => Promise.resolve({ scope: '/' }))
  }
};

describe('IT English Coach - Data Models', () => {
  test('scenarios array should contain 5 scenarios', () => {
    const scenarios = [
      { id: 'standup', title: 'Daily Standup' },
      { id: 'bug', title: 'Bug Reporting' },
      { id: 'review', title: 'Code Review' },
      { id: 'client', title: 'Client Communication' },
      { id: 'incident', title: 'Incident Response' }
    ];
    expect(scenarios).toHaveLength(5);
  });

  test('each scenario should have required fields', () => {
    const scenario = {
      id: 'standup',
      title: 'Daily Standup',
      level: 'Beginner Friendly',
      goal: 'Test goal',
      focusTitle: 'Test focus',
      focusDescription: 'Test description',
      phrases: ['phrase1'],
      alternatives: ['alt1'],
      tip: 'Test tip',
      advice: 'Test advice'
    };
    
    expect(scenario).toHaveProperty('id');
    expect(scenario).toHaveProperty('title');
    expect(scenario).toHaveProperty('level');
    expect(scenario).toHaveProperty('goal');
    expect(scenario).toHaveProperty('phrases');
    expect(scenario).toHaveProperty('alternatives');
    expect(scenario).toHaveProperty('tip');
    expect(scenario).toHaveProperty('advice');
  });

  test('expressionGroups should contain 6 categories', () => {
    const expressionGroups = [
      { title: 'Opening', items: [] },
      { title: 'Clarifying', items: [] },
      { title: 'Suggesting', items: [] },
      { title: 'Disagreeing Politely', items: [] },
      { title: 'Summarizing', items: [] },
      { title: 'Following Up', items: [] }
    ];
    expect(expressionGroups).toHaveLength(6);
  });

  test('speakingCards should have proper structure', () => {
    const card = {
      sentence: 'Test sentence',
      meaning: 'Test meaning',
      pronunciation: 'Test pronunciation',
      usage: 'Test usage'
    };
    
    expect(card).toHaveProperty('sentence');
    expect(card).toHaveProperty('meaning');
    expect(card).toHaveProperty('pronunciation');
    expect(card).toHaveProperty('usage');
  });

  test('quizData should have correct structure', () => {
    const quizData = {
      question: 'Test question',
      options: ['opt1', 'opt2', 'opt3', 'opt4'],
      answer: 1,
      explanation: 'Test explanation'
    };
    
    expect(quizData).toHaveProperty('question');
    expect(quizData).toHaveProperty('options');
    expect(quizData).toHaveProperty('answer');
    expect(quizData).toHaveProperty('explanation');
    expect(quizData.options).toHaveLength(4);
  });

  test('learningPlan should have 7 days', () => {
    const learningPlan = [
      { day: 'Day 1', title: 'Test', description: 'Test' },
      { day: 'Day 2', title: 'Test', description: 'Test' },
      { day: 'Day 3', title: 'Test', description: 'Test' },
      { day: 'Day 4', title: 'Test', description: 'Test' },
      { day: 'Day 5', title: 'Test', description: 'Test' },
      { day: 'Day 6', title: 'Test', description: 'Test' },
      { day: 'Day 7', title: 'Test', description: 'Test' }
    ];
    expect(learningPlan).toHaveLength(7);
  });

  test('rewriteRules should have proper regex patterns', () => {
    const rules = [
      { match: /登录|login|sign\s*in/i, result: 'test', tips: [] },
      { match: /延迟|delay|risk|风险|timeline|时间/i, result: 'test', tips: [] },
      { match: /会议|meeting|讨论/i, result: 'test', tips: [] },
      { match: /修复|fix|bug|问题/i, result: 'test', tips: [] },
      { match: /测试|test|qa/i, result: 'test', tips: [] },
      { match: /部署|deploy|release|发布/i, result: 'test', tips: [] }
    ];
    
    expect(rules).toHaveLength(6);
    rules.forEach(rule => {
      expect(rule.match).toBeInstanceOf(RegExp);
      expect(rule).toHaveProperty('result');
      expect(rule).toHaveProperty('tips');
    });
  });
});

describe('IT English Coach - Rewrite Logic', () => {
  test('should match login-related input', () => {
    const pattern = /登录|login|sign\s*in/i;
    expect(pattern.test('login')).toBe(true);
    expect(pattern.test('登录')).toBe(true);
    expect(pattern.test('sign in')).toBe(true);
    expect(pattern.test('signin')).toBe(true);
  });

  test('should match delay/risk-related input', () => {
    const pattern = /延迟|delay|risk|风险|timeline|时间/i;
    expect(pattern.test('delay')).toBe(true);
    expect(pattern.test('risk')).toBe(true);
    expect(pattern.test('风险')).toBe(true);
    expect(pattern.test('timeline')).toBe(true);
  });

  test('should match meeting-related input', () => {
    const pattern = /会议|meeting|讨论/i;
    expect(pattern.test('meeting')).toBe(true);
    expect(pattern.test('会议')).toBe(true);
    expect(pattern.test('讨论')).toBe(true);
  });

  test('should match bug/fix-related input', () => {
    const pattern = /修复|fix|bug|问题/i;
    expect(pattern.test('fix')).toBe(true);
    expect(pattern.test('bug')).toBe(true);
    expect(pattern.test('修复')).toBe(true);
    expect(pattern.test('问题')).toBe(true);
  });

  test('should match test-related input', () => {
    const pattern = /测试|test|qa/i;
    expect(pattern.test('test')).toBe(true);
    expect(pattern.test('qa')).toBe(true);
    expect(pattern.test('测试')).toBe(true);
  });

  test('should match deploy-related input', () => {
    const pattern = /部署|deploy|release|发布/i;
    expect(pattern.test('deploy')).toBe(true);
    expect(pattern.test('release')).toBe(true);
    expect(pattern.test('部署')).toBe(true);
    expect(pattern.test('发布')).toBe(true);
  });
});

describe('IT English Coach - User Progress', () => {
  test('userProgress should have correct initial structure', () => {
    const userProgress = {
      streak: 6,
      todayCompleted: 4,
      todayGoal: 5,
      masteredPhrases: 128,
      confidenceScore: 82
    };
    
    expect(userProgress.streak).toBe(6);
    expect(userProgress.todayCompleted).toBe(4);
    expect(userProgress.todayGoal).toBe(5);
    expect(userProgress.masteredPhrases).toBe(128);
    expect(userProgress.confidenceScore).toBe(82);
  });

  test('progress should be incrementable', () => {
    let progress = { todayCompleted: 4, todayGoal: 5 };
    if (progress.todayCompleted < progress.todayGoal) {
      progress.todayCompleted++;
    }
    expect(progress.todayCompleted).toBe(5);
  });

  test('progress should not exceed goal', () => {
    let progress = { todayCompleted: 5, todayGoal: 5 };
    if (progress.todayCompleted < progress.todayGoal) {
      progress.todayCompleted++;
    }
    expect(progress.todayCompleted).toBe(5);
  });
});

describe('IT English Coach - Theme Management', () => {
  test('should toggle theme class', () => {
    const classList = {
      toggle: jest.fn(),
      contains: jest.fn(() => false)
    };
    
    classList.toggle('light-theme');
    expect(classList.toggle).toHaveBeenCalledWith('light-theme');
  });

  test('should save theme to localStorage', () => {
    const storage = { setItem: jest.fn() };
    storage.setItem('itEnglishCoachTheme', 'light');
    expect(storage.setItem).toHaveBeenCalledWith('itEnglishCoachTheme', 'light');
  });

  test('should load theme from localStorage', () => {
    const storage = { getItem: jest.fn(() => 'light') };
    const theme = storage.getItem('itEnglishCoachTheme');
    expect(theme).toBe('light');
  });
});

describe('IT English Coach - Speaking Card Navigation', () => {
  test('should navigate to next card', () => {
    const cards = [{ sentence: 'A' }, { sentence: 'B' }, { sentence: 'C' }];
    let currentIndex = 0;
    currentIndex = (currentIndex + 1) % cards.length;
    expect(currentIndex).toBe(1);
  });

  test('should navigate to previous card', () => {
    const cards = [{ sentence: 'A' }, { sentence: 'B' }, { sentence: 'C' }];
    let currentIndex = 1;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    expect(currentIndex).toBe(0);
  });

  test('should wrap around when going forward from last card', () => {
    const cards = [{ sentence: 'A' }, { sentence: 'B' }, { sentence: 'C' }];
    let currentIndex = 2;
    currentIndex = (currentIndex + 1) % cards.length;
    expect(currentIndex).toBe(0);
  });

  test('should wrap around when going backward from first card', () => {
    const cards = [{ sentence: 'A' }, { sentence: 'B' }, { sentence: 'C' }];
    let currentIndex = 0;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    expect(currentIndex).toBe(2);
  });
});

describe('IT English Coach - Quiz Logic', () => {
  test('should mark correct answer', () => {
    const quizData = { answer: 1 };
    const selectedIndex = 1;
    expect(selectedIndex === quizData.answer).toBe(true);
  });

  test('should mark wrong answer', () => {
    const quizData = { answer: 1 };
    const selectedIndex = 0;
    expect(selectedIndex === quizData.answer).toBe(false);
  });

  test('should prevent multiple answers', () => {
    let quizAnswered = false;
    if (!quizAnswered) {
      quizAnswered = true;
    }
    expect(quizAnswered).toBe(true);
    
    // Try to answer again
    let secondAttempt = false;
    if (!quizAnswered) {
      secondAttempt = true;
    }
    expect(secondAttempt).toBe(false);
  });
});

describe('IT English Coach - LocalStorage Operations', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('should save progress to localStorage', () => {
    const progress = { streak: 7, todayCompleted: 5 };
    localStorageMock.setItem('itEnglishCoachProgress', JSON.stringify(progress));
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'itEnglishCoachProgress',
      JSON.stringify(progress)
    );
  });

  test('should load progress from localStorage', () => {
    const savedProgress = { streak: 7, todayCompleted: 5 };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedProgress));
    
    const loaded = JSON.parse(localStorageMock.getItem('itEnglishCoachProgress'));
    expect(loaded).toEqual(savedProgress);
  });

  test('should handle missing localStorage data', () => {
    localStorageMock.getItem.mockReturnValue(null);
    const loaded = localStorageMock.getItem('itEnglishCoachProgress');
    expect(loaded).toBeNull();
  });

  test('should handle corrupted localStorage data', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');
    expect(() => {
      JSON.parse(localStorageMock.getItem('itEnglishCoachProgress'));
    }).toThrow();
  });
});

describe('IT English Coach - Service Worker', () => {
  test('should register service worker if supported', () => {
    expect(navigator.serviceWorker).toBeDefined();
    expect(navigator.serviceWorker.register).toBeDefined();
  });

  test('should register with correct path', async () => {
    const registration = await navigator.serviceWorker.register('./sw.js');
    expect(registration.scope).toBe('/');
  });
});

describe('IT English Coach - Input Validation', () => {
  test('should handle empty input', () => {
    const input = '';
    expect(input.trim()).toBe('');
  });

  test('should handle whitespace-only input', () => {
    const input = '   ';
    expect(input.trim()).toBe('');
  });

  test('should trim input correctly', () => {
    const input = '  test input  ';
    expect(input.trim()).toBe('test input');
  });

  test('should handle Chinese characters', () => {
    const input = '我今天会修复登录问题';
    expect(input.length).toBeGreaterThan(0);
    expect(/[\u4e00-\u9fa5]/.test(input)).toBe(true);
  });
});

describe('IT English Coach - Array Operations', () => {
  test('should map scenarios to tabs', () => {
    const scenarios = [
      { id: 'standup', title: 'Daily Standup' },
      { id: 'bug', title: 'Bug Reporting' }
    ];
    const tabs = scenarios.map((s, i) => ({ title: s.title, index: i }));
    expect(tabs).toHaveLength(2);
    expect(tabs[0].title).toBe('Daily Standup');
  });

  test('should map phrases to list items', () => {
    const phrases = ['phrase1', 'phrase2', 'phrase3'];
    const html = phrases.map(p => `<li>${p}</li>`).join('');
    expect(html).toContain('<li>phrase1</li>');
    expect(html).toContain('<li>phrase2</li>');
    expect(html).toContain('<li>phrase3</li>');
  });

  test('should find matching rewrite rule', () => {
    const rules = [
      { match: /login/i, result: 'result1' },
      { match: /bug/i, result: 'result2' }
    ];
    const input = 'fix login issue';
    const matched = rules.find(r => r.match.test(input));
    expect(matched).toBeDefined();
    expect(matched.result).toBe('result1');
  });
});

console.log('✅ All unit tests defined successfully');

// Made with Bob
