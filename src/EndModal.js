import React from 'react';
import { Link } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

export default function EndModal(props) {
    const firebaseConfig = {
        apiKey: "AIzaSyD2Sg8El0-g0-ihJ36ZStiMfCyhFnjk4ZI",
        authDomain: "whereiswaldo-3572e.firebaseapp.com",
        projectId: "whereiswaldo-3572e",
        storageBucket: "whereiswaldo-3572e.appspot.com",
        messagingSenderId: "166604569514",
        appId: "1:166604569514:web:fdae9602f76d38c8dec9d3"
      
      };
    
    const app = initializeApp(firebaseConfig);
    
    const db = getFirestore(app);

    const time = document.querySelector('.time')
    const inputRef = React.useRef(null)
    const [disabled, setDisabled] = React.useState(true)
    const handleAddData = async (e) => {
        try {
            const docRef = await addDoc(collection(db, "highscores"), {
              name:inputRef.current.value,
              time: time.textContent.trim(),
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }  

    const handleChange = () => {
        if(inputRef.current.value) {
            return setDisabled(false)
        }
        return setDisabled(true)
    }


    return(
        <div className='end-modal'>
              <div className='game-over-text'>{`You found them all! Your time was ${time.textContent}.`}</div>
              <form>
                <input ref={inputRef} type='text' onChange={handleChange} placeholder='Your name'></input>
                <Link to={'/scores'}>
                    <button disabled={disabled} onClick={handleAddData} className='submit-button'>Submit time</button>
                </Link>
              </form>
              <div className='control-buttons'>
                <Link to={'/'}>
                <button>Main menu</button> 
                </Link>
                <button onClick={props.restart}>Try again</button>
              </div>
        </div>
        
    )
    }
    

