"use client";

import Image from "next/image";
import Link from "next/link";
import Flip from "./flip";
import Connect from "./connect";
import styles from "../page.module.css";

export default function CardFront({ setFlipped, articles }) {
  return (
    <div className={`${styles.card} ${styles.front}`}>
      <div>
        <Flip onClick={() => setFlipped(true)}>Explore more resources</Flip>

        <Image
          src="/roy-armale.jpg"
          alt="Roy Armale"
          width={150}
          height={150}
          className={styles.profileImage}
          priority
        />

        <h1 className={styles.name}>Roy Armale</h1>
        <h6 className={styles.title}>
          Chief Product and Growth Officer at WPP Open
        </h6>
        <p className={styles.bio}>
          My personal mission is to help individuals and organizations
          understand and navigate the complex relationship between AI and human
          behavior. I worry that AI, as with all new general disruptive
          technologies, will create further inequality in the world and want to
          help every person become augmented.
        </p>

        <div className={styles.articles}>
          <h2>Featured Articles</h2>
          {articles.map((article, idx) => (
            <div key={idx} className={styles.articleItem}>
              <span>{article.title}</span>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.readButton}>Read</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Connect />
    </div>
  );
}
