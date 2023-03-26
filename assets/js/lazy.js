function supportsLazyLoading() {
  return 'loading' in HTMLImageElement.prototype;
}

function lazyLoadImages(images) {
  images.forEach(img => {
    img.src = img.dataset.src;
    img.onload = () => {
      img.removeAttribute('data-src');
    };
  });
}

function observeImages() {
  const images = document.querySelectorAll('img[data-src]');
  lazyLoadImages(images);

  const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const addedImages = mutation.addedNodes
          ? Array.from(mutation.addedNodes).filter(node => node.nodeName === 'IMG')
          : [];
        if (addedImages.length) {
          lazyLoadImages(addedImages);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener("DOMContentLoaded", function(event) {
  // Call tezosTokens() and wait for it to complete before calling ethTokens()
  tezosTokens().then(() => {
    ethTokens();
  });

  if (supportsLazyLoading()) {
    observeImages();
  }
});