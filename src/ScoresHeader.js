import React from 'react'
import lynx from './img/lynx.png'
import { Link } from 'react-router-dom'

export default function ScoresHeader() {
    

    return (
        <>
            <div className='scores-header'>
                <Link className='link' to='/'>
                <div className='logo'>
                    <img src={lynx} alt='lynx' height='40px'/>
                    <div>LynxEyes</div>
                </div>
                </Link>
            </div>
        </>
    );
}