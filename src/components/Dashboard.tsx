import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Clock, Target, TrendingUp, Users } from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    department: string;
  };
  onStartTest: () => void;
  onViewLeaderboard: () => void;
}

const mockStats = {
  testsCompleted: 12,
  totalTests: 20,
  averageScore: 85,
  rank: 3,
  timeSpent: "2h 45m",
  streak: 5
};

export const Dashboard = ({ user, onStartTest, onViewLeaderboard }: DashboardProps) => {
  const completionPercentage = (mockStats.testsCompleted / mockStats.totalTests) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey in {user.department}?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockStats.testsCompleted}</div>
              <p className="text-xs text-muted-foreground">of {mockStats.totalTests} total</p>
              <Progress value={completionPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockStats.averageScore}%</div>
              <p className="text-xs text-success">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">#{mockStats.rank}</div>
              <p className="text-xs text-muted-foreground">in {user.department}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockStats.streak}</div>
              <p className="text-xs text-muted-foreground">days active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Quick Start
              </CardTitle>
              <CardDescription>
                Jump into practice tests for {user.department}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="justify-start h-auto py-4"
                  onClick={onStartTest}
                >
                  <div className="text-left">
                    <div className="font-semibold">Start New Test</div>
                    <div className="text-sm opacity-90">Practice MCQs for {user.department}</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="justify-start h-auto py-4"
                >
                  <div className="text-left">
                    <div className="font-semibold">Continue Last Test</div>
                    <div className="text-sm text-muted-foreground">8 questions remaining</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Leaderboard & Progress
              </CardTitle>
              <CardDescription>
                See how you rank among your peers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      #{mockStats.rank}
                    </Badge>
                    <span className="font-medium">Your Rank</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{mockStats.averageScore}% avg</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onViewLeaderboard}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { test: "Data Structures Quiz", score: 92, time: "2 hours ago" },
                { test: "Algorithms Practice", score: 88, time: "1 day ago" },
                { test: "Database Management", score: 85, time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{activity.test}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.score >= 90 ? "default" : activity.score >= 80 ? "secondary" : "outline"}
                    className={activity.score >= 90 ? "bg-success" : ""}
                  >
                    {activity.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};