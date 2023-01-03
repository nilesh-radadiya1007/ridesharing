import React, { useState } from 'react'
import gallery6Image from '../img/car-rent-6.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import config from "../config";
function Login() {
    const loginField = {
        email: "",
        password: "",
    };

    const loginErr = {
        emailErr: "",
        passwordErr: "",
    };
    const [logindata, setLoginData] = useState(loginField);
    const [error, setError] = useState(loginErr);
    const handleChange = (e) => {
        setLoginData({
            ...logindata,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();
    const validation = () => {
        let flag = true;
        let Err = {
            emailErr: "",
            passwordErr: "",
        };

        const validEmail = new RegExp(
            "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
        );

        if (!validEmail.test(logindata.email)) {
            Err.emailErr = "invalidEmail";
            flag = false;
        }
        if (logindata.email == "") {
            Err.emailErr = "email is required.";
            flag = false;
        }

        if (logindata.password == "") {
            Err.passwordErr = "password is required.";
            flag = false;
        }
        setError(Err);
        return flag;
    };
    const Submit = () => {
        if (!validation()) {
            return;
        }
        const loginDetail = {
            email: logindata.email,
            password: logindata.password,
        };
        axios.post(config.BASE_URL + "auth/login", loginDetail).then((response) => {
              if (!response.data.success) {
                swal({
                  title: "Error!",
                  text: response.data.message,
                  icon: "error",
                });
              } else {
                swal({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                }).then((isSuccess) => {
                  if (isSuccess) {
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                    navigate("/");
                  }
                });
              }
        });
    };
    return (
        <>
            <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                <div className="row">
                    <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center">
                            <a className="text-body pr-3" href="/"><i className="fa fa-phone-alt mr-2"></i>+012 345 6789</a>
                            <span className="text-body">|</span>
                            <a className="text-body px-3" href=""><i className="fa fa-envelope mr-2"></i>info@example.com</a>
                        </div>
                    </div>
                    <div className="col-md-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            <a className="text-body px-3" href="">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="text-body px-3" href="">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="text-body px-3" href="">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="text-body px-3" href="">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="text-body pl-3" href="">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row main-content bg-dark text-center">
                    <div className="col-md-4 text-center company__info">
                        <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
                        <h4 className="company_title"><img className="img-fluid mb-4" src={gallery6Image} alt="" /></h4>
                    </div>
                    <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                        <div className="container-fluid">
                            <div className="mt-2">
                                <h2>Log In</h2>
                            </div>
                            <form control="" className="form-group">
                                <div>

                                    <input type="text" className={
                                        error.emailErr == ""
                                            ? "border-0 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="test@gmail.com"
                                    name="email"
                                    value={logindata.email}
                                        onChange={(e) => {
                                            setError({
                                                ...error,
                                                emailErr: "",
                                            });
                                            handleChange(e);
                                        }} />
                                    <p
                                        className={
                                            error.emailErr ? "text-danger mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.emailErr}
                                    </p>
                                </div>
                                <div>
                                    <input type="password" className={
                                        error.passwordErr == ""
                                            ? "border-0 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="*********" name="password"
                                    value={logindata.password} onChange={(e) => {
                                        setError({
                                            ...error,
                                            passwordErr: "",
                                        });
                                        handleChange(e);
                                    }} />
                                    <p
                                        className={
                                            error.passwordErr ? "text-danger mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.passwordErr}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="loginbtn"
                                    onClick={Submit}
                                >
                                    Log In
                                </button>
                            </form>
                            <p>Don't have an account? <Link to="/registration">Register Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login