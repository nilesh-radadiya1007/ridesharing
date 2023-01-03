import React, { useState } from 'react'
import gallery6Image from '../img/car-rent-6.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import config from "../config";

function Registration() {
    const loginField = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
    };

    const loginErr = {
        firstNameErr: "",
        lastNameErr: "",
        emailErr: "",
        passwordErr: "",
        addressErr: "",
        cityErr: "",
        stateErr: "",
    };
    const [registerdata, setRegisterData] = useState(loginField);
    const [error, setError] = useState(loginErr);
    const handleChange = (e) => {
        setRegisterData({
            ...registerdata,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();
    const validation = () => {
        let flag = true;
        let Err = {
            firstNameErr: "",
            lastNameErr: "",
            emailErr: "",
            passwordErr: "",
            addressErr: "",
            cityErr: "",
            stateErr: "",
        };

        const validEmail = new RegExp(
            "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
        );
        if (registerdata.firstName == "") {
            Err.firstNameErr = "Firstname is required.";
            flag = false;
        }
        if (registerdata.lastName == "") {
            Err.lastNameErr = "Lastname is required.";
            flag = false;
        }

        if (!validEmail.test(registerdata.email)) {
            Err.emailErr = "invalidEmail";
            flag = false;
        }
        if (registerdata.email == "") {
            Err.emailErr = "email is required.";
            flag = false;
        }

        if (registerdata.password == "") {
            Err.passwordErr = "password is required.";
            flag = false;
        }

        if (registerdata.address == "") {
            Err.addressErr = "Address is required.";
            flag = false;
        }
        if (registerdata.city == "") {
            Err.cityErr = "City is required.";
            flag = false;
        }
        if (registerdata.state == "") {
            Err.stateErr = "State is required.";
            flag = false;
        }
        setError(Err);
        return flag;
    };
    const Submit = () => {
        if (!validation()) {
            return;
        }
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition(
            (position) => {
                const loginDetail = {
                    firstName: registerdata.firstName,
                    lastName: registerdata.lastName,
                    email: registerdata.email,
                    password: registerdata.password,
                    address: registerdata.address,
                    city: registerdata.city,
                    state: registerdata.state,
                    lat: position.coords.latitude,
                    long: position.coords.longitude,        
                };
                axios.post(config.BASE_URL + "auth/signup", loginDetail).then((response) => {
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
            }, 
            //if failure, this is called with error variable message printed
            (error) => {
                console.log( error.message );
            }
        );
        
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
                                <h2>Registration</h2>
                            </div>
                            <form control="" className="form-group">
                                <div>
                                    <input type="text" className={
                                        error.firstNameErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="First Name" name="firstName" value={registerdata.firstName} onChange={(e) => {
                                        setError({
                                            ...error,
                                            firstNameErr: "",
                                        });
                                        handleChange(e);
                                    }} />
                                    <p
                                        className={
                                            error.firstNameErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.firstNameErr}
                                    </p>
                                </div>
                                <div>
                                    <input type="text" className={
                                        error.lastNameErrErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="Last Name"  name="lastName" value={registerdata.lastNameErr} onChange={(e) => {
                                        setError({
                                            ...error,
                                            lastNameErr: "",
                                        });
                                        handleChange(e);
                                    }} />
                                    <p
                                        className={
                                            error.lastNameErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.lastNameErr}
                                    </p>
                                </div>
                                <div>
                                    <input type="text" className={
                                        error.emailErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="test@gmail.com" name="email" value={registerdata.email} onChange={(e) => {
                                        setError({
                                            ...error,
                                            emailErr: "",
                                        });
                                        handleChange(e);
                                    }} />
                                    <p
                                        className={
                                            error.emailErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.emailErr}
                                    </p>
                                </div>
                                <div>
                                    <input type="password" className={
                                        error.passwordErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="*********" name="password"
                                        value={registerdata.password} onChange={(e) => {
                                            setError({
                                                ...error,
                                                passwordErr: "",
                                            });
                                            handleChange(e);
                                        }} />
                                    <p
                                        className={
                                            error.passwordErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.passwordErr}
                                    </p>
                                </div>
                                <div>
                                    <textarea className={
                                        error.addressErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } name="address"  onChange={(e) => {
                                        setError({
                                            ...error,
                                            addressErr: "",
                                        });
                                        handleChange(e);
                                    }}/>{registerdata.address}
                                    <p
                                        className={
                                            error.addressErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.addressErr}
                                    </p>
                                </div>
                                <div>
                                    <input type="text" className={
                                        error.addressErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="City Name" name="city" value={registerdata.city} onChange={(e) => {
                                        setError({
                                            ...error,
                                            cityErr: "",
                                        });
                                        handleChange(e);
                                    }} />
                                    <p
                                        className={
                                            error.cityErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.cityErr}
                                    </p>
                                </div>
                                <div>
                                    <input type="text" className={
                                        error.addressErr == ""
                                            ? "border-1 form__input mb-4"
                                            : "form__input mb-0"
                                    } placeholder="State Name" name="state" value={registerdata.state} onChange={(e) => {
                                        setError({
                                            ...error,
                                            stateErr: "",
                                        });
                                        handleChange(e);
                                    }} />
                                    <p
                                        className={
                                            error.stateErr ? "text-danger text-justify mb-3" : "visibility-block"
                                        }
                                    >
                                        {error.stateErr}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="loginbtn"
                                    onClick={Submit}
                                >
                                    Registration
                                </button>
                            </form>
                            <p>Back to login? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Registration