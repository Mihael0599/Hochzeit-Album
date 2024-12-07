import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

// Firebase Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBNbUwc139nWbAmfF7vrpz7MuxEOir_e20",
    authDomain: "test-7a89c.firebaseapp.com",
    projectId: "test-7a89c",
    storageBucket: "test-7a89c.firebasestorage.app",
    messagingSenderId: "531508064224",
    appId: "1:531508064224:web:f28da52be04d97748d4585"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const folderRef = ref(storage, 'uploaded_images');


// Alle Bilder abrufen und anzeigen
async function fetchAndDisplayImages() {
    const galleryContainer = document.getElementById("hero");

    try {
        const result = await listAll(folderRef);
        const imageUrls = await Promise.all(result.items.map(item => getDownloadURL(item)));

        if (imageUrls.length > 0) {
            imageUrls.forEach(url => {
                galleryContainer.innerHTML += getImgTemplate(url); // Nutze die template-Funktion
            });
        } else {
            galleryContainer.innerText = "Keine Bilder verfügbar.";
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Bilder:", error);
        galleryContainer.innerText = "Fehler beim Laden der Bilder.";
    }
}

// Initiale Bilder laden
fetchAndDisplayImages();