import React from "react";
// import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
// import Button from "./Button/Button";
// import { useParams, useHistory } from "react-router-dom";
import FadeInSection from "./FadeInSection/FadeInSection";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  // const { values } = route.params;

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
              <h2 className={styles.neon}>WELCOME</h2>
              <h4>{JSON.stringify(location.state)}</h4>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
export default Profile;
