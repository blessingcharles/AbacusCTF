import React from "react";
import styles from "./PageNotFound.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <>
    <div className={styles.space}>
              <span className={styles.star1}></span>
              <span className={styles.star2}></span>
              <span className={styles.star3}></span>

      <div className={`${styles._404_wrapper} ${styles.bg}`}>
        <div className={`${styles._404}`}>
          {/* Image */}
          {/* <div className={`${styles._404_img}`}>
            <img src={img404} alt="" width="250px" height="250px" />
          </div> */}
          {/* Text */}
          <div className={`${styles._404_text_wrapper}`}>
            <div className={`${styles._404_text}`}>
              <span className={`${styles.normalFlicker}`}>4</span>
              <span className={`${styles.slowFlicker}`}>0</span>
              <span className={`${styles.normalFlicker}`}>4!</span>
            </div>
            <div className={`${styles._404_text_addi}`}>
              <p>The page you requested could not be found.</p>
              <div
                onClick={redirect}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button title="Homepage" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default PageNotFound;
