import React from 'react'
import { Link } from 'react-router-dom'
import lynx from './img/lynx.png'
import './styles/Home.css'

export default function Home(props) {
    let characterElements = props.characters.map(character =>
        <div key={character.name} className='character'>
            <img src={character.image} alt={character.name}/>
            <div>
                <div className='character-name'>{character.name}</div>
            </div>
        </div>
    )

    return(
        <div className='home'>
            <div className='logo-home'>
                <img src={lynx} alt='lynx'height='400px'/>
                <div>LynxEyes</div>
            </div>
            
            <div className='home-message'>Find the three characters!</div>
            <div className='characters-home'>
                {characterElements}
            </div>
            <Link to='/main'>
                <button onClick={() => {props.setIsGameOver(false)}} className='start-button'>Start</button>
            </Link>
        </div>
    )
}