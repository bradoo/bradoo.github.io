// IT English Coach - Optimized Version
// Performance improvements, error handling, and enhanced UX

// ============================================
// OPTIMIZATION 1: Add error boundary
// ============================================
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // Show user-friendly error message
    showNotification('抱歉，发生了一个错误。请刷新页面重试。', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('操作失败，请重试。', 'error');
});

// ============================================
// OPTIMIZATION 2: Add notification system
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        background: ${type === 'error' ? '#ff7b7b' : type === 'success' ? '#7ae582' : '#6ea8fe'};
        color: white;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================
// OPTIMIZATION 3: Enhanced rewrite function with validation
// ============================================
function rewriteInputTextOptimized() {
    const input = rewriteInputEl.value.trim();
    
    // Input validation
    if (!input) {
        rewriteResultEl.textContent = 'Please enter a sentence first so I can help rewrite it into more professional workplace English.';
        rewriteTipsEl.innerHTML = `
            <li>可以输入中文，例如"我下午会给你更新"。</li>
            <li>也可以输入基础英文，例如"we have some risk"。</li>
            <li>系统会给出更职业的英文表达方向。</li>
        `;
        showNotification('请先输入内容', 'error');
        return;
    }
    
    // Length validation
    if (input.length > 500) {
        showNotification('输入内容过长，请控制在500字符以内', 'error');
        return;
    }
    
    // Show loading state
    rewriteBtnEl.disabled = true;
    rewriteBtnEl.textContent = '生成中...';
    rewriteResultEl.textContent = '正在生成职业表达...';
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        try {
            const matchedRule = rewriteRules.find((rule) => rule.match.test(input));
            
            if (matchedRule) {
                rewriteResultEl.textContent = matchedRule.result;
                rewriteTipsEl.innerHTML = matchedRule.tips.map((tip) => `<li>${tip}</li>`).join('');
                updateProgress();
                showNotification('生成成功！', 'success');
            } else {
                // Default fallback response
                rewriteResultEl.textContent = "Thanks for the context. Here is a more professional version: I'd like to share a quick update and align on the next steps so we can move this forward efficiently.";
                rewriteTipsEl.innerHTML = `
                    <li>share a quick update 常用于同步进度。</li>
                    <li>align on the next steps 是高频协作表达。</li>
                    <li>move this forward efficiently 让语气更积极、更职业。</li>
                `;
                updateProgress();
                showNotification('已生成通用职业表达', 'info');
            }
        } catch (error) {
            console.error('Rewrite error:', error);
            rewriteResultEl.textContent = '生成失败，请重试';
            showNotification('生成失败，请重试', 'error');
        } finally {
            // Reset button state
            rewriteBtnEl.disabled = false;
            rewriteBtnEl.textContent = '生成职业表达';
        }
    }, 300);
}

// ============================================
// OPTIMIZATION 4: Debounced input handler
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add input character counter
function addCharacterCounter() {
    const counter = document.createElement('div');
    counter.id = 'charCounter';
    counter.style.cssText = `
        text-align: right;
        color: var(--muted);
        font-size: 0.85rem;
        margin-top: 4px;
    `;
    rewriteInputEl.parentElement.appendChild(counter);
    
    const updateCounter = debounce(() => {
        const length = rewriteInputEl.value.length;
        counter.textContent = `${length}/500`;
        counter.style.color = length > 450 ? 'var(--warning)' : 'var(--muted)';
    }, 100);
    
    rewriteInputEl.addEventListener('input', updateCounter);
    updateCounter();
}

// ============================================
// OPTIMIZATION 5: Enhanced progress tracking with animation
// ============================================
function updateProgressOptimized() {
    if (userProgress.todayCompleted < userProgress.todayGoal) {
        userProgress.todayCompleted++;
        
        const statElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
        statElement.textContent = `${userProgress.todayCompleted} / ${userProgress.todayGoal}`;
        
        // Add animation
        statElement.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            statElement.style.animation = '';
        }, 500);
        
        // Save progress
        saveProgress();
        
        // Check if goal reached
        if (userProgress.todayCompleted === userProgress.todayGoal) {
            showNotification('🎉 恭喜！今日目标已达成！', 'success');
            // Increment streak
            userProgress.streak++;
            document.getElementById('streakValue').textContent = `${userProgress.streak} 天`;
        }
    }
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(pulseStyle);

