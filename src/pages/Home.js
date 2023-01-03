import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import carosalImage from '../img/carousel-1.jpg';
import bannerLeftImage from '../img/banner-left.png';
import bannerRightImage from '../img/banner-right.png';
import gallery1Image from '../img/car-rent-1.png';
import gallery2Image from '../img/car-rent-2.png';
import gallery3Image from '../img/car-rent-3.png';
import gallery4Image from '../img/car-rent-4.png';
import gallery5Image from '../img/car-rent-5.png';
import gallery6Image from '../img/car-rent-6.png';
import axios from "axios";
import config from "../config";
import swal from "sweetalert";
import GoogleMapReact from 'google-map-react';
// import Geocode from "react-geocode";
function Home() {
    const googleMapRef = useRef(null);
    const [loadMap, setLoadMap] = useState(false);
    const [carDetails, setCarDetails] = useState([]);
    let googleMap = null;
    // Geocode.setApiKey("AIzaSyAb-OBuRNDXQ2yeR1Sg6pyw1t4Pik6OZHQ");
    // Geocode.setLanguage("en");
    // Geocode.setRegion("in");
    // Geocode.setLocationType("ROOFTOP");
    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = () => {
        localStorage.removeItem("user");
    }

    const loginField = {
        pickuplocation: "",
        droplocation: "",
    };

    const loginErr = {
        pickuplocationErr: "",
        droplocationErr: "",
    };
    const [searchCardata, setSearchCarData] = useState(loginField);
    const [error, setError] = useState(loginErr);
    const handleChange = (e) => {
        setSearchCarData({
            ...searchCardata,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();

    const validation = () => {
        let flag = true;
        let Err = {
            pickuplocationErr: "",
            droplocationErr: "",
        };
        if (searchCardata.pickuplocation == "") {
            Err.pickuplocationErr = "Pickup location is required.";
            flag = false;
        }

        if (searchCardata.droplocation == "") {
            Err.droplocationErr = "Drop location is required.";
            flag = false;
        }
        setError(Err);
        return flag;
    };
    // const renderMarkers = (map, maps) => {
    //     let marker = new maps.Marker({
    //     position: { lat: '22.251515', lng: '16.255555' },
    //     map,
    //     title: 'Hello World!'
    //     });
    //     return marker;
    //    };
    const Submit = () => {
        if (!validation()) {
            return;
        }
        const searchcarDetail = {
            lat: '22.251515',
            longs: '16.255555'
        };
        // Geocode.fromAddress(searchCardata.pickuplocation).then(
        //     (response) => {
        //       const { lat, lng } = response.results[0].geometry.location;
        //     },
        //     (error) => {
        //       console.error("error :",error);
        //     }
        //   );
        if (!user) {
            swal({
                title: "Error!",
                text: "Please login or register to find riders.",
                icon: "error",
            });
            return;
        }
        
        axios.post(config.BASE_URL + "rides/findrides", searchcarDetail).then((response) => {
            setCarDetails(response.data.data.data)
            googleMap = initGoogleMap();
            // var bounds = new window.google.maps.LatLngBounds();
            // response.data.data.data.map(x => {
            //     const marker = createMarker(x);
            //     bounds.extend(marker.position);
            // });
            // googleMap.fitBounds(bounds);
            //   if (!response.data.success) {
            //     swal({
            //       title: "Error!",
            //       text: response.data.message,
            //       icon: "error",
            //     });
            //   } else {
            //     swal({
            //       title: "Success!",
            //       text: response.data.message,
            //       icon: "success",
            //     }).then((isSuccess) => {
            //       if (isSuccess) {
            //         localStorage.setItem("user", JSON.stringify(response.data.data));
            //         navigate("/");
            //       }
            //     });
            //   }
        });
    };
    const loadGoogleMapScript = callback => {
        if (
            typeof window.google === 'object' &&
            typeof window.google.maps === 'object'
        ) {
            callback();
        } else {
            const GOOGLE_MAP_API_KEY = 'AIzaSyBAVqKsU6SaeQQcm3Pymfr7DG7ZbHl0Eb0';
            const googleMapScript = document.createElement('script');
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener('load', callback);
        }
    };
    // initialize the google map
    const initGoogleMap = () => {
        loadGoogleMapScript(() => {
            setLoadMap(true);
        });
        return new window.google.maps.Map(googleMapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }

    // create marker on google map
    const createMarker = (markerObj) => new window.google.maps.Marker({
        position: { lat: markerObj.lat, lng: markerObj.lng },
        map: googleMap,
        icon: {
            url: markerObj.icon,
            scaledSize: new window.google.maps.Size(50, 50)
        }
    });

    return (
        <>
            {/* Topbar Start  */}
            <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
                <div className="row">
                    <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
                        <div className="d-inline-flex align-items-center">
                            <a className="text-body pr-3" href=""><i className="fa fa-phone-alt mr-2"></i>+012 345 6789</a>
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
            {/* <!-- Topbar End --> */}

            {/* <!-- Navbar Start --> */}
            <div className="container-fluid position-relative nav-bar p-0">
                <div className="position-relative px-lg-5" style={{ zindex: "9" }}>
                    <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
                        <a href="" className="navbar-brand">
                            <h1 className="text-uppercase text-primary mb-1">Royal Cars</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
                            <div className="navbar-nav ml-auto py-0">
                            <Link to={`/`} className="nav-item nav-link active">Home</Link>
                                {!user ? (
                                    <Link to={`/login`} className=" nav-item nav-link">Login/Registration</Link>
                                ) : null}
                                {user ? (
                                    <li><Link to="/login" className="nav-item nav-link" style={{ color: "#E01E5A" }} onClick={handleLogout}>Logout</Link></li>
                                ) : null}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* <!-- Navbar End --> */}
            {/* <div style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAb-OBuRNDXQ2yeR1Sg6pyw1t4Pik6OZHQ' }}
                    defaultCenter={{ lat: '22.251515', lng: '16.255555' }}
                    defaultZoom={16}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                    >
                    </GoogleMapReact>
                </div> */}
            {/* <!-- Search Start --> */}
            <div className="container-fluid bg-white pt-3 px-lg-5">
                <div className="row mx-n2">
                    <div className="col-xl-2 col-lg-4 col-md-6 px-2">
                        <input type="text" className={
                            error.pickuplocationErr == ""
                                ? "form-control p-4"
                                : "form-control mb-0"
                        } placeholder="Pickup Location"
                            name="pickuplocation"
                            value={searchCardata.pickuplocation}
                            onChange={(e) => {
                                setError({
                                    ...error,
                                    pickuplocationErr: "",
                                });
                                handleChange(e);
                            }} />
                        <p
                            className={
                                error.pickuplocationErr ? "text-danger mb-3" : "visibility-block"
                            }
                        >
                            {error.pickuplocationErr}
                        </p>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 px-2">
                        <input type="text" className={
                            error.droplocationErr == ""
                                ? "form-control p-4"
                                : "form-control mb-0"
                        } placeholder="Drop Location"
                            name="droplocation"
                            value={searchCardata.droplocation}
                            onChange={(e) => {
                                setError({
                                    ...error,
                                    droplocationErr: "",
                                });
                                handleChange(e);
                            }} />
                        <p
                            className={
                                error.droplocationErr ? "text-danger mb-3" : "visibility-block"
                            }
                        >
                            {error.droplocationErr}
                        </p>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 px-2">
                        <button
                            type="button"
                            className="btn btn-primary btn-block mb-3"
                            onClick={Submit}
                            style={{ height: '50px' }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- Search End --> */}

            {/* <!-- Rent A Car Start --> */}
            <div className="container-fluid py-5">
                <div className="container pt-5 pb-3">
                    <h1 className="display-1 text-primary text-center">01</h1>
                    <h1 className="display-4 text-uppercase text-center mb-5">Find Your Car</h1>
                    <div className="row">
                        {carDetails.map((x, i) => {
                            return (
                                <div className="col-lg-4 col-md-6 mb-2">
                                    <div className="rent-item mb-4">
                                        <img className="img-fluid mb-4" src={'images/' + x.carImage} alt="" />
                                        <h4 className="text-uppercase mb-4">{x.carName}</h4>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* <!-- Rent A Car End --> */}

            {/* <!-- Banner Start --> */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row mx-0">
                        <div className="col-lg-6 px-0">
                            <div className="px-5 bg-secondary d-flex align-items-center justify-content-between" style={{ height: '350px' }}>
                                <img className="img-fluid flex-shrink-0 ml-n5 w-50 mr-4" src={bannerLeftImage} alt="" />
                                <div className="text-right">
                                    <h3 className="text-uppercase text-light mb-3">Want to be driver?</h3>
                                    <p className="mb-4">Lorem justo sit sit ipsum eos lorem kasd, kasd labore</p>
                                    <a className="btn btn-primary py-2 px-4" href="">Book Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 px-0">
                            <div className="px-5 bg-dark d-flex align-items-center justify-content-between" style={{ height: '350px' }}>
                                <div className="text-left">
                                    <h3 className="text-uppercase text-light mb-3">New User?</h3>
                                    <p className="mb-4">Lorem justo sit sit ipsum eos lorem kasd, kasd labore</p>
                                    <a className="btn btn-primary py-2 px-4" href="">Login/Register</a>
                                </div>
                                <img className="img-fluid flex-shrink-0 mr-n5 w-50 ml-4" src={bannerRightImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Banner End --> */}

        </>
    )
}

export default Home