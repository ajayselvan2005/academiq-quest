import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, ArrowLeft, TrendingUp } from "lucide-react";

interface LeaderboardProps {
  department: string;
  onBack: () => void;
}

const mockLeaderboardData = [
  { rank: 1, name: "Alice Johnson", score: 95, testsCompleted: 18, avatar: "AJ" },
  { rank: 2, name: "Bob Smith", score: 92, testsCompleted: 16, avatar: "BS" },
  { rank: 3, name: "Carol Davis", score: 89, testsCompleted: 20, avatar: "CD" },
  { rank: 4, name: "David Wilson", score: 87, testsCompleted: 15, avatar: "DW" },
  { rank: 5, name: "Emma Brown", score: 85, testsCompleted: 17, avatar: "EB" },
  { rank: 6, name: "Frank Miller", score: 83, testsCompleted: 14, avatar: "FM" },
  { rank: 7, name: "Grace Lee", score: 82, testsCompleted: 19, avatar: "GL" },
  { rank: 8, name: "Henry Taylor", score: 80, testsCompleted: 13, avatar: "HT" },
  { rank: 9, name: "Ivy Chen", score: 78, testsCompleted: 16, avatar: "IC" },
  { rank: 10, name: "Jack Robinson", score: 76, testsCompleted: 12, avatar: "JR" },
];

export const Leaderboard = ({ department, onBack }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Trophy className="h-8 w-8 text-accent" />
                {department} Leaderboard
              </h1>
              <p className="text-muted-foreground">Top performers in your department</p>
            </div>
          </div>
          
          <Badge variant="outline" className="px-4 py-2 text-base">
            <TrendingUp className="h-4 w-4 mr-2" />
            Updated Live
          </Badge>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockLeaderboardData.slice(0, 3).map((student, index) => (
            <Card 
              key={student.rank} 
              className={`shadow-card hover:shadow-glow transition-all duration-300 ${
                index === 0 ? 'order-2 md:order-1 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20' :
                index === 1 ? 'order-1 md:order-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20' :
                'order-3 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
              }`}
            >
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {getRankIcon(student.rank)}
                  <Badge 
                    variant={getRankBadgeVariant(student.rank)}
                    className="ml-2 px-3 py-1"
                  >
                    #{student.rank}
                  </Badge>
                </div>
                <Avatar className="mx-auto mb-3 h-16 w-16">
                  <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{student.name}</CardTitle>
                <CardDescription>
                  {student.testsCompleted} tests completed
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{student.score}%</div>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Complete Rankings</CardTitle>
            <CardDescription>
              All students ranked by average test scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLeaderboardData.map((student) => (
                <div 
                  key={student.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    student.rank <= 3 ? 'bg-muted/50 border-primary/20' : 'bg-background border-border'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 min-w-[60px]">
                      {student.rank <= 3 && getRankIcon(student.rank)}
                      <Badge 
                        variant={getRankBadgeVariant(student.rank)}
                        className="px-2 py-1"
                      >
                        #{student.rank}
                      </Badge>
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                        {student.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.testsCompleted} tests completed
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{student.score}%</div>
                    <p className="text-sm text-muted-foreground">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Department Average</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-primary">84.2%</div>
              <p className="text-sm text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Total Students</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-accent">156</div>
              <p className="text-sm text-muted-foreground">Active participants</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Tests Completed</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-success">2,847</div>
              <p className="text-sm text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};