"use client";

import styles from "./page.module.css";
import { useState } from "react";
import CardFront from "./components/card-front";
import CardBack from "./components/card-back";

export default function HomePage() {
  const [flipped, setFlipped] = useState(false);

  const articles = [
    {
      title: "The Rationale Behind the Empathy Gradient",
      url: "https://www.linkedin.com/pulse/rationale-behind-empathy-gradient-roy-armale-zse8e",
      isFeatured: true,
    },
    {
      title: "Why AI Will Probably Make You Less Productive",
      url: "https://www.linkedin.com/pulse/why-ai-probably-make-you-less-productive-first-roy-armale-zdmbe",
      isFeatured: false,
    },
  ];

  const videos = [
    {
      title: "CMO Summit: AI and The Future of Creativity",
      url: "https://www.youtube.com/watch?v=ZJTX6GgUPcw",
      isFeatured: false,
    }
  ];

  return (
    <main className={styles.container}>
      <div className={`${styles.cardWrapper} ${flipped ? styles.flipped : ""}`}>
        {/* FRONT SIDE */}
        <CardFront
          setFlipped={setFlipped}
          articles={articles.filter((a) => a.isFeatured)}
        />
        {/* BACK SIDE */}
        <CardBack setFlipped={setFlipped} articles={articles} videos={videos} />
      </div>
    </main>
  );
}
