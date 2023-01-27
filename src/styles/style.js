import styled from 'styled-components'

export const Header = styled.div `
    max-width: 100vw;
    background: #0f0e17;    
    color: white;
    font-family: proxima-nova, sans-serif;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 131px;
`

export const Target = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px dashed #ff8906;
    display: flex;
    background: rgba(0,0,0,0.2);
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
`

export const TargetDot = styled.div`
    border-radius: 50%;
    border: 2px solid #ff8906;
`

export const CharacterPopup = styled.div`
    border-radius: 5px;
    background: white;
    display: flex;
    flex-direction: column;
    display: flex;
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
`