function tezosTokens() {
  // Create an array of promises for each token
  const promises = tezos.map(token => {
    const cacheKey = `${token.address}_${token.tokenId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      // If cached data exists, create HTML using the cached data
      const data = JSON.parse(cachedData);
      const name = data.name;
      const imageUrl = data.imageUrl;
      const linkUrl = `https://objkt.com/asset/${token.address}/${token.tokenId}`;

      const html = `
        <div class="nft tezos token">
          <a href="${linkUrl}">
            <img src="${imageUrl}" alt="${name}" loading="lazy" />
            <p><span>${name}</span></p>
          </a>
        </div>
      `;

      // Add HTML to token-data div
      const tokenDataDiv = document.getElementById('collection');
      tokenDataDiv.innerHTML += html;

      // Return a resolved promise
      return Promise.resolve();
    } else {
      // If cached data does not exist, query the API to get token data and cache it
      return axios.get(`https://api.tzkt.io/v1/tokens?contract=${token.address}&offset=${token.tokenId}&limit=1`)
        .then(response => {
          // Get data for the token
          const tokenData = response.data[0];
          const name = tokenData.metadata.name;
          const image = tokenData.metadata.thumbnailUri;

          // Transform image URL
          const imageUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/');

          // Cache data
          const data = { name, imageUrl };
          localStorage.setItem(cacheKey, JSON.stringify(data));

          // Create link URL
          const linkUrl = `https://objkt.com/asset/${token.address}/${token.tokenId}`;

          // Create HTML for image and name
          const html = `
            <div class="nft tezos token">
              <a href="${linkUrl}">
                <img src="${imageUrl}" alt="${name}" loading="lazy" />
                <p><span>${name}</span></p>
              </a>
            </div>
          `;

          // Add HTML to token-data div
          const tokenDataDiv = document.getElementById('collection');
          tokenDataDiv.innerHTML += html;
        })
        .catch(error => {
          console.log(error);
        });
    }
  });

  // Return a promise that resolves when all promises in the array have resolved
  return Promise.all(promises);
}

function ethTokens() {
  // Create an array of promises for each token
  const promises = eth.map(token => {
    // Check if data is in localStorage
    const cachedData = localStorage.getItem(`eth_${token.address}_${token.tokenId}`);
    if (cachedData) {
      // Parse cached data and add HTML to token-data div
      const tokenData = JSON.parse(cachedData);
      const name = tokenData.name;
      const image = tokenData.image;
      const html = `
        <div class="nft ethereum token">
          <a href="https://looksrare.org/collections/${token.address}/${token.tokenId}">
            <img src="${image}" alt="${name}" loading="lazy" />
            <p><span>${name}</span></p>
          </a>
        </div>
      `;
      const tokenDataDiv = document.getElementById('collection');
      tokenDataDiv.innerHTML += html;
      
      // Return a resolved promise
      return Promise.resolve();
    }
    else {
      // Query the LooksRare API to get token data and return the promise
      return axios.get(`https://api.looksrare.org/api/v1/tokens?collection=${token.address}&tokenId=${token.tokenId}`)
        .then(response => {
          // Get data for the token
          const tokenData = response.data.data;
          const name = tokenData.name;
          const image = tokenData.imageURI;

          // Cache data and image
          localStorage.setItem(`eth_${token.address}_${token.tokenId}`, JSON.stringify({name, image}));
          const imageUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
          const cachedImage = localStorage.getItem(`eth_image_${imageUrl}`);
          if (!cachedImage) {
            return axios.get(imageUrl, {responseType: 'blob'})
              .then(response => {
                const blobUrl = URL.createObjectURL(response.data);
                localStorage.setItem(`eth_image_${imageUrl}`, blobUrl);
                return blobUrl;
              });
          }
          else {
            return Promise.resolve(cachedImage);
          }
        })
        .then(blobUrl => {
          // Create HTML for image and name
          const html = `
            <div class="nft ethereum token">
              <a href="https://looksrare.org/collections/${token.address}/${token.tokenId}">
                <img src="${blobUrl}" alt="${name}" loading="lazy" />
                <p><span>${name}</span></p>
              </a>
            </div>
          `;

          // Add HTML to token-data div
          const tokenDataDiv = document.getElementById('collection');
          tokenDataDiv.innerHTML += html;
        })
        .catch(error => {
          console.log(error);
        });
    }
  });

  // Return a promise that resolves when all promises in the array have resolved
  return Promise.all(promises);
}

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

document.addEventListener("DOMContentLoaded", async function(event) {
  // Call tezosTokens() and wait for it to complete before calling ethTokens()
  await tezosTokens();
  await ethTokens();

  if (supportsLazyLoading()) {
    observeImages();
  }
});