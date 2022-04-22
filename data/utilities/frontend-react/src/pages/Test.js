import React from "react";
// import { useEffect, useState } from "react";
import styles from "./Test.module.css";
// import Button from "./Button/Button";
// import { useParams, useHistory } from "react-router-dom";
import FadeInSection from "./FadeInSection/FadeInSection";

function Test() {
  return (
    <div
      className={styles.screen}
      style={{
        backgroundSize: "fit",
        backgroundRepeat: 1,
        position: "relative",
      }}
    >
      <FadeInSection>
        <div className={styles.container}>
          <div className={styles.box} style={{ height: "auto", width: "auto" }}>
            <span></span>
            <div className={styles.content}>
              <h2 className={styles.neon}>ROUNDS</h2>
              <h4>sdfgh</h4>
              <p>xcvbj</p>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
export default Test;
