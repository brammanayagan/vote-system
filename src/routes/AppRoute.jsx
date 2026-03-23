import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VotingPage from "../pages/VotingPage";

const AppRoutes = ({
  voters,
  candidates,
  currentUser,
  setCurrentUser,
  handleVote,
  handleLogout,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login voters={voters} setCurrentUser={setCurrentUser} />}
      />
      <Route
        path="/vote"
        element={
          <VotingPage
            currentUser={currentUser}
            candidates={candidates}
            handleVote={handleVote}
            handleLogout={handleLogout}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
