// set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"))

// Message Contract Interface
const MessageContract = web3.eth.contract(MessageABI).at(MessageAddress)

const PublicKey = '0xbe862AD9AbFe6f22BCb087716c7D89a26051f74C'
const PrivateKey = 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109'
var Nonce = 0
var message = ""

web3.eth.getTransactionCount(PublicKey, (error, result) => {
	Nonce = result
})

for (let i=0; i<1000; i++) {
	setTimeout( () => {
		MessageContract.message((error, result) => {
      
      if (result != message) {
        message = result
        document.getElementById("cspio-headline").innerHTML = result
        document.getElementById("cspio-socialprofiles").style.display = "none"
      }

		});
  }, i*3000 )
}

function updateMessage() {
  var newMessage = document.getElementById("cspio-email").value
  
  if (newMessage === "" || newMessage === message) {
    return
  }

  document.getElementById("cspio-email").value = ""
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
