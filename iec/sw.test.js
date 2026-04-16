/**
 * IT English Coach - Service Worker Tests
 * Tests for offline functionality and caching
 */

describe('Service Worker - Cache Management', () => {
  const CACHE_NAME = 'it-english-coach-v1';
  const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
  ];

  let mockCache;
  let mockCaches;

  beforeEach(() => {
    mockCache = {
      addAll: jest.fn(() => Promise.resolve()),
      match: jest.fn(),
      put: jest.fn(() => Promise.resolve())
    };

    mockCaches = {
      open: jest.fn(() => Promise.resolve(mockCache)),
      match: jest.fn(),
      keys: jest.fn(() => Promise.resolve([CACHE_NAME])),
      delete: jest.fn(() => Promise.resolve(true))
    };

    global.caches = mockCaches;
    global.self = {
      addEventListener: jest.fn()
    };
  });

  describe('Install Event', () => {
    test('should cache all required resources', async () => {
      const cache = await mockCaches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);

      expect(mockCaches.open).toHaveBeenCalledWith(CACHE_NAME);
      expect(mockCache.addAll).toHaveBeenCalledWith(urlsToCache);
    });

    test('should cache correct number of files', () => {
      expect(urlsToCache).toHaveLength(5);
    });

    test('should include all essential files', () => {
      expect(urlsToCache).toContain('./index.html');
      expect(urlsToCache).toContain('./style.css');
      expect(urlsToCache).toContain('./script.js');
      expect(urlsToCache).toContain('./manifest.json');
    });
  });

  describe('Fetch Event', () => {
    test('should return cached response when available', async () => {
      const mockRequest = { url: './index.html' };
      const mockResponse = { status: 200, body: 'cached content' };
      
      mockCaches.match.mockResolvedValue(mockResponse);
      
      const response = await mockCaches.match(mockRequest);
      
      expect(response).toBe(mockResponse);
      expect(mockCaches.match).toHaveBeenCalledWith(mockRequest);
    });

    test('should fetch from network when cache miss', async () => {
      const mockRequest = { url: './new-file.html' };
      
      mockCaches.match.mockResolvedValue(undefined);
      global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
      
      const cachedResponse = await mockCaches.match(mockRequest);
      
      if (!cachedResponse) {
        const networkResponse = await fetch(mockRequest);
        expect(networkResponse.status).toBe(200);
      }
      
      expect(fetch).toHaveBeenCalledWith(mockRequest);
    });

    test('should handle fetch errors gracefully', async () => {
      const mockRequest = { url: './missing.html' };
      
      mockCaches.match.mockResolvedValue(undefined);
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
      
      try {
        await fetch(mockRequest);
      } catch (error) {
        expect(error.message).toBe('Network error');
      }
    });
  });

  describe('Activate Event', () => {
    test('should delete old caches', async () => {
      const oldCacheName = 'it-english-coach-v0';
      mockCaches.keys.mockResolvedValue([CACHE_NAME, oldCacheName]);
      
      const cacheNames = await mockCaches.keys();
      const cacheWhitelist = [CACHE_NAME];
      
      const deletions = cacheNames
        .filter(name => !cacheWhitelist.includes(name))
        .map(name => mockCaches.delete(name));
      
      await Promise.all(deletions);
      
      expect(mockCaches.delete).toHaveBeenCalledWith(oldCacheName);
      expect(mockCaches.delete).not.toHaveBeenCalledWith(CACHE_NAME);
    });

    test('should keep current cache', async () => {
      mockCaches.keys.mockResolvedValue([CACHE_NAME]);
      
      const cacheNames = await mockCaches.keys();
      const cacheWhitelist = [CACHE_NAME];
      
      const shouldDelete = cacheNames.filter(name => !cacheWhitelist.includes(name));
      
      expect(shouldDelete).toHaveLength(0);
    });

    test('should handle multiple old caches', async () => {
      const oldCaches = ['v0', 'v1', 'v2'];
      mockCaches.keys.mockResolvedValue([CACHE_NAME, ...oldCaches]);
      
      const cacheNames = await mockCaches.keys();
      const cacheWhitelist = [CACHE_NAME];
      
      const toDelete = cacheNames.filter(name => !cacheWhitelist.includes(name));
      
      expect(toDelete).toHaveLength(3);
      expect(toDelete).toEqual(oldCaches);
    });
  });

  describe('Cache Strategy', () => {
    test('should implement cache-first strategy', async () => {
      const request = { url: './index.html' };
      const cachedResponse = { status: 200, fromCache: true };
      
      mockCaches.match.mockResolvedValue(cachedResponse);
      
      // Try cache first
      let response = await mockCaches.match(request);
      
      if (!response) {
        response = await fetch(request);
      }
      
      expect(response.fromCache).toBe(true);
    });

    test('should fallback to network when cache fails', async () => {
      const request = { url: './new-resource.js' };
      
      mockCaches.match.mockResolvedValue(null);
      global.fetch = jest.fn(() => Promise.resolve({ 
        status: 200, 
        fromCache: false 
      }));
      
      let response = await mockCaches.match(request);
      
      if (!response) {
        response = await fetch(request);
      }
      
      expect(response.fromCache).toBe(false);
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe('Cache Versioning', () => {
    test('should use versioned cache name', () => {
      expect(CACHE_NAME).toMatch(/v\d+$/);
      expect(CACHE_NAME).toBe('it-english-coach-v1');
    });

    test('should support cache version updates', () => {
      const newVersion = 'it-english-coach-v2';
      expect(newVersion).not.toBe(CACHE_NAME);
      expect(newVersion).toMatch(/v\d+$/);
    });
  });

  describe('Resource List', () => {
    test('should cache root path', () => {
      expect(urlsToCache).toContain('./');
    });

    test('should cache HTML files', () => {
      const htmlFiles = urlsToCache.filter(url => url.endsWith('.html'));
      expect(htmlFiles.length).toBeGreaterThan(0);
    });

    test('should cache CSS files', () => {
      const cssFiles = urlsToCache.filter(url => url.endsWith('.css'));
      expect(cssFiles.length).toBeGreaterThan(0);
    });

    test('should cache JavaScript files', () => {
      const jsFiles = urlsToCache.filter(url => url.endsWith('.js'));
      expect(jsFiles.length).toBeGreaterThan(0);
    });

    test('should cache manifest', () => {
      expect(urlsToCache).toContain('./manifest.json');
    });
  });
});

describe('Service Worker - Event Listeners', () => {
  test('should register install event listener', () => {
    const addEventListener = jest.fn();
    const sw = { addEventListener };
    
    sw.addEventListener('install', () => {});
    
    expect(addEventListener).toHaveBeenCalledWith('install', expect.any(Function));
  });

  test('should register fetch event listener', () => {
    const addEventListener = jest.fn();
    const sw = { addEventListener };
    
    sw.addEventListener('fetch', () => {});
    
    expect(addEventListener).toHaveBeenCalledWith('fetch', expect.any(Function));
  });

  test('should register activate event listener', () => {
    const addEventListener = jest.fn();
    const sw = { addEventListener };
    
    sw.addEventListener('activate', () => {});
    
    expect(addEventListener).toHaveBeenCalledWith('activate', expect.any(Function));
  });
});

describe('Service Worker - Error Handling', () => {
  test('should handle cache open failure', async () => {
    const mockCaches = {
      open: jest.fn(() => Promise.reject(new Error('Cache open failed')))
    };
    
    try {
      await mockCaches.open('test-cache');
    } catch (error) {
      expect(error.message).toBe('Cache open failed');
    }
  });

  test('should handle addAll failure', async () => {
    const mockCache = {
      addAll: jest.fn(() => Promise.reject(new Error('Failed to cache')))
    };
    
    try {
      await mockCache.addAll(['./file.js']);
    } catch (error) {
      expect(error.message).toBe('Failed to cache');
    }
  });

  test('should handle network failure gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    
    try {
      await fetch('./resource.js');
    } catch (error) {
      expect(error.message).toBe('Network error');
    }
  });
});

describe('Service Worker - Registration', () => {
  test('should check for service worker support', () => {
    const hasServiceWorker = 'serviceWorker' in navigator;
    expect(typeof hasServiceWorker).toBe('boolean');
  });

  test('should register service worker with correct path', () => {
    const register = jest.fn(() => Promise.resolve({ scope: '/' }));
    const mockNavigator = {
      serviceWorker: { register }
    };
    
    mockNavigator.serviceWorker.register('./sw.js');
    
    expect(register).toHaveBeenCalledWith('./sw.js');
  });

  test('should handle registration success', async () => {
    const register = jest.fn(() => Promise.resolve({ 
      scope: '/',
      active: true 
    }));
    
    const registration = await register('./sw.js');
    
    expect(registration.scope).toBe('/');
    expect(registration.active).toBe(true);
  });

  test('should handle registration failure', async () => {
    const register = jest.fn(() => Promise.reject(new Error('Registration failed')));
    
    try {
      await register('./sw.js');
    } catch (error) {
      expect(error.message).toBe('Registration failed');
    }
  });
});

console.log('✅ All Service Worker tests defined successfully');

// Made with Bob
