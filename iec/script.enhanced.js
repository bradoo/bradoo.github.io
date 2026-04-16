// IT English Coach - Enhanced Features
// This file adds missing functionalities and improvements

// ============================================
// FEATURE 1: Enhanced Daily Focus Modal
// ============================================
function showDailyFocusModal() {
    const scenario = scenarios[currentScenarioIndex];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>📚 Today's Learning Focus</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="focus-detail">
                    <h3>${scenario.focusTitle}</h3>
                    <p class="focus-desc">${scenario.focusDescription}</p>
                    
                    <div class="focus-section">
                        <h4>🎯 Learning Goal</h4>
                        <p>${scenario.goal}</p>
                    </div>
                    
                    <div class="focus-section">
                        <h4>💡 Key Phrases</h4>
                        <ul>
                            ${scenario.phrases.map(phrase => `<li>${phrase}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="focus-section">
                        <h4>✨ Quick Tip</h4>
                        <p>${scenario.tip}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="secondary-btn" onclick="closeModal()">稍后学习</button>
                <button class="primary-btn" onclick="startFocusLearning()">开始学习</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animation
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function startFocusLearning() {
    closeModal();
    document.getElementById('scenarios').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// FEATURE 2: Progress Tracking with Animations
// ============================================
function updateProgressWithAnimation() {
    const statCard = document.querySelector('.stat-card:nth-child(2)');
    const statValue = statCard.querySelector('.stat-value');
    
    // Add pulse animation
    statCard.classList.add('pulse');
    setTimeout(() => statCard.classList.remove('pulse'), 500);
    
    // Update value with count-up animation
    if (userProgress.todayCompleted < userProgress.todayGoal) {
        userProgress.todayCompleted++;
        
        const start = userProgress.todayCompleted - 1;
        const end = userProgress.todayCompleted;
        const duration = 500;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            statValue.textContent = `${current} / ${userProgress.todayGoal}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Check if goal is reached
                if (userProgress.todayCompleted === userProgress.todayGoal) {
                    showCelebration();
                }
            }
        }
        
        animate();
    }
}

function showCelebration() {
    const notification = document.createElement('div');
    notification.className = 'celebration-notification';
    notification.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-icon">🎉</div>
            <h3>恭喜完成今日目标！</h3>
            <p>继续保持，明天见！</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// FEATURE 3: Keyboard Shortcuts
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter: Submit rewrite
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const rewriteInput = document.getElementById('rewriteInput');
            if (document.activeElement === rewriteInput) {
                e.preventDefault();
                document.getElementById('rewriteBtn').click();
            }
        }
        
        // Escape: Clear input
        if (e.key === 'Escape') {
            const rewriteInput = document.getElementById('rewriteInput');
            if (document.activeElement === rewriteInput) {
                rewriteInput.value = '';
            }
        }
        
        // Arrow keys: Navigate speaking cards
        if (e.key === 'ArrowLeft' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            document.getElementById('prevSpeakingBtn').click();
        }
        
        if (e.key === 'ArrowRight' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            document.getElementById('nextSpeakingBtn').click();
        }
        
        // Number keys: Select quiz option
        if (e.key >= '1' && e.key <= '4' && !e.target.matches('input, textarea')) {
            const options = document.querySelectorAll('.quiz-option');
            const index = parseInt(e.key) - 1;
            if (options[index] && !quizAnswered) {
                options[index].click();
            }
        }
    });
}

// ============================================
// FEATURE 4: Copy to Clipboard
// ============================================
function addCopyButton() {
    const rewriteResult = document.getElementById('rewriteResult');
    
    // Check if button already exists
    if (rewriteResult.parentNode.querySelector('.copy-btn')) {
        return;
    }
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = '📋 复制结果';
    copyBtn.onclick = () => copyToClipboard(rewriteResult.textContent);
    
    rewriteResult.parentNode.appendChild(copyBtn);
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '✅ 已复制';
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
        }, 2000);
        
        showNotification('已复制到剪贴板', 'success');
    } catch (err) {
        console.error('Copy failed:', err);
        showNotification('复制失败，请手动复制', 'error');
    }
}

