import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


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
const auth = getAuth();


window.login = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Login successful, hide login container and show the map
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('map').style.display = 'block';
            initMap();
        })
        .catch((error) => {
            document.getElementById('login-error').textContent = "Failed to login: " + error.message;
        });
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, hide login container and show the map
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('map').style.display = 'block';
        initMap();
    } else {
        // User is signed out, show the login container and hide the map
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('map').style.display = 'none';
    }
});

function initMap() {
    var map = L.map('map', { doubleClickZoom: false }).setView([41.0082, 28.9784], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('dblclick', function(e) {
        addPin(e.latlng, map);
    });

    // Load existing pins
    loadPins(map);
}

function loadPins(map) {
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

function addPin(latlng, map) {
    var customText = prompt("Enter text for the pin:", "Default Text");
    if (customText != null && customText !== "") {
        var newPin = { lat: latlng.lat, lng: latlng.lng, text: customText };
        var newPinRef = ref(db, 'pins/' + Date.now());
        set(newPinRef, newPin).then((result) => {
            // Add the new marker immediately after it's added to Firebase
            addMarker({ lat: latlng.lat, lng: latlng.lng, text: customText }, map, newPinRef.key);
        });
    }
}

function addMarker(pin, map, pinKey) {
    var marker = L.marker([pin.lat, pin.lng])
        .bindTooltip(pin.text, {permanent: true})
        .addTo(map)
        .on('dblclick', function() {
            confirmAndRemovePin(marker, pinKey, map);
        });
}

function confirmAndRemovePin(marker, pinKey, map) {
    var confirmDeletion = confirm("Are you sure you want to delete this pin?");
    if (confirmDeletion) {
        const pinRef = ref(db, 'pins/' + pinKey);
        remove(pinRef).then(() => {
            map.removeLayer(marker); // Remove the marker immediately
        }).catch((error) => {
            console.error("Error removing pin:", error);
        });
    }
}
