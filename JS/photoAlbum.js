import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyBNbUwc139nWbAmfF7vrpz7MuxEOir_e20",
    authDomain: "test-7a89c.firebaseapp.com",
    projectId: "test-7a89c",
    storageBucket: "test-7a89c.firebasestorage.app",
    messagingSenderId: "531508064224",
    appId: "1:531508064224:web:f28da52be04d97748d4585"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const folderRef = ref(storage, 'uploaded_images');


function loadPage() {
    document.getElementById("loader").style.display = "flex";
    timeOut = setTimeout(showPage, 2000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("hero").style.display = "flex";
}

function renderImages() {
    const galleryContainer = document.getElementById("hero");
    const pictures = JSON.parse(localStorage.getItem('pictures'));
    loadPage(); 

    if (pictures && pictures.length > 0) {
        galleryContainer.innerHTML = pictures
            .map((url, index) => getImgTemplate(url, index)) 
            .join('');
    } else {
        galleryContainer.innerText = "Keine Bilder verfügbar.";
    }
}

document.addEventListener("DOMContentLoaded", renderImages);