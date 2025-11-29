import React from "react";

function GameQuiz({ onBack }) {
  return (
    <div>
      <button onClick={onBack}>Zurück</button>
      <h1>SYSTEM_LOGIN</h1>
      <p>20 Fragen. Bereit?</p>
      <button>[ VERBINDUNG HERSTELLEN ]</button>
    </div>
  );
}

export default GameQuiz;
