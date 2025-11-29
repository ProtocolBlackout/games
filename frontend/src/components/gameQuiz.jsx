import { useState } from "react";
import { questions } from "./questions";

function GameQuiz({ onBack }) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setStarted(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswerClick = (index) => {
    const currentQuestion = questions[currentIndex];
    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setIsFinished(false);
    setCurrentIndex(0);
    setScore(0);
  };

  const renderContent = () => {
    if (!started) {
      return (
        <>
          <h1>SYSTEM_LOGIN</h1>
          <p>20 Fragen. Bereit?</p>
          <button onClick={handleStart}>[ VERBINDUNG HERSTELLEN ]</button>
        </>
      );
    }

    if (isFinished) {
      return (
        <>
          <h1>SESSION_ENDED</h1>
          <p>Ergebnis: {score} / {questions.length}</p>
          <button onClick={handleRestart}>[ NEUSTART ]</button>
        </>
      );
    }

    const currentQuestion = questions[currentIndex];
    return (
      <>
        <h2>FRAGE {currentIndex + 1} / {questions.length}</h2>
        <p>{currentQuestion.question}</p>
        <div>
          {currentQuestion.answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(index)}>
              {answer}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <button onClick={onBack}>← SYSTEM_EXIT</button>
      {renderContent()}
    </div>
  );
}

export default GameQuiz;
