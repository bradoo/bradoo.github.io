/**
 * Service Worker - 实现PWA离线功能
 * @author 吴勇
 */

const CACHE_NAME = 'bradoo-v1.0.0';
const RUNTIME_CACHE = 'bradoo-runtime';

// 需要缓存的核心资源
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/css/new-style.css',
    '/js/new-script.js',
    '/images/logo.png',
    '/images/brad.jpg',
    '/manifest.json'
];

// 安装事件 - 缓存核心资源
self.addEventListener('install', (event) => {
    console.log('[SW] 安装中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] 缓存核心资源');
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('[SW] 激活中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('[SW] 删除旧缓存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 拦截请求 - 实现缓存策略
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // 跳过非同源请求
    if (url.origin !== location.origin) {
        return;
    }

    // HTML页面 - 网络优先策略
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseClone = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then((response) => response || caches.match('/index.html'));
                })
        );
        return;
    }

    // 静态资源 - 缓存优先策略
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request).then((response) => {
                    // 只缓存成功的响应
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    const responseClone = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });

                    return response;
                });
            })
    );
});

// 后台同步
self.addEventListener('sync', (event) => {
    console.log('[SW] 后台同步:', event.tag);
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// 推送通知
self.addEventListener('push', (event) => {
    console.log('[SW] 收到推送通知');
    const options = {
        body: event.data ? event.data.text() : '新内容已更新',
        icon: '/images/logo.png',
        badge: '/images/logo.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('吴勇的个人主页', options)
    );
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] 通知被点击');
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

// 辅助函数 - 同步数据
async function syncData() {
    try {
        // 这里可以添加数据同步逻辑
        console.log('[SW] 数据同步完成');
    } catch (error) {
        console.error('[SW] 数据同步失败:', error);
    }
}

// Made with Bob
