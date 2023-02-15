import React from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Header from './Header'
import EndModal from './EndModal'

export default function Main(props) {
  const storage = getStorage()
  const bgRef = ref(storage, 'gs://whereiswaldo-3572e.appspot.com/background.jpg')

  React.useEffect( () => {
    getDownloadURL(bgRef).then((url) => {
      document.querySelector('#background').src = url;
    })
  },[bgRef])

  const onLoad = () => {
    if(!props.isGameOver){
      console.log('game started')
      props.startGame()

    }
  }

    return(
        <div className='main'>
            <Header foundCharacter={props.foundCharacter} 
                    stopGame={props.stopGame} 
                    characters={props.characters} 
                    isRunning={props.isRunning}
                    />
            <img onLoad={onLoad} onClick={props.handleClick} id='background' alt='background'/>
            {props.isGameOver && <EndModal restart={props.restart}/>}
        </div>

    )
}