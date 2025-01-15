import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const fruits = ["🍎", "🍌", "🍇", "🍓", "🍍", "🍊"]; // List of fruits

function CountTheFruitGame() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/home");
  const [gameFruits, setGameFruits] = useState([]);
  const [targetFruit, setTargetFruit] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [gameActive, setGameActive] = useState(false);
  const [result, setResult] = useState("");
  const [timeLeft, setTimeLeft] = useState(15); // Game timer

  // Start the game
  const startGame = () => {
    const randomFruits = Array.from(
      { length: 15 },
      () => fruits[Math.floor(Math.random() * fruits.length)]
    );
    const randomTarget = fruits[Math.floor(Math.random() * fruits.length)];
    setGameFruits(randomFruits);
    setTargetFruit(randomTarget);
    setUserAnswer("");
    setGameActive(true);
    setResult("");
    setTimeLeft(15);
  };

  // Handle timer countdown
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      endGame();
    }
  }, [gameActive, timeLeft]);

  // End the game
  const endGame = () => {
    setGameActive(false);
    const correctCount = gameFruits.filter(
      (fruit) => fruit === targetFruit
    ).length;
    setResult(
      parseInt(userAnswer, 10) === correctCount
        ? "Correct! 🎉"
        : `Wrong! The correct answer was ${correctCount}.`
    );
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    endGame();
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-400 pl-20 pt-8">
        <FaArrowLeft
          size={35}
          color="white"
          className="cursor-pointer"
          onClick={handleNavigate}
        />
      </div>
      <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-purple-400 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-6">
          Count the Fruit Game
        </h1>
        {!gameActive && (
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition"
          >
            Start Game
          </button>
        )}
        {gameActive && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
              Time Left: {timeLeft}s
            </h2>
            <h2 className="text-xl font-medium text-white mt-4">
              Count the <span className="text-yellow-300">{targetFruit}</span>
            </h2>
            <div className="grid grid-cols-5 gap-4 justify-center mt-6">
              {gameFruits.map((fruit, index) => (
                <span
                  key={index}
                  className="text-4xl bg-white rounded-full shadow-lg p-4"
                >
                  {fruit}
                </span>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col items-center"
            >
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your count"
                className="w-24 text-center py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 mt-4 rounded shadow-lg transition"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {result && (
          <h2 className="text-2xl font-bold text-white mt-8">{result}</h2>
        )}
      </div>
    </>
  );
}

export default CountTheFruitGame;
