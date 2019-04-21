function submit(){
  var firstName = document.getElementById('formFirstName').value;
  var lastName = document.getElementById('formLastName').value;
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
    firstName: firstName,
    lastName: lastName,
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

  $.ajax({
    url: "http://localhost:3001/all",
    async: true,
    dataType: 'json',
    success: function (data) {

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
  center = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  var cityCircle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: center,
    radius: 100
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function displayFieldBoxes(data) {
  var str = "";
  // console.log(data[0]);
    for (var i=0; i<data.length; i++) {
      var crime = data[i].crime;
      var location = data[i].location;
      var details = data[i].details;
      var number = i+1;

      str +='<div class="card">' +
            '<div class="card-body"> ' +
              '<h5 class="card-title">' + number + '. ' + crime + '</h5>' +
              '<h6 class="card-subtitle mb-2 text-muted">' + location + '</h6>' +
              '<p class="card-text">' + details + '</p>' +
              '<a href="#" class="card-link">Card link</a>' +
              '<a href="#" class="card-link">Another link</a>' +
              '</div>' +
              '</div>'
    }
    document.getElementById("fieldBoxes").innerHTML=str;
}
