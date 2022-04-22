import React, { useEffect } from "react";
// import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
// import Button from "./Button/Button";
// import { useParams, useHistory } from "react-router-dom";
import FadeInSection from "./FadeInSection/FadeInSection";
import { useLocation , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const location = useLocation();
  useEffect(()=>{
    toast.info("only admins can get abacus /secret")
  },[])
  localStorage.setItem("token" , location.state.token);
  localStorage.setItem("flag" , location.state.flag);
  return (
    <div
      className={styles.screen}
      style={{
        backgroundSize: "fit",
        backgroundRepeat: 1,
        position: "relative",
      }}
    >
      {location.state != null? 
      <FadeInSection> 
        <div className={styles.container}>
          <div className={styles.box} style={{ height: "auto", width: "auto" }}>
            <span></span>
            <div className={styles.content}>
              <h2 className={styles.neon}>Welcome Employee</h2>
              <h4>Email : {location.state.email}</h4>
              <p>
                The Employee site is under development . Please be patient but sys admins can get 
                more info .
                You are not an admin , missing my cookie : (
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>:
      <div>
        Haha , did you reverse play with the site nice ; )
      </div>
  }
    </div>
  );
}
export default Profile;
