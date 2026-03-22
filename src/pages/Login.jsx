import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ voters, setCurrentUser }) => {
  const [name, setName] = useState("");
  const [voterId, setVoterId] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const user = voters.find((v) => v.id === voterId);

    if (!user) {
      alert("Invalid Voter ID");
      return;
    }

    if (user.name !== name) {
      alert("Name does not match");
      return;
    }

    if (user.voted) {
      setCurrentUser(user);
      alert("You have already voted");
      navigate("/vote");
      return;
    }

    setCurrentUser(user);
    navigate("/vote");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Voter Login</h2>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Voter ID"
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
    </>
  );
};

export default Login;
