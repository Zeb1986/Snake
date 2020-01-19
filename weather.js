

fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/324505?apikey=SD3IOUbAchPsZCz6KJoAfdoReCkm2wbk&metric=true')
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        console.log(data);
        const icon = data.DailyForecasts[0].Day.Icon;
        const elem = document.getElementById('icon');
        elem.src = `https://www.accuweather.com/images/weathericons/${icon}.svg`
        atr = elem.getAttribute('src')
        console.log(atr);
        elem.onload = function () {
            var canvas = document.getElementById("canvas_icon");
            var ctx = canvas.getContext("2d");
            ctx.drawImage(elem, 100, 100);
        };
        ik = setInterval(elem.onload, 33)


    })
    .catch(function () { });
