import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { toast } from "react-toastify";

import axios from "axios";

function Login() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeSecret, setEmployeeSecret] = useState("");

    const navigate = useNavigate();
    const onSubmitSignIn = async () => {
        var values = {
            email,
            password,
            employeeSecret,
        };

        if (!email || !password || !employeeSecret) {
            toast.info("Seriously!?");
            return;
        }
        let url = "http://localhost:5000/api/login";

        try {
            const res = await axios.post(url, values);
            navigate("/user/profile");

            console.log(res.data);
        } catch (err) {
            console.log("failed");
            toast.error("Invalid Credentials");
        }
    };

    return (
        <div className={style.App}>
            <div className={style.appForm}>
                <div className={style.formCenter}>
                    <form className={style.formFields}>
                        {/* onSubmit={() => onSubmitSignIn()}> */}
                        <div className={style.formField}>
                            <label
                                className={style.formFieldLabel}
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                className={style.formFieldInputSI}
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setemail(e.currentTarget.value);
                                }}
                                required
                            />
                        </div>

                        <div className={style.formField}>
                            <label
                                className={style.formFieldLabel}
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={style.formFieldInputSI}
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value);
                                }}
                                required
                            />
                        </div>
                        <div className={style.formField}>
                            <label
                                className={style.formFieldLabel}
                                htmlFor="password"
                            >
                                Employee Secret
                            </label>
                            <input
                                type="password"
                                id="employeeSecret"
                                className={style.formFieldInputSI}
                                placeholder="Employee Secret"
                                name="employeeSecret"
                                value={employeeSecret}
                                onChange={(e) => {
                                    setEmployeeSecret(e.currentTarget.value);
                                }}
                                required
                            />
                        </div>

                        <div className={style.formField}>
                            <div
                                className={style.styleButton}
                                onClick={() => onSubmitSignIn()}
                                style={{
                                    fontSize: "1em",
                                    width: "200px",
                                    height: "100px",
                                    backgroundColor: "red",
                                }}
                            >
                                {/* <GlassButton title="Hack" /> */}
                                Hack
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;
