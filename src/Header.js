import React from 'react'
import * as S from './styles/style'
import check from './img/yes.png'
import lynx from './img/lynx.png'
import Cronometer from './Cronometer'
import { Link } from 'react-router-dom'

export default function Header(props) {
    const [showFound, setShowFound] = React.useState(false);
    const intervalIdRef = React.useRef(null);

    React.useEffect(() => {
        setShowFound(true);
        intervalIdRef.current = setInterval(() => {
            setShowFound(false)
            console.log('trigger')
        }, 2000)

        return () => clearInterval(intervalIdRef.current)

    },[props.foundCharacter])
            
    
            
            let characterElements = props.characters.map(character =>
        <div key={character.name} className='character'>
            <img src={character.image} alt={character.name}/>
            <div>
                <div className='character-name'>{character.name}</div>
                {character.found && <img className='check' src={check} alt='check'/>}
            </div>
        </div>
    )
    return (
        <S.Header>
            <div className='header-wrapper'>
                <Link className='link' to='/'>
                <div onClick={props.stopGame} className='logo'>
                    <img src={lynx} alt='lynx' height='40px'/>
                    <div>LynxEyes</div>
                </div>
                </Link>
                <Cronometer isRunning={props.isRunning}/>
                <div className='found-msg' style={{visibility: showFound ? 'visible' : 'hidden'}}>You found {props.foundCharacter}!</div>
                <div className='characters'>
                    {characterElements}
                </div>
            </div>
        </S.Header>
    );
}