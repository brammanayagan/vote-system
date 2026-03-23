import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Countdown = ({ passvote }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!passvote) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [passvote]);

  useEffect(() => {
    if (passvote) {
      clearInterval(timerRef.current);
    }
  }, [passvote]);

  useEffect(() => {
    if (timeLeft <= 0 && !passvote) {
      clearInterval(timerRef.current);
      alert("Time Up! Redirecting to login...");
      navigate("/");
    }
  }, [timeLeft, passvote, navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-red-500 font-bold">
      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Countdown;
