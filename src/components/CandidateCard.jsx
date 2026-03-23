const CandidateCard = ({ candidate, handleVote, disabled, currentUser }) => {
  const isSelected = currentUser?.votedCandidateId === candidate.id;

  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:scale-105 transition">
      <img
        src={candidate.candidateImg}
        className="w-24 h-24 rounded-full mx-auto object-cover"
      />

      <h2 className="text-center font-bold mt-2">{candidate.name}</h2>

      <p className="text-center text-gray-600">{candidate.party}</p>

      <img src={candidate.partyLogo} className="w-12 h-12 mx-auto mt-2" />

      <p className="text-sm text-center mt-2">{candidate.description}</p>

      <button
        onClick={() => handleVote(candidate.id)}
        disabled={disabled}
        className={`mt-3 w-full p-2 rounded text-white ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        {isSelected ? "Voted" : "Vote"}
      </button>
    </div>
  );
};

export default CandidateCard;
