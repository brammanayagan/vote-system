import { Navigate } from "react-router-dom";
import CandidateCard from "../components/CandidateCard";

const VotingPage = ({ currentUser, candidates, handleVote }) => {
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          T. Nagar Constituency
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              handleVote={handleVote}
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
      </div>
    </>
  );
};

export default VotingPage;
