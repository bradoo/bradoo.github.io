// Enhanced Application State
const appState = {
    currentPage: 'home',
    currentScenario: 'interview',
    checkedInUsers: [],
    userProfile: {
        name: '',
        email: '',
        department: ''
    },
    practiceHistory: [],
    mediaRecorder: null,
    audioChunks: [],
    recordedBlob: null,
    darkMode: false,
    practiceStats: {
        totalPractices: 0,
        interviewPractices: 0,
        standupPractices: 0,
        icebreakingPractices: 0,
        totalTime: 0,
        streak: 0,
        lastPracticeDate: null
    },
    vocabulary: {
        learned: [],
        favorites: []
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScenarioTabs();
    initializeVocabularyFilters();
    loadStoredData();
    setupEventListeners();
    initializeDarkMode();
    updatePracticeStreak();
    renderStatistics();
});

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            navigateTo(page);
        });
    });
}

function navigateTo(pageName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}-page`).classList.add('active');

    appState.currentPage = pageName;
    window.scrollTo(0, 0);

    // Update page-specific content
    if (pageName === 'profile') {
        renderStatistics();
        renderPracticeHistory();
    }
}

// Scenario Tabs
function initializeScenarioTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const scenario = btn.dataset.scenario;
            switchScenario(scenario);
        });
    });
}

function switchScenario(scenarioName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.scenario === scenarioName) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.scenario-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${scenarioName}-scenario`).classList.add('active');

    appState.currentScenario = scenarioName;
}

// Question Toggle
function toggleQuestion(header) {
    const questionItem = header.parentElement;
    questionItem.classList.toggle('expanded');
}

// Check-in Functionality
function submitCheckin() {
    const name = document.getElementById('participant-name').value.trim();
    const email = document.getElementById('participant-email').value.trim();
    const group = document.getElementById('participant-group').value;

    if (!name || !email) {
        showNotification('请填写姓名和邮箱 / Please fill in name and email', 'warning');
        return;
    }

    // Check for duplicate
    const duplicate = appState.checkedInUsers.find(user => user.email === email);
    if (duplicate) {
        showNotification('该邮箱已签到 / Email already checked in', 'warning');
        return;
    }

    const checkinData = {
        name,
        email,
        group,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now()
    };

    appState.checkedInUsers.push(checkinData);
    saveToStorage('checkedInUsers', appState.checkedInUsers);

    // Update profile if first time
    if (!appState.userProfile.name) {
        appState.userProfile.name = name;
        appState.userProfile.email = email;
        saveToStorage('userProfile', appState.userProfile);
        updateProfileDisplay();
    }

    updateCheckinStats();
    updateCheckinList();

    document.getElementById('participant-name').value = '';
    document.getElementById('participant-email').value = '';
    document.getElementById('participant-group').value = '';

    showNotification('签到成功！Check-in successful!', 'success');
}

function updateCheckinStats() {
    const count = appState.checkedInUsers.length;
    const rate = Math.round((count / 28) * 100);

    document.getElementById('checked-in-count').textContent = count;
    document.getElementById('attendance-rate').textContent = `${rate}%`;
}

function updateCheckinList() {
    const listContent = document.getElementById('checkin-list-content');
    
    if (appState.checkedInUsers.length === 0) {
        listContent.innerHTML = '<p class="empty-state">暂无签到记录</p>';
        return;
    }

    let html = '';
    appState.checkedInUsers.forEach((user, index) => {
        html += `
            <div class="list-item">
                <div>
                    <strong>${user.name}</strong><br>
                    <small style="color: var(--text-secondary);">${user.email}</small>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">${user.time}</div>
                    ${user.group ? `<div style="font-size: 0.75rem; color: var(--primary-color);">${user.group}</div>` : ''}
                </div>
            </div>
        `;
    });

    listContent.innerHTML = html;
}

