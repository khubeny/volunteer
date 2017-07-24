function myMap() {

var start = new google.maps.LatLng(37.330915,-121.893986);
var mapProp = {center: start, zoom: 10};

var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
var marker = new google.maps.Marker({position: start});
marker.setMap(map);
}

function addevent(){
  document.getElementById("dropdown").style.display="block";
  document.getElementById("googleMap").style.width="70%";
}

function closeaddevent(){
  document.getElementById("dropdown").style.display="none";
  document.getElementById("googleMap").style.width="100%";
}
