"use client";
import { useState } from "react";
import styles from "@/styles/faq.module.css"; // Используйте ваш путь к CSS

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How does the website work?",
      answer: `We provide daily advice to help improve your mental or physical health.`,
    },
    {
      question: "What type of advice can I expect?",
      answer: "Practical tips and exercises for your well-being.",
    },
    {
      question: "Is there a subscription fee?",
      answer: "Yes, we offer basic and premium subscription plans.",
    },
    {
      question: "Can I switch my subscription plan?",
      answer: "Yes, you can change your plan anytime.",
    },
    {
      question: "How do I contact support?",
      answer: "Reach us via email or the contact form.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize your data security.",
    },
    {
      question: "Can I access the advice on mobile devices?",
      answer:
        "Yes, our website is fully responsive and can be accessed on any device, including smartphones and tablets.",
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqText}>Frequently Asked Questions</div>
      <div className={styles.faqItself}>
        {faqData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.question} onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={styles.icon}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={`${styles.answer} ${
                activeIndex === index ? styles.answerVisible : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
