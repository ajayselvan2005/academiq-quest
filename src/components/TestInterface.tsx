import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface TestInterfaceProps {
  department: string;
  onFinishTest: (score: number) => void;
  onBack: () => void;
}

const mockQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1
  },
  {
    id: 2,
    question: "Which data structure follows LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct: 1
  },
  {
    id: 3,
    question: "What does SQL stand for?",
    options: ["Simple Query Language", "Structured Query Language", "Standard Query Language", "System Query Language"],
    correct: 1
  },
  {
    id: 4,
    question: "Which sorting algorithm has the best average case time complexity?",
    options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
    correct: 2
  },
  {
    id: 5,
    question: "What is the purpose of a constructor in OOP?",
    options: ["To destroy objects", "To initialize objects", "To copy objects", "To compare objects"],
    correct: 1
  }
];

export const TestInterface = ({ department, onFinishTest, onBack }: TestInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(mockQuestions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishTest();
    }
  }, [timeLeft, isFinished]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleFinishTest = () => {
    setIsFinished(true);
    const correctAnswers = answers.filter((answer, index) => answer === mockQuestions[index].correct).length;
    const score = Math.round((correctAnswers / mockQuestions.length) * 100);
    setTimeout(() => onFinishTest(score), 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredQuestions = answers.filter(answer => answer !== -1).length;
  const progress = (answeredQuestions / mockQuestions.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-glow animate-fade-in">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Test Completed!</CardTitle>
            <CardDescription>Processing your results...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{department} Test</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {mockQuestions.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {answeredQuestions}/{mockQuestions.length} answered
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Question {currentQuestion + 1}</Badge>
              {answers[currentQuestion] !== -1 && (
                <Badge variant="default" className="bg-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Answered
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {mockQuestions[currentQuestion].question}
            </h2>
            
            <div className="space-y-3">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      answers[currentQuestion] === index
                        ? "border-primary bg-primary text-white"
                        : "border-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {mockQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? "bg-primary text-primary-foreground"
                    : answers[index] !== -1
                    ? "bg-success text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === mockQuestions.length - 1 ? (
            <Button 
              variant="gradient" 
              onClick={handleFinishTest}
              disabled={answeredQuestions === 0}
            >
              Finish Test
            </Button>
          ) : (
            <Button 
              variant="default"
              onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};