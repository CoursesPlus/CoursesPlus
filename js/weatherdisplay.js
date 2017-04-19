/*! simpleWeather v3.1.0 - http://simpleweatherjs.com */
!function(t){"use strict";function e(t,e){return"f"===t?Math.round(5/9*(e-32)):Math.round(1.8*e+32)}t.extend({simpleWeather:function(i){i=t.extend({location:"",woeid:"",unit:"f",success:function(t){},error:function(t){}},i);var o=new Date,n="https://query.yahooapis.com/v1/public/yql?format=json&rnd="+o.getFullYear()+o.getMonth()+o.getDay()+o.getHours()+"&diagnostics=true&callback=?&q=";if(""!==i.location){var r="";r=/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(i.location)?"("+i.location+")":i.location,n+='select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+r+'") and u="'+i.unit+'"'}else{if(""===i.woeid)return i.error("Could not retrieve weather due to an invalid location."),!1;n+="select * from weather.forecast where woeid="+i.woeid+' and u="'+i.unit+'"'}return t.getJSON(encodeURI(n),function(t){if(null!==t&&null!==t.query&&null!==t.query.results&&"Yahoo! Weather Error"!==t.query.results.channel.description){var o,n=t.query.results.channel,r={},s=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],a="https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";r.title=n.item.title,r.temp=n.item.condition.temp,r.code=n.item.condition.code,r.todayCode=n.item.forecast[0].code,r.currently=n.item.condition.text,r.high=n.item.forecast[0].high,r.low=n.item.forecast[0].low,r.text=n.item.forecast[0].text,r.humidity=n.atmosphere.humidity,r.pressure=n.atmosphere.pressure,r.rising=n.atmosphere.rising,r.visibility=n.atmosphere.visibility,r.sunrise=n.astronomy.sunrise,r.sunset=n.astronomy.sunset,r.description=n.item.description,r.city=n.location.city,r.country=n.location.country,r.region=n.location.region,r.updated=n.item.pubDate,r.link=n.item.link,r.units={temp:n.units.temperature,distance:n.units.distance,pressure:n.units.pressure,speed:n.units.speed},r.wind={chill:n.wind.chill,direction:s[Math.round(n.wind.direction/22.5)],speed:n.wind.speed},n.item.condition.temp<80&&n.atmosphere.humidity<40?r.heatindex=-42.379+2.04901523*n.item.condition.temp+10.14333127*n.atmosphere.humidity-.22475541*n.item.condition.temp*n.atmosphere.humidity-6.83783*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)-5.481717*Math.pow(10,-2)*Math.pow(n.atmosphere.humidity,2)+1.22874*Math.pow(10,-3)*Math.pow(n.item.condition.temp,2)*n.atmosphere.humidity+8.5282*Math.pow(10,-4)*n.item.condition.temp*Math.pow(n.atmosphere.humidity,2)-1.99*Math.pow(10,-6)*Math.pow(n.item.condition.temp,2)*Math.pow(n.atmosphere.humidity,2):r.heatindex=n.item.condition.temp,"3200"==n.item.condition.code?(r.thumbnail=a,r.image=a):(r.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"ds.png",r.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.condition.code+"d.png"),r.alt={temp:e(i.unit,n.item.condition.temp),high:e(i.unit,n.item.forecast[0].high),low:e(i.unit,n.item.forecast[0].low)},"f"===i.unit?r.alt.unit="c":r.alt.unit="f",r.forecast=[];for(var m=0;m<n.item.forecast.length;m++)o=n.item.forecast[m],o.alt={high:e(i.unit,n.item.forecast[m].high),low:e(i.unit,n.item.forecast[m].low)},"3200"==n.item.forecast[m].code?(o.thumbnail=a,o.image=a):(o.thumbnail="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"ds.png",o.image="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+n.item.forecast[m].code+"d.png"),r.forecast.push(o);i.success(r)}else i.error("There was a problem retrieving the latest weather information.")}),this}})}(jQuery);

$(document).ready(function () {
	var menubar = false;
	if (window.location.hash == "#menubar") {
		menubar = true;
	}
	cpal.storage.getKey("weather", function(wObj) {
		cpal.storage.getKey("weatherUnits", function(units) {
			var wUnits = units;
			var $wInfo = $("<div></div>");

			if (wObj != undefined) {
				$.simpleWeather({
					location: wObj.location,
					woeid: undefined,
					unit: wUnits,
					success: function(weather) {
						console.log(weather);

						var $twoCell = $("<div></div>");

							var $image = $("<img />");

								$image.attr("src", weather.image);
								$image.css("width", "100px");
								$image.css("height", "70px");
								$image.css("position", "fixed");
								$image.css("z-index", "1");

							$twoCell.append($image);

							var $firstCell = $("<div></div>");

								$firstCell.addClass("cell");
								$firstCell.addClass("right-align");

								$firstCell.css("position", "relative");
								$firstCell.css("z-index", "2");

								$firstCell.text(weather.temp);

								$firstCell.append('<span class="weather-unit">&deg;' + wUnits.toUpperCase() + '</span>');

							$twoCell.append($firstCell);

							var $secondCell = $("<div></div>");

								$secondCell.addClass("cell");
								$secondCell.addClass("right-align");

								$secondCell.css("position", "relative");
								$secondCell.css("z-index", "2");

								$secondCell.text(weather.currently);

							$twoCell.append($secondCell);

						$wInfo.append($twoCell);

						$wInfo.append("<br />");

						var $highLow = $("<h6 style='text-align:center'></h6>");

							var $weatherHigh = $("<span></span>");

								$weatherHigh.addClass("weather-high");
								$weatherHigh.html(weather.high + "&deg;");

							$highLow.append($weatherHigh);

							$highLow.append("<span>/</span>");

							var $weatherLow = $("<span></span>");

								$weatherLow.addClass("weather-low");
								$weatherLow.html(weather.low + "&deg;");

							$highLow.append($weatherLow);

							$highLow.append("<span> - </span>");

							/*var $feelsLike = $("<span></span>");

								$feelsLike.html("Feels like: " + weather.heatindex + "&deg;");

							$highLow.append($feelsLike);

							$highLow.append("<span> - </span>");*/

							var $humidity = $("<span></span>");

								$humidity.text("Humidity: " + weather.humidity + "%");

							$highLow.append($humidity);

						$wInfo.append($highLow);

						var $forecastLink = $("<a>View full forecast</a>");

							$forecastLink.attr("id", "fullForecast");
							$forecastLink.attr("href", weather.link);
							$forecastLink.attr("target", "_blank");

						$wInfo.append($forecastLink);

						var $poweredBy = $('<a href="https://www.yahoo.com/?ilc=401" target="_blank" style="display: block;"><img src="https://poweredby.yahoo.com/purple.png" width="134" height="29" style="margin: 0 auto;display: block;"/></a>');
						$wInfo.append($poweredBy);

						$("body").append($wInfo);
					},
					error: function(error) {
						$wInfo.append("<p>Error while loading weather - " + error.message + "</p>");
						$("body").append($wInfo);
					}
				});
			} else {
				$("body").append("<p>You haven't set a location! Please go to the services options page and pick a location for the weather.</p>");
			}
		});
	});
});