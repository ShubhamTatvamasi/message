// Message contract address
const MessageAddress = "0xf5d5175aa8c7ea16f370b1acef72daeb10586040"
// Message contract ABI
const MessageABI = [{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"updateMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"newMessage","type":"event"}]
