import styles from "@/styles/plans.module.css";
import Button from "@/sharedUI/Button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
const Plans = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.plansText}>
          <div className={styles.miniHeader}>Pricing</div>
          <div className={styles.header}>
            Choose the perfect plan to unlock your daily journey towards
            improvement.
          </div>
        </div>
        <div className={styles.squaresContainer}>
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
                <span className={styles.check}>&#10005;</span>Priority support
                for all inquiries
              </div>
            </div>
            <div className={styles.btn}>
              <LoginLink>
                <Button size={true} data={"START RIGHT NOW"} />
              </LoginLink>
            </div>
            <div className={styles.planSubText}>Absolutely free!</div>
          </div>

          <div className={styles.premiumPlanSquare}>
            <div className={styles.planName}>Enlightened</div>
            <div className={styles.planPrice}>
              <s className={styles.deletedPrice}>$25</s> $15
            </div>
            <div className={styles.inPlan}>
              <div className={styles.isInPlan}>
                {" "}
                <span className={styles.check}>&#10003;</span>2 personalized
                tips per day
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
                <span className={styles.check}>&#10003;</span>Priority support
                for all inquiries
              </div>
            </div>
            <div className={styles.btn}>
              <LoginLink>
                <Button size={true} data={"START RIGHT NOW"} />
              </LoginLink>
            </div>
            <div className={styles.planSubText}>
              Pay once and get the plan for life!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
