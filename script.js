import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
// To-do: Replace with the Firebase project configuration
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
});

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function initMap() {
    var map = L.map('map').setView([41.0082, 28.9784], 13); // Istanbul coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', function(e) {
        var customText = prompt("Enter text for the pin:", "Default Text");
        if (customText != null && customText !== "") {
            var newPin = { lat: e.latlng.lat, lng: e.latlng.lng, text: customText };
            db.collection("pins").add(newPin).then((docRef) => {
                addMarker(newPin, map, docRef.id);
            });
        }
    });

    // Load existing pins
    db.collection("pins").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            addMarker(data, map, doc.id);
        });
    });
}

function addMarker(pin, map, docId) {
    var marker = L.marker([pin.lat, pin.lng]).addTo(map)
        .bindPopup(pin.text)
        .on('click', function() { // If user clicks on an existing pin
            var confirmDeletion = confirm("Are you sure you want to delete this pin?");
            if (confirmDeletion) {
                this.remove(); // Remove marker from map
                db.collection("pins").doc(docId).delete(); // Remove pin data from Firebase
            }
        });
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();
});