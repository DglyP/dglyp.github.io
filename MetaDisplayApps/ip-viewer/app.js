(function() {
  'use strict';

  var CONFIG = {
    appName: 'IP Viewer',
    storageKey: 'mdg_ipviewer',
  };

  var state = {
    currentScreen: 'home',
    isLoading: false,
    localIp: 'Detecting...',
    publicIp: 'Detecting...',
  };

  var screens = {};

  function collectScreens() {
    document.querySelectorAll('.screen').forEach(function(s) {
      if (s.id) screens[s.id] = s;
    });
  }

  function navigateTo(screenId) {
    Object.values(screens).forEach(function(s) { s.classList.add('hidden'); });
    if (screens[screenId]) {
      screens[screenId].classList.remove('hidden');
      state.currentScreen = screenId;
      onScreenEnter(screenId);
      focusFirst(screens[screenId]);
    }
  }

  function focusFirst(container) {
    var el = container.querySelector('.focusable:not([disabled]):not(.hidden)');
    if (el) el.focus();
  }

  function moveFocus(direction) {
    var container = screens[state.currentScreen];
    if (!container) return;

    var focusables = Array.from(
      container.querySelectorAll('.focusable:not([disabled]):not(.hidden)')
    );
    if (focusables.length === 0) return;

    var current = document.activeElement;
    var idx = focusables.indexOf(current);

    if (idx === -1) {
      focusFirst(container);
      return;
    }

    var nextIdx;
    if (direction === 'up' || direction === 'left') {
      nextIdx = idx > 0 ? idx - 1 : focusables.length - 1;
    } else {
      nextIdx = idx < focusables.length - 1 ? idx + 1 : 0;
    }
    focusables[nextIdx].focus();
    
    focusables[nextIdx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  async function getLocalIP() {
    return new Promise((resolve) => {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      pc.createOffer().then(offer => pc.setLocalDescription(offer));
      
      let found = false;
      pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        // Search for IPv4 pattern
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = ipRegex.exec(ice.candidate.candidate);
        if (match && !found) {
          found = true;
          resolve(match[1]);
          pc.close();
        }
      };

      setTimeout(() => {
        if (!found) {
          pc.close();
          resolve('Not found (mDNS?)');
        }
      }, 4000);
    });
  }

  async function getPublicIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (e) {
      return 'Error fetching';
    }
  }

  async function refreshIPs() {
    if (state.isLoading) return;
    setLoading(true);
    document.getElementById('local-ip').textContent = 'Detecting...';
    document.getElementById('public-ip').textContent = 'Detecting...';
    
    try {
      const [local, publicIp] = await Promise.all([getLocalIP(), getPublicIP()]);
      state.localIp = local;
      state.publicIp = publicIp;
      document.getElementById('local-ip').textContent = local;
      document.getElementById('public-ip').textContent = publicIp;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function setLoading(isLoading) {
    state.isLoading = isLoading;
    document.getElementById('loading').classList.toggle('hidden', !isLoading);
  }

  function handleAction(action) {
    if (action === 'refresh') {
      refreshIPs();
    }
  }

  function onScreenEnter(screenId) {
    if (screenId === 'home') {
      refreshIPs();
    }
  }

  function setupEvents() {
    document.addEventListener('click', function(e) {
      var actionEl = e.target.closest('[data-action]');
      if (actionEl) handleAction(actionEl.dataset.action);
    });

    document.addEventListener('keydown', function(e) {
      switch (e.key) {
        case 'ArrowUp': moveFocus('up'); e.preventDefault(); break;
        case 'ArrowDown': moveFocus('down'); e.preventDefault(); break;
        case 'ArrowLeft': moveFocus('left'); e.preventDefault(); break;
        case 'ArrowRight': moveFocus('right'); e.preventDefault(); break;
        case 'Enter':
          if (document.activeElement && document.activeElement.classList.contains('focusable')) {
            document.activeElement.click();
          }
          e.preventDefault();
          break;
      }
    });
  }

  function init() {
    collectScreens();
    setupEvents();
    navigateTo('home');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
