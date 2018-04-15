function initMap() {
        var uluru = {lat: 39.124884, lng: -105.555755};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: uluru,
        });
        function findLowest(results, term){

          var lowest = results.features[0].properties[term]; 
          for(var  i = 0; i < results.features.length; i++){
            if(lowest > results.features[i].properties[term]) lowest = results.features[i].properties[term];
          }
          return lowest; 
        }
        function findHighest(results, term){
          var highest = results.features[0].properties[term]; 
          for(var  i = 0; i < results.features.length; i++){
            if(highest < results.features[i].properties[term]) highest = results.features[i].properties[term];
          }
          return highest; 
        }
        var image1 = "dot1.png";
        var image2 = "dot2.png"
        mapDot = function(results, image) {
            for (var i = 0; i < results.features.length; i++) {
              var coords = results.features[i].geometry.coordinates;
              var latLng = new google.maps.LatLng(coords[1],coords[0]);
              var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              icon: image
             });
            }
        }
        mapDot(ts, image1);
        mapDot(behavioralCenters, image2);

        mapGraph = function(results,scaleTerm) {
          for(var i = 0; i < results.features.length; i++){
            var coords = []; 
            if(results.features[i].geometry.type == "Polygon"){
              for(var j = 0; j < results.features[i].geometry.coordinates[0].length; j++){
                coords.push({lat: results.features[i].geometry.coordinates[0][j][1], lng: results.features[i].geometry.coordinates[0][j][0]});
                
              }
              var lowest = findLowest(results, scaleTerm);
              var highest = findHighest(results,scaleTerm);
              console.log(lowest);
              var color = getColor(results.features[i].properties[scaleTerm],lowest,highest);
              
              var poly = new google.maps.Polygon({
                paths: coords,
                strokeColor: "#000000", 
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor:  color, 
                fillOpacity: 1
              });
              poly.setMap(map);
            } 
            if(results.features[i].geometry.type == "MultiPolygon"){
              for(var j = 0; j < results.features[i].geometry.coordinates.length ; j++){
                coords = []; 
                for(var k = 0; k < results.features[i].geometry.coordinates[j][0].length; k++){
                  coords.push({lat: results.features[i].geometry.coordinates[j][0][k][1], lng: results.features[i].geometry.coordinates[j][0][k][0]});
                }
                var lowest = findLowest(results, scaleTerm);
                var highest = findHighest(results,scaleTerm);
                var color = getColor(results.features[i].properties[scaleTerm],0, 20);
                var poly = new google.maps.Polygon({
                  paths: coords,
                  strokeColor: "#000000", 
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor:  color, 
                  fillOpacity: 1
                });
                poly.setMap(map);
              }
            }
          }
        }
        //mapGraph(asthma); 
        function getColor(val,lowerLim, uppperLim){
          var setZero = uppperLim - lowerLim;
          var scaleFactor = 255/setZero; 
          var color = 255- Math.round(val * scaleFactor + lowerLim);
          color = rgbToHex(color);
          function rgbToHex(rgb) { 
            var hex = Number(rgb).toString(16);
            if (hex.length < 2) {
              hex = "0" + hex;
            }
            return hex;
          };
          return "#00" + color + color; 
        }
        function makeCencusIntoCounty(results,varSearch){
          for(var i = 0; i < results.features.length; i++) {
            var county = results.features[i].properties.COUNTY;
            var sameCountyNums = []
            for(var j = 0; j < results.features.length; j++){
              if(results.features[j].properties.COUNTY === results.features[i].properties.COUNTY) sameCountyNums.push(results.features[j].properties.varSearch);
            }
            var avgNumb = avgNum(sameCountyNums); 
            for(var j = 0; j < results.features.length; j++){
              if(results.features[j].properties.COUNTY === results.features[i].properties.COUNTY) results.features[j].properties.varSearch = avgNumb;
            }
          }
          return results; 
        }
        function avgNum(nums){
          var total = 0;
          for(var i = 0; i < nums.length; i++){
            total+=i; 
          }
          return total/nums.length; 
        }
        asthmaPrevlaceInAdults = makeCencusIntoCounty(asthmaPrevlaceInAdults, "ASTHMA");
        mapGraph(asthmaPrevlaceInAdults, "ASTHMA");
        mapGraph(asthma, "ASTHMA_ADJRATE");
};