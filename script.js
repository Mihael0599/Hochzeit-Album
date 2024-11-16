import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getStorage, ref, uploadBytes,  getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

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
/* const fileInput = document.getElementById('photo-upload');

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
} */

async function uploadImage(){
    const fileInput = document.getElementById("photo-upload");
    const file = fileInput.files[0];

    if (file) {
        const storageRef = ref(storage, `uploaded_images/${file.name}`); 
        await uploadBytes(storageRef, file);

        const imageURL = await getDownloadURL(storageRef);
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = imageURL;
    }
}

const uploadButton = document.getElementById("uploadImage");
uploadButton.addEventListener('click', uploadImage);


/* const Teststorage = getStorage();
getDownloadURL(ref(storage, 'images/Screenshot 2024-09-03 203447.png'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  }); */