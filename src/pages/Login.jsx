import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ voters, setCurrentUser }) => {
  const [name, setName] = useState("");
  const [voterId, setVoterId] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const cleanId = voterId.trim();
    const cleanName = name.trim();

    if (!cleanId || !cleanName) {
      alert("Enter all fields");
      return;
    }

    const user = voters.find((v) => v.id === cleanId);

    if (!user) {
      alert("Invalid Voter ID");
      return;
    }

    if (user.name.toLowerCase() !== cleanName.toLowerCase()) {
      alert("Name does not match");
      return;
    }

    setCurrentUser({ ...user });

    if (user.voted) {
      alert("You have already voted");
    }

    navigate("/vote");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          🗳️ Election Login
        </h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Voter ID"
          className="border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Secure Voting System 🔒
        </p>
      </div>
    </div>
  );
};

export default Login;
