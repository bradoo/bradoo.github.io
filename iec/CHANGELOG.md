# Changelog

All notable changes to IT English Coach will be documented in this file.

## [1.1.0] - 2026-04-16

### Added
- **Progressive Web App (PWA) Support**
  - Added manifest.json for installable app experience
  - Implemented service worker for offline functionality
  - Added theme-color meta tag for better mobile experience

- **Accessibility Improvements**
  - Added ARIA labels to all interactive elements
  - Implemented focus-visible styles for keyboard navigation
  - Added reduced-motion support for users with motion sensitivity
  - Improved semantic HTML structure

- **Enhanced User Experience**
  - Added progress tracking with localStorage persistence
  - Implemented auto-save functionality (saves every 30 seconds)
  - Added loading states for better feedback
  - Improved button states (hover, active, disabled)
  - Enhanced textarea focus states

- **Extended Content**
  - Added 2 new rewrite rules (test/QA and deploy/release scenarios)
  - Improved regex patterns for better matching
  - Added user progress state management

- **Performance Optimizations**
  - Optimized CSS transitions for smoother animations
  - Added proper DOM ready check
  - Implemented efficient event binding

- **Developer Experience**
  - Added .gitignore file
  - Added comprehensive code comments
  - Improved code organization with clear sections
  - Added print styles for better document printing

### Fixed
- Fixed typo in expression groups ("সবাই" → "everyone")
- Improved error handling in progress loading
- Enhanced theme toggle functionality

### Changed
- Updated CSS with better transition handling
- Improved responsive design for mobile devices
- Enhanced color contrast for better readability

## [1.0.0] - Initial Release

### Added
- Core learning platform with 5 IT workplace scenarios
- Email/message rewrite assistant
- Meeting expression training
- Speaking practice cards
- Quick quiz functionality
- 7-day learning plan
- Dark/light theme toggle
- Responsive design