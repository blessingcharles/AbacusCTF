import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "./Button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FadeInSection from "./FadeInSection/FadeInSection";

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className={styles.screen}
      style={{
        backgroundSize: "fit",
        backgroundRepeat: 1,
        position: "relative",
      }}
    >
      <div className={styles.space}>
        <span className={styles.star1}></span>
        <span className={styles.star2}></span>
        <span className={styles.star3}></span>

        <div className={`${styles._404_wrapper} ${styles.bg}`}>
          <div className={`${styles._404}`}>
            <div className={`${styles._404_text_wrapper}`}>
              <FadeInSection>
                <div className={`${styles._404_text}`}>
                  <span className={`${styles.normalFlicker}`}>A</span>
                  <span className={`${styles.slowFlicker}`}>B</span>
                  <span className={`${styles.normalFlicker}`}>A</span>
                  <span className={`${styles.normalFlicker}`}>C</span>
                  <span className={`${styles.slowFlicker}`}>U</span>
                  <span className={`${styles.normalFlicker}`}>S</span>
                  <span className={`${styles.slowFlicker2}`}>'</span>
                  <span className={`${styles.slowFlicker}`}>C</span>
                  <span className={`${styles.normalFlicker}`}>O</span>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div
                  className={styles.appForm}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.1em",
                  }}
                ></div>
              </FadeInSection>

              <div className={`${styles._404_text_addi}`}>
                <p>H3LL0 3MPL0Y3E</p>
              </div>

              <div
                className={styles.styleButton}
                onClick={() => goToLogin()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.1em",
                }}
              >
                <Button title="GO TO Login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
