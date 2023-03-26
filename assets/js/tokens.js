function tezosTokens() {
  // Create an array of promises for each token
  const promises = tezos.map(token => {
    // Query the API to get token data and return the promise
    return axios.get(`https://api.tzkt.io/v1/tokens?contract=${token.address}&offset=${token.tokenId}&limit=1`)
      .then(response => {
        // Get data for the token
        const tokenData = response.data[0];
        const name = tokenData.metadata.name;
        const image = tokenData.metadata.thumbnailUri;

        // Transform image URL
        const imageUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/');

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
  });

  // Return a promise that resolves when all promises in the array have resolved
  return Promise.all(promises);
}

function ethTokens() {
  // Create an array of promises for each token
  const promises = eth.map(token => {
    // Query the LooksRare API to get token data and return the promise
    return axios.get(`https://api.looksrare.org/api/v1/tokens?collection=${token.address}&tokenId=${token.tokenId}`)
      .then(response => {
        // Get data for the token
        const tokenData = response.data;
        const name = tokenData.data.name;
        const image = tokenData.data.imageURI;

        // Create HTML for image and name
        const html = `
          <div class="nft ethereum token">
            <a href="https://looksrare.org/collections/${token.address}/${token.tokenId}">
              <img src="${image}" alt="${name}" loading="lazy" />
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
  });

  // Return a promise that resolves when all promises in the array have resolved
  return Promise.all(promises);
}