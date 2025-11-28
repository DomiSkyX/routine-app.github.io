window.addEventListener('load', () => {
    if (!window.location.search.includes('v=')) {
      window.location.href = window.location.href.split('?')[0] + '?v=' + Date.now();
    }
  });