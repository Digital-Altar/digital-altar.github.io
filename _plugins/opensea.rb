require 'opensea'

opensea = Opensea::Client.new

# Replace "0x..." with the contract address of the NFTs you want to display
assets = opensea.assets(contract_address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB")

# Loop through the assets and display their information
assets.each do |asset|
  puts "Name: #{asset.name}"
  puts "Image URL: #{asset.image_url}"
  puts "Token ID: #{asset.token_id}"
  puts "Contract Address: #{asset.asset_contract.address}"
  puts "\n"
end