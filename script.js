var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

var slideIndex2 = 0;
showSlides2();

function showSlides2() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex2++;
  if (slideIndex2 > slides.length) {slideIndex2 = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex2-1].style.display = "block";  
  dots[slideIndex2-1].className += " active";
  setTimeout(showSlides2, 3500);
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
  //vertical.align = "middle";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.body.onload = tableFromJson;

var myBooks = [
	{	'Name': 'Samsung Galaxy A01',
		'Price': '103.95',
		'File': 'images/phone1.jpg',
		'PID': '0'
	},
	{	'Name': 'Samsung Galaxy A10S',
		'Price': '134.47',
		'File': 'images/phone2.jpg',
		'PID': '1'
	},
	{	'Name': 'Samsung Galaxy A30S',
		'Price': '229.99',
		'File': 'images/phone3.jpg',
		'PID': '2'
	},
	{	'Name': 'Samsung Galaxy S20',
		'Price': '713.99',
		'File': 'images/phone4.jpg',
		'PID': '3'
	},
	{	'Name': 'Samsung Galaxy A50',
		'Price': '279.00',
		'File': 'images/phone5.jpg',
		'PID': '4'
	},
	{	'Name': 'Samsung Galaxy S20+',
		'Price': '762.49',
		'File': 'images/phone6.jpg',
		'PID': '5'
	},
	{	'Name': 'Samsung Galaxy A71',
		'Price': '364.90',
		'File': 'images/phone7.jpg',
		'PID': '6'
	},
	{	'Name': 'Samsung Galaxy A51',
		'Price': '271.99',
		'File': 'images/phone8.jpg',
		'PID': '7'
	}		
];

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
});

function tableFromJson() {
	var col = [];
	for (var i = 0; i < myBooks.length; i++) {
		for (var key in myBooks[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}
	
	for (var i = 0; i < myBooks.length; i++) {

		var newProductCard = document.createElement("div");
		var newProductImageDiv = document.createElement("div");
		var newProductImage = document.createElement("img");
		var newProductName = document.createElement("p");
		var newProductPrice = document.createElement("p");
		var newProductBtn = document.createElement("button");
		
		var textName = document.createTextNode(myBooks[i][col[0]]);
		var textPrice = document.createTextNode(formatter.format(myBooks[i][col[1]]));
		var textPictureLink = myBooks[i][col[2]];
		var textBtnId = myBooks[i][col[3]];
		var textButton = document.createTextNode("ADD TO CART");
		
		newProductCard.setAttribute("class", "product-card");
		newProductImageDiv.setAttribute("class", "product-image");
		newProductName.setAttribute("class", "phoneName");
		newProductPrice.setAttribute("class", "price");
		newProductImage.setAttribute("src", textPictureLink);
		newProductBtn.setAttribute("id", textBtnId);
		newProductBtn.setAttribute("onClick","reply_click(this.id)");
		
		newProductImageDiv.appendChild(newProductImage);
		newProductName.appendChild(textName);
		newProductPrice.appendChild(textPrice);
		newProductBtn.appendChild(textButton);
		newProductCard.appendChild(newProductImageDiv);
		newProductCard.appendChild(newProductName);
		newProductCard.appendChild(newProductPrice);
		newProductCard.appendChild(newProductBtn);
		
		document.getElementById("products").appendChild(newProductCard);
	}
	
}

function reply_click(clicked_id){
	//console.log(clicked_id);
	
	var col = [];
	for (var i = 0; i < myBooks.length; i++) {
		for (var key in myBooks[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}
	
	var x = document.getElementById("tablecart").rows.length;
	
	console.log("row",x);
	
	if (x<2){
		var table = document.getElementById("tablecart");
		var tr = table.insertRow(-1);
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = myBooks[clicked_id][col[0]];
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = 1;
		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = myBooks[clicked_id][col[1]];
	}
	
	else{
		var t = document.getElementById("tablecart");
		var trs = t.getElementsByTagName("tr");
		
		var itemFound = false;
		
		var trsFound = 0;
		
		for (var i=1; i<trs.length; i++){
			var tds = trs[i].getElementsByTagName("td");
			var productName2 =  myBooks[clicked_id][col[0]];
			var tdsString = JSON.stringify(tds[0].innerHTML);
			
			var result = tdsString.indexOf(myBooks[clicked_id][col[0]]);
			
			if (result===1){
				itemFound = true;
				trsFound = i;
			}
			console.log("result", result);			
		}
		
		if (itemFound==true){
			var tds = trs[trsFound].getElementsByTagName("td");
			var unitPrice = Number(tds[2].innerHTML)/Number(tds[1].innerHTML);
			console.log ("unitPrice", unitPrice);
			tds[1].innerHTML = Number(tds[1].innerHTML) + 1;
			tds[2].innerHTML = (Math.round((Number(tds[2].innerHTML) + Number(unitPrice)) * 100) / 100).toFixed(2);
		}else{
			var tr = t.insertRow(-1);
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = myBooks[clicked_id][col[0]];
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = 1;
			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = myBooks[clicked_id][col[1]];
		}
	}
	
	updateTotal();
}

function updateTotal(){
	var t = document.getElementById("tablecart");
	var trs = t.getElementsByTagName("tr");
	
	var cartTotal = 0.00;
	
	for (var i=1; i<trs.length; i++){
		var tds = trs[i].getElementsByTagName("td");
		cartTotal = Number(cartTotal) + Number(tds[2].innerHTML);
	}
	
	document.getElementById("totalprice-span").innerHTML = (Math.round(cartTotal * 100) / 100).toFixed(2);
	console.log("total", cartTotal);
}
