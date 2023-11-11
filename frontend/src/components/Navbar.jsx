import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import logo from '../assets/img/home2/icon/bottom_logo.png'
import blackLogo from '../assets/img/black-logo.png'
import { VscAccount } from 'react-icons/vsc'
import Cookies from 'js-cookie'
import axios from 'axios';
import { AiOutlineCloseSquare, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { SlMenu } from 'react-icons/sl';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { logInUser, logOutUser } from '../redux/slices/authSlice'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'

export default function Navbar() {
    const [validationMessage, setValidationMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const loginButtonRef = useRef(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const signUpCloseButtonRef = useRef(null);
    const loginCloseButtonRef = useRef(null);
    const [openPricing, setOpenPricing] = useState(false);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    function CheckPassword(submittedPassword) {
        if (submittedPassword?.length < 8) {
            setValidationMessage('Password must be at least 8 characters long.');
            return;
        }

        if (
            !/[a-z]/.test(submittedPassword) ||
            !/[A-Z]/.test(submittedPassword) ||
            !/[0-9]/.test(submittedPassword)
        ) {
            setValidationMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        // Password is valid
        setValidationMessage('Password is valid!');
    }


    const [showLoginPassword, setShowLoginPassword] = useState(false);


    const [userDataToSend, setUserDataToSend] = useState(null);

    // Check if the user is logged in
    useEffect(() => {
        const userToken = Cookies.get('userToken');


        if (userToken) {
            console.log(userToken);
            // Make a request to the backend to verify the user token and get user information
            axios.get('/verify-user', { headers: { Authorization: `Bearer ${userToken}` } })
                .then(response => {
                    dispatch(logInUser({
                        loggedIn: true,
                        user: response.data
                    }))

                    if (response.data.IsAdmin) {
                        navigate('/admin-vehicles')
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);
    // Check if the user is logged in
    useEffect(() => {
        const userToken = Cookies.get('userToken');


        if (userToken) {
            console.log(userToken);
            // Make a request to the backend to verify the user token and get user information
            axios.get('/verify-user', { headers: { Authorization: `Bearer ${userToken}` } })
                .then(response => {
                    dispatch(logInUser({
                        loggedIn: true,
                        user: response.data
                    }))

                    if (response.data.IsAdmin) {
                        navigate('/admin-vehicles')
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [loggedIn]);


    const [forgotPassword, setForgotPassword] = useState(false);
    const [sendingMail, setSendingMail] = useState(false);

    const [signingUp, setSigningUp] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);


    // User sign up function
    const handleSignup = () => {
        setSigningUp(true);
        // Perform signup API request
        axios.post('/signup', userDataToSend)
            .then(response => {
                setSigningUp(false);
                console.log(response);
                const { token } = response.data;
                Cookies.set('userToken', token); // Set the user token in the cookie
                dispatch(logInUser({
                    loggedIn: true,
                    user: userDataToSend
                }))

                toast.success("Signed Up Successfully!");
                if (signUpCloseButtonRef.current) {
                    signUpCloseButtonRef.current.click();
                }


            })
            .catch(error => {
                setSigningUp(false);
                setValidationMessage(null);
                console.log(error);
                if (error.response.status === 400) {
                    toast.error(error.response.data.message);

                } else {
                    toast.error('Server Error , Try Again !');

                }

            });
    };



    // User login function
    const handleLogin = () => {
        setLoggingIn(true);
        // Perform login API request
        axios.post('/login', userDataToSend)
            .then(response => {

                setLoggingIn(false);
                const { token } = response.data;
                Cookies.set('userToken', token); // Set the user token in the cookie
                // console.log(Cookies);

                dispatch(logInUser({
                    loggedIn: true,
                    user: userDataToSend
                }))
                toast.success("Logged In Successfully!");
                if (loginCloseButtonRef.current) {
                    loginCloseButtonRef.current.click();
                }

            })
            .catch(error => {
                setLoggingIn(false);
                if (error?.response?.status === 400) {
                    toast.error(error.response.data.message);

                } else {
                    toast.error('Server Error , Try Again !');

                }
                console.error('Error logging in:', error)
            });
    };

    const [openContent, setOpenContent] = useState(false);
    // User logout function
    const handleLogout = () => {
        Cookies.remove('userToken');
        dispatch(logOutUser())
        toast.success("Logged Out Successfully!");
        navigate('/');

    };
    const [emailForgetten, setEmailForgotten] = useState(null);

    const updateUserData = (e) => {
        setUserDataToSend({ ...userDataToSend, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user);
        if (user?.IsAdmin) {
            navigate('/admin-vehicles');
        }
    }, [user])


    return (
        <>
            <ToastContainer />
            <div class="modal signUp-modal fade" id="signUpModal01" tabindex="-1" aria-labelledby="signUpModal01Label"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="signUpModal01Label">Sign Up</h4>
                            <p>Already have an account? <button type="button" data-bs-toggle="modal"
                                data-bs-target="#logInModal01">Log In</button></p>
                            <button onClick={() => {
                                setUserDataToSend(null);
                                setValidationMessage(null);
                                setConfirmPassword(null);
                                setSigningUp(false);
                            }} ref={signUpCloseButtonRef} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i
                                class="bi bi-x"></i></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                e.target.reset();
                                if (userDataToSend.password === confirmPassword) {

                                    if (validationMessage === 'Password is valid!') {

                                        handleSignup();
                                    } else {
                                        toast.warning(validationMessage)
                                    }
                                } else {
                                    toast.warning('Password not matched !')
                                }
                            }}>
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="form-inner">
                                            <label>First Name*</label>
                                            <input value={userDataToSend?.firstName} onChange={(e) => {
                                                updateUserData(e);
                                            }} name='firstName' type="text" placeholder="Daniel" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner">
                                            <label>Last Name*</label>
                                            <input value={userDataToSend?.lastName} onChange={(e) => {
                                                updateUserData(e);
                                            }} name='lastName' type="text" placeholder="Last name" required />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner">
                                            <label>Enter your email address*</label>
                                            <input value={userDataToSend?.email} onChange={(e) => {
                                                updateUserData(e);
                                            }} type="email" placeholder="Type email" name='email' required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner">
                                            <label>Password*</label>
                                            <div className='d-felx flex-row justify-content-between passwordBox'>

                                                <input value={userDataToSend?.password} onChange={(e) => {
                                                    updateUserData(e);
                                                    CheckPassword(e.target.value);
                                                }} name='password' id="password" type={`${showPassword ? 'text' : 'password'}`} placeholder="*** ***" />



                                                {showPassword ? (
                                                    <AiOutlineEyeInvisible onClick={() => {
                                                        setShowPassword(false);
                                                    }} className='fs-5 text-dark' />
                                                ) : (

                                                    <AiOutlineEye onClick={() => {
                                                        setShowPassword(true);
                                                    }} className='fs-5 text-dark' />
                                                )}
                                            </div>
                                            {validationMessage && (
                                                <p className={`${validationMessage === 'Password is valid!' ? 'text-success' : 'text-danger'} `}>{validationMessage}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner">
                                            <label>Confirm Password*</label>
                                            <div className='d-felx flex-row justify-content-between passwordBox'>

                                                <input value={confirmPassword} onChange={(e) => {
                                                    setConfirmPassword(e.target.value)
                                                }} id="password2" type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder="*** ***" />


                                                {showConfirmPassword ? (


                                                    <AiOutlineEyeInvisible onClick={() => {
                                                        setShowConfirmPassword(false);
                                                    }} className='fs-5 text-dark' />

                                                ) : (

                                                    <AiOutlineEye onClick={() => {
                                                        setShowConfirmPassword(true);
                                                    }} className='fs-5 text-dark' />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner mt-3">
                                            <button class="primary-btn2" type="submit">
                                                {signingUp ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (

                                                    'Sign Up Now'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="terms-conditon">
                                    <p>By sign up,you agree to the <a className='cursor-pointer' onClick={() => {
                                        if (loginCloseButtonRef.current) {
                                            loginCloseButtonRef.current.click();
                                        }
                                        if (signUpCloseButtonRef.current) {
                                            signUpCloseButtonRef.current.click();
                                        }
                                        navigate('/terms-and-conditions');
                                    }}>‘terms & conditons’</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal signUp-modal fade" id="logInModal01" tabindex="-1" aria-labelledby="logInModal01Label"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="logInModal01Label">Log In</h4>
                            <p>Don’t have any account? <button type="button" data-bs-toggle="modal"
                                data-bs-target="#signUpModal01">Sign Up</button></p>
                            <button onClick={() => {
                                setUserDataToSend(null);
                                setLoggingIn(false);


                            }} ref={loginCloseButtonRef} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i
                                class="bi bi-x"></i></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}>
                                <div class="row g-4">
                                    <div class="col-md-12">
                                        <div class="form-inner">
                                            <label>Enter your email address*</label>
                                            <input name='email' onChange={(e) => {
                                                updateUserData(e);
                                            }} type="email" placeholder="Type email" required />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner">
                                            <label>Password*</label>
                                            <div className='d-felx flex-row justify-content-between passwordBox'>




                                                {
                                                    showLoginPassword ? (
                                                        <input
                                                            onChange={(e) => {
                                                                updateUserData(e);
                                                                console.log(userDataToSend)
                                                            }}
                                                            value={userDataToSend?.password}
                                                            name='password'
                                                            id="password3"
                                                            type='text'
                                                            placeholder="*** ***"
                                                            required
                                                        />
                                                    ) : (
                                                        <input
                                                            onChange={(e) => {
                                                                updateUserData(e);

                                                            }}
                                                            value={userDataToSend?.password}
                                                            name='password'
                                                            id="password3"
                                                            type='password'
                                                            placeholder="*** ***"
                                                            required
                                                        />
                                                    )
                                                }


                                                {showLoginPassword ? (


                                                    <AiOutlineEyeInvisible onClick={() => {
                                                        setShowLoginPassword(false);
                                                    }} className='fs-5 text-dark' />

                                                ) : (

                                                    <AiOutlineEye onClick={() => {
                                                        setShowLoginPassword(true);
                                                    }} className='fs-5 text-dark' />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-agreement form-inner d-flex justify-content-between flex-wrap">
                                            <div>

                                            </div>
                                            <a onClick={() => {
                                                if (loginCloseButtonRef.current) {
                                                    loginCloseButtonRef.current.click();
                                                }
                                                setForgotPassword(true)
                                            }} class="forgot-pass cursor-pointer">Forget Password?</a>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner">
                                            <button class="primary-btn2" type="submit">

                                                {loggingIn ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    'Log In'
                                                )}

                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="terms-conditon">
                                    <p>By sign up,you agree to the <a className='cursor-pointer' onClick={() => {
                                        if (loginCloseButtonRef.current) {
                                            loginCloseButtonRef.current.click();
                                        }
                                        if (signUpCloseButtonRef.current) {
                                            signUpCloseButtonRef.current.click();
                                        }
                                        navigate('/terms-and-conditions');
                                    }}>‘terms & conditons’</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {forgotPassword && (
                <div className='addProductBox justify-content-center pt-5  '>
                    <div className='formBox border-circle  mt-5 pt-4 '>
                        <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                            <div className='d-flex justify-content-end'>
                                <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                    setForgotPassword(false)
                                }} />
                            </div>
                            <h1 className='text-center fs-4'>Password Reset Mail</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                setSendingMail(true);
                                

                                axios.post('/forgot-password', {email : emailForgetten}).then((res) => {
                                    setSendingMail(false);
                                    toast.success('Password Reset Email Sended Successfully!');
                                    setForgotPassword(false);
                                }).catch((err) => {
                                    console.log(err);
                                    if(err.response.status === 400){
                                        toast.error(err.response.data.message)
                                    } else {

                                    toast.error('Error in sending Email, Try Again !');
                                    }
                                    setSendingMail(false);
                                })
                            }}>
                            <div className='d-flex flex-column'>

                                <label className='mt-1'>Your Email :</label>
                                <input onChange={(e)=>{
                                    setEmailForgotten(e.target.value);
                                }} name='email' type='email' className='p-1 border border-secondary border-circle mb-1' required />
                                <div className='d-flex justify-content-center my-4'>
                                    <button style={{
                                        zIndex: '00'
                                    }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                        {sendingMail ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (

                                            'SEND EMAIL'
                                        )}

                                    </button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            )}


            <div class="topbar-header">
                <div class="top-bar style-2 d-flex justify-content-between">
                    <div class="company-logo">
                        <a className='cursor-pointer' onClick={() => {
                            navigate('/')
                        }} ><img src={logo} alt /></a>
                    </div>
                    <div class="top-bar-items">
                        <ul class="menu-list">

                            {user?.IsAdmin ? (
                                null
                            ) : (
                                <>
                                    <li onClick={() => {
                                        navigate('/')
                                    }} className='cursor-pointer'>
                                        <a className='text-decoration-none cursor-pointer' >Home</a>

                                    </li>
                                    <li onClick={() => {
                                        navigate('/reservations')
                                    }}>
                                        <a class="text-decoration-none cursor-pointer">Reservations</a>

                                    </li>
                                    <li>
                                        <a onClick={() => {
                                            navigate('/vehicle-guide')
                                        }} class="text-decoration-none cursor-pointer">Vehicle Guide</a>

                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none cursor-pointer">Price</a>

                                    </li>
                                    <li>
                                        <a onClick={() => {
                                            navigate('/terms-and-conditions')
                                        }} class="text-decoration-none cursor-pointer">Terms & Conditions</a>

                                    </li>

                                    <li>
                                        <a onClick={() => {
                                            navigate('/contact')
                                        }} class="text-decoration-none cursor-pointer">CONTACT US</a>
                                    </li>



                                </>

                            )}




                        </ul>

                    </div>
                    <div className='d-flex flex-row gap-2'>

                        <div>


                            {loggedIn ? (
                                <button onClick={() => {
                                    handleLogout();
                                }} type="button" class="primary-btn6 p-sm-2 p-1 " >
                                    <VscAccount className='fs-6' />
                                    LOG OUT
                                </button>
                            ) : (

                                <button ref={loginButtonRef} type="button" class="primary-btn6 p-sm-2 p-1 " data-bs-toggle="modal" data-bs-target="#signUpModal01">
                                    <VscAccount className='fs-6' />
                                    LOGIN / SIGN UP
                                </button>
                            )}
                            <div class="sidebar-button mobile-menu-btn ">
                                <span></span>
                            </div>


                        </div>
                        <div className='nav-sidebar'>
                            <Button variant="dark" className='text-white' onClick={handleShow}>
                                <SlMenu />
                            </Button>

                            <Offcanvas show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title><img src={blackLogo} /></Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <ul class="menu-list list-unstyled p-2">

                                        {user?.IsAdmin ? (
                                            <>
                                                <li onClick={() => {
                                                    navigate('/admin-vehicles');
                                                    handleClose();
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a className='text-decoration-none cursor-pointer text-dark fs-5' >Groups</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/admin-extras');
                                                    handleClose();
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Extras</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/admin-pricing');
                                                    handleClose();
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">VAT & Codes</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/admin-bookings');
                                                    handleClose();
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Bookings</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/admin-seasons');
                                                    handleClose();
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Seasons</a>

                                                </li>
                                                <li onClick={() => {
                                                    setOpenPricing(!openPricing);
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li d-flex justify-content-between'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Groups Pricing</a>
                                                    {openPricing ? (
                                                        <IoIosArrowDropup className={`fs-4 dropResponsive text-dark `} />

                                                    ) : (

                                                        <IoIosArrowDropdown className={`fs-4 dropResponsive text-dark `} />
                                                    )}
                                                </li>
                                                {openPricing && (
                                                    <div data-aos="fade-down" className='border-start border-dark ms-3 px-2 border-3' >


                                                        <li onClick={() => {
                                                            navigate('/winter-pricing')
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                                Winter Pricing
                                                            </a>
                                                        </li>
                                                        <li onClick={() => {
                                                            navigate('/summer-pricing')
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                                Summer Pricing
                                                            </a>
                                                        </li>
                                                        <li onClick={() => {
                                                            navigate('/summerHigh-pricing')
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                                Summer High Pricing
                                                            </a>
                                                        </li>
                                                    </div>
                                                )}

                                                <li onClick={() => {
                                                    setOpenContent(!openContent);
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li d-flex justify-content-between'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Web content</a>
                                                    {openContent ? (
                                                        <IoIosArrowDropup className={`fs-4 dropResponsive text-dark `} />

                                                    ) : (

                                                        <IoIosArrowDropdown className={`fs-4 dropResponsive text-dark `} />
                                                    )}
                                                </li>

                                                {openContent && (
                                                    <div data-aos="fade-down" className='border-start border-dark ms-3 px-2 border-3' >


                                                        <li onClick={() => {
                                                            navigate('/landingPage-content');
                                                            handleClose();
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                                Landing Page
                                                            </a>
                                                        </li>
                                                        <li onClick={() => {
                                                            navigate('/reservations-content');
                                                            handleClose();
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                                Reservations
                                                            </a>
                                                        </li>
                                                        <li onClick={() => {
                                                            navigate('/terms&conditions-content');
                                                            handleClose();
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                            Terms & Conditions
                                                            </a>
                                                        </li>
                                                        <li onClick={() => {
                                                            navigate('/contactus-content');
                                                            handleClose();
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                            Contact Us
                                                            </a>
                                                        </li>
                                                        <li onClick={() => {
                                                            navigate('/privacy&cookies-content');
                                                            handleClose();
                                                        }} style={{
                                                            transition: 'background-color 0.5s ease'
                                                        }} className='cursor-pointer p-1 border-circle sidebar-li my-1'>
                                                            <a className='text-dark text-dark text-decoration-none'>
                                                            Privacy & Cookies Policy
                                                            </a>
                                                        </li>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>


                                                <li onClick={() => {
                                                    navigate('/')
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a className='text-decoration-none cursor-pointer text-dark fs-5' >Home</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/reservations')
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li'>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Reservations</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/vehicle-guide')
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li '>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Vehicle Guide</a>

                                                </li>
                                                <li style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer p-1 border-circle sidebar-li '>
                                                    <a href="#" class="text-decoration-none cursor-pointer text-dark fs-5">Price</a>

                                                </li>
                                                <li onClick={() => {
                                                    navigate('/terms-and-conditions')
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer  p-1 border-circle sidebar-li '>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">Terms & Conditions</a>

                                                </li>

                                                <li onClick={() => {
                                                    navigate('/contact')
                                                }} style={{
                                                    transition: 'background-color 0.5s ease'
                                                }} className='cursor-pointer  p-1 border-circle sidebar-li '>
                                                    <a class="text-decoration-none cursor-pointer text-dark fs-5">CONTACT US</a>
                                                </li>
                                            </>
                                        )}
                                        {/* {user?.IsAdmin && (

                                        <li className='cursor-pointer p-1 border-circle sidebar-li '>
                                            <a onClick={() => {
                                                navigate('/admin')
                                            }} class="text-decoration-none cursor-pointer text-dark fs-5">ADMIN</a>
                                        </li>
                                    )} */}

                                    </ul>

                                </Offcanvas.Body>
                            </Offcanvas>

                        </div>
                    </div>


                </div>



            </div>
        </>
    )
}
