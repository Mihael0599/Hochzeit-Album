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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const folderRef = ref(storage, 'uploaded_images');

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

const uploadButton = document.getElementById("photo-upload");
uploadButton.addEventListener('change', uploadImage);


async function listFiles() {
    try {
      const result = await listAll(folderRef);
      result.items.forEach(async (itemRef) => {
        const fileUrl = await getDownloadURL(itemRef);
        console.log("Datei:", itemRef.name, "URL:", fileUrl);
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Dateien:", error);
    }
  }
  
  // Funktion aufrufen
  listFiles();