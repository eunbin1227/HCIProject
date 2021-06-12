import firebase from 'firebase/app';
import 'firebase/firestore';

//
// const script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = 'https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js';
// document.body.appendChild(script);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCwPHAC8gE6vJVXvuHX9Hp9GG6zqteLQU",
    authDomain: "hciproject-2264a.firebaseapp.com",
    projectId: "hciproject-2264a",
    storageBucket: "hciproject-2264a.appspot.com",
    messagingSenderId: "143359468262",
    appId: "1:143359468262:web:98199e123828c63dd85127",
    measurementId: "G-WVJMJ6NV0C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };