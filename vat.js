function addevent(){
  document.getElementById("dropdown").style.display="block";
  document.getElementById("googleMap").style.width="70%";
}

function closeaddevent(){
  document.getElementById("dropdown").style.display="none";
  document.getElementById("googleMap").style.width="100%";
}


// Sets up the map in the beginning and starts listening for the event where user inserts an address and presses submit
function initMap() {
        // var map = new google.maps.Map(document.getElementById('googleMap'), {
        //   zoom: 9,
        //   center: {lat: 37.330915, lng: -121.893986}
        // });
        var start = new google.maps.LatLng(37.330915,-121.893986);
        var mapProp = {center: start, zoom: 10};

        var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        var marker = new google.maps.Marker({position: start});
        // marker.setMap(map);

        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
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
             placeMarker(resultsMap, results[0].geometry.location)
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }


function placeMarker(map, location) {
  var marker = new google.maps.Marker({position: location});
        marker.setMap(map);
google.maps.event.addListener(marker,'click',function() {
  var infowindow = new google.maps.InfoWindow({
      content:"Hello World!"
    });
    infowindow.open(map,marker);
  });
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
