import { useState, useEffect } from "react";
import { voters as initialVoters } from "./data/voters";
import { candidates as initialCandidates } from "./data/candidates";
import AppRoutes from "./routes/AppRoute";

const App = () => {
  const [voters, setVoters] = useState(initialVoters);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedVoters = JSON.parse(localStorage.getItem("voters"));
    const storedCandidates = JSON.parse(localStorage.getItem("candidates"));
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (storedVoters) setVoters(storedVoters);
    if (storedCandidates) setCandidates(storedCandidates);
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("voters", JSON.stringify(voters));
    localStorage.setItem("candidates", JSON.stringify(candidates));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [voters, candidates, currentUser]);

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

    setCandidates(updatedCandidates);
    setVoters(updatedVoters);

    setCurrentUser({
      ...currentUser,
      voted: true,
      votedCandidateId: candidateId,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AppRoutes
      voters={voters}
      candidates={candidates}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      handleVote={handleVote}
      handleLogout={handleLogout}
    />
  );
};

export default App;
