import React from 'react'
import './styles/App.css'
import * as S from './styles/style'


export default function CharacterSelection(props) {
        let newCharacters = props.characters.filter(character => character.found === false);
    
    let characterPopup = newCharacters.map(character => 
        <div key={character.name} className='character-selector'>{character.name}</div>)
    console.log('rendered')  

    return (
        <S.CharacterPopup onClick={props.charClick}x={props.x} y={props.y}>
            {characterPopup}
        </S.CharacterPopup>
    );
}