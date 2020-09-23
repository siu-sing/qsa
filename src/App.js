import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    //Game set up
    const delay = 2000; //delay in ms
    const [letter, setLetter] = useState("");
    const [count, setCount] = useState(0);
    const [play, setPlay] = useState(false);
    //Displays
    const [numPlayers, setNumPlayers] = useState(2);

    //Given array, return random
    let getRandomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    //Given count and number of players, return deg of rotation
    // 2 players => 0,180,0, 180
    // 3 players => 0,120, 240, 0
    // 4 players => 0,90, 180, 270, 0

    let getDisplayDeg = (numPlayers, count) => {
        console.log(`Count: ${count}`);
        console.log(`NumPlayers: ${numPlayers}`);
        let deg = (360 / numPlayers) * (count % numPlayers);
        console.log(`Degrees: ${deg}`);
        return deg;
    }

    //Function to set next letter
    let step = () => {
        // console.log(count);
        if (play) {
            let nextLetter = "";
            if (letter === "A" || letter === "") {
                nextLetter = getRandomItem(["S", "Q"])
            } else {
                nextLetter = getRandomItem(["Q", "S", "A"])
            }
            setLetter(nextLetter);
            // let c = count;
            setCount(count => count + 1);

            let e = document.querySelector(".letter__display");
            // even, then 0, odd then 180
            let deg = getDisplayDeg(numPlayers, count);
            e.style.transform = `rotate(${deg}deg)`
            // console.log(e)

        }
    }

    //Use interval in useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            step();
        }, delay);
        return () => clearInterval(interval);
    }, [play, count, numPlayers]);

    //Start Stop Toggle
    let togglePlay = () => {
        console.log("toggle play clicked.")
        setPlay(!play);
        setCount(0);
    }

    let changeHandler = (e) => {
        setNumPlayers(e.target.value);
    }

    return (
        <div className="container">
            <label for="numplayers">Number of players:</label>
            <input
                type="number"
                onChange={changeHandler}
                name="numplayers"
                disabled={play}
                min="1"
                max="5"
            />
            <button onClick={togglePlay}>{play ? "Stop" : "Start"}</button>
            <p>
                Round No: {count}
            </p>
            <p>
                Players: {numPlayers}
            </p>

            <div
                className="letter__display"
            >
                {letter}
            </div>
        </div>
    );
}

export default App;
