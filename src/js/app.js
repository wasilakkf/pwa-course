// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service worker registered!');
  })
}

// Get that "App install banner"

window.addEventListener('DOMContentLoaded', () => {
  const $installButton = document.querySelector('.install-button');

  window.addEventListener('beforeinstallprompt', event => {
    window.deferredPrompt = event;

    $installButton.classList.toggle('js-hidden', false);
  });

  $installButton.addEventListener('click', () => {
    console.log('Click!');
    
    if (!window.deferredPrompt) {
      return;
    }

    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then(result => {
      console.log('userChoice', result);

      window.deferredPrompt = null;
      $installButton.classList.toggle('js-hidden', true);
    })
  });

  window.addEventListener('appinstalled', event => {
    console.log('appinstalled', event);
  })
});
