import React from "react";
import * as S from './styles/style'
import './styles/App.css'
import CharacterSelection from './CharacterSelection'
import Home from './Home'
import Scores from './Scores'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {initializeApp} from 'firebase/app'

export const charactersArray = [
  {
    name: 'Courage',
    xMin:890,
    xMax:950,
    yMin:1500,
    yMax:1580,
    found:false,
  },
  {
    name: 'Crash',
    xMin:1540,
    xMax:1615,
    yMin:1380,
    yMax:1450,
    found: false,
  },
  {
    name: 'Gandalf',
    xMin:1410,
    xMax:1490,
    yMin:1090,
    yMax:1160,
    found: false,
  }
]

const firebaseConfig = {
  apiKey: "AIzaSyD2Sg8El0-g0-ihJ36ZStiMfCyhFnjk4ZI",
  authDomain: "whereiswaldo-3572e.firebaseapp.com",
  projectId: "whereiswaldo-3572e",
  storageBucket: "whereiswaldo-3572e.appspot.com",
  messagingSenderId: "166604569514",
  appId: "1:166604569514:web:fdae9602f76d38c8dec9d3"

};

export const app = initializeApp(firebaseConfig);

const storage = getStorage(app)
const courageRef = ref(storage, 'gs://whereiswaldo-3572e.appspot.com/courage.png')
const crashRef = ref(storage, 'gs://whereiswaldo-3572e.appspot.com/crash.png')
const gandalfRef = ref(storage, 'gs://whereiswaldo-3572e.appspot.com/gandalf.png')


