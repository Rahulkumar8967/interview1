import React, { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Orca"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "India", "Japan", "Thailand"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oxide"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Who was the first President of the United States?",
    options: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Which organ in the human body purifies blood?",
    options: ["Heart", "Kidney", "Liver", "Lungs"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: 1,
  },
];

const App = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const optionHandleClick = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = selected;
    setAnswers(updatedAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(updatedAnswers[current + 1]);
    } else {
      let newScore = 0;
      updatedAnswers.forEach((ans, i) => {
        if (ans === questions[i].correctAnswer) newScore++;
      });
      setScore(newScore);
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswers(Array(questions.length).fill(null));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #1e90ff 0%, #0a2a43 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        {showResult ? (
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>
            <p className="text-lg mb-2">
              Your Score:{" "}
              <span className="font-bold">
                {score} / {questions.length}
              </span>
            </p>

            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleRestart}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="mb-6 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 font-semibold">
                  Q{current + 1}
                </span>
                <span>
                  {current + 1} / {questions.length}
                </span>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 text-center text-lg font-medium mb-4 border border-gray-200">
                {questions[current].question}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6 w-full">
                {questions[current].options.map((Option, idx) => (
                  <button
                    key={idx}
                    className={`w-full px-4 py-2 rounded-lg border-2 transition font-medium
                      ${
                        selected === idx
                          ? "bg-blue-100 border-blue-500 text-blue-900"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    onClick={() => optionHandleClick(idx)}
                  >
                    {Option}
                  </button>
                ))}
              </div>

              <div className="flex w-full justify-between gap-2">
                <button
                  className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${
                    current === 0
                      ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 "
                      : "border-blue-500 bg-white text-blue-700 hover:bg-blue-50"
                  }`}
                  onClick={handlePrev}
                  disabled={current === 0}
                >
                  Previous
                </button>

                <button
                  className={`flex-1 py-2 rounded-lg border-2 font-semibold transition ${
                    selected === null
                      ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 "
                      : "border-blue-500 bg-white text-blue-700 hover:bg-blue-50"
                  }`}
                  onClick={handleNext}
                  disabled={selected === null}
                >
                  {current === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
