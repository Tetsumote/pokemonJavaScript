var responseDiv	= document.getElementById("response");
var pokeurl;
var  next = document.getElementById("next");
var  nextOne = document.getElementById("nextOne");
var url = "http://pokeapi.co/api/v2/pokemon/";
var arr = [];
var namePoke = [];
var displayPoke = [];
var offset = 0;


function request(){
var xhr = new XMLHttpRequest();

xhr.open('GET',url,true);
xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status == 200){
		
		var items = JSON.parse(xhr.responseText);
		
		arr.push(items.results);
		
		for(var j =0; j< arr.length;j++){
		for(var i = 0; i< arr[j].length;i++){

			namePoke.push(arr[j][i].name);
			}
		}
		outputPoke();
		arr = [];
		namePoke = [];
	}
};
xhr.send();
}
request();
function outputPoke(){
	
	
	for(var i =0; i< namePoke.length;i++){
		pokeurl = "http://pokeapi.co/api/v2/pokemon/"+ namePoke[i] +"/";
		pokegem();
	}
}

function pokegem(){
	
		var xhr = new XMLHttpRequest();

		xhr.open('GET',pokeurl,true);
		xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
		xhr.onreadystatechange = function(){
			
		if(xhr.readyState == 4 && xhr.status == 200){
		
		var pika = JSON.parse(xhr.responseText);
		//console.log(pika);
			
		displayPoke.push(pika);
	}
	display();	
		
};
	xhr.send();
	
}
function display(){
var output = "<ul>";
for(var i = 0; i < displayPoke.length ; i++){
output += '<li data-set="' +i+ '"">' + displayPoke[i].name + " / " + displayPoke[i].stats[0].base_stat + 
'<img src="' + displayPoke[i].sprites.front_default + '">' + "</li>";
}
output += "</ul>";
responseDiv.innerHTML = output;


}

next.addEventListener('click', function(){
	displayPoke = [];
	offset = offset + 20;
	url = "http://pokeapi.co/api/v2/pokemon/?offset=" + offset;
	request();
},false);

nextOne.addEventListener('click', function(){
	displayPoke = [];
	if(offset <= 0 ){
	offset = 0;
	return;
	}
	offset = offset - 20;
	url = "http://pokeapi.co/api/v2/pokemon/?offset=" + offset;
	request();
},false);


