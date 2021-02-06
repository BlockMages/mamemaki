
async function setList() {
    holderList = await holderlist();
//    console.log(holderList[0]);
    
    let tableElem = document.getElementById('tokenholder');

    for (let i in holderList){ 
        let trElem = tableElem.tBodies[0].insertRow(-1);
        let cellElem0 = trElem.insertCell(0);
        cellElem0.appendChild(document.createTextNode(holderList[i]));
        let cellElem1 = trElem.insertCell(1);
        qty = await checkbalance(holderList[i]);
        console.log(JSON.stringify(qty))
        cellElem1.appendChild(document.createTextNode(qty / 10**18));
    }
}





async function checkbalance(_holderadd){
    console.log(_holderadd)
    console.log(tokenaddress);
    mycontract = await new web3tr.eth.Contract(abi, tokenaddress);
    let fromblockchain1 = await  mycontract.methods.balanceOf(_holderadd).call();
//    let fromblockchain1 = await  mycontract.methods.balanceOf("0x00000000219ab540356cBB839Cbe05303d7705Fa").call();
    console.log(fromblockchain1 / Math.pow(10,18));
    return fromblockchain1;
}

async function holderlist(){
    console.log(tokenaddress);
    mycontract = await new web3tr.eth.Contract(abi, tokenaddress);
    let fromblockchain1 = await  mycontract.methods.getTokenHolders().call();
    console.log(fromblockchain1);
    return fromblockchain1;
}
