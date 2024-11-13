"use client";
import React, { FC, useState } from "react";
import styles from "@/styles/plansonplanspage.module.css";
import { changePlan } from "@/actions/actions";
import Modal from "./Modal";
interface PlansOnPlansPageProps {
  currentPlan: boolean | undefined;
}
const PlansOnPlansPage: FC<PlansOnPlansPageProps> = ({ currentPlan }) => {
  const [animation, setAnimation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function handleChangePlan() {
    changePlan();
    setAnimation(true);
    setShowModal(true);
  }

  return (
    <div className={styles.squaresContainer}>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message="Plan was successfully changed"
      />
      <div className={styles.planSquare}>
        <div className={styles.planName}>Beginner</div>
        <div className={styles.planPrice}>Free</div>
        <div className={styles.inPlan}>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>1 tip per day
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Progress tracker
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Special challenges
          </div>
          <div className={styles.notInPlan}>
            {" "}
            <span className={styles.check}>&#10005;</span>Full access to the
            archive of past tips
          </div>
          <div className={styles.notInPlan}>
            {" "}
            <span className={styles.check}>&#10005;</span>Monthly progress
            reports with personalized insights
          </div>
          <div className={styles.notInPlan}>
            {" "}
            <span className={styles.check}>&#10005;</span>Priority support for
            all inquiries
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles.disabledBtn}>
            YOU ALREADY HAVE THIS PLAN
          </button>
        </div>
        <div className={styles.planSubText}>Absolutely free!</div>
      </div>

      <div
        className={
          currentPlan === true || animation === true
            ? styles.planSquare
            : styles.premiumPlanSquare
        }
      >
        <div className={styles.planName}>Enlightened</div>
        <div className={styles.planPrice}>
          <s className={styles.deletedPrice}>$25</s> FREE
        </div>
        <div className={styles.inPlan}>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>2 personalized tips
            per day
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Progress tracker
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Special challenges
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Full access to the
            archive of past tips
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Monthly progress
            reports with personalized insights
          </div>
          <div className={styles.isInPlan}>
            {" "}
            <span className={styles.check}>&#10003;</span>Priority support for
            all inquiries
          </div>
        </div>
        <div className={styles.btn}>
          <button
            onClick={() => handleChangePlan()}
            disabled={currentPlan === true ? true : false}
            className={
              currentPlan === true || animation === true
                ? styles.disabledBtn
                : styles.btnItself
            }
          >
            {currentPlan === true || animation === true
              ? "YOU ALREADY HAVE THIS PLAN"
              : "GET FOR FREE  "}
          </button>
        </div>
        <div className={styles.planSubText}>
          Pay once and get the plan for life!
        </div>
      </div>
    </div>
  );
};

export default PlansOnPlansPage;
