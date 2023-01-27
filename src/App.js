import React from "react";
import Header from './Header'
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

  const updateTargetPosition = (e) => {
    const targetWidth = 50;
    const targetHeight = 50;
    const centerX = (e.clientX + window.scrollX - targetWidth/2)
    const centerY = (e.clientY + window.scrollY - targetHeight/2)
    setCircleX(centerX);
    setCircleY(centerY);
  }

  const checkCharacterClicked = (e) => {
    let xClicked = e.clientX + window.scrollX;
    let yClicked = e.clientY + window.scrollY;
    console.log('x:',xClicked, 'y:', yClicked);
    characters.forEach(character => {
      if(
        circleX < character.xMax && 
        circleX > character.xMin && 
        circleY < character.yMax && 
        circleY > character.yMin
        ) {
          console.log('target is on ', character.name)
      }    
  })
}
  
  const updateClickedCharacter = () => {
    let newChar = '';
    characters.forEach(character => {
      if(
        circleX < character.xMax && 
        circleX > character.xMin && 
        circleY < character.yMax && 
        circleY > character.yMin
        ) {
          newChar = character.name
          setClickedCharacter(newChar);
      }    
    })
  }  

  const charClick = (e) => {
    setPopupCharacter(e.target.textContent);
    updateClickedCharacter()
    console.log(clickedCharacter)
    setShowPopup(false);

  }

  const handleClick = (e) => {
    console.log(document.getElementById('background').getBoundingClientRect())
    let imgCurWidth = document.getElementById('background').getBoundingClientRect().width;
    let courageXmin = imgCurWidth*0.299
    let courageXmax = imgCurWidth*0.328
    setShowPopup(true);
    updateTargetPosition(e)
    checkCharacterClicked(e)
    
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
    console.log('foundCharacter: ', foundCharacter)},[foundCharacter]
  )
  
  return (
    <BrowserRouter>            
    <div className='app'>
      {showPopup && <S.Target onClick={handleClick} className='target' x={circleX} y={circleY}>
        <S.TargetDot/>  
      </S.Target>}
      {showPopup && <CharacterSelection showPopup = {showPopup} 
                                        characters={characters} 
                                        charClick={charClick} 
                                        x ={circleX + 60} 
                                        y={circleY + 25}/>}
      <Routes>
        <Route path='/'element={<Home characters={characters} startGame={startGame} />}/>
        <Route path='/main' element={<Main startGame={startGame} foundCharacter={foundCharacter} stopGame={stopGame} characters={characters} isRunning={isRunning} handleClick={handleClick}/>}/>
      </Routes>
    </div>
    </BrowserRouter>  
  );
}

export default App;
