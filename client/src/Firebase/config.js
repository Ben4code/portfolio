import firebase from 'firebase/app';
import 'firebase/storage';


const config = {
    apiKey: "AIzaSyCGlChak3OAtzs8WmDvMKL0lBBYdGScFrw",
    authDomain: "ben-portfolio.firebaseapp.com",
    databaseURL: "https://ben-portfolio.firebaseio.com",
    projectId: "ben-portfolio",
    storageBucket: "ben-portfolio.appspot.com",
    messagingSenderId: "1001468953446"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();
  
  export{
      storage, firebase as default
    }