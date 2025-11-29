import { useState } from "react";
import styles from "./gameQuiz.module.css";
import { questions } from "./questions";

function GameQuiz({ onBack }) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("green");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "green" ? "amber" : "green"));
  };

  const themeClass =
    theme === "green" ? styles.themeGreen : styles.themeAmber;

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
          <h1> SYSTEM_LOGIN</h1>
          <p className={styles.questionText}>
            Zugriff auf Sicherheits-Quiz anfordern.
            <br />
            20 Fragen. Bereit?
          </p>
          <button className={styles.retroBtn} onClick={handleStart}>
            [ VERBINDUNG HERSTELLEN ]
          </button>
        </>
      );
    }

    if (isFinished) {
      return (
        <>
          <h1> SESSION_ENDED</h1>
          <p className={styles.questionText}>
            Analyse abgeschlossen.
            <br />
            <br />
            Ergebnis: {score} / {questions.length} Pakete gesichert.
          </p>
          <button className={styles.retroBtn} onClick={handleRestart}>
            [ NEUSTART ]
          </button>
        </>
      );
    }

    const currentQuestion = questions[currentIndex];
    return (
      <>
        <h2
          style={{
            borderBottom: "1px dashed currentColor",
            width: "100%",
            textAlign: "center",
            paddingBottom: "10px",
          }}
        >
          FRAGE {currentIndex + 1} / {questions.length}
        </h2>

        <p className={styles.questionText}>{currentQuestion.question}</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={styles.retroBtn}
              onClick={() => handleAnswerClick(index)}
            >
              {answer}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={`${styles.appContainer} ${themeClass}`}>
      <button className={styles.backBtn} onClick={onBack}>
        ← SYSTEM_EXIT
      </button>

      <button className={styles.themeSwitchBtn} onClick={toggleTheme}>
        COLOR_MODE: {theme.toUpperCase()}
      </button>

      <div className={styles.monitorCasing}>
        <div className={styles.crtScreen}>
          <div className={styles.scanlines}></div>
          <div className={styles.overlay}></div>

          <div className={styles.uiContent}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default GameQuiz;
