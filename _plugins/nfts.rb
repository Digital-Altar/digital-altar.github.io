require 'net/http'
require 'json'

# Replace "0x..." with the contract address of the NFTs you want to display
contract_address = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"

uri = URI("https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&asset_contract_address=#{0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB}")

response = Net::HTTP.get(uri)
nfts = JSON.parse(response)

nfts.each do |nft|
  puts "Name: #{nft['name']}"
  puts "Image URL: #{nft['image_url']}"
  puts "Token ID: #{nft['token_id']}"
  puts "Contract Address: #{nft['asset_contract']['address']}"
  puts "\n"
end
