import React, { useState } from 'react';

const questions = [
  {
    question: "1. En la nueva arquitectura de DSpace 9, ¿cuál es la relación entre el Frontend y el Backend?",
    options: [
      "a) Son un solo bloque de código (monolítico).",
      "b) Están separados (desacoplados) y se comunican vía REST API.",
      "c) El Frontend solo funciona si se instala en el mismo servidor físico que la base de datos."
    ],
    answerIndex: 1, // b
    explanation: "DSpace 7+ introdujo una arquitectura desacoplada donde el Frontend en Angular se comunica con el Backend en Java a través de una REST API."
  },
  {
    question: "2. Sobre la ruta de migración desde versiones 5.x o 6.x hacia la 9, ¿cuál de estas afirmaciones es correcta?",
    options: [
      "a) Es obligatorio instalar y configurar primero DSpace 7, luego el 8 y finalmente el 9.",
      "b) Se puede realizar una actualización directa de la base de datos al esquema de DSpace 9 sin pasos intermedios.",
      "c) Los archivos físicos (bitstreams) no pueden migrarse directamente."
    ],
    answerIndex: 1, // b
    explanation: "Los scripts de actualización de base de datos permiten pasar directamente desde el esquema de 5.x/6.x al esquema moderno sin tener que instalar versiones intermedias."
  },
  {
    question: "3. ¿Cuál es la función principal de contar con un servidor de Homologación (Staging)?",
    options: [
      "a) Servir como respaldo (backup) en caso de que el servidor principal falle.",
      "b) Realizar pruebas de migración, limpieza de metadatos y validación de temas sin afectar el servicio público.",
      "c) Alojar únicamente las estadísticas del repositorio."
    ],
    answerIndex: 1, // b
    explanation: "El entorno de homologación es una réplica segura para probar la migración y evitar riesgos en el sistema en producción."
  },
  {
    question: "4. ¿Qué objetivo tiene realizar un \"Inventario de Personalizaciones\" antes de la migración?",
    options: [
      "a) Identificar qué funciones desarrolladas a medida deben ser adaptadas o si ya existen de forma nativa en la nueva versión.",
      "b) Contar cuántos ítems tiene el repositorio actualmente.",
      "c) Borrar todos los metadatos antiguos para empezar de cero."
    ],
    answerIndex: 0, // a
    explanation: "Muchos desarrollos a medida en versiones antiguas ahora son funciones nativas en DSpace 9, por lo que auditar permite ahorrar trabajo."
  }
];

export default function Module1Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerOptionClick = (index) => {
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].answerIndex;
    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  return (
    <div style={{
      padding: '2rem',
      margin: '2rem 0',
      borderRadius: '8px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      backgroundColor: 'var(--ifm-background-surface-color)'
    }}>
      {showScore ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Resultados de la Evaluación</h2>
          <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
            Obtuviste {score} de {questions.length} respuestas correctas ({(score / questions.length) * 100}%).
          </p>
          <button 
            onClick={resetQuiz}
            className="button button--primary button--lg"
            style={{ marginTop: '1rem' }}
          >
            Empezar de nuevo
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Pregunta {currentQuestion + 1} de {questions.length}</h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>
              Puntuación actual: {score}
            </span>
          </div>
          
          <div style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            {questions[currentQuestion].question}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {questions[currentQuestion].options.map((option, index) => {
              let btnStyle = {
                padding: '1rem',
                textAlign: 'left',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '6px',
                cursor: selectedOption === null ? 'pointer' : 'default',
                backgroundColor: 'var(--ifm-background-color)',
                transition: 'all 0.2s ease',
                display: 'block',
                width: '100%'
              };

              if (selectedOption !== null) {
                if (index === questions[currentQuestion].answerIndex) {
                  btnStyle.backgroundColor = 'var(--ifm-color-success-contrast-background)';
                  btnStyle.borderColor = 'var(--ifm-color-success)';
                } else if (index === selectedOption) {
                  btnStyle.backgroundColor = 'var(--ifm-color-danger-contrast-background)';
                  btnStyle.borderColor = 'var(--ifm-color-danger)';
                }
              }

              return (
                <button 
                  key={index} 
                  style={btnStyle}
                  onClick={() => selectedOption === null && handleAnswerOptionClick(index)}
                  disabled={selectedOption !== null}
                  className="clean-btn"
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '6px',
              backgroundColor: isCorrect ? 'var(--ifm-color-success-contrast-background)' : 'var(--ifm-color-danger-contrast-background)',
              borderLeft: `4px solid ${isCorrect ? 'var(--ifm-color-success)' : 'var(--ifm-color-danger)'}`
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: isCorrect ? 'var(--ifm-color-success-darker)' : 'var(--ifm-color-danger-darker)' }}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </h4>
              <p style={{ margin: 0 }}>{questions[currentQuestion].explanation}</p>
              
              <button 
                onClick={handleNextQuestion}
                className="button button--secondary"
                style={{ marginTop: '1rem' }}
              >
                {currentQuestion === questions.length - 1 ? 'Ver resultados' : 'Siguiente pregunta'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
