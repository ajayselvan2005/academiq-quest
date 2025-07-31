import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; department: string } | null>(null);

  const handleLogin = (userData: { name: string; email: string; department: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleStartTest = () => {
    navigate("/test");
  };

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <Dashboard 
        user={user}
        onStartTest={handleStartTest}
        onViewLeaderboard={handleViewLeaderboard}
      />
    </div>
  );
};

export default Index;
