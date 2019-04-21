// let records = [];
//
// $(document).ready(function(){
//
// $.ajax({
//   url: "http://localhost:3001/all",
//   async: true,
//   dataType: 'json',
//   success: function (data) {
//     records = data;
//     // totalRecords = records.length;
//     // totalPages = Math.ceil(totalRecords / recPerPage);
//     // apply_pagination();
//     console.log(data[0].location);
//     console.log(records);
//   }
// });
//
// });

function submit(){
  var crime = document.getElementById('formCrime').value;
  var date = document.getElementById('formDate').value;
  var time = document.getElementById('formTime').value;
  var location = document.getElementById('formLocation').value;
  var details = document.getElementById('formDetails').value;

  $.ajax({
  type: "POST",
  url: "http://localhost:3001/input/",
  dataType: "json",
  data: {
    crime: crime,
    date: date,
    time: time,
    location: location,
    details: details,
  },
  success: function(result){
    console.log("Success");
  }
});
}

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 17});
  var list = [];
  var records;
  $.ajax({
    url: "http://localhost:3001/all",
    async: true,
    dataType: 'json',
    success: function (data) {
      records = data;

      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].location);
        rec = {
          query: data[i].location,
          fields: ['name', 'geometry'],
        };

        service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(rec, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
          }
        });
      }
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// function initAutocomplete() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.8688, lng: 151.2195},
//     zoom: 13,
//     mapTypeId: 'roadmap'
//   });
//
//   // Create the search box and link it to the UI element.
//   var input = document.getElementById('pac-input');
//   var searchBox = new google.maps.places.SearchBox(input);
//
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//   // Bias the SearchBox results towards current map's viewport.
//   map.addListener('bounds_changed', function() {
//     searchBox.setBounds(map.getBounds());
//   });
//
//   var markers = [];
//   // Listen for the event fired when the user selects a prediction and retrieve
//   // more details for that place.
//   searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();
//
//     if (places.length == 0) {
//       return;
//     }
//
//     // Clear out the old markers.
//     markers.forEach(function(marker) {
//       marker.setMap(null);
//     });
//     markers = [];
//
//     // For each place, get the icon, name and location.
//     var bounds = new google.maps.LatLngBounds();
//     places.forEach(function(place) {
//       console.log(place);
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };
//
//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));
//
//       if (place.geometry.viewport) {
//         // Only geocodes have viewport.
//         bounds.union(place.geometry.viewport);
//       } else {
//         bounds.extend(place.geometry.location);
//       }
//     });
//     map.fitBounds(bounds);
//   });
// }
