import React from 'react';
import ScreenNavigation from './src/config/ScreenNavigation';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var config  = {
  apiKey: "AIzaSyAKc0luqWlwjlz5E_ryfec143ZCOkgFnAU",
  authDomain: "reactbloodbankdb.firebaseapp.com",
  databaseURL: "https://reactbloodbankdb-default-rtdb.firebaseio.com",
  projectId: "reactbloodbankdb",
  storageBucket: "reactbloodbankdb.appspot.com",
  messagingSenderId: "131662445504",
  appId: "1:131662445504:web:5980370c9d83364995a625",
  measurementId: "G-WXXTHRS5LW"
};
// Initialize Firebase
firebase.initializeApp(config);

const App = ()=>{
  return (
    <ScreenNavigation />
  );
}
;

export default App; 