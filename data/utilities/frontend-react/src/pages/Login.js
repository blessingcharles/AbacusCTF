import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "./Button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FadeInSection from "./FadeInSection/FadeInSection";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeSecret, setEmployeeSecret] = useState("");

  const navigate = useNavigate();
  const onSubmitSignIn = async () => {
    let values = {
      email,
      password,
      employeeSecret,
    };

    if (!email || !password || !employeeSecret) {
      toast.info("Seriously!?");
      return;
    }

    let url = "/api/login";

    try {
      const res = await axios.post(url, values);
      toast.success("Login Successful!");

      console.log(res.data);
      toast.success(JSON.stringify(res.data));
    } catch (err) {
      console.log("Login failed");
      toast.error("Invalid Credentials.Try again");
      navigate("/user/profile", { state: values });
    }
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
                >
                  <div className={styles.formCenter}>
                    <form className={styles.formFields}>
                      {/* onSubmit={() => onSubmitSignIn()}> */}
                      <div className={styles.formField}>
                        <label
                          className={styles.formFieldLabel}
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          className={styles.formFieldInputSI}
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setemail(e.currentTarget.value);
                          }}
                          required
                        />
                      </div>

                      <div className={styles.formField}>
                        <label
                          className={styles.formFieldLabel}
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className={styles.formFieldInputSI}
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.currentTarget.value);
                          }}
                          required
                        />
                      </div>
                      <div className={styles.formField}>
                        <label
                          className={styles.formFieldLabel}
                          htmlFor="password"
                        >
                          Employee Secret
                        </label>
                        <input
                          type="password"
                          id="employeeSecret"
                          className={styles.formFieldInputSI}
                          placeholder="Employee Secret"
                          name="employeeSecret"
                          value={employeeSecret}
                          onChange={(e) => {
                            setEmployeeSecret(e.currentTarget.value);
                          }}
                          required
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </FadeInSection>

              <div className={`${styles._404_text_addi}`}>
                <div
                  className={styles.styleButton}
                  onClick={() => onSubmitSignIn()}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.1em",
                  }}
                >
                  <Button title="LOGIN" />
                </div>
                <p>H3LL0 3MPL0Y3E</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
