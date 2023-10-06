"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const interval = setTimeout(() => {
      setShow(false);
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!show) {
    return <></>;
  }

  return <ReactConfetti numberOfPieces={500} tweenDuration={500} />;
};

export default Confetti;