// Export Check-in Data
function exportCheckinData() {
    if (appState.checkedInUsers.length === 0) {
        showNotification('没有签到数据可导出 / No check-in data to export', 'warning');
        return;
    }

    const data = {
        event: 'FutureNow English Afternoon Tea',
        date: new Date().toLocaleDateString('zh-CN'),
        totalParticipants: appState.checkedInUsers.length,
        attendanceRate: Math.round((appState.checkedInUsers.length / 28) * 100) + '%',
        participants: appState.checkedInUsers
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `checkin-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('数据已导出 / Data exported', 'success');
}

// Vocabulary Filters
function initializeVocabularyFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterVocabulary(category);
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const searchInput = document.getElementById('vocab-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchVocabulary(e.target.value);
        });
    }
}

function filterVocabulary(category) {
    const sections = document.querySelectorAll('.vocab-section');
    
    sections.forEach(section => {
        if (category === 'all') {
            section.style.display = 'block';
        } else {
            if (section.dataset.category === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }
    });
}

function searchVocabulary(query) {
    const lowerQuery = query.toLowerCase();
    const vocabCards = document.querySelectorAll('.vocab-card');
    
    vocabCards.forEach(card => {
        const en = card.querySelector('.vocab-en').textContent.toLowerCase();
        const cn = card.querySelector('.vocab-cn').textContent.toLowerCase();
        
        if (en.includes(lowerQuery) || cn.includes(lowerQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Vocabulary Learning Tracking
function markVocabLearned(word) {
    if (!appState.vocabulary.learned.includes(word)) {
        appState.vocabulary.learned.push(word);
        saveToStorage('vocabulary', appState.vocabulary);
        showNotification(`已标记"${word}"为已学习 / Marked as learned`, 'success');
    }
}

function toggleVocabFavorite(word) {
    const index = appState.vocabulary.favorites.indexOf(word);
    if (index === -1) {
        appState.vocabulary.favorites.push(word);
        showNotification(`已添加到收藏 / Added to favorites`, 'success');
    } else {
        appState.vocabulary.favorites.splice(index, 1);
        showNotification(`已从收藏移除 / Removed from favorites`, 'info');
    }
    saveToStorage('vocabulary', appState.vocabulary);
}

// Text-to-Speech
function speakWord(word) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    } else {
        showNotification('您的浏览器不支持语音功能 / Speech not supported', 'warning');
    }
}

// Practice Modal
function startPractice(questionType) {
    const modal = document.getElementById('practice-modal');
    const title = document.getElementById('practice-title');
    const question = document.getElementById('practice-question');

    const questions = {
        'tell-me-about-yourself': 'Tell me about yourself',
        'strengths': 'What are your strengths?',
        'weaknesses': 'What are your weaknesses?',
        'challenging-project': 'Describe a challenging project you worked on',
        'yesterday': 'What did you do yesterday?',
        'today': 'What will you do today?',
        'blockers': 'Are there any blockers?',
        'self-intro': 'Please introduce yourself',
        'two-truths': 'Tell us two truths and one lie about yourself'
    };

    title.textContent = '练习模式 Practice Mode';
    question.textContent = questions[questionType] || 'Practice Question';

    modal.classList.add('active');
    modal.dataset.questionType = questionType;
    resetRecording();
}

function closeModal() {
    const modal = document.getElementById('practice-modal');
    modal.classList.remove('active');
    stopRecording();
}

// Recording Functionality
function resetRecording() {
    appState.audioChunks = [];
    appState.recordedBlob = null;
    
    document.getElementById('start-record-btn').disabled = false;
    document.getElementById('stop-record-btn').disabled = true;
    document.getElementById('play-record-btn').disabled = true;
    document.getElementById('recording-status').textContent = '准备就绪';
    document.getElementById('recording-status').classList.remove('recording');
    document.getElementById('audio-player').style.display = 'none';
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        appState.mediaRecorder = new MediaRecorder(stream);
        appState.audioChunks = [];
        appState.recordingStartTime = Date.now();

        appState.mediaRecorder.ondataavailable = (event) => {
            appState.audioChunks.push(event.data);
        };

        appState.mediaRecorder.onstop = () => {
            const audioBlob = new Blob(appState.audioChunks, { type: 'audio/wav' });
            appState.recordedBlob = audioBlob;
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = document.getElementById('recorded-audio');
            audioElement.src = audioUrl;
            
            // Calculate practice duration
            const duration = Math.round((Date.now() - appState.recordingStartTime) / 1000);
            
            // Save practice record
            savePracticeRecord(duration);
            
            document.getElementById('audio-player').style.display = 'block';
            document.getElementById('play-record-btn').disabled = false;
            document.getElementById('recording-status').textContent = '录音完成！可以回放';
            document.getElementById('recording-status').classList.remove('recording');
        };

        appState.mediaRecorder.start();
        
        document.getElementById('start-record-btn').disabled = true;
        document.getElementById('stop-record-btn').disabled = false;
        document.getElementById('recording-status').textContent = '正在录音... 🎤';
        document.getElementById('recording-status').classList.add('recording');
    } catch (error) {
        console.error('Error accessing microphone:', error);
        showNotification('无法访问麦克风 / Cannot access microphone', 'error');
    }
}

function stopRecording() {
    if (appState.mediaRecorder && appState.mediaRecorder.state !== 'inactive') {
        appState.mediaRecorder.stop();
        appState.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        document.getElementById('start-record-btn').disabled = false;
        document.getElementById('stop-record-btn').disabled = true;
    }
}

function playRecording() {
    const audioElement = document.getElementById('recorded-audio');
    audioElement.play();
}

// Practice History
function savePracticeRecord(duration) {
    const modal = document.getElementById('practice-modal');
    const questionType = modal.dataset.questionType;
    
    const record = {
        date: new Date().toISOString(),
        scenario: appState.currentScenario,
        questionType: questionType,
        duration: duration,
        timestamp: Date.now()
    };

    appState.practiceHistory.push(record);
    saveToStorage('practiceHistory', appState.practiceHistory);

    // Update statistics
    appState.practiceStats.totalPractices++;
    appState.practiceStats.totalTime += duration;
    
    if (appState.currentScenario === 'interview') {
        appState.practiceStats.interviewPractices++;
    } else if (appState.currentScenario === 'standup') {
        appState.practiceStats.standupPractices++;
    } else if (appState.currentScenario === 'icebreaking') {
        appState.practiceStats.icebreakingPractices++;
    }

    appState.practiceStats.lastPracticeDate = new Date().toDateString();
    saveToStorage('practiceStats', appState.practiceStats);
    
    updatePracticeStreak();
}

function updatePracticeStreak() {
    const today = new Date().toDateString();
    const lastDate = appState.practiceStats.lastPracticeDate;
    
    if (lastDate === today) {
        // Already practiced today
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate === yesterday.toDateString()) {
        // Continuing streak
        appState.practiceStats.streak++;
    } else if (lastDate !== today) {
        // Streak broken
        appState.practiceStats.streak = 0;
    }
    
    saveToStorage('practiceStats', appState.practiceStats);
}

function renderPracticeHistory() {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;

    if (appState.practiceHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-state">暂无练习记录</p>';
        return;
    }

    // Show last 10 practices
    const recentPractices = appState.practiceHistory.slice(-10).reverse();
    
    let html = '';
    recentPractices.forEach(record => {
        const date = new Date(record.date);
        const dateStr = date.toLocaleDateString('zh-CN');
        const timeStr = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        
        html += `
            <div class="history-item">
                <div class="history-date">${dateStr}<br>${timeStr}</div>
                <div class="history-content">
                    <h4>${getScenarioName(record.scenario)}</h4>
                    <p>练习时长: ${record.duration}秒</p>
                </div>
            </div>
        `;
    });

    historyList.innerHTML = html;
}

function getScenarioName(scenario) {
    const names = {
        'interview': '面试场景练习',
        'standup': '站会场景练习',
        'icebreaking': '破冰活动练习'
    };
    return names[scenario] || '场景练习';
}

// Statistics
function renderStatistics() {
    const stats = appState.practiceStats;
    
    // Update stats display if elements exist
    const totalPracticesEl = document.getElementById('total-practices');
    const totalTimeEl = document.getElementById('total-time');
    const streakEl = document.getElementById('practice-streak');
    
    if (totalPracticesEl) {
        totalPracticesEl.textContent = stats.totalPractices;
    }
    if (totalTimeEl) {
        const minutes = Math.round(stats.totalTime / 60);
        totalTimeEl.textContent = `${minutes}分钟`;
    }
    if (streakEl) {
        streakEl.textContent = `${stats.streak}天`;
    }
}

// Dark Mode
function initializeDarkMode() {
    const savedMode = loadFromStorage('darkMode');
    if (savedMode !== null) {
        appState.darkMode = savedMode;
        if (appState.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }
}

function toggleDarkMode() {
    appState.darkMode = !appState.darkMode;
    document.body.classList.toggle('dark-mode');
    saveToStorage('darkMode', appState.darkMode);
    
    const message = appState.darkMode ? '已切换到深色模式 / Dark mode enabled' : '已切换到浅色模式 / Light mode enabled';
    showNotification(message, 'info');
}

// Local Storage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to storage:', error);
        showNotification('保存数据失败 / Failed to save data', 'error');
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from storage:', error);
        return null;
    }
}

function loadStoredData() {
    const checkedInUsers = loadFromStorage('checkedInUsers');
    if (checkedInUsers) {
        appState.checkedInUsers = checkedInUsers;
        updateCheckinStats();
        updateCheckinList();
    }

    const userProfile = loadFromStorage('userProfile');
    if (userProfile) {
        appState.userProfile = userProfile;
        updateProfileDisplay();
    }

    const practiceHistory = loadFromStorage('practiceHistory');
    if (practiceHistory) {
        appState.practiceHistory = practiceHistory;
    }

    const practiceStats = loadFromStorage('practiceStats');
    if (practiceStats) {
        appState.practiceStats = practiceStats;
    }

    const vocabulary = loadFromStorage('vocabulary');
    if (vocabulary) {
        appState.vocabulary = vocabulary;
    }
}

function updateProfileDisplay() {
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const deptEl = document.getElementById('profile-department');
    
    if (nameEl) nameEl.textContent = appState.userProfile.name || '未设置';
    if (emailEl) emailEl.textContent = appState.userProfile.email || '未设置';
    if (deptEl) deptEl.textContent = appState.userProfile.department || '未设置';
}

// Data Export/Import
function exportAllData() {
    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        checkedInUsers: appState.checkedInUsers,
        userProfile: appState.userProfile,
        practiceHistory: appState.practiceHistory,
        practiceStats: appState.practiceStats,
        vocabulary: appState.vocabulary
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english-tea-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('所有数据已导出 / All data exported', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (confirm('导入数据将覆盖现有数据，确定继续吗？\nImporting will overwrite existing data. Continue?')) {
                    if (data.checkedInUsers) {
                        appState.checkedInUsers = data.checkedInUsers;
                        saveToStorage('checkedInUsers', data.checkedInUsers);
                    }
                    if (data.userProfile) {
                        appState.userProfile = data.userProfile;
                        saveToStorage('userProfile', data.userProfile);
                    }
                    if (data.practiceHistory) {
                        appState.practiceHistory = data.practiceHistory;
                        saveToStorage('practiceHistory', data.practiceHistory);
                    }
                    if (data.practiceStats) {
                        appState.practiceStats = data.practiceStats;
                        saveToStorage('practiceStats', data.practiceStats);
                    }
                    if (data.vocabulary) {
                        appState.vocabulary = data.vocabulary;
                        saveToStorage('vocabulary', data.vocabulary);
                    }

                    showNotification('数据导入成功！/ Data imported successfully!', 'success');
                    location.reload();
                }
            } catch (error) {
                console.error('Import error:', error);
                showNotification('导入失败，文件格式错误 / Import failed, invalid file format', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    if (confirm('确定要清除所有数据吗？此操作不可恢复！\nAre you sure you want to clear all data? This cannot be undone!')) {
        localStorage.clear();
        location.reload();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideDown 0.3s ease;
        max-width: 90%;
        text-align: center;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    const modal = document.getElementById('practice-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Export functions for global access
window.navigateTo = navigateTo;
window.toggleQuestion = toggleQuestion;
window.submitCheckin = submitCheckin;
window.exportCheckinData = exportCheckinData;
window.speakWord = speakWord;
window.markVocabLearned = markVocabLearned;
window.toggleVocabFavorite = toggleVocabFavorite;
window.startPractice = startPractice;
window.closeModal = closeModal;
window.startRecording = startRecording;
window.stopRecording = stopRecording;
window.playRecording = playRecording;
window.toggleDarkMode = toggleDarkMode;
window.exportAllData = exportAllData;
window.importData = importData;
window.clearAllData = clearAllData;

// Made with Bob