function App() {
  const [showPopup, setShowPopup] = React.useState(false);
  const [circleX, setCircleX] = React.useState(0);
  const [circleY, setCircleY] = React.useState(0);
  const [clickedCharacter, setClickedCharacter] = React.useState("");
  const [popupCharacter, setPopupCharacter] = React.useState("");
  const [characters, setCharacters] = React.useState(JSON.parse(JSON.stringify(charactersArray)));
  const [isRunning, setIsRunning] = React.useState(false);
  const [foundCharacter, setFoundCharacter] = React.useState(null)
  const [isGameOver, setIsGameOver] = React.useState(false)
  const [targetWidth, setTargetWidth] = React.useState(50)
  const [targetHeight, setTargetHeight] = React.useState(50)

  const updateTargetPosition = (e) => {
    const newTargetWidth = 50/2347*document.querySelector('#background').offsetWidth
    const newTargetHeight = 50/(3318+131)*document.querySelector('#background').offsetHeight;
    const centerX = (e.clientX + window.scrollX - newTargetWidth/2)
    const centerY = (e.clientY + window.scrollY - newTargetHeight/2)

    setTargetWidth(newTargetWidth)
    setTargetHeight(newTargetHeight)
    setCircleX(centerX);
    setCircleY(centerY);
  }
  
  const updateClickedCharacter = () => {
    let newChar = '';
    characters.forEach(character => {
      if(
        circleX + targetWidth/2 < character.xMax && 
        circleX + targetWidth/2 > character.xMin && 
        circleY + targetHeight/2 - 131 < character.yMax && 
        circleY + targetHeight/2- 131 > character.yMin
        ) {
          newChar = character.name
          setClickedCharacter(newChar);
      }    
    })
  }  

  const updateCharactersPositions = () => {
    let newCharacters =[...characters]
    let imgWidth = document.querySelector('#background').offsetWidth
    let imgHeight = document.querySelector('#background').offsetHeight
    newCharacters.forEach(character => {
      if(character.name === 'Courage') {
        character.xMin = imgWidth*0.3
        character.xMax = imgWidth*0.33
        character.yMin = imgHeight*0.507
        character.yMax = imgHeight*0.532
      }
      if(character.name === 'Crash') {
        character.xMin = imgWidth*0.644
        character.xMax = imgWidth*0.673
        character.yMin = imgHeight*0.456
        character.yMax = imgHeight*0.484
      }
      if(character.name === 'Gandalf') {
        character.xMin = imgWidth*0.576
        character.xMax = imgWidth*0.606
        character.yMin = imgHeight*0.354
        character.yMax = imgHeight*0.379
      }
    })
    setCharacters([...newCharacters])
    console.log('characters position updated.')


  }

  const charClick = (e) => {
    setPopupCharacter(e.target.textContent);
    updateClickedCharacter()
    console.log(clickedCharacter)
    setShowPopup(false);

  }

  const handleClick = (e) => {
    updateCharactersPositions()
    setShowPopup(true);
    updateTargetPosition(e)
    console.log(characters[0])
    console.log('x:',e.clientX + window.scrollX, 'y:',e.clientY + window.scrollY)
    console.log('img width: ', document.querySelector('#background').offsetWidth, 'img height: ', document.querySelector('#background').offsetHeight)
  }

  function startGame() {
    setIsRunning(true);
    setIsGameOver(false);
   
}

  function stopGame() {
    setCharacters(JSON.parse(JSON.stringify(charactersArray)));
    setIsRunning(false);
    setShowPopup(false)
    setFoundCharacter(null);
    setClickedCharacter(null);
    setPopupCharacter(null);
    let time = document.querySelector('.time');
    console.log(time.textContent);
  }

  
  function gameOver() { 
    setIsGameOver(true);
    stopGame()


  }

  const restart = () => {
    setCharacters(JSON.parse(JSON.stringify(charactersArray)));
    startGame()
    setIsGameOver(false)
  }


  React.useEffect( () => {
    
    if(!clickedCharacter) {
      setShowPopup(false);
      return
    }
    console.log('you selected', popupCharacter)
    console.log('you clicked on', clickedCharacter)

    if(popupCharacter === clickedCharacter) {
      characters.forEach(character => {
        if(character.name === clickedCharacter) {
          if(character.found) {
            return
          }
          setShowPopup(false);
          setFoundCharacter(clickedCharacter)
          character.found = true;
        }
      })
    }
    setClickedCharacter("");
    setPopupCharacter("")

    setShowPopup(false);


  },[popupCharacter, clickedCharacter])

  React.useEffect(() => {
    let count = 0
    if(!showPopup) {
      characters.forEach(character => {
        if(character.found) {
           count++
        } 
      })
      if(count === 3) {
        gameOver()
      }
    }
  },[showPopup])

  console.log('last characters array: ', characters)

  React.useEffect(() => {

  getDownloadURL(courageRef).then((url) => {
    charactersArray[0].image = url;
  })

  getDownloadURL(crashRef).then((url) => {
    charactersArray[1].image = url;
  })

  getDownloadURL(gandalfRef).then((url) => {
    charactersArray[2].image = url
  }).then( () => {
    setCharacters(JSON.parse(JSON.stringify(charactersArray)))

  })

  },[])

  return (
    <BrowserRouter>            
    <div className='app'>
      {showPopup && <S.Target onClick={handleClick} className='target' targetWidth={targetWidth} targetHeight={targetHeight} x={circleX} y={circleY}>
        <S.TargetDot/>  
      </S.Target>}
      {showPopup && <CharacterSelection showPopup = {showPopup} 
                                        characters={characters} 
                                        charClick={charClick} 
                                        x ={circleX + 60} 
                                        y={circleY + 25}/>}
      <Routes>
        <Route path='/'element={<Home characters={characters} setIsGameOver = {setIsGameOver} startGame={startGame} />}/>
        <Route path='/main' element={<Main startGame={startGame} 
                                           foundCharacter={foundCharacter} 
                                           stopGame={stopGame} 
                                           characters={characters} 
                                           isRunning={isRunning} 
                                           handleClick={handleClick}
                                           isGameOver={isGameOver}
                                           restart={restart}/>}/>
        <Route path='/scores' element={<Scores/>}/>
      </Routes>
    </div>
    </BrowserRouter>  
  );
}

export default App;
