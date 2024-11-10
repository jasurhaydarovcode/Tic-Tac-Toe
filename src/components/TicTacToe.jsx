import { useState } from 'react';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const currentWinner = calculateWinner(newBoard);
        if (currentWinner) {
            setWinner(currentWinner);
        }
    };

    const startGame = () => {
        if (playerX && playerO) {
            setGameStarted(true);
        }
    };

    const renderSquare = (index) => (
        <button
            className="w-16 h-16 bg-gray-300 text-4xl font-bold"
            onClick={() => handleClick(index)}
        >
            {board[index]}
        </button>
    );

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {!gameStarted ? (
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
                    <div className="mb-4">
                        <label className="block text-lg">Player X Name:</label>
                        <input
                            type="text"
                            className="border p-2 mb-2"
                            value={playerX}
                            onChange={(e) => setPlayerX(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg">Player O Name:</label>
                        <input
                            type="text"
                            className="border p-2 mb-2"
                            value={playerO}
                            onChange={(e) => setPlayerO(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={startGame}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Start Game
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    {winner && (
                        <h2 className="text-2xl mb-4">
                            {winner === 'X' ? `${playerX} wins!` : `${playerO} wins!`}
                        </h2>
                    )}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <div key={index} className="flex justify-center items-center">
                                {renderSquare(index)}
                            </div>
                        ))}
                    </div>
                    {!winner && (
                        <p className="text-lg">
                            Next player: {isXNext ? playerX : playerO}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default TicTacToe;
