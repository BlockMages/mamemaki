let myfanaddresslist;

async function makeToken() {
    name = document.getElementById('name').value;
    symbol = document.getElementById('symbol').value;
    //window.alert(name);
    //window.alert(symbol);
    mycontract2 = await new web3tr.eth.Contract(factoryabi, factoryaddress);
    let ret = await mycontract2.methods.createToken( name , symbol ).send({ from: useraddress[0] });
//    let fromblockchain1 = await  mycontract2.methods.getTokenCount().call();
//    console.log(fromblockchain1);
//    return fromblockchain1; 
}

async function makeList() {
    fanaddressfromnet = await fetch("https://maticaddresscorrector.onrender.com/list" , {
  mode: 'cors'
})
    fanaddresslist = await fanaddressfromnet.json()
    let tableElem = document.getElementById('fanlist');
    for(a of fanaddresslist){
        let trElem = tableElem.tBodies[0].insertRow(-1);
        let cellElem0 = trElem.insertCell(0);
        cellElem0.appendChild(document.createTextNode(a));
        //window.alert(a)
        }
    myfanaddresslist = fanaddresslist;
    return fanaddresslist
}

async function distribute(){
    mytokenaddress = await getTokenAddress( 2 );
//    mycontract3 = await new web3tr.eth.Contract(abi, "0x280FEc7E59Df46eb1C6Ec17Faa4a972134b00e66"); 
    mycontract3 = await new web3tr.eth.Contract(abi, mytokenaddress); 

//    window.alert(myfanaddresslist);
//    window.alert(mycontract3);
    let ret = await mycontract3.methods.distribute( myfanaddresslist ).send({ from: useraddress[0] });
}

async function getTokenAddress( tnum ){
    mycontract3 = await new web3tr.eth.Contract(factoryabi, factoryaddress);
    let fromblockchain1 = await  mycontract3.methods.tokens(tnum).call();
    console.log(fromblockchain1);
    return fromblockchain1;
}

