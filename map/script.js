$('document').ready(function(){
	
	
})

function intialized(){
	INFO = "Mainchance Drop-In Center,Manhattan,120 East 32nd Street, New York, NY 10016,Open 24 Hours,40.745377,-73.981306,shelter;Antonio Olivieri Center,Manhattan,257 W 30th Street, New York, NY 10001,Open from 7:30 a.m.-8:30 p.m. This program remain open 24 hours during winter months,40.749139,-73.994016,shelter;Holy Apostles Soup Kitchen,Manhattan,296 9th Ave, New York, NY 10001,Opens Mon- Fri from 10:30AM - 12:30PM,40.758228,-73.992752,food;Welcome Table Soup Kitchen - Xavier Mission,Manhattan,55 W 15th St, New York, NY 10011,Open Sunday from 12:45PM - 3PM,40.737810,-73.995510,food;Village Temple,Manhattan,33 E 12th St, New York, NY 10003,Open,40.733880,-73.992180,food";
	
	var sortedInfo = INFO.split(";");
	for(var i = 0; i < sortedInfo.length; i++)
	{
		sortedInfo[i] = sortedInfo[i].split(","); 
	}
	console.log(sortedInfo);
	
	var mapOption = {zoom:14, center:{lat: 40.7405, lng: -73.9832} };
	
	
	var map = new google.maps.Map(document.getElementById("map"), mapOption);
	var marker = new google.maps.Marker({position: {lat: 40.7405, lng: -73.9832}, map: map, animation: google.maps.Animation.DROP, title: "You are here"});
	var infoWindow = new google.maps.InfoWindow({content: '<h2> You are here </h2>'});
	marker.addListener('', function(){ infoWindow.open(map, marker)});
	
	for(var i = 0; i < sortedInfo.length; i++)
	{
		var c = {lat: Number(sortedInfo[i][6]), lng: Number(sortedInfo[i][7])};
		var n = sortedInfo[i][0];
		var a = sortedInfo[i][2] + ', '  + sortedInfo[i][3] + ', ' + sortedInfo[i][4];
		var p = sortedInfo[i][8];
		var t =  sortedInfo[i][5];
		
		addMarkers(c, n, a, p, t, map);
	}
	
	//var markers = new google.maps.Marker({position: {lat: 40.7405, lng: -73.9832}, map: map})
	//var markers = new google.maps.Marker({position: {lat: 40.7405, lng: -73.9832}, map: map})
	//var markers = new google.maps.Marker({position: {lat: Number(array.data[1][13]), lng: Number(array.data[1][14])}, map: map})
}

function addMarkers(coords, name, address, place, time, map)
{
	if(place == "food")
	{
		var iconImage = "food.png";
	} else {
		var iconImage = "house.png";
	}
	
	var propertites = {
		position: coords, 
		map: map, 
		icon: iconImage,
		animation: google.maps.Animation.DROP};
	var marker = new google.maps.Marker(propertites);
	var infoWindow = new google.maps.InfoWindow({content: '<h1>' + name + '</h1>' + '<h2>' + address + '</h2>' + '<h3>' + time + '</h3>'});
	marker.addListener('click', function(){ infoWindow.open(map, marker)});
}

 