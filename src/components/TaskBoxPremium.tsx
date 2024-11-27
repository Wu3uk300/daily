"use client";
import styles from "@/styles/taskboxpremium.module.css";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {
  getAMentalTip,
  getAnActualMentalTip,
  getAPhysicalTip,
  getAnActualPhysicalTip,
  progressMaker,
} from "@/actions/actions";

interface TaskBoxPremium {
  progressM: number | undefined;
  progressP: number | undefined;
}

const TaskBoxPremium: React.FC<TaskBoxPremium> = ({ progressM, progressP }) => {
  // const [advice, setAdvice] = useState<string | undefined>(undefined);

  const [adviceMental, setAdviceMental] = useState<string | undefined>(
    undefined
  );
  const [advicePhysical, setAdvicePhysical] = useState<string | undefined>(
    undefined
  );

  const [selectedCategory, setSelectedCategory] = useState("Mental");

  const [mentalAdvice, setMentalAdvice] = useState<string | undefined>();

  const [physicalAdvice, setPhysicalAdvice] = useState<string | undefined>();

  const [checkedMentalClick, setCheckedMentalClick] = useState(0);

  const [checkedPhysicalClick, setCheckedPhysicalClick] = useState(0);

  const [adviceMentalTime, setMentalAdviceTime] = useState<number | null>(null);
  const [advicePhysicalTime, setPhysicalAdviceTime] = useState<number | null>(
    null
  );

  const [remainingMentalTime, setRemainingMentalTime] = useState<number | null>(
    null
  );
  const [remainingPhysicalTime, setRemainingPhysicalTime] = useState<
    number | null
  >(null);

  const countdownDuration = 10000;

  useEffect(() => {
    const storedMentalAdvice = localStorage.getItem("mentalAdvice");
    const storedPhysicalAdvice = localStorage.getItem("physicalAdvice");
    // const storedCategory = localStorage.getItem("selectedCategory");
    const storedMentalTime = localStorage.getItem("adviceMentalTime");
    const storedPhysicalTime = localStorage.getItem("advicePhysicalTime");

    // if (storedMentalAdvice && storedCategory && storedTime)
    if (storedMentalAdvice && storedMentalTime) {
      const timePassed = Date.now() - parseInt(storedMentalTime, 10);
      if (timePassed < countdownDuration) {
        setAdviceMental(storedMentalAdvice);
        // setSelectedCategory(storedCategory);
        setMentalAdviceTime(parseInt(storedMentalTime, 10));
        setRemainingMentalTime(countdownDuration - timePassed);
      } else {
        localStorage.removeItem("mentalAdvice");
        // localStorage.removeItem("selectedCategory");
        localStorage.removeItem("adviceMentalTime");
      }
    }
    if (storedPhysicalAdvice && storedPhysicalTime) {
      const timePassed = Date.now() - parseInt(storedPhysicalTime, 10);
      if (timePassed < countdownDuration) {
        setAdvicePhysical(storedPhysicalAdvice);
        // setSelectedCategory(storedCategory);
        setPhysicalAdviceTime(parseInt(storedPhysicalTime, 10));
        setRemainingPhysicalTime(countdownDuration - timePassed);
      } else {
        localStorage.removeItem("physicalAdvice");
        // localStorage.removeItem("selectedCategory");
        localStorage.removeItem("advicePhysicalTime");
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
    if (!adviceMentalTime || remainingMentalTime === null) return;

    const mentalInterval = setInterval(() => {
      const timeLeft = adviceMentalTime + countdownDuration - Date.now();
      if (timeLeft <= 0) {
        setRemainingMentalTime(0);
        clearInterval(mentalInterval);
      } else {
        setRemainingMentalTime(timeLeft);
      }
    }, 1000);

    return () => clearInterval(mentalInterval);
  }, [adviceMentalTime, remainingMentalTime]);

  // Таймер для физического совета
  useEffect(() => {
    if (!advicePhysicalTime || remainingPhysicalTime === null) return;

    const physicalInterval = setInterval(() => {
      const timeLeft = advicePhysicalTime + countdownDuration - Date.now();
      if (timeLeft <= 0) {
        setRemainingPhysicalTime(0);
        clearInterval(physicalInterval);
      } else {
        setRemainingPhysicalTime(timeLeft);
      }
    }, 1000);

    return () => clearInterval(physicalInterval);
  }, [advicePhysicalTime, remainingPhysicalTime]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const getAdvice = () => {
    if (!selectedCategory) return;
    progressMaker(selectedCategory);

    if (selectedCategory === "Mental") {
      getAMentalTip();
      setCheckedMentalClick((progressM ?? 0) + 1);
      const currentTime = Date.now();
      setAdviceMental(mentalAdvice);
      setMentalAdviceTime(currentTime);
      setRemainingMentalTime(countdownDuration);
      if (mentalAdvice) {
        localStorage.setItem("mentalAdvice", mentalAdvice);
      }
      // localStorage.setItem("selectedCategory", selectedCategory);
      localStorage.setItem("adviceMentalTime", currentTime.toString());
    } else {
      getAPhysicalTip();
      setCheckedPhysicalClick((progressP ?? 0) + 1);
      const currentTime = Date.now();
      setAdvicePhysical(physicalAdvice);
      setPhysicalAdviceTime(currentTime);
      setRemainingPhysicalTime(countdownDuration);
      if (physicalAdvice) {
        localStorage.setItem("physicalAdvice", physicalAdvice);
      }
      // localStorage.setItem("selectedCategory", selectedCategory);
      localStorage.setItem("advicePhysicalTime", currentTime.toString());
    }
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
      </div>

      {selectedCategory === "Mental" ? (
        <div className={styles.taskBox}>
          <div className={styles.taskItself}>
            <div>
              <div className={styles.progressBar}>
                <div className={styles.progressText}>
                  {checkedMentalClick > 0 ? (
                    <>{checkedMentalClick} Days</>
                  ) : (
                    <>{progressM} Days</>
                  )}
                </div>
                <div className={styles.progressBarBackground}>
                  <div
                    className={styles.progressBarInner}
                    style={
                      checkedMentalClick > 0
                        ? { width: `${(checkedMentalClick ?? 0) * 3}%` }
                        : { width: `${(progressM ?? 0) * 3}%` }
                    }
                  ></div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={
                    adviceMental ? styles.getBtnDissapear : styles.getBtn
                  }
                  onClick={getAdvice}
                >
                  Get a tip!
                </button>
              </div>

              <CSSTransition
                in={!!adviceMental}
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
                    <div className={styles.taskBoxText}>{adviceMental}</div>
                  </div>
                </div>
              </CSSTransition>

              <CSSTransition
                in={remainingMentalTime !== null}
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
                  {remainingMentalTime !== null
                    ? remainingMentalTime > 0
                      ? `Get a new tip in:   ${formatTime(remainingMentalTime)}`
                      : "Reload the page!"
                    : null}
                </div>
              </CSSTransition>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.taskBox}>
          <div className={styles.taskItself}>
            <div>
              <div className={styles.progressBar}>
                <div className={styles.progressText}>
                  {checkedPhysicalClick > 0 ? (
                    <>{checkedPhysicalClick} Days</>
                  ) : (
                    <>{progressP} Days</>
                  )}
                </div>
                <div className={styles.progressBarBackground}>
                  <div
                    className={styles.progressBarInner}
                    style={
                      checkedPhysicalClick > 0
                        ? { width: `${(checkedPhysicalClick ?? 0) * 3}%` }
                        : { width: `${(progressP ?? 0) * 3}%` }
                    }
                  ></div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={
                    advicePhysical ? styles.getBtnDissapear : styles.getBtn
                  }
                  onClick={getAdvice}
                >
                  Get a tip!
                </button>
              </div>

              <CSSTransition
                in={!!advicePhysical}
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
                    <div className={styles.taskBoxText}>{advicePhysical}</div>
                  </div>
                </div>
              </CSSTransition>

              <CSSTransition
                in={remainingPhysicalTime !== null}
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
                  {remainingPhysicalTime !== null
                    ? remainingPhysicalTime > 0
                      ? `Get a new tip in:   ${formatTime(
                          remainingPhysicalTime
                        )}`
                      : "Reload the page!"
                    : null}
                </div>
              </CSSTransition>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoxPremium;
