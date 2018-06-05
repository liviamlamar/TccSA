import * as firebase from 'firebase'
import Rebase from 're-base'

const config = {
  apiKey: "*****",
  authDomain: "******",
  databaseURL: "*******",
  projectId: "******",
  storageBucket: "******",
  messagingSenderId: "******"
};

const firebaseApp = firebase.initializeApp(config);


const base = Rebase.createClass(firebaseApp.database())

const ref = firebase.database().ref();

const addCadastro = (pasta, objeto) => {
  ref.child(pasta).push(objeto);
}

const storage = firebase.storage().ref();

export { firebaseApp, addCadastro, base, storage, ref };
