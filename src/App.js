import React from 'react';
import TicTacToe from "./components/TicTacToe";
import GitHubButton from "./components/GitHubButton";

const App = () => {
    return (
        <div className="container">
            <GitHubButton/>
            <TicTacToe/>
        </div>
    );
}

export default App;
