var xmlHttp = createXmlHttpRequestObject();
var xmlResponse = xmlHttp.responseXML;
var geocoder;
var resultsMap;
var map;
var start;

//GOOGLE MAPS FUNCTIONS

// Sets up the map in the beginning and starts listening for the event where user inserts an address and presses submit
function initMap(start) {
        start = new google.maps.LatLng(37.330915,-121.893986);
        var mapProp = {center: start, zoom: 10};

        map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        var marker = new google.maps.Marker({position: start});
        // marker.setMap(map);
        resultsMap = map;
        geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);

          closeaddevent();
        });
      }


// Shows results if it works but if the address doesn't work then an alert will appear
function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status == 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
             placeMarker(resultsMap, results[0].geometry.location);
             //defaultCenter(resultsMap);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
// var start =
function defaultCenter(resultsMap) {
  //start = google.maps.LatLng(-10,100.893986);
  //resultsMap.panTo(-10,100.893986);

  //resultsMap = new google.maps.Map({position: start});
  // var mapProp = {center: start, zoom: 10};
  // resultsMap.setCenter(start);
}


function placeMarker(name, startdatetime, enddatetime, address, contact, description, map, location) {
  var marker = new google.maps.Marker({position: location});
        marker.setMap(map);
google.maps.event.addListener(marker,'click',function() {

  var markercontent =
    '<h3><b>'+name+'</b></h3>'+
    '<p>'+startdatetime+'---'+enddatetime+'</p>'+
    '<p>'+address+'</p>'+
    '<p>'+description+'</p><br>'+
    '<p>'+contact+'</p>';

  var infowindow = new google.maps.InfoWindow({
      content: markercontent
    });
    infowindow.open(map,marker);
  });
}

//CODE THAT CONNECTS WITH PHP
function createXmlHttpRequestObject() {
  var xmlHttp;

  try {
    xmlHttp = new XMLHttpRequest();
  } catch(e){
    xmlHttp = false;
  }

  if(!xmlHttp) {
    alert("Object could not be created.");
  } else {
    return xmlHttp;
  }
}

function process() {
    if (xmlHttp.readyState==0 || xmlHttp.readyState==4){
        name = encodeURIComponent(document.getElementById("name").value);
        startdatetime = encodeURIComponent(document.getElementById("startdatetime").value);
        enddatetime = encodeURIComponent(document.getElementById("enddatetime").value);
        address = encodeURIComponent(document.getElementById("address").value);
        contact = encodeURIComponent(document.getElementById("contact").value);
        description = encodeURIComponent(document.getElementById("description").value);
        tags = encodeURIComponent(document.getElementById("tags").value);
        xmlHttp.open("GET", "vatxml.php?address="+address +"&name="+name+"&startdatetime="+startdatetime+"&enddatetime="+enddatetime+"&contact="+contact+"&description="+description+"&tags="+tags, true);
      // xmlHttp.onreadystatechange = function() {
      //     if (xmlHttp.readyState == 4) {
      //       if (xmlHttp.status == 200) {
      //         xmlResponse = xmlHttp.responseXML;
      //         makeflags(xmlResponse);
      //       } else {
      //         alert(xmlHttp.status);
      //       }
      //     }
      //   };
        xmlHttp.send(null);
        closeaddevent();
        geocodeAddress(geocoder, resultsMap);
        placeMarker(name, startdatetime, enddatetime, address, contact, description, map, location)
   }
//}
}
  // xmlHttp.onreadystatechange = function() {
  // //   alert("hello");
  //
  //  }

function initialize(){
  xmlHttp.open("GET", "vatxml.php", true);
  xmlHttp.send();
  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState==4) {
      xmlResponse = xmlHttp.responseXML;
      loadflags(xmlResponse);
  }
}
}

function loadflags(xmlResponse) {
  if (xmlHttp.readyState==4 && xmlHttp.status==200){
      var nodes = xmlResponse.getElementsByTagName("address");
      for(i=0;i<nodes.length;i++){
        var name = getvalue(xmlResponse, "name", i);
        var startdatetime = getvalue(xmlResponse, "startdatetime", i);
        var enddatetime = getvalue(xmlResponse, "enddatetime", i);
        var address = getvalue(xmlResponse, "address", i);
        var contact = getvalue(xmlResponse, "contact", i);
        var description = getvalue(xmlResponse, "description", i);
        // var name = xmlResponse.getElementsByTagName("name")[i].childNodes[0].nodeValue;
        // var startdatetime = xmlResponse.getElementsByTagName("startdatetime")[i].childNodes[0].nodeValue;
        // var enddatetime = xmlResponse.getElementsByTagName("enddatetime")[i].childNodes[0].nodeValue;
        // var address = xmlResponse.getElementsByTagName("address")[i].childNodes[0].nodeValue;
        // var contact = xmlResponse.getElementsByTagName("contact")[i].childNodes[0].nodeValue;
        // var description = xmlResponse.getElementsByTagName("description")[i].childNodes[0].nodeValue;
     //var address = document.getElementById('address').value;
     geocodeDatabase(name, startdatetime, enddatetime, address, contact, description, geocoder, resultsMap);
   }
 } else {
   //alert(xmlHttp.readyState);
   //alert(xmlHttp.readyState);
   setTimeout("loadflags();",1000);
 }
}

function getvalue(xmlResponse, s, i) {
  var tags = xmlResponse.getElementsByTagName(s);
  if (typeof tags.length < i) {
    return "";
  }
  if (typeof tags[i].childNodes[0] == "undefined") {
    return "";
  }
  if (typeof tags[i].childNodes[0].nodeValue == "undefined") {
    return "";
  }
  return tags[i].childNodes[0].nodeValue;
}

// Shows results if it works but if the address doesn't work then an alert will appear
function geocodeDatabase(name, startdatetime, enddatetime, address, contact, description, geocoder, resultsMap) {

        geocoder.geocode({'address': address}, function(results, status) {
          if (status == 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
             placeMarker(name, startdatetime, enddatetime, address, contact, description, resultsMap, results[0].geometry.location)
             resultsMap.setCenter({lat: 37.6109, lng: -122.2257});
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }


function addevent(){
  document.getElementById("dropdown").style.display="block";
  document.getElementById("googleMap").style.width="70%";
}

function closeaddevent(){
  document.getElementById("dropdown").style.display="none";
  document.getElementById("googleMap").style.width="100%";

  document.getElementById("name").value="";
  document.getElementById("startdatetime").value="";
  document.getElementById("enddatetime").value="";
  document.getElementById("address").value="";
  document.getElementById("contact").value="";
  document.getElementById("description").value="";
  document.getElementById("tags").value="";
}


//added for login
// Get the modal
var modal = document.getElementById('id01');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var signup = document.getElementById("su");
//added for sign up
function signUpScreen(){
  console.log('hi');
  signup.style.display="block";
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signup) {
        signup.style.display="none";
    }
}
