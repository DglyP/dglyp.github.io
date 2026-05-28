/**
 * Translation Manager for Degly Pava Portfolio Website
 * Handles language detection, switching, and content replacement
 */

class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.supportedLanguages = ['en', 'es', 'fr', 'ja'];
        this.translations = {};
        this.fallbackLanguage = 'en';
        
        // Initialize on page load
        this.init();
    }

    async init() {
        // Load default language first
        await this.loadTranslations(this.fallbackLanguage);
        
        // Detect and set language
        this.detectLanguage();
        
        // Load current language if different from fallback
        if (this.currentLanguage !== this.fallbackLanguage) {
            await this.loadTranslations(this.currentLanguage);
        }
        
        // Apply translations
        this.applyTranslations();
        
        // Setup language selector
        this.setupLanguageSelector();
        
        // Update page metadata
        this.updateMetadata();
    }

    detectLanguage() {
        // Priority: URL fragment > localStorage > browser language > default
        const urlLang = this.getLanguageFromURL();
        const storedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language.substr(0, 2);
        
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            this.currentLanguage = urlLang;
        } else if (storedLang && this.supportedLanguages.includes(storedLang)) {
            this.currentLanguage = storedLang;
        } else if (this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
        }
        
        // Update URL and storage
        this.updateURLFragment();
        localStorage.setItem('preferredLanguage', this.currentLanguage);
    }

    getLanguageFromURL() {
        const hash = window.location.hash;
        const match = hash.match(/lang=([a-z]{2})/);
        return match ? match[1] : null;
    }

    updateURLFragment() {
        const currentHash = window.location.hash;
        const newHash = currentHash.replace(/[?&]?lang=[a-z]{2}/, '') + 
                       (currentHash.includes('?') ? '&' : '?') + 
                       `lang=${this.currentLanguage}`;
        
        // Update URL without triggering page reload
        history.replaceState(null, null, newHash);
    }

    async loadTranslations(language) {
        try {
            const response = await fetch(`js/lang/${language}.json`);
            if (!response.ok) throw new Error(`Failed to load ${language} translations`);
            
            const translations = await response.json();
            this.translations[language] = translations;
            
        } catch (error) {
            console.error(`Error loading translations for ${language}:`, error);
            
            // If it's not the fallback language, ensure we have fallback
            if (language !== this.fallbackLanguage && !this.translations[this.fallbackLanguage]) {
                await this.loadTranslations(this.fallbackLanguage);
            }
        }
    }

    getText(key) {
        const keys = key.replace(/\[(\d+)\]/g, '.$1').split('.');
        let translation = this.translations[this.currentLanguage];
        
        // Navigate through nested keys
        for (const k of keys) {
            translation = translation?.[k];
        }
        
        // Fallback to English if translation not found
        if (!translation && this.currentLanguage !== this.fallbackLanguage) {
            translation = this.translations[this.fallbackLanguage];
            for (const k of keys) {
                translation = translation?.[k];
            }
        }
        
        return translation || key;
    }

    async switchLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.error(`Unsupported language: ${language}`);
            return;
        }

        const previousLanguage = this.currentLanguage;
        this.currentLanguage = language;
        
        // Show loading indicator
        this.showLoadingIndicator();
        
        try {
            // Load translations if not already loaded
            if (!this.translations[language]) {
                await this.loadTranslations(language);
            }
            
            // Apply translations
            this.applyTranslations();
            
            // Update metadata
            this.updateMetadata();
            
            // Update URL and storage
            this.updateURLFragment();
            localStorage.setItem('preferredLanguage', language);
            
            // Update language selector
            this.updateLanguageSelector();
            
            // Reload projects if on projects page
            if (document.getElementById('all-projects')) {
                await this.reloadProjects();
            }
            
            // Fire custom event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language, previousLanguage }
            }));
            
        } catch (error) {
            console.error('Error switching language:', error);
            this.currentLanguage = previousLanguage;
        } finally {
            this.hideLoadingIndicator();
        }
    }

    applyTranslations() {
        // Translate elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getText(key);
            
            if (translation !== key) {
                // Check if it's an input element
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = translation;
                    } else {
                        element.placeholder = translation;
                    }
                } else {
                    element.innerHTML = translation;
                }
            }
        });

        // Translate navigation menu
        this.translateNavigation();
        
        // Translate dynamic content
        this.translateDynamicContent();
    }

    translateNavigation() {
        const nav = this.getText('navigation');
        if (nav) {
            document.querySelectorAll('[data-nav-section]').forEach(link => {
                const section = link.getAttribute('data-nav-section');
                if (nav[section]) {
                    link.textContent = nav[section];
                }
            });
        }
    }

    translateDynamicContent() {
        // Translate skills chart labels
        if (window.TranslationManager && window.TranslationManager.updateChartsLanguage) {
            window.TranslationManager.updateChartsLanguage();
        }
    }

    updateMetadata() {
        const meta = this.getText('meta');
        if (meta) {
            // Update page title
            if (meta.title) {
                document.title = meta.title;
            }
            
            // Update meta description
            const description = document.querySelector('meta[name=\"description\"]');
            if (description && meta.description) {
                description.setAttribute('content', meta.description);
            }
            
            // Update OG meta tags
            const ogTitle = document.querySelector('meta[property=\"og:title\"]');
            if (ogTitle && meta.ogTitle) {
                ogTitle.setAttribute('content', meta.ogTitle);
            }
            
            const ogDescription = document.querySelector('meta[property=\"og:description\"]');
            if (ogDescription && meta.ogDescription) {
                ogDescription.setAttribute('content', meta.ogDescription);
            }
        }
    }

    setupLanguageSelector() {
        const languages = {
            en: 'English',
            es: 'Español',
            fr: 'Français',
            ja: '日本語'
        };

        // Find existing language selector buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        
        if (langButtons.length > 0) {
            // Use existing buttons
            langButtons.forEach(button => {
                const lang = button.getAttribute('data-lang');
                
                // Update active state
                if (lang === this.currentLanguage) {
                    button.style.background = '#999';
                    button.style.color = '#fff';
                } else {
                    button.style.background = 'none';
                    button.style.color = '#666';
                }
                
                // Add click event
                button.addEventListener('click', () => this.switchLanguage(lang));
            });
            
            return;
        }

        // Create language selector if it doesn't exist (fallback)
        if (!document.getElementById('language-selector')) {
            const selector = document.createElement('div');
            selector.id = 'language-selector';
            selector.className = 'language-selector';
            
            const currentLang = document.createElement('div');
            currentLang.className = 'current-language';
            currentLang.innerHTML = `<span class="flag flag-${this.currentLanguage}"></span>${languages[this.currentLanguage]}`;
            
            const dropdown = document.createElement('div');
            dropdown.className = 'language-dropdown';
            
            this.supportedLanguages.forEach(lang => {
                if (lang !== this.currentLanguage) {
                    const option = document.createElement('div');
                    option.className = 'language-option';
                    option.innerHTML = `<span class="flag flag-${lang}"></span>${languages[lang]}`;
                    option.addEventListener('click', () => this.switchLanguage(lang));
                    dropdown.appendChild(option);
                }
            });
            
            selector.appendChild(currentLang);
            selector.appendChild(dropdown);
            
            // Add to page
            document.body.appendChild(selector);
            
            // Toggle dropdown
            currentLang.addEventListener('click', () => {
                dropdown.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!selector.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
        }
    }

    updateLanguageSelector() {
        // Update existing language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        
        if (langButtons.length > 0) {
            langButtons.forEach(button => {
                const lang = button.getAttribute('data-lang');
                
                // Update active state
                if (lang === this.currentLanguage) {
                    button.style.background = '#999';
                    button.style.color = '#fff';
                } else {
                    button.style.background = 'none';
                    button.style.color = '#666';
                }
            });
            return;
        }
        
        // Fallback to recreating selector
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.remove();
            this.setupLanguageSelector();
        }
    }

    async reloadProjects() {
        // Reload projects with current language
        if (window.loadAllProjects) {
            await window.loadAllProjects();
        }
    }

    showLoadingIndicator() {
        // Add subtle loading indicator
        const indicator = document.createElement('div');
        indicator.id = 'translation-loading';
        indicator.innerHTML = '🌐 Translating...';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(44, 152, 240, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(indicator);
    }

    hideLoadingIndicator() {
        const indicator = document.getElementById('translation-loading');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }
    }

    // Public methods for external use
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    isRTL() {
        // Add RTL languages here if needed in the future
        return false;
    }
}

// Initialize translation manager
window.TranslationManager = new TranslationManager();
window.translationManager = window.TranslationManager; // Also available as lowercase for compatibility

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}
