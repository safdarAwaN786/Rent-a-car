import axios from 'axios';
import React, { useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword() {

    const [newPassowrd, setNewPassword] = useState(null);

    const [confirmPassword, setConfirmPassword] = useState(null);
    const { userId } = useParams();
    const [changingPassword, setChangingPassword] = useState(false);
    const [validationMessage, setValidationMessage] = useState(null);
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

    return (
        <>
            <ToastContainer />

            <div className='d-flex justify-content-center align-items-center flex-column'>

                <div className='d-flex justify-content-center align-items-center flex-column mx-auto border border-2 border-dark border-circle mt-5'>
                    <h3 className='text-center'>Change Password</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        if (validationMessage === 'Password is valid!') {

                            if (newPassowrd === confirmPassword) {
                                setChangingPassword(true);
                                console.log('equal')
                                axios.post(`/change-password/${userId}`, { newPassword: newPassowrd }).then((res) => {
                                    toast.success('Password Changed Successfully');
                                    setChangingPassword(false);
                                }).catch((err) => {
                                    setChangingPassword(false);
                                    toast.error('Error in Password Changing, Try Again!')
                                })
                            } else {
                                console.log('not equal')

                                toast.warning('Confirm Password not matched!')
                            }
                        } else {
                            toast.warning(validationMessage)
                        }
                    }}  >

                        <input onChange={(e) => {
                            setNewPassword(e.target.value);
                            CheckPassword(e.target.value);
                        }} className='border-circle p-1 m-2 w-100 border-1 border border-dark ' placeholder='New Password' required />
                        {validationMessage && (
                            <p className={`${validationMessage === 'Password is valid!' ? 'text-success' : 'text-danger'} `}>{validationMessage}</p>
                        )}
                        <input onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }} className='border-circle p-1 m-2 w-100 border-1 border border-dark ' placeholder='Confirm New Password' required />
                        <button className='btn btn-primary m-2' type='submit'>
                            {changingPassword ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Submit'
                            )}</button>
                    </form>
                </div>
            </div>

        </>
    )
}
