let map, infoWindow;
console.log("starting map...");
function initMap(){
    let options ={
        center: { lat: 30.2672, lng: -97.7431 },
        zoom: 10
    }

    map = new google.maps.Map(document.getElementById('map'), options);

    //Function to autoload places and implement search bar with Google maps
    (function createSearchField(){
        let input = document.getElementById("search");
        let searchBox = new google.maps.places.SearchBox(input);

        map.addListener("bounds_changed",function(){
            searchBox.setBounds(map.getBounds());
        });

        let markers = [];

        searchBox.addListener("places_changed", function(){
            let places = searchBox.getPlaces();

            if(places.length === 0){
                return;
            }

            markers.forEach(function(m){
                m.setMap(null);
            })
            markers = [];

            let bounds = new google.maps.LatLngBounds();

            places.forEach(function(p){
                if(!p.geometry){
                    return;
                }

                markers.push(new google.maps.Marker({
                    map : map,
                    title : p.name,
                    position : p.geometry.location
                }));

                if(p.geometry.viewport){
                    bounds.union(p.geometry.viewport);
                }else{
                    bounds.extend(p.geometry.location);
                }
            });
            map.fitBounds(bounds);
        })
    })();

    // Retrieves users current location using the browser
    // infoWindow = new google.maps.InfoWindow;

    // if(navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(function(p){
    //         let position = {
    //             lat : p.coords.latitude,
    //             lng : p.coords.longitude
    //         };
    //         infoWindow.setPosition(position);
    //         infoWindow.setContent('Your location!');
    //         infoWindow.open(map);
    //     },function(){
    //         handleLocationError('Geolocation service failed', map/center());
    //     })
    // }else{
    //     handleLocationError('No geolocation available',map.center());
    // }
}

// function handleLocationError(content, position){
//     infoWindow.setPosition(position);
//     infoWindow.setContent(content);
//     infoWindow.open(map);
// }
