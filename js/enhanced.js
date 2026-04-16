/**
 * 增强的交互功能
 * @author 吴勇
 */

(function() {
    'use strict';

    // 性能优化：防抖函数
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

    // 性能优化：节流函数
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 页面加载完成
    document.addEventListener('DOMContentLoaded', function() {
        
        // 1. 图片懒加载增强
        initLazyLoading();
        
        // 2. 平滑滚动
        initSmoothScroll();
        
        // 3. 返回顶部按钮
        initBackToTop();
        
        // 4. 搜索功能增强
        initSearchEnhancement();
        
        // 5. 导航栏滚动效果
        initNavbarScroll();
        
        // 6. 卡片悬停效果
        initCardHoverEffects();
        
        // 7. 表单验证
        initFormValidation();
        
        // 8. 性能监控
        initPerformanceMonitoring();
        
        // 9. 暗黑模式切换
        initDarkMode();
        
        // 10. 分享功能
        initShareButtons();
    });

    // 图片懒加载增强
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // 平滑滚动
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#top') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // 返回顶部按钮
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.icon-top');
        if (!backToTopBtn) return;

        const toggleBackToTop = throttle(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.classList.remove('show');
                setTimeout(() => {
                    if (!backToTopBtn.classList.contains('show')) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 300);
            }
        }, 100);

        window.addEventListener('scroll', toggleBackToTop);
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 搜索功能增强
    function initSearchEnhancement() {
        const searchInput = document.querySelector('#keyboard');
        if (!searchInput) return;

        // 搜索建议
        const searchSuggestions = [
            '跑步', '马拉松', '演讲', '读书', '技术',
            '全栈开发', '系统架构', '个人成长'
        ];

        searchInput.addEventListener('focus', function() {
            this.placeholder = '输入关键词搜索...';
        });

        searchInput.addEventListener('blur', function() {
            if (!this.value) {
                this.placeholder = '请输入关键字词';
            }
        });

        // 实时搜索提示
        searchInput.addEventListener('input', debounce(function() {
            const value = this.value.toLowerCase();
            if (value.length > 0) {
                const matches = searchSuggestions.filter(s => 
                    s.toLowerCase().includes(value)
                );
                // 这里可以显示搜索建议
                console.log('搜索建议:', matches);
            }
        }, 300));
    }

    // 导航栏滚动效果
    function initNavbarScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScroll = 0;
        const handleScroll = throttle(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // 向下滚动隐藏，向上滚动显示
            if (currentScroll > lastScroll && currentScroll > 500) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    // 卡片悬停效果
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.blogs_list, .f_news_list li, .featured_pics li');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // 表单验证
    function initFormValidation() {
        const searchForm = document.querySelector('#searchform');
        if (!searchForm) return;

        searchForm.addEventListener('submit', function(e) {
            const input = this.querySelector('#keyboard');
            if (!input.value || input.value === '请输入关键字词') {
                e.preventDefault();
                input.focus();
                input.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    }

    // 性能监控
    function initPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // 监控最大内容绘制 (LCP)
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('LCP monitoring not supported');
            }

            // 监控首次输入延迟 (FID)
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.log('FID monitoring not supported');
            }
        }

        // 页面加载时间
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('页面加载时间:', pageLoadTime + 'ms');
            }, 0);
        });
    }

    // 暗黑模式切换
    function initDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.setAttribute('aria-label', '切换暗黑模式');
        darkModeToggle.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: rgba(255,255,255,0.9);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            font-size: 24px;
            z-index: 1000;
            transition: all 0.3s ease;
            display: none;
        `;

        document.body.appendChild(darkModeToggle);

        // 检查用户偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // 显示按钮
        setTimeout(() => {
            darkModeToggle.style.display = 'block';
        }, 1000);
    }

    // 分享功能
    function initShareButtons() {
        // 如果浏览器支持 Web Share API
        if (navigator.share) {
            const shareButtons = document.querySelectorAll('[data-share]');
            shareButtons.forEach(btn => {
                btn.addEventListener('click', async () => {
                    try {
                        await navigator.share({
                            title: document.title,
                            text: document.querySelector('meta[name="description"]').content,
                            url: window.location.href
                        });
                    } catch (err) {
                        console.log('分享失败:', err);
                    }
                });
            });
        }
    }

    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('页面隐藏');
        } else {
            console.log('页面可见');
        }
    });

    // 错误处理
    window.addEventListener('error', (e) => {
        console.error('页面错误:', e.error);
    });

    // 未处理的 Promise 拒绝
    window.addEventListener('unhandledrejection', (e) => {
        console.error('未处理的 Promise 拒绝:', e.reason);
    });

})();

// Made with Bob
