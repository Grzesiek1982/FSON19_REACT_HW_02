import { useEffect, useState } from "react";

import Feedback from "./components/Feedback.jsx";
import Options from "./components/Options.jsx";
import Description from "./components/Description.jsx";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const storedFeedback = localStorage.getItem("feedback");
    return storedFeedback
      ? JSON.parse(storedFeedback)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const positiveFeedback =
    totalFeedback > 0
      ? Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100)
      : 0;

  useEffect(() => {
    const handle = setTimeout(() => {
      localStorage.setItem("feedback", JSON.stringify(feedback));
    }, 500);

    return () => clearTimeout(handle);
  }, [feedback]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <p>No feedback yet</p>
      )}
    </>
  );
};

export default App;
