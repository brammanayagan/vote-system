import { Navigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import CandidateCard from "../components/CandidateCard";

const VotingPage = ({
  currentUser,
  candidates,
  handleVote,
  handleLogout,
  loading,
}) => {
  if (loading) return <p>Loading...</p>;
  if (!currentUser) return <Navigate to="/" />;

  // 🔴 Wrapped vote function (adds alert)
  const handleVoteWithAlert = (candidateId) => {
    if (currentUser.voted) return;

    const selectedCandidate = candidates.find((c) => c.id === candidateId);

    handleVote(candidateId);

    alert(
      `You voted for ${selectedCandidate.name} (${selectedCandidate.party})`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">T. Nagar Constituency</h1>
        <Countdown passvote={currentUser?.votedCandidateId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((c) => (
          <CandidateCard
            key={c.id}
            candidate={c}
            handleVote={handleVoteWithAlert}
            disabled={currentUser.voted}
            currentUser={currentUser}
          />
        ))}
      </div>

      {currentUser.voted && (
        <div className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          {candidates.map((c) => (
            <p key={c.id}>
              {c.name} - {c.votes} votes
            </p>
          ))}
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default VotingPage;
