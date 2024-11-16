import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getStorage, ref, listAll,  getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

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
const fileInput = document.getElementById('photo-upload');

if (fileInput) {
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log('Hochgeladenes Bild:', snapshot);
                return getDownloadURL(snapshot.ref);
            })
            .then((downloadURL) => {
                console.log('Bild-URL:', downloadURL);
            })
            .catch((error) => {
                console.error('Fehler beim Hochladen des Bildes:', error);
            });
    });
}

async function getPictures() {
    const imagesRef = ref(storage, 'images/');
    const result = await listAll(imagesRef);
    const imagesData = [];

    for (const item of result.items) {
        const downloadURL = await getDownloadURL(item);
        imagesData.push({ name: item.name, url: downloadURL });
    }

    return imagesData;
}

// Holen und Anzeigen der Bilder in pictures.html
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gallery')) {
        getPictures().then(imagesData => {
            const galleryContainer = document.getElementById('gallery');
            galleryContainer.innerHTML = getPicturesTemplate(imagesData);
        });
    }
});