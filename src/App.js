import React from "react";
import * as S from './styles/style'
import './styles/App.css'
import CharacterSelection from './CharacterSelection'
import courage from './img/courage.png'
import crash from './img/crash.png'
import gandalf from './img/gandalf.png'
import Home from './Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main'


export const charactersArray = [
  {
    name: 'Courage',
    image: courage,
    xMin:890,
    xMax:950,
    yMin:1500,
    yMax:1580,
    found:false,
  },
  {
    name: 'Crash',
    image: crash,
    xMin:1540,
    xMax:1615,
    yMin:1380,
    yMax:1450,
    found: false,
  },
  {
    name: 'Gandalf',
    image: gandalf,
    xMin:1410,
    xMax:1490,
    yMin:1090,
    yMax:1160,
    found: false,
  }
]

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
}

  function stopGame() {
    setCharacters(JSON.parse(JSON.stringify(charactersArray)));
    setIsRunning(false);
    setShowPopup(false)
    setFoundCharacter(null);
    setClickedCharacter(null);
    setPopupCharacter(null);

  }

  function gameOver() { 
    setIsGameOver(true);
    setIsRunning(false);


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
                                           isGameOver={isGameOver}/>}/>
      </Routes>
    </div>
    </BrowserRouter>  
  );
}

export default App;
