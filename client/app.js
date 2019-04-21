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
function test(){
    alert("test213");
}
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
      displayFieldBoxes(data);
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

function displayFieldBoxes(data) {
    console.log(data);
    
}

