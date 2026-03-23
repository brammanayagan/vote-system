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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Voter Login</h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter VoterID"
          className="border p-2 w-full mb-3"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
