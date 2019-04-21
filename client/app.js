function submit(){
  var crime = document.getElementById('formCrime').value;
  var date = document.getElementById('formDate').value;
  var time = document.getElementById('formTime').value;
  var location = document.getElementById('formLocation').value;
  var details = document.getElementById('formDetails').value;
  alert(crime);
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
    console.log(crime);
  }
});
}
