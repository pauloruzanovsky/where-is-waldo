import React from 'react'
import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, getDocs, onSnapshotsInSync
 } from 'firebase/firestore';
import ScoresHeader from './ScoresHeader'



const firebaseConfig = {
    apiKey: "AIzaSyD2Sg8El0-g0-ihJ36ZStiMfCyhFnjk4ZI",
    authDomain: "whereiswaldo-3572e.firebaseapp.com",
    projectId: "whereiswaldo-3572e",
    storageBucket: "whereiswaldo-3572e.appspot.com",
    messagingSenderId: "166604569514",
    appId: "1:166604569514:web:fdae9602f76d38c8dec9d3"
  
  };

initializeApp(firebaseConfig)
  
const db = getFirestore();
const highscores = collection(db,'highscores')
let scoreElements;

export default function Scores() {
    const [scores, setScores] = React.useState([])

    function stringToSeconds(timeString) {
            var parts = timeString.split(":");
            return (parseInt(parts[0], 10) * 60) +
                   parseInt(parts[1], 10) +
                   (parseInt(parts[2], 10) / 100);
    }

    
    console.log(scores)

    React.useEffect( () => {
        getDocs(highscores).then(snapshot => {
            let newScores = []
            console.log(snapshot)
            snapshot.docs.forEach((doc) => {
                newScores.push({...doc.data(), id: doc.id})
                setScores([...newScores])
            })
        })
        .catch(err => {
            console.log(err.message)
        })
        console.log('scores updated', scores)
    },[])

    const loadScores = () => {
        let newScores = [...scores]

        newScores.sort(function(b, a) {
            return stringToSeconds(b.time) - stringToSeconds(a.time);
        });
        scoreElements = newScores.map((score, index) => {
            return(
            <tr className='score'>
                <td>{index+1}</td>
                <td>{score.name}</td>
                <td>{score.time}</td>
            </tr>)})
    }

    loadScores()

    return (
        <div className='scores-page'>
            <ScoresHeader/>
            <div className='scores-title'>Highscores</div>
            <div className='table-header'>
                <div className='rank-header'>Rank</div>
                <div className='name-header'>Name</div>
                <div className='time-header'>Time</div>

            </div>
        <div className='scores'>
                    {scores && scoreElements}
        </div>
        </div>
    )
}