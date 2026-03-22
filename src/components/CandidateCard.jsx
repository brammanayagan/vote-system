const CandidateCard = ({ candidate, handleVote, disabled, currentUser }) => {
  return (
    <>
      <div className="border p-4 rounded-lg shadow bg-white">
        <h2 className="text-lg font-bold">{candidate.name}</h2>
        <p className="text-sm text-gray-500">{candidate.party}</p>

        <label className="flex items-center mt-3">
          <input
            type="checkbox"
            className="mr-2"
            checked={currentUser?.votedCandidateId === candidate.id}
            disabled={disabled}
            onChange={() => handleVote(candidate.id)}
          />
          Vote
        </label>
      </div>
    </>
  );
};

export default CandidateCard;
