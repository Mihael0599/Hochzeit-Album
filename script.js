import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getStorage, ref, uploadBytes, listAll,  getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyBNbUwc139nWbAmfF7vrpz7MuxEOir_e20",
    authDomain: "test-7a89c.firebaseapp.com",
    projectId: "test-7a89c",
    storageBucket: "test-7a89c.firebasestorage.app",
    messagingSenderId: "531508064224",
    appId: "1:531508064224:web:f28da52be04d97748d4585"
};
let msg = document.getElementById("msg");
let pictures = [];

let timeOut;
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const folderRef = ref(storage, 'uploaded_images');

function loadPage(files) {
    msg.style.display = "flex";
    if(files.length > 1){
        msg.innerHTML = "Vaše slike su objavljene";
    }else{
        msg.innerHTML = "Vaša slika je objavljena";
    }
    timeOut = setTimeout(showPage, 2000);
}

function showPage() {
    document.getElementById("msg").style.display = "none";
}

async function uploadImages() {
    const fileInput = document.getElementById("photo-upload");
    const files = fileInput.files; 
    loadPage(files);

    if (files.length > 0) {
        for (const file of files) {
            const storageRef = ref(storage, `uploaded_images/${file.name}`);
            await uploadBytes(storageRef, file);
        }
    } else {
        alert("Bitte wählen Sie mindestens ein Bild aus.");
    }
}

const uploadButton = document.getElementById("photo-upload");
if (uploadButton) {
    uploadButton.addEventListener('change', uploadImages);
}

async function fetchAndDisplayImages() {
    try {
        const result = await listAll(folderRef);
        const imageUrls = await Promise.all(result.items.map(item => getDownloadURL(item)));

        if (imageUrls.length > 0) {
            pictures.push(...imageUrls);
            localStorage.setItem('pictures', JSON.stringify(pictures));
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Bilder:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayImages();
});




