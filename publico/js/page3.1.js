var cnt = document.getElementById("count"); 
var water = document.getElementById("water");
var percent = cnt.innerText;
var interval;
interval=setInterval(function(){ 
  percent++; 
  cnt.innerHTML = percent; 
  water.style.transform='translate(0'+','+(100-percent)+'%)';
  if(percent==100){
    clearInterval(interval);
    window.parent.document.getElementsByClassName("FinalResults")[0].click();
    window.location.href = "page4.html";
  }
},60);