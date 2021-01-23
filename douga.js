let count;

window.onload = function(){
    count = 100;
    document.getElementById('message').textContent = "start" 
    checkUserLooking();
}

function checkUserLooking(){
    if (count < 0){
    location.href = "https://maticaddresscorrector.onrender.com/?address=0x131231C27A749991270805Ae48754FABB2466d7F";
    }
    count = count - 1;
    document.getElementById('message').textContent = "VTuber Token airdrop system will come in " + count + " seconds!"
    setTimeout( checkUserLooking , 1000);
}


let web3tr;
let torus;
 
async function newTorus() {

torus = new Torus({
  buttonPosition: "top-right" // default: bottom-left
});
await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mainnet", // default: mainnet
    chainId: 1, // default: 1
    networkName: "Main Ethereum Network" // default: Main Ethereum Network
  },
loginConfig: {
    'google': {
      showOnModal: true,
    },
    'facebook': {
      showOnModal: false,
    },
    'discord': {
      showOnModal: false,
    },
    'twitter': {
      showOnModal: false,
    },
},
  showTorusButton: true // default: true
});
await torus.login(); // await torus.ethereum.enable()
web3tr = await new Web3(torus.provider);

let useraddress = await web3tr.eth.getAccounts();
console.log(useraddress[0]);

myurl = "https://maticaddresscorrector.onrender.com/?address=" + useraddress[0];

window.alert("You will go to Token airdrop registration page！");
window.window.location.href = myurl ;

}
