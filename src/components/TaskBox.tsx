"use client";
import styles from "@/styles/taskbox.module.css";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {
  getAMentalTip,
  getAnActualMentalTip,
  getAPhysicalTip,
  getAnActualPhysicalTip,
  progressMaker,
} from "@/actions/actions";

interface TaskBox {
  progressM: number | undefined;
  progressP: number | undefined;
}

const TaskBox: React.FC<TaskBox> = ({ progressM, progressP }) => {
  const [advice, setAdvice] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState("Mental");
  const [adviceTime, setAdviceTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [mentalAdvice, setMentalAdvice] = useState<string | undefined>();
  const [physicalAdvice, setPhysicalAdvice] = useState<string | undefined>();
  const [checkedClick, setCheckedClick] = useState(0);

  const countdownDuration = 86400000;

  useEffect(() => {
    const storedAdvice = localStorage.getItem("advice");
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedTime = localStorage.getItem("adviceTime");

    if (storedAdvice && storedCategory && storedTime) {
      const timePassed = Date.now() - parseInt(storedTime, 10);
      if (timePassed < countdownDuration) {
        setAdvice(storedAdvice);
        setSelectedCategory(storedCategory);
        setAdviceTime(parseInt(storedTime, 10));
        setRemainingTime(countdownDuration - timePassed);
      } else {
        localStorage.removeItem("advice");
        localStorage.removeItem("selectedCategory");
        localStorage.removeItem("adviceTime");
      }
    }
  }, []);

  useEffect(() => {
    const getText = async () => {
      const mentalAdvice = await getAnActualMentalTip();
      setMentalAdvice(mentalAdvice);
      const physicalAdvice = await getAnActualPhysicalTip();
      setPhysicalAdvice(physicalAdvice);
    };
    getText();
  }, [selectedCategory]);

  useEffect(() => {
    if (!adviceTime || remainingTime === null) return;

    const interval = setInterval(() => {
      const timeLeft = adviceTime + countdownDuration - Date.now();
      if (timeLeft <= 0) {
        setRemainingTime(0);
        clearInterval(interval);
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [adviceTime, remainingTime]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const getAdvice = () => {
    if (!selectedCategory) return;
    progressMaker(selectedCategory);

    if (selectedCategory === "Mental") {
      getAMentalTip();
      setCheckedClick((progressM ?? 0) + 1);
    } else {
      getAPhysicalTip();
      setCheckedClick((progressP ?? 0) + 1);
    }

    const newAdvice =
      selectedCategory === "Mental" ? mentalAdvice : physicalAdvice;

    const currentTime = Date.now();

    setAdvice(newAdvice);
    setAdviceTime(currentTime);
    setRemainingTime(countdownDuration);

    if (newAdvice) {
      localStorage.setItem("advice", newAdvice);
    }
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("adviceTime", currentTime.toString());
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className={styles.customSelectContainer}>
        {!advice ? (
          <>
            <input
              type="radio"
              id="option1"
              value="Mental"
              name="goal"
              className={styles.radioInput}
              onChange={handleCategoryChange}
              defaultChecked
            />
            <label htmlFor="option1" className={styles.radioLabel}>
              Mental
            </label>
            <input
              type="radio"
              id="option2"
              name="goal"
              value="Physic"
              className={styles.radioInput}
              onChange={handleCategoryChange}
            />
            <label htmlFor="option2" className={styles.radioLabel}>
              Physical
            </label>
          </>
        ) : null}
      </div>

      <div className={styles.taskBox}>
        <div className={styles.taskItself}>
          <div>
            <div className={styles.progressBar}>
              <div className={styles.progressText}>
                {checkedClick > 0 ? (
                  <>{checkedClick} Days</>
                ) : (
                  <>
                    {selectedCategory === "Mental" ? (
                      <>{progressM} Days</>
                    ) : (
                      <>{progressP} Days</>
                    )}
                  </>
                )}
              </div>
              <div className={styles.progressBarBackground}>
                <div
                  className={styles.progressBarInner}
                  style={
                    checkedClick > 0
                      ? { width: `${(checkedClick ?? 0) * 3}%` }
                      : selectedCategory === "Mental"
                      ? { width: `${(progressM ?? 0) * 3}%` }
                      : { width: `${(progressP ?? 0) * 3}%` }
                  }
                ></div>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button
                className={advice ? styles.getBtnDissapear : styles.getBtn}
                disabled={!selectedCategory || !!adviceTime}
                onClick={getAdvice}
              >
                Get a tip!
              </button>
            </div>

            <CSSTransition
              in={!!advice}
              timeout={1000}
              classNames={{
                enter: styles.adviceEnter,
                enterActive: styles.adviceEnterActive,
                exit: styles.adviceExit,
                exitActive: styles.adviceExitActive,
              }}
              unmountOnExit
            >
              <div className={styles.advice}>
                <div className={styles.taskboxHeader}>Tip of the day:</div>
                <div className={styles.taskboxTextBox}>
                  <div className={styles.taskBoxText}>{advice}</div>
                </div>
              </div>
            </CSSTransition>

            <CSSTransition
              in={remainingTime !== null}
              timeout={1000}
              classNames={{
                enter: styles.timerEnter,
                enterActive: styles.timerEnterActive,
                exit: styles.timerExit,
                exitActive: styles.timerExitActive,
              }}
              unmountOnExit
            >
              <div className={styles.timerContainer}>
                {remainingTime !== null
                  ? remainingTime > 0
                    ? `Get a new tip in:   ${formatTime(remainingTime)}`
                    : "Reload the page!"
                  : null}
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBox;
