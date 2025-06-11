import { useState, useEffect } from "react";
import { ChevronLeft, Clock } from "lucide-react";
import { getFilteredQuestions, Question } from "@/data/questionBank";
import { QuizConfig } from "./QuizConfigurationScreen";
import { saveQuizResult, generateQuizName } from "@/utils/storageUtils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuizPlayScreenProps {
  selectedSubjects: string[];
  selectedSystems: string[];
  quizConfig?: QuizConfig | null;
  onNavigate: (screen: string) => void;
}

const QuizPlayScreen = ({ selectedSubjects, selectedSystems, quizConfig, onNavigate }: QuizPlayScreenProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime] = useState(new Date());

  useEffect(() => {
    const filteredQuestions = getFilteredQuestions(selectedSubjects, selectedSystems);
    const questionLimit = quizConfig?.questionCount || 10;
    const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, questionLimit);
    setQuestions(shuffledQuestions);
    setAnswers(new Array(shuffledQuestions.length).fill(null));
    
    // Set time limit if specified
    if (quizConfig?.timeLimit && quizConfig.timeLimit > 0) {
      setTimeLeft(quizConfig.timeLimit * 60); // Convert minutes to seconds
    } else {
      setTimeLeft(300); // Default 5 minutes
    }
  }, [selectedSubjects, selectedSystems, quizConfig]);

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0 && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizCompletion();
    }
  }, [timeLeft, quizCompleted, questions.length]);

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
    const correctAnswerIndices: number[] = [];
    
    answers.forEach((answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        finalScore++;
      }
      correctAnswerIndices.push(questions[index]?.correctAnswer || 0);
    });
    
    setScore(finalScore);
    setQuizCompleted(true);

    // Save quiz result to storage
    if (quizConfig) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const durationString = `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;
      
      const quizResult = {
        id: Date.now().toString(),
        name: generateQuizName(quizConfig),
        config: quizConfig,
        score: finalScore,
        totalQuestions: questions.length,
        answers,
        correctAnswers: correctAnswerIndices,
        questions,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: durationString,
        date: new Date().toISOString()
      };
      
      saveQuizResult(quizResult);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Show loading if questions haven't loaded yet
  if (questions.length === 0) {
    return (
      <div className="p-4 pb-20 space-y-6 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-300">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Quiz Completed!</h1>
          <p className="text-slate-300">Great job on completing your custom quiz!</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">{score}/{questions.length}</div>
            <p className="text-slate-300">Final Score</p>
            <p className="text-lg font-semibold text-white">{Math.round((score / questions.length) * 100)}%</p>
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

        {/* Quiz Details */}
        <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-white">Quiz Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Subjects:</span>
              <span className="text-blue-400">{selectedSubjects.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Systems:</span>
              <span className="text-green-400">{selectedSystems.join(', ')}</span>
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
            onClick={() => onNavigate('quiz-configuration')}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="p-4 pb-20 space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => onNavigate('quiz')} className="p-2">
          <ChevronLeft className="w-6 h-6 text-slate-300" />
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

      {/* Question Tags */}
      <div className="flex flex-wrap gap-2">
        {currentQ.subjects.map(subject => (
          <span key={subject} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full text-xs">
            {subject}
          </span>
        ))}
        {currentQ.systems.map(system => (
          <span key={system} className="bg-green-600/20 text-green-300 px-2 py-1 rounded-full text-xs">
            {system}
          </span>
        ))}
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold leading-relaxed text-white">{currentQ.question}</h2>
        
        <RadioGroup 
          value={selectedAnswer?.toString() || ""} 
          onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          disabled={showResult}
          className="space-y-3"
        >
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              className={`w-full p-4 rounded-xl text-left transition-colors ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQ.correctAnswer
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-red-600 border-red-500 text-white'
                    : 'bg-blue-600 border-blue-500 text-white'
                  : showResult && index === currentQ.correctAnswer
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
              } border`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={index.toString()} className="border-white" />
                <span className="flex-1">{option}</span>
              </div>
            </div>
          ))}
        </RadioGroup>

        {showResult && currentQ.explanation && (
          <div className="bg-slate-800 rounded-xl p-4 border-l-4 border-blue-500">
            <h4 className="font-semibold mb-2 text-white">Explanation:</h4>
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