// ============================================
// FEATURE 5: Character Counter
// ============================================
function addCharacterCounter() {
    const rewriteInput = document.getElementById('rewriteInput');
    
    // Check if counter already exists
    if (rewriteInput.parentNode.querySelector('.char-counter')) {
        return;
    }
    
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = '0 / 500';
    
    rewriteInput.parentNode.appendChild(counter);
    
    rewriteInput.addEventListener('input', debounce(function() {
        const length = this.value.length;
        counter.textContent = `${length} / 500`;
        counter.classList.toggle('warning', length > 450);
        
        if (length > 500) {
            this.value = this.value.substring(0, 500);
            counter.textContent = '500 / 500';
            showNotification('已达到最大字符数限制', 'warning');
        }
    }, 100));
}

// ============================================
// FEATURE 6: Notification System
// ============================================
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// FEATURE 7: Loading States
// ============================================
function showLoadingState(button) {
    button.classList.add('loading-btn');
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = '处理中...';
}

function hideLoadingState(button) {
    button.classList.remove('loading-btn');
    button.disabled = false;
    button.textContent = button.dataset.originalText || button.textContent;
}

// ============================================
// FEATURE 8: Input Validation
// ============================================
function validateInput(input) {
    if (!input || input.trim().length === 0) {
        showNotification('请输入需要改写的文本', 'warning');
        return false;
    }
    
    if (input.length > 500) {
        showNotification('输入文本过长，请控制在500字符以内', 'warning');
        return false;
    }
    
    return true;
}

// ============================================
// FEATURE 9: Debounce Utility
// ============================================
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ============================================
// FEATURE 10: Enhanced Rewrite Function
// ============================================
function enhancedRewriteInputText() {
    const input = document.getElementById('rewriteInput').value.trim();
    const btn = document.getElementById('rewriteBtn');
    
    // Validate input
    if (!validateInput(input)) {
        return;
    }
    
    // Show loading state
    showLoadingState(btn);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        const matchedRule = rewriteRules.find((rule) => rule.match.test(input));
        
        if (matchedRule) {
            document.getElementById('rewriteResult').textContent = matchedRule.result;
            document.getElementById('rewriteTips').innerHTML = 
                matchedRule.tips.map((tip) => `<li>${tip}</li>`).join('');
        } else {
            document.getElementById('rewriteResult').textContent = 
                "Thanks for the context. Here is a more professional version: I'd like to share a quick update and align on the next steps so we can move this forward efficiently.";
            document.getElementById('rewriteTips').innerHTML = `
                <li>share a quick update 常用于同步进度。</li>
                <li>align on the next steps 是高频协作表达。</li>
                <li>move this forward efficiently 让语气更积极、更职业。</li>
            `;
        }
        
        // Update progress with animation
        updateProgressWithAnimation();
        
        // Add copy button if not exists
        addCopyButton();
        
        // Hide loading state
        hideLoadingState(btn);
        
        // Show success notification
        showNotification('改写完成！', 'success');
        
        // Save progress
        saveProgress();
    }, 500);
}

// ============================================
// FEATURE 11: Enhanced Theme Toggle
// ============================================
function enhancedToggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggle');
    
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    
    btn.textContent = isLight ? '🌙 深色模式' : '☀️ 浅色模式';
    
    localStorage.setItem('itEnglishCoachTheme', isLight ? 'light' : 'dark');
    
    showNotification(`已切换到${isLight ? '浅色' : '深色'}模式`, 'info', 2000);
}

// ============================================
// FEATURE 12: Progress Export/Import
// ============================================
function exportProgress() {
    const data = {
        progress: userProgress,
        exportDate: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `it-english-coach-progress-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('进度已导出', 'success');
}

function importProgress(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.progress) {
                userProgress = data.progress;
                updateProgressDisplay();
                saveProgress();
                showNotification('进度已导入', 'success');
            } else {
                throw new Error('Invalid data format');
            }
        } catch (err) {
            console.error('Import failed:', err);
            showNotification('导入失败，文件格式不正确', 'error');
        }
    };
    
    reader.readAsText(file);
}

// ============================================
// FEATURE 13: Search Functionality
// ============================================
function addSearchFeature() {
    const expressionGroups = document.getElementById('expressionGroups');
    if (!expressionGroups || document.getElementById('expressionSearch')) {
        return;
    }
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text"
               id="expressionSearch"
               placeholder="🔍 搜索表达..."
               class="search-input">
    `;
    
    expressionGroups.parentNode.insertBefore(searchContainer, expressionGroups);
    
    const searchInput = document.getElementById('expressionSearch');
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.toLowerCase();
        const groups = document.querySelectorAll('.expression-group');
        
        groups.forEach(group => {
            const items = group.querySelectorAll('.expression-item');
            let hasVisibleItems = false;
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const matches = text.includes(query);
                item.style.display = matches ? '' : 'none';
                if (matches) hasVisibleItems = true;
            });
            
            group.style.display = hasVisibleItems || query === '' ? '' : 'none';
        });
    }, 300));
}

