// set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"))

// Message Contract Interface
const MessageContract = web3.eth.contract(MessageABI).at(MessageAddress)

const PublicKey = '0x12345da127d2ab88e92c3bc3ab78fd3ffe30da5b'
const PrivateKey = '0f12bbe9fa77aad882b973b433e64d44691f1c3ca826bd8a9223e485ad45bdd3'
let Nonce = 0
let message = ''

setInterval( () => {
  MessageContract.message((error, result) => {
    
    if (result != message) {
      message = result
      document.getElementById("cspio-headline").innerHTML = result
      document.getElementById("cspio-socialprofiles").style.display = "none"
    }
  });
}, 1000);

web3.eth.getTransactionCount(PublicKey, (error, result) => {
  Nonce = result
})

function updateBlock() {

  let blockNumber = document.getElementById("block-number").value
  document.getElementById("block-number").value = ""
  let blockNumberInt = parseInt(blockNumber, 10);
  document.getElementById("block-number").placeholder = blockNumberInt

  let blockNumberHex = blockNumberInt.toString(16)
  web3.eth.defaultBlock = '0x' + blockNumberHex

  document.getElementById("block-number-button").style.display = "block"
}

function resetBlock() {
  
  document.getElementById("block-number-button").style.display = "none"

  document.getElementById("block-number").placeholder = 'latest'
  web3.eth.defaultBlock = 'latest'

}

function updateMessage() {
  var newMessage = document.getElementById("cspio-email").value
  
  document.getElementById("cspio-email").value = ""
  
  if (newMessage === "" || newMessage === message) {
    return
  }

  document.getElementById("cspio-socialprofiles").style.display = "block"
	var data = MessageContract.updateMessage.getData(newMessage)

  var tx = new ethereumjs.Tx({
    nonce: Nonce,
    gasPrice: 1e9,
    gasLimit: 1e6,
    to: MessageAddress,
    data: data
  })

  tx.sign(ethereumjs.Buffer.Buffer.from(PrivateKey, "hex"))

  var raw = "0x" + tx.serialize().toString("hex")

  web3.eth.sendRawTransaction(raw, (err, transactionHash) => {})

  Nonce++
}
