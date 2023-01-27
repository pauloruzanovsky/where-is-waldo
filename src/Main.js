import React from 'react'
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Header from './Header'

export default function Main(props) {
    //firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD2Sg8El0-g0-ihJ36ZStiMfCyhFnjk4ZI",
        authDomain: "whereiswaldo-3572e.firebaseapp.com",
        projectId: "whereiswaldo-3572e",
        storageBucket: "whereiswaldo-3572e.appspot.com",
        messagingSenderId: "166604569514",
        appId: "1:166604569514:web:fdae9602f76d38c8dec9d3"
    };


  const app = initializeApp(firebaseConfig);
  const storage = getStorage()
  const gsReference = ref(storage, 'gs://whereiswaldo-3572e.appspot.com/background.jpg')
  
  React.useEffect( () => {
    getDownloadURL(gsReference).then((url) => {
      document.querySelector('#background').src = url;
    })
  },[gsReference])

  React.useEffect(() => {
    props.startGame()
  }, []);

    return(
        <div>
            <Header foundCharacter={props.foundCharacter} stopGame={props.stopGame} characters={props.characters} isRunning={props.isRunning} />
            <div className='img-container'>
            <img onClick={props.handleClick} id='background' alt='background'/>
            <div className='courage-box'>I'm courage</div>
            </div>
        </div>

    )
}