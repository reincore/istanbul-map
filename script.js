// Initialize Firebase
// To-do: Replace with the Firebase project configuration
firebase.initializeApp({
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
});

var db = firebase.firestore();

function initMap() {
    var istanbul = {lat: 41.0082, lng: 28.9784};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: istanbul
    });

    // Listener for adding a new pin
    map.addListener('click', function(e) {
        var newPin = {lat: e.latLng.lat(), lng: e.latLng.lng()};
        db.collection("pins").add(newPin);
        placeMarker(newPin, map);
    });

    // Load existing pins
    db.collection("pins").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            placeMarker(doc.data(), map);
        });
    });
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });

    // Listener for removing a pin
    marker.addListener('dblclick', function() {
        marker.setMap(null);
        // Also remove from Firebase...
    });
}
