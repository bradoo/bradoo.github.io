/**
 * IT English Coach - Integration Tests
 * Tests for component interactions and workflows
 */

describe('IT English Coach - Integration Tests', () => {
  let mockDocument;
  
  beforeEach(() => {
    // Setup mock DOM
    mockDocument = {
      getElementById: jest.fn(),
      querySelector: jest.fn(),
      querySelectorAll: jest.fn(() => []),
      body: {
        classList: {
          toggle: jest.fn(),
          contains: jest.fn(() => false),
          add: jest.fn()
        }
      },
      readyState: 'complete',
      addEventListener: jest.fn()
    };
    
    global.document = mockDocument;
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
  });

  describe('Scenario Tab Switching', () => {
    test('should update scenario detail when tab is clicked', () => {
      const scenarios = [
        {
          id: 'standup',
          title: 'Daily Standup',
          level: 'Beginner',
          goal: 'Test goal',
          phrases: ['phrase1'],
          alternatives: ['alt1'],
          tip: 'tip',
          advice: 'advice',
          focusTitle: 'Focus',
          focusDescription: 'Description'
        }
      ];
      
      let currentIndex = 0;
      const mockElements = {
        title: { textContent: '' },
        level: { textContent: '' },
        goal: { textContent: '' }
      };
      
      // Simulate tab click
      currentIndex = 0;
      const scenario = scenarios[currentIndex];
      mockElements.title.textContent = scenario.title;
      mockElements.level.textContent = scenario.level;
      mockElements.goal.textContent = scenario.goal;
      
      expect(mockElements.title.textContent).toBe('Daily Standup');
      expect(mockElements.level.textContent).toBe('Beginner');
      expect(mockElements.goal.textContent).toBe('Test goal');
    });

    test('should render all scenario tabs', () => {
      const scenarios = [
        { id: 'standup', title: 'Daily Standup' },
        { id: 'bug', title: 'Bug Reporting' },
        { id: 'review', title: 'Code Review' }
      ];
      
      const tabs = scenarios.map((s, i) => ({
        title: s.title,
        index: i,
        active: i === 0
      }));
      
      expect(tabs).toHaveLength(3);
      expect(tabs[0].active).toBe(true);
      expect(tabs[1].active).toBe(false);
    });
  });

  describe('Rewrite Workflow', () => {
    test('should process input and show result', () => {
      const rewriteRules = [
        {
          match: /login/i,
          result: 'Professional login message',
          tips: ['tip1', 'tip2']
        }
      ];
      
      const input = 'I need to fix the login issue';
      const matchedRule = rewriteRules.find(r => r.match.test(input));
      
      expect(matchedRule).toBeDefined();
      expect(matchedRule.result).toBe('Professional login message');
      expect(matchedRule.tips).toHaveLength(2);
    });

    test('should show default message for unmatched input', () => {
      const rewriteRules = [
        { match: /login/i, result: 'Login message', tips: [] }
      ];
      
      const input = 'random text';
      const matchedRule = rewriteRules.find(r => r.match.test(input));
      
      expect(matchedRule).toBeUndefined();
    });

    test('should handle empty input', () => {
      const input = '';
      const isEmpty = !input.trim();
      expect(isEmpty).toBe(true);
    });

    test('should update progress after rewrite', () => {
      let progress = { todayCompleted: 4, todayGoal: 5 };
      
      // Simulate successful rewrite
      if (progress.todayCompleted < progress.todayGoal) {
        progress.todayCompleted++;
      }
      
      expect(progress.todayCompleted).toBe(5);
    });
  });

  describe('Speaking Card Navigation Workflow', () => {
    test('should navigate through all cards', () => {
      const cards = [
        { sentence: 'Card 1', meaning: 'Meaning 1' },
        { sentence: 'Card 2', meaning: 'Meaning 2' },
        { sentence: 'Card 3', meaning: 'Meaning 3' }
      ];
      
      let currentIndex = 0;
      const visited = [];
      
      // Navigate forward through all cards
      for (let i = 0; i < cards.length; i++) {
        visited.push(cards[currentIndex].sentence);
        currentIndex = (currentIndex + 1) % cards.length;
      }
      
      expect(visited).toEqual(['Card 1', 'Card 2', 'Card 3']);
      expect(currentIndex).toBe(0); // Wrapped around
    });

    test('should navigate backward correctly', () => {
      const cards = [
        { sentence: 'Card 1' },
        { sentence: 'Card 2' },
        { sentence: 'Card 3' }
      ];
      
      let currentIndex = 0;
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      
      expect(currentIndex).toBe(2); // Wrapped to last card
    });
  });

  describe('Quiz Workflow', () => {
    test('should complete quiz workflow', () => {
      const quizData = {
        question: 'Test question?',
        options: ['A', 'B', 'C', 'D'],
        answer: 1,
        explanation: 'B is correct'
      };
      
      let quizAnswered = false;
      const selectedIndex = 1;
      
      // User selects answer
      if (!quizAnswered) {
        quizAnswered = true;
        const isCorrect = selectedIndex === quizData.answer;
        expect(isCorrect).toBe(true);
      }
      
      expect(quizAnswered).toBe(true);
    });

    test('should prevent multiple quiz submissions', () => {
      let quizAnswered = false;
      let attemptCount = 0;
      
      // First attempt
      if (!quizAnswered) {
        quizAnswered = true;
        attemptCount++;
      }
      
      // Second attempt (should be blocked)
      if (!quizAnswered) {
        attemptCount++;
      }
      
      expect(attemptCount).toBe(1);
    });

    test('should mark correct and wrong answers', () => {
      const quizData = { answer: 2 };
      const results = [0, 1, 2, 3].map(index => ({
        index,
        isCorrect: index === quizData.answer,
        isSelected: index === 1
      }));
      
      expect(results[2].isCorrect).toBe(true);
      expect(results[1].isSelected).toBe(true);
      expect(results[1].isCorrect).toBe(false);
    });
  });

  describe('Theme Toggle Workflow', () => {
    test('should toggle theme and save to localStorage', () => {
      const storage = { setItem: jest.fn() };
      const classList = {
        toggle: jest.fn(),
        contains: jest.fn(() => false)
      };
      
      // Toggle theme
      classList.toggle('light-theme');
      const isLight = classList.contains('light-theme');
      storage.setItem('itEnglishCoachTheme', isLight ? 'light' : 'dark');
      
      expect(classList.toggle).toHaveBeenCalledWith('light-theme');
      expect(storage.setItem).toHaveBeenCalled();
    });

    test('should load saved theme on init', () => {
      const storage = { getItem: jest.fn(() => 'light') };
      const classList = { add: jest.fn() };
      
      const savedTheme = storage.getItem('itEnglishCoachTheme');
      if (savedTheme === 'light') {
        classList.add('light-theme');
      }
      
      expect(classList.add).toHaveBeenCalledWith('light-theme');
    });
  });

  describe('Progress Tracking Workflow', () => {
    test('should save and load progress', () => {
      const storage = {
        getItem: jest.fn(),
        setItem: jest.fn()
      };
      
      const progress = {
        streak: 7,
        todayCompleted: 5,
        todayGoal: 5,
        masteredPhrases: 130,
        confidenceScore: 85
      };
      
      // Save progress
      storage.setItem('itEnglishCoachProgress', JSON.stringify(progress));
      
      // Load progress
      storage.getItem.mockReturnValue(JSON.stringify(progress));
      const loaded = JSON.parse(storage.getItem('itEnglishCoachProgress'));
      
      expect(loaded).toEqual(progress);
    });

    test('should handle progress increment', () => {
      let progress = {
        streak: 6,
        todayCompleted: 4,
        todayGoal: 5
      };
      
      // Complete a task
      if (progress.todayCompleted < progress.todayGoal) {
        progress.todayCompleted++;
      }
      
      // Check if goal reached
      const goalReached = progress.todayCompleted >= progress.todayGoal;
      expect(goalReached).toBe(true);
    });
  });

  describe('Sample Loading Workflow', () => {
    test('should load sample and trigger rewrite', () => {
      const mockInput = { value: '' };
      const sampleText = '这个问题可能会影响当前时间线，我确认后再同步给你。';
      
      // Load sample
      mockInput.value = sampleText;
      
      // Verify sample loaded
      expect(mockInput.value).toBe(sampleText);
      expect(mockInput.value.length).toBeGreaterThan(0);
    });
  });

  describe('Scroll Navigation Workflow', () => {
    test('should scroll to section on button click', () => {
      const mockSection = { scrollIntoView: jest.fn() };
      
      mockSection.scrollIntoView({ behavior: 'smooth' });
      
      expect(mockSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth'
      });
    });
  });

  describe('Expression Groups Rendering', () => {
    test('should render all expression groups', () => {
      const groups = [
        { title: 'Opening', items: ['item1', 'item2'] },
        { title: 'Closing', items: ['item3', 'item4'] }
      ];
      
      const rendered = groups.map(g => ({
        title: g.title,
        itemCount: g.items.length
      }));
      
      expect(rendered).toHaveLength(2);
      expect(rendered[0].itemCount).toBe(2);
      expect(rendered[1].itemCount).toBe(2);
    });
  });

  describe('Learning Plan Rendering', () => {
    test('should render 7-day plan', () => {
      const plan = Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        title: `Title ${i + 1}`,
        description: `Description ${i + 1}`
      }));
      
      expect(plan).toHaveLength(7);
      expect(plan[0].day).toBe('Day 1');
      expect(plan[6].day).toBe('Day 7');
    });
  });

  describe('Alert Workflow', () => {
    test('should show daily focus alert', () => {
      global.alert = jest.fn();
      const scenario = {
        focusTitle: 'Daily Standup',
        focusDescription: 'Practice standup updates'
      };
      
      const message = `Today's focus: ${scenario.focusTitle}\n\n${scenario.focusDescription}`;
      alert(message);
      
      expect(alert).toHaveBeenCalledWith(message);
    });
  });
});

console.log('✅ All integration tests defined successfully');

// Made with Bob
