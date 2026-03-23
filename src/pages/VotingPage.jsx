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
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!currentUser) return <Navigate to="/" />;

  const handleVoteWithAlert = (candidateId) => {
    if (currentUser.voted) return;

    const selectedCandidate = candidates.find((c) => c.id === candidateId);

    handleVote(candidateId);

    alert(
      `You voted for ${selectedCandidate.name} (${selectedCandidate.party})`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          T. Nagar Constituency
        </h1>
        <Countdown passvote={currentUser?.votedCandidateId} />
      </div>

      {/* Candidates Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {candidates.map((c) => (
          <div key={c.id} className="scale-95">
            <CandidateCard
              candidate={c}
              handleVote={handleVoteWithAlert}
              disabled={currentUser.voted}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>

      {/* Results */}
      {currentUser.voted && (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Results</h2>

          <div className="space-y-2 text-sm">
            {candidates.map((c) => (
              <div key={c.id} className="flex justify-between border-b pb-1">
                <span>{c.name}</span>
                <span className="font-medium">{c.votes} votes</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="max-w-6xl mx-auto mt-6 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default VotingPage;
