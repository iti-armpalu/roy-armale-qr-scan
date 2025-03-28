"use client";

import Link from "next/link";
import Flip from "./flip";
import Connect from "./connect";
import styles from "../page.module.css";

export default function CardBack({ setFlipped, articles, videos }) {
  return (
    <div className={`${styles.card} ${styles.back}`}>
      <div>
        <Flip onClick={() => setFlipped(false)}>Back to profile</Flip>

        <div className={styles.articles}>
          <h2>More Articles</h2>
          {articles.map((article, idx) => (
            <div key={idx} className={styles.articleItem}>
              <span>{article.title}</span>
              <Link href={article.url} target="_blank">
                <button className={styles.readButton}>Read</button>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.articles}>
          <h2>Videos</h2>
          {videos.map((video, idx) => (
            <div key={idx} className={styles.articleItem}>
              <span>{video.title}</span>
              <Link href={video.url} target="_blank">
                <button className={styles.readButton}>Watch</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Connect />
    </div>
  );
}
