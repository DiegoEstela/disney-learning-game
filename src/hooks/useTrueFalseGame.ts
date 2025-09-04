import { useState } from "react";
import type { TrueFalseQuestion } from "../types";

export function useTrueFalseGame(questions: TrueFalseQuestion[]) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = questions[index];

  function answer(choice: boolean) {
    if (choice === current.answer) {
      setScore((s) => s + 1);
    }
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  function reset() {
    setIndex(0);
    setScore(0);
    setFinished(false);
  }

  return { current, index, score, finished, answer, reset };
}