// ============================================
// OPTIMIZATION 6: Enhanced localStorage with error handling
// ============================================
function saveProgressSafe() {
    try {
        localStorage.setItem('itEnglishCoachProgress', JSON.stringify(userProgress));
        return true;
    } catch (error) {
        console.error('Failed to save progress:', error);
        if (error.name === 'QuotaExceededError') {
            showNotification('存储空间不足，无法保存进度', 'error');
        }
        return false;
    }
}

function loadProgressSafe() {
    try {
        const savedProgress = localStorage.getItem('itEnglishCoachProgress');
        if (savedProgress) {
            const parsed = JSON.parse(savedProgress);
            // Validate data structure
            if (parsed && typeof parsed === 'object') {
                userProgress = { ...userProgress, ...parsed };
                updateProgressDisplay();
                return true;
            }
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
        showNotification('加载进度失败，使用默认数据', 'error');
    }
    return false;
}

// ============================================
// OPTIMIZATION 7: Add keyboard shortcuts
// ============================================
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to submit rewrite
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (document.activeElement === rewriteInputEl) {
                e.preventDefault();
                rewriteInputTextOptimized();
            }
        }
        
        // Escape to clear input
        if (e.key === 'Escape' && document.activeElement === rewriteInputEl) {
            rewriteInputEl.value = '';
            rewriteInputEl.blur();
        }
    });
}

// ============================================
// OPTIMIZATION 8: Add copy to clipboard functionality
// ============================================
function addCopyButton() {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋 复制';
    copyBtn.className = 'secondary-btn';
    copyBtn.style.cssText = 'margin-top: 12px;';
    copyBtn.onclick = async () => {
        try {
            await navigator.clipboard.writeText(rewriteResultEl.textContent);
            copyBtn.textContent = '✅ 已复制';
            showNotification('已复制到剪贴板', 'success');
            setTimeout(() => {
                copyBtn.textContent = '📋 复制';
            }, 2000);
        } catch (error) {
            console.error('Copy failed:', error);
            showNotification('复制失败，请手动复制', 'error');
        }
    };
    
    rewriteResultEl.parentElement.appendChild(copyBtn);
}

// ============================================
// OPTIMIZATION 9: Add performance monitoring
// ============================================
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Performance Metrics:');
                    console.log(`- DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
                    console.log(`- Load Complete: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                    console.log(`- Total Load Time: ${perfData.loadEventEnd - perfData.fetchStart}ms`);
                }
            }, 0);
        });
    }
}

// ============================================
// OPTIMIZATION 10: Enhanced initialization
// ============================================
function initOptimized() {
    try {
        // Load theme and progress
        loadTheme();
        loadProgressSafe();
        
        // Render all components
        renderScenarioTabs();
        renderScenarioDetail();
        renderExpressionGroups();
        renderSpeakingCard();
        renderQuiz();
        renderPlan();
        
        // Bind events
        bindEvents();
        
        // Add optimizations
        addCharacterCounter();
        addKeyboardShortcuts();
        addCopyButton();
        monitorPerformance();
        
        // Auto-save progress every 30 seconds
        setInterval(saveProgressSafe, 30000);
        
        // Show welcome message
        setTimeout(() => {
            showNotification('欢迎使用 IT English Coach！', 'success');
        }, 500);
        
        console.log('✅ Application initialized successfully with optimizations');
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('应用初始化失败，请刷新页面', 'error');
    }
}

// ============================================
// Export optimized functions
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        rewriteInputTextOptimized,
        updateProgressOptimized,
        saveProgressSafe,
        loadProgressSafe,
        debounce
    };
}

console.log('🚀 Optimized script loaded');

// Made with Bob
