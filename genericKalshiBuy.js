var fs = require('fs');
var scrapeurl = "https://trading-api.kalshi.com/v1/users/(useridhere)/orders";
var cookie = "sessions=(yourcookiehere)";
var marketid = "6f6e816e-69b8-4fbf-969e-b36c65faf449"; //replace with your market id
var temp = "";
var inc = 0;
var old = 0;
var finalurl = "";
var check =false;
var donetoday = 0;
var kalshi = [];
var z = "";
var a = 0;
var checkblocked = 0;

buyNo(scrapeurl);
buyYes(scrapeurl);

function buyYes(scrapeurl) {
	try{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", buyYesnewlink, false);
	oReq.open("POST", scrapeurl);
	var body = {"count": 1173, "market_id": marketid,"price": 60,"side": "yes"};	
	body = JSON.stringify(body);
	oReq.setDisableHeaderCheck(true);
	oReq.setRequestHeader("Cookie", cookie);
	oReq.setRequestHeader("Content-Type", "application/json");
	oReq.send(body);
	}
	catch (err) {
		console.log(err);
	}
}

function buyYesnewlink() {
	console.log("Starting");
	if (this.status != 200 && this.status != 201) 
	{
		console.log("Blocked?");
		checkblocked += 1;
		if (checkblocked == 10)
		{
			console.log("spin up new instance");
		}
		kalshi = JSON.parse(this.responseText);
		console.log(kalshi);
		setTimeout(function(){
			buyYes(scrapeurl);
		}, 2000);
	}
	else {
		kalshi = JSON.parse(this.responseText);
		console.log(kalshi);
		OneMoreTime("yes");
	}
}

function buyNo(scrapeurl) {
	try{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", buyNonewlink, false);
	oReq.open("POST", scrapeurl);
	var body = {"count": 700, "market_id": marketid,"price": 99,"side": "no"};	
	body = JSON.stringify(body);
	oReq.setDisableHeaderCheck(true);
	oReq.setRequestHeader("Cookie", cookie);
	oReq.setRequestHeader("Content-Type", "application/json");
	oReq.send(body);
	}
	catch (err) {
		console.log(err);
	}
}

function buyNonewlink() {
	console.log("Starting");
	if (this.status != 200 && this.status != 201) 
	{
		console.log("Blocked?");
		checkblocked += 1;
		if (checkblocked == 10)
		{
			console.log("spin up new instance");
		}
		kalshi = JSON.parse(this.responseText);
		console.log(kalshi);
		setTimeout(function(){
			buyNo(scrapeurl);
		}, 1250);
	}
	else {
		kalshi = JSON.parse(this.responseText);
		console.log(kalshi);
		AnyExtra();		
	}
}