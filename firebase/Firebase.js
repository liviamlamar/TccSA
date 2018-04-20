import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC_nxPOvIhTV-oYAjxNVMf8CId6fFpbMEg",
  authDomain: "stomaanalyzer.firebaseapp.com",
  databaseURL: "https://stomaanalyzer.firebaseio.com",
  projectId: "stomaanalyzer",
  storageBucket: "stomaanalyzer.appspot.com",
  messagingSenderId: "693168284522"
};

const firebaseApp = firebase.initializeApp(config);

const ref = firebase.database().ref();

const addCadastro = ( pasta, objeto ) => {
  ref.child(pasta).push(objeto);
}

export { firebaseApp, addCadastro, ref as default };