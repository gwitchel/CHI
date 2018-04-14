function initMap() {
        var uluru = {lat: 39.124884, lng: -105.555755};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: uluru,
        });

        var script = document.createElement('script');
        script.src = 'traumaCenterDesignations.js';
        var image = "dot1.png";
        document.getElementsByTagName('head')[0].appendChild(script);        
        window.traumaCenterDesignations = function(results) {
            for (var i = 0; i < results.features.length; i++) {
              var coords = results.features[i].geometry.coordinates;
              var latLng = new google.maps.LatLng(coords[1],coords[0]);
              var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              icon: image
             });
            }
            debugger;
        }
        debugger; 
        var script2 = document.createElement('script2');
        script2.src = 'asthma.js';
        document.getElementsByTagName('head')[0].appendChild(script2);

         window.edges = function(results) {
           debugger;
          for(var i = 0; i < results.features.length; i++){
            var coords = []; 
            if(results.features[i].geometry.type == "Polygon"){
              for(var j = 0; j < results.features[i].geometry.coordinates[0].length; j++){
                coords.push({lat: results.features[i].geometry.coordinates[0][j][1], lng: results.features[i].geometry.coordinates[0][j][0]});
                
              }
              var poly = new google.maps.Polygon({
                paths: coords,
                strokeColor: "#000000", 
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor:  "#000000", 
                fillOpacity: 0.5
              });
              poly.setMap(map);
            } 
            if(results.features[i].geometry.type == "MultiPolygon"){
              for(var j = 0; j < results.features[i].geometry.coordinates.length ; j++){
                coords = []; 
                for(var k = 0; k < results.features[i].geometry.coordinates[j][0].length; k++){
                  coords.push({lat: results.features[i].geometry.coordinates[j][0][k][1], lng: results.features[i].geometry.coordinates[j][0][k][0]});
                }
                var poly = new google.maps.Polygon({
                  paths: coords,
                  strokeColor: "#000000", 
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor:  "#000000", 
                  fillOpacity: 0.5
                });
                poly.setMap(map);
              }
            }
          }
          debugger;
        }
         
}



 /*
        var script = document.createElement('script');
        script.src = 'traumaCenterDesignations.js';
        var image = "dot1.png";
        document.getElementsByTagName('head')[0].appendChild(script);        
        window.traumaCenterDesignations = function(results) {
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

        var script2 = document.createElement('script2');
        script2.src = 'behavioralCenters.js';
        var image2 = "dot2.png";
        document.getElementsByTagName('head')[0].appendChild(script2);        
        window.behavioralCenters = function(results) {
            for (var i = 0; i < results.features.length; i++) {
              var coords = results.features[i].geometry.coordinates;
              var latLng = new google.maps.LatLng(coords[1],coords[0]);
              var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              icon: image2
             });
            }
        }
      */