"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { SubmitButton } from "./submit-button";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Email is not valid";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const url = new URL(process.env.NEXT_PUBLIC_LOG_SHEET_URL);
      url.searchParams.set("type", "survey");
      url.searchParams.set("name", name);
      url.searchParams.set("email", email);

      await fetch(url.toString(), {
        method: "GET",
        mode: "no-cors",
      });

      onSubmit(); // tell parent "submitted"
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Survey submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.surveyForm} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? styles.errorInput : ""}
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>

      <SubmitButton loading={loading} />
    </form>
  );
}
