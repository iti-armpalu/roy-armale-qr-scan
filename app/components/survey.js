"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { SubmitButton } from "./ui/submit-button";

export default function Survey() {
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = new URL(process.env.NEXT_PUBLIC_LOG_SHEET_URL);
    url.searchParams.set("type", "survey");
    url.searchParams.set("name", name);
    url.searchParams.set("email", email);

    try {
      await fetch(url.toString(), {
        method: "GET",
        mode: "no-cors",
      });
      setSubmitted(true);
      setName("");
      setEmail("");
    } catch (err) {
      console.error("❌ Survey submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Automatically reset submission state after 5 seconds
  // useEffect(() => {
  //   if (submitted) {
  //     const timer = setTimeout(() => {
  //       setSubmitted(false);
  //       setExpanded(false);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [submitted]);
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setExpanded(false); // collapse form

        setTimeout(() => {
          setSubmitted(false); // unmount "thank you"
        }, 600); // match your transition timing
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className={styles.surveySection}>
      <div className={styles.surveyWrapper}>
        <button
          className={styles.surveyToggle}
          onClick={() => setExpanded(!expanded)}
        >
          Register your interest to participate in a survey
          <div
            className={`${styles.iconSurvey} ${expanded ? styles.active : ""}`}
          >
            <div
              className={`${styles.iconShape} ${expanded ? styles.active : ""}`}
            ></div>
          </div>
        </button>

        <div
          className={`${styles.surveyFormWrap} ${
            expanded ? styles.expanded : styles.collapsed
          }`}
        >
          <div className={styles.surveyInner}>
            {submitted ? (
              <p className={`${styles.surveyThanks} ${styles.fadeIn}`}>
                🎉 Thank you for participating!
              </p>
            ) : (
              expanded && (
                <form className={styles.surveyForm} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <SubmitButton loading={loading} />
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
