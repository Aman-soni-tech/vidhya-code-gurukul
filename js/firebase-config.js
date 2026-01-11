// ================= FIREBASE CONFIGURATION =================
// This file initializes Firebase for the entire application

let database = null;
let firebaseReady = false;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKuS1tU6TKRjJpWOAWroNNiGXeXtMyI2E",
  authDomain: "vidhya-code.firebaseapp.com",
  databaseURL: "https://vidhya-code-default-rtdb.firebaseio.com",
  projectId: "vidhya-code",
  storageBucket: "vidhya-code.appspot.com",
  messagingSenderId: "593593593593",
  appId: "1:593593593593:web:abc123def456"
};

// Initialize Firebase with error handling
function initFirebase() {
  try {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
      console.error("❌ Firebase SDK not loaded yet");
      setTimeout(initFirebase, 500); // Retry after 500ms
      return;
    }

    // Check if already initialized
    if (firebase.apps.length > 0) {
      console.log("✅ Firebase already initialized");
      database = firebase.database();
      firebaseReady = true;
      return;
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    firebaseReady = true;
    console.log("✅ Firebase initialized successfully!");

  } catch (error) {
    console.error("⚠️ Firebase error:", error.message);
    firebaseReady = false;
  }
}

// Initialize on different document states
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebase);
} else {
  initFirebase();
}

// Also initialize after a small delay to ensure Firebase SDK is loaded
setTimeout(initFirebase, 1000);

// Helper function to check if Firebase is ready
function isFirebaseReady() {
  return firebaseReady && database !== null && typeof database.ref === 'function';
}

// Helper function to write data to Firebase
function writeToFirebase(path, data) {
  return new Promise((resolve, reject) => {
    if (!isFirebaseReady()) {
      console.warn("⚠️ Firebase not ready, saving to localStorage only");
      reject(new Error("Firebase not ready"));
      return;
    }

    database.ref(path).push(data)
      .then(() => {
        console.log("✅ Data saved to Firebase:", path);
        resolve(true);
      })
      .catch((error) => {
        console.error("❌ Firebase write error:", error);
        reject(error);
      });
  });
}

// Helper function to read data from Firebase
function readFromFirebase(path) {
  return new Promise((resolve, reject) => {
    if (!isFirebaseReady()) {
      console.warn("⚠️ Firebase not ready");
      reject(new Error("Firebase not ready"));
      return;
    }

    database.ref(path).once('value', (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        resolve(null);
      }
    }).catch((error) => {
      console.error("❌ Firebase read error:", error);
      reject(error);
    });
  });
}
