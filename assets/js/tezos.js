function loadTokens() {
  // Loop through each token and output a div for each one
  tokens.forEach(token => {
    // Query the API to get token data
    axios.get(`https://api.tzkt.io/v1/tokens?contract=${token.address}&offset=${token.tokenId}&limit=1`)
      .then(response => {
        // Get data for the token
        const tokenData = response.data[0];
        console.log(tokenData);

        const name = tokenData.metadata.name;
        console.log(name); // TELEVISION

        const image = tokenData.metadata.thumbnailUri;
        console.log(image); // ipfs://QmXkCjzAYScJg3kGSjC8jasNBnt5SMSYazdsrthggjSHD3

        // Transform image URL
        const imageUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/');

        // Create link URL
        const linkUrl = `https://objkt.com/asset/${token.address}/${token.tokenId}`;

        // Create HTML for image and name
        const html = `
          <div class="nft">
            <a href="${linkUrl}">
              <img src="${imageUrl}" alt="${name}" />
              <p>${name}</p>
            </a>
          </div>
        `;

        // Add HTML to token-data div
        const tokenDataDiv = document.getElementById('tezos');
        tokenDataDiv.innerHTML += html;
      })
      .catch(error => {
        console.log(error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  loadTokens();
});