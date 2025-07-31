import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { TestInterface } from "@/components/TestInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trophy, ArrowLeft } from "lucide-react";

const TestPage = () => {
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  
  // Mock user data
  const user = {
    name: "Alex Student",
    department: "Computer Science"
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleFinishTest = (score: number) => {
    setFinalScore(score);
    setTestFinished(true);
  };

  const handleBackToDashboard = () => {
    navigate("/");
  };

  if (testFinished) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={() => navigate("/")} />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md text-center shadow-glow animate-fade-in">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-success rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Test Completed!</CardTitle>
              <CardDescription>Congratulations on finishing your test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{finalScore}%</div>
                <p className="text-muted-foreground">Your Score</p>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="font-medium">
                    {finalScore >= 90 ? "Excellent! 🌟" : 
                     finalScore >= 80 ? "Very Good! 👍" : 
                     finalScore >= 70 ? "Good! 📚" : "Keep practicing! 💪"}
                  </p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Questions Answered</p>
                  <p className="font-medium">5 out of 5</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate("/leaderboard")}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  View Leaderboard
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handleBackToDashboard}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (testStarted) {
    return (
      <>
        <Header user={user} onLogout={() => navigate("/")} />
        <TestInterface 
          department={user.department}
          onFinishTest={handleFinishTest}
          onBack={handleBackToDashboard}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={() => navigate("/")} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Start Your Test?</CardTitle>
              <CardDescription>
                You're about to begin a {user.department} MCQ test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">30</div>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <h3 className="font-medium text-foreground">Instructions:</h3>
                <ul className="space-y-1 pl-4">
                  <li>• Read each question carefully</li>
                  <li>• Select the best answer from the given options</li>
                  <li>• You can navigate between questions freely</li>
                  <li>• Make sure to submit before time runs out</li>
                </ul>
              </div>

              <Button 
                variant="gradient" 
                size="xl" 
                className="w-full"
                onClick={handleStartTest}
              >
                Start Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestPage;