import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Leaderboard } from "@/components/Leaderboard";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: "Alex Student",
    department: "Computer Science"
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={() => navigate("/")} />
      <Leaderboard 
        department={user.department}
        onBack={handleBack}
      />
    </div>
  );
};

export default LeaderboardPage;