// ============================================
// FEATURE 14: Favorites System
// ============================================
let favorites = JSON.parse(localStorage.getItem('itEnglishCoachFavorites') || '[]');

function syncFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach((button) => {
        const phrase = button.dataset.phrase;
        button.classList.toggle('active', favorites.includes(phrase));
        button.setAttribute('aria-pressed', favorites.includes(phrase) ? 'true' : 'false');
    });

    if (window.updateFavoritesButtonLabel) {
        window.updateFavoritesButtonLabel(favorites.length);
    }
}

function toggleFavorite(phrase) {
    const index = favorites.indexOf(phrase);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('已从收藏中移除', 'info');
    } else {
        favorites.push(phrase);
        showNotification('已添加到收藏', 'success');
    }
    
    localStorage.setItem('itEnglishCoachFavorites', JSON.stringify(favorites));
    syncFavoriteButtons();
}

function showFavorites() {
    if (favorites.length === 0) {
        showNotification('还没有收藏任何表达', 'info');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>⭐ 我的收藏</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <ul class="favorites-list">
                    ${favorites.map(phrase => `
                        <li class="favorite-item">
                            <span>${phrase}</span>
                            <button type="button" class="secondary-btn favorite-remove-btn" data-phrase="${phrase.replace(/"/g, '"')}">
                                移除
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    modal.querySelectorAll('.favorite-remove-btn').forEach((button) => {
        button.addEventListener('click', () => {
            toggleFavorite(button.dataset.phrase);
            closeModal();
            setTimeout(showFavorites, 320);
        });
    });

    setTimeout(() => modal.classList.add('show'), 10);
    syncFavoriteButtons();
}

function setupProgressTools() {
    const importBtn = document.getElementById('importProgressBtn');
    const exportBtn = document.getElementById('exportProgressBtn');
    const favoritesBtn = document.getElementById('showFavoritesBtn');

    if (importBtn) {
        importBtn.title = '从 JSON 文件恢复你的学习进度';
    }

    if (exportBtn) {
        exportBtn.title = '下载当前学习进度备份';
    }

    if (favoritesBtn) {
        favoritesBtn.title = '查看你收藏的高频表达';
    }
}

// ============================================
// FEATURE 15: Initialize Enhanced Features
// ============================================
function initEnhancedFeatures() {
    // Expose enhanced functions globally for integration with the base app
    window.enhancedRewriteInputText = enhancedRewriteInputText;
    window.enhancedToggleTheme = enhancedToggleTheme;
    window.showDailyFocusModal = showDailyFocusModal;
    window.closeModal = closeModal;
    window.startFocusLearning = startFocusLearning;
    window.toggleFavorite = toggleFavorite;
    window.showFavorites = showFavorites;
    window.exportProgress = exportProgress;
    window.importProgress = importProgress;
    window.updateFavoritesButtonLabel = window.updateFavoritesButtonLabel || function() {};
    
    // Add new features
    addCharacterCounter();
    addCopyButton();
    initKeyboardShortcuts();
    addSearchFeature();
    setupProgressTools();
    
    // Update daily focus button
    const dailyFocusBtn = document.getElementById('dailyFocusBtn');
    if (dailyFocusBtn) {
        dailyFocusBtn.onclick = showDailyFocusModal;
    }
    
    // Add keyboard shortcuts hint
    showNotification('💡 提示：使用 Ctrl+Enter 快速提交，Escape 清空输入', 'info', 5000);
    syncFavoriteButtons();
    
    console.log('✅ Enhanced features initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedFeatures);
} else {
    initEnhancedFeatures();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        validateInput,
        debounce,
        copyToClipboard,
        toggleFavorite,
        exportProgress,
        importProgress
    };
}

// Made with Bob
