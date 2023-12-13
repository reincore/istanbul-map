require('dotenv').config();

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
            var newPinRef = ref(db, 'pins/' + Date.now()); // Use a unique key for each pin
            set(newPinRef, newPin);
            addMarker(newPin, map, newPinRef.key);
        }
    });

    // Load existing pins
    const pinsRef = ref(db, 'pins');
    onValue(pinsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(key => {
                addMarker(data[key], map, key);
            });
        }
    });
}

function addMarker(pin, map, pinKey) {
    var marker = L.marker([pin.lat, pin.lng]).addTo(map)
        .bindPopup(pin.text)
        .on('click', function() {
            var confirmDeletion = confirm("Are you sure you want to delete this pin?");
            if (confirmDeletion) {
                this.remove(); // Remove marker from map
                const pinRef = ref(db, 'pins/' + pinKey);
                remove(pinRef); // Remove pin data from Firebase
            }
        });
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();
});