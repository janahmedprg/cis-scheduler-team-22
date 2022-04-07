import React from "react";
import "./App.css";
import sketch from "./sketch.jpg";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
            <div>Connor Nagle</div>
            <div>Brandon Aguiar</div>
            <div>Jan Ahmed</div>
            <img src={sketch} alt="Sketch" />
        </div>
    );
}

export default App;
