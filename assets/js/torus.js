let web3tr;
let torus;
let useraddress;

window.onload = async function(){
//    window.alert(location.pathname);
    console.log("loaded");
    await connecttorus();
    if (location.pathname == "/fanAddressList.html" ){
    setList()
    }
    if ( location.pathname == "/vTuberAdmin.html"){
        //window.alert("vtuber Admin page")
        makeList()
    }
}

async function register(){
    window.location.href = "https://ethaddresscorrector.onrender.com/?address=" + document.getElementById('UserAddress').value;
}


async function connecttorus(){
    console.log("torus");
    
torus = await new Torus({
  buttonPosition: "top-right" // default: bottom-left
});
// window.alert("1");

 
await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
    // host: "matic", // default: mainnet
    // chainId: 137, // default: 1
    // networkName: "Matic Network" // default: Main Ethereum Network
  },
  loginConfig: {
    'twitter': {
      showOnModal: false,
    },
    'facebook': {
      showOnModal: false,
    },
    'discord': {
      showOnModal: false,
    },
    'google': {
      showOnModal: true,
    },
},
  showTorusButton: true // default: true
});
    
await torus.login(); // await torus.ethereum.enable()
web3tr = await new Web3(torus.provider);
info = await torus.getUserInfo()
console.log(info)
useraddress = await web3tr.eth.getAccounts();
console.log(useraddress[0]);
// web3rpc = await new Web3(new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com/v1/4522ac800be34832c8e1500d7d2cbc687ed3204c'))
// add = await web3rpc.eth.getAccounts()
// console.log(add[0])
    
// document.getElementById('UserAddress').value = useraddress[0];    
}

async function checktokenname(){
    console.log(tokenaddress);
    mycontract = await new web3tr.eth.Contract(abi, tokenaddress);
    let fromblockchain1 = await  mycontract.methods.name().call();
    console.log(fromblockchain1);
}

async function selftransfer(){
    mycontract = await new web3tr.eth.Contract(abi, tokenaddress);    
    console.log(useraddress[0]);
    let ret = await mycontract.methods.transfer( useraddress[0] , 1 ).send({ from: useraddress[0] });
}
