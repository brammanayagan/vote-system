import { useState, useEffect } from "react";
import { voters as initialVoters } from "./data/voters";
import { candidates as initialCandidates } from "./data/candidates";
import AppRoutes from "./routes/AppRoute";

const App = () => {
  const [voters, setVoters] = useState(initialVoters);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load data from localStorage (runs once)
  useEffect(() => {
    const storedVoters = localStorage.getItem("voters");
    const storedCandidates = localStorage.getItem("candidates");
    const storedUser = localStorage.getItem("currentUser");

    if (storedVoters) setVoters(JSON.parse(storedVoters));
    if (storedCandidates) setCandidates(JSON.parse(storedCandidates));
    if (storedUser) setCurrentUser(JSON.parse(storedUser));

    setLoading(false);
  }, []);

  // 🔹 Save data whenever state changes
  useEffect(() => {
    localStorage.setItem("voters", JSON.stringify(voters));
    localStorage.setItem("candidates", JSON.stringify(candidates));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [voters, candidates, currentUser]);

  // 🔹 Voting logic
  const handleVote = (candidateId) => {
    if (currentUser.voted) return;

    const updatedCandidates = candidates.map((c) =>
      c.id === candidateId ? { ...c, votes: c.votes + 1 } : c,
    );

    const updatedVoters = voters.map((v) =>
      v.id === currentUser.id
        ? { ...v, voted: true, votedCandidateId: candidateId }
        : v,
    );

    const updatedUser = updatedVoters.find((v) => v.id === currentUser.id);

    setCandidates(updatedCandidates);
    setVoters(updatedVoters);
    setCurrentUser(updatedUser); // 🔴 IMPORTANT CHANGE
  };

  // 🔹 Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // 🔹 Prevent rendering before loading completes
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AppRoutes
      voters={voters}
      candidates={candidates}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      handleVote={handleVote}
      handleLogout={handleLogout}
      loading={loading}
    />
  );
};

export default App;
