"use client";
import styles from "@/styles/howItWorks.module.css";
import Button from "@/sharedUI/Button";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Image from "next/image";
import arrow from "@/imgs/arrow.png";
import arrowDown from "@/imgs/arrowDown.png";

const HowItWorks = () => {
  const [advice, setAdvice] = useState("Mental");
  const [animation, setAnimation] = useState(false);
  const [progress, setProgress] = useState(false);

  function handleAnimation() {
    setAnimation(true);
    setProgress(true);
  }

  const [arrowType, setArrowType] = useState("Right");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 1250) {
        setArrowType("Down");
      } else {
        setArrowType("Right");
      }
    };

    updateSize(); // Устанавливаем размер при загрузке компонента
    window.addEventListener("resize", updateSize); // Слушатель для изменения размера окна

    return () => window.removeEventListener("resize", updateSize); // Очистка слушателя при размонтировании
  });

  return (
    <div className={styles.howItWorks}>
      <div className={styles.howItWorksHeader}>
        Daily Guidance, Continuous Growth
      </div>
      <div className={styles.howItWorksSub}>
        Small, consistent actions lead to lasting change.
      </div>

      <div className={styles.howItWorksSquares}>
        <div className={styles.howSquare}>
          <div className={styles.howSquareHeader}>Set a goal</div>
          <div className={styles.howSqaureSubHeader}>
            Choose whether you want to improve your mental health or physical
            health:
          </div>
          <div className={styles.customSelectContainer}>
            <input
              type="radio"
              id="option1"
              name="goal"
              className={styles.radioInput}
              defaultChecked
            />
            <label
              onClick={() => {
                setAdvice("Mental");
              }}
              htmlFor="option1"
              className={styles.radioLabel}
            >
              Mental
            </label>

            <input
              type="radio"
              id="option2"
              name="goal"
              className={styles.radioInput}
            />
            <label
              onClick={() => {
                setAdvice("Physic");
              }}
              htmlFor="option2"
              className={styles.radioLabel}
            >
              Physical
            </label>
          </div>
        </div>
        <div className={styles.arrow}>
          {" "}
          {arrowType === "Right" ? (
            <>
              {" "}
              <Image src={arrow} alt="arrow" width={50} height={20} />
            </>
          ) : (
            <>
              {" "}
              <Image src={arrowDown} alt="arrow" width={50} height={50} />
            </>
          )}
        </div>
        <div className={styles.howSquare}>
          <div className={styles.howSquareHeader}>Get an advice</div>
          <div
            className={
              animation
                ? styles.howSqaureSubHeaderNotVisible
                : styles.howSqaureSubHeader
            }
          >
            Get one valuable piece of advice every day and apply it in real
            life!
          </div>
          <CSSTransition
            in={animation}
            timeout={300}
            classNames={{
              enter: styles.adviceEnter,
              enterActive: styles.adviceEnterActive,
              exit: styles.adviceExit,
              exitActive: styles.adviceExitActive,
            }}
            unmountOnExit
          >
            <div className={styles.adviceBox} onClick={handleAnimation}>
              {advice === "Mental" ? (
                <div className={styles.adviceText}>
                  Write down your short-term and long-term goals to stay
                  motivated.
                </div>
              ) : (
                <div className={styles.adviceText}>
                  Drink at least 2 liters of water daily for optimal hydration.
                </div>
              )}
            </div>
          </CSSTransition>
          {!animation && (
            <div className={styles.adviceItself} onClick={handleAnimation}>
              <Button data={"GET AN ADVICE"} size={true} />
            </div>
          )}
        </div>
        <div className={styles.arrow}>
          {arrowType === "Right" ? (
            <>
              {" "}
              <Image src={arrow} alt="arrow" width={50} height={20} />
            </>
          ) : (
            <>
              {" "}
              <Image src={arrowDown} alt="arrow" width={50} height={50} />
            </>
          )}
        </div>
        <div className={styles.howSquare}>
          <div className={styles.howSquareHeader}>Keep going</div>
          <div className={styles.howSqaureSubHeader}>
            Track your progress in real time and do not forget that consistency
            is key!
          </div>
          <div className={styles.progressBar}>
            <div className="mb-1 text-lg font-medium dark:text-white text-center">
              {progress ? "11 Days" : "10 Days"}
            </div>
            <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="h-6 bg-blue-600 rounded-full dark:bg-[#007bff] transition-all duration-500"
                style={progress ? { width: "75%" } : { width: "45%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
