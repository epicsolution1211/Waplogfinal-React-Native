import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyCES0vrD2iH7Njpyz9Tya-G0KEY0VWtwec",
    authDomain: "cupidoreactnative-4f251.firebaseapp.com",
    databaseURL: "https://cupidoreactnative-4f251-default-rtdb.firebaseio.com",
    projectId: "cupidoreactnative-4f251",
    storageBucket: "cupidoreactnative-4f251.appspot.com",
    messagingSenderId: "449766710609",
    appId: "1:449766710609:web:74e0ba7f474f85fc9e0770"
};
let firebase = Firebase.initializeApp(config);
export default firebase
