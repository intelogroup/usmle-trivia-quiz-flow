
import { useState, useEffect } from "react";
import { ChevronLeft, Clock } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizPlayScreenProps {
  category: string;
  onNavigate: (screen: string) => void;
}

const QuizPlayScreen = ({ category, onNavigate }: QuizPlayScreenProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Dummy questions for the quiz
  const questions: Question[] = [
    {
      id: 1,
      question: "Which of the following is the most common cause of community-acquired pneumonia?",
      options: [
        "Streptococcus pneumoniae",
        "Haemophilus influenzae",
        "Mycoplasma pneumoniae",
        "Staphylococcus aureus"
      ],
      correctAnswer: 0,
      explanation: "Streptococcus pneumoniae is the most common bacterial cause of community-acquired pneumonia in adults."
    },
    {
      id: 2,
      question: "What is the normal range for serum sodium levels?",
      options: [
        "130-140 mEq/L",
        "135-145 mEq/L",
        "140-150 mEq/L",
        "125-135 mEq/L"
      ],
      correctAnswer: 1,
      explanation: "Normal serum sodium levels range from 135-145 mEq/L (135-145 mmol/L)."
    },
    {
      id: 3,
      question: "Which heart chamber has the thickest muscular wall?",
      options: [
        "Right atrium",
        "Left atrium",
        "Right ventricle",
        "Left ventricle"
      ],
      correctAnswer: 3,
      explanation: "The left ventricle has the thickest muscular wall as it needs to pump blood to the entire systemic circulation."
    },
    {
      id: 4,
      question: "What is the mechanism of action of aspirin?",
      options: [
        "COX-1 and COX-2 inhibition",
        "Selective COX-2 inhibition",
        "Lipoxygenase inhibition",
        "Phospholipase A2 inhibition"
      ],
      correctAnswer: 0,
      explanation: "Aspirin irreversibly inhibits both COX-1 and COX-2 enzymes, preventing prostaglandin synthesis."
    },
    {
      id: 5,
      question: "Which vitamin deficiency causes scurvy?",
      options: [
        "Vitamin B12",
        "Vitamin C",
        "Vitamin D",
        "Vitamin K"
      ],
      correctAnswer: 1,
      explanation: "Scurvy is caused by vitamin C (ascorbic acid) deficiency, leading to collagen synthesis problems."
    }
  ];

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizCompletion();
    }
  }, [timeLeft, quizCompleted]);

  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          handleQuizCompletion();
        }
      }, 2000);
    }
  };

  const handleQuizCompletion = () => {
    let finalScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (quizCompleted) {
    return (
      <div className="p-4 pb-20 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold">Quiz Completed!</h1>
          <p className="text-slate-300">Great job on completing the {category} quiz!</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">{score}/{questions.length}</div>
            <p className="text-slate-300">Final Score</p>
            <p className="text-lg font-semibold">{Math.round((score / questions.length) * 100)}%</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{score}</div>
              <p className="text-sm text-slate-400">Correct</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
              <p className="text-sm text-slate-400">Incorrect</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setAnswers(new Array(questions.length).fill(null));
              setTimeLeft(300);
              setQuizCompleted(false);
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => onNavigate('quiz')} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-blue-400">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold leading-relaxed">{currentQ.question}</h2>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left transition-colors ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQ.correctAnswer
                      ? 'bg-green-600 border-green-500'
                      : 'bg-red-600 border-red-500'
                    : 'bg-blue-600 border-blue-500'
                  : showResult && index === currentQ.correctAnswer
                    ? 'bg-green-600 border-green-500'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700'
              } border`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index ? 'border-white bg-white' : 'border-slate-400'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && currentQ.explanation && (
          <div className="bg-slate-800 rounded-xl p-4 border-l-4 border-blue-500">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="text-slate-300 text-sm">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {selectedAnswer !== null && !showResult && (
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default QuizPlayScreen;
