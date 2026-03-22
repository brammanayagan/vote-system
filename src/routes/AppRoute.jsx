import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import VotingPage from "../pages/VotingPage";

const AppRoutes = ({
  voters,
  candidates,
  currentUser,
  setCurrentUser,
  handleVote,
}) => {
  return (
    <>
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
            />
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
