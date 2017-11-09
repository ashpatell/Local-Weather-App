var lat, long;
var temp;
var bgImg, detail;
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(location) {
    var lat = "lat=" + location.coords.latitude;
    var long = "lon=" + location.coords.longitude;
    weatherdata(lat, long);
  });

  $("#deg").on("click", function() {
    $(".temp").html(temp + "&#8451;");
  });
  $("#fah").on("click", function() {
    var temps = (temp * 1.8 + 32).toFixed(1);
    $(".temp").html(temps + "&#8457");
  });
});

function weatherdata(lat, long) {
  var urlString =
    "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + long;
  $.getJSON(
    urlString,
    function(a) {
      temp = a.main.temp;
      detail = a.weather[0].main;
      $(".city").text(a.name + ", " + a.sys.country);
      $(".temp").html(temp + "&#8451;");
      $(".detail").text(a.weather[0].main);
      switch (detail) {
        case "Rain":
          bgImg =
            "https://static.pexels.com/photos/217892/pexels-photo-217892.jpeg";
          $("body").css("background-image", "url(" + bgImg + ")");
          break;
        case "Clouds":
          bgImg =
            "https://static.pexels.com/photos/216596/pexels-photo-216596.jpeg";
          $("body").css("background-image", "url(" + bgImg + ")");
          break;
        default:
          bgImg =
            "https://static.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg";
          $("body").css("background-image", "url(" + bgImg + ")");
      }
      //console.log();
    },
    "jsonp"
  );
}