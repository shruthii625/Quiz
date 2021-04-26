
document.addEventListener('DOMContentLoaded',() => {
	const timeleftdisplay = document.querySelector('#timer')
	var timer=parseInt(window.localStorage.getItem("timer"));
	
	function countdown(){
		makeQuestion();
		setInterval(function(){
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			timeleftdisplay.innerHTML=minutes+":"+seconds;
			timer=timer-1;
			window.localStorage.setItem("timer",timer);
		}, 1000);
	 
	 
	}

	function fetchQuestions(){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/takeround3', true);
		xhr.onload = function () {
			arr = JSON.parse(xhr.responseText);
			arr.sort((a,b)=>{
				if(a.QNO<b.QNO){
					return -1;
				}
				else{
					return 1;
				}
			});
			countdown();
		}
		xhr.send();
	}
	window.onload = fetchQuestions;

});
var arr;
var k = parseInt(window.localStorage.getItem("k"));
var response = JSON.parse(window.localStorage.getItem("response"));
var score = parseInt(window.localStorage.getItem("score"));
var correctans="";
var ans="";

function makeQuestion(){   
	if(k>=2){
		 response['score']=score;
		 fetch('/round3', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(response)
		  });
			  
	window.location="lastpage.html";
	}  
	
	document.getElementById("changeimg").src='../round3images/'+k+'.jpg';
	document.getElementById("0").innerHTML=arr[k].Option1;
	document.getElementById("1").innerHTML=arr[k].Option2;
	document.getElementById("2").innerHTML=arr[k].Option3;
	document.getElementById("3").innerHTML=arr[k].Option4;
	correctans=arr[k].Answer+"/"+arr[k].KanAnswer;

}
	
function displayRightAns(){
	document.getElementById("nextbutton").disabled=true;
	document.getElementById("test").innerHTML = "CORRECT ANSWER: "+correctans;
	response["round3choice"+k]=ans;
	if(correctans==ans){
		score++;
	}
	k += 1;
	window.localStorage.setItem("k", k);
	window.localStorage.setItem("response", JSON.stringify(response));
	window.localStorage.setItem("score", score);
	setTimeout(()=>{
		document.getElementById("nextbutton").disabled=false;
		document.getElementById("test").innerHTML = "";
		makeQuestion();
	},2000);
}

function storeChoice(btn){
	if(btn==0){
		ans = document.getElementById("0").innerHTML;
		
	}
	if(btn==1){
		ans = document.getElementById("1").innerHTML;
	}
	if(btn==2){
		ans = document.getElementById("2").innerHTML;
	}
	if(btn==3){
		ans = document.getElementById("3").innerHTML;
	}
}

function preventBack() { window.history.forward(); }  
setTimeout("preventBack()", 0);  
window.onunload = function () { null };  
