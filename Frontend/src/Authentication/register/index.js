import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from 'react';
import http from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false)
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [passwordConfirmText, setPasswordConfirmText] = useState("");
    const [emailColor, setEmailColor] = useState("gray");
    const [passwordColor, setPasswordColor] = useState("gray");
    const [passwordConfirmColor, setPasswordConfirmColor] = useState("gray");
    const [showPassword, setShowPassword] = useState(false)
    const notify = () => toast.success('Check your Email for Activation', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });
    const notifyerror = () => toast.error('The email Inputted is already registered or The Email and Password is too similar', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true
    });
    const notifyerrorpass = () => toast.error('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });
    const notifyerroremail = () => toast.error('Please Make sure that the email is correct', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true
    });
    const notifyerrorpassconfirm = () => toast.error('Please Make sure that the email and password is match', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true
    });

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    // const [id, setId] = useState()
    const regexEmail = data.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const regexPassword = data.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsDisabled(!isDisabled);
        setLoading(!loading);
        if (regexPassword) {
            http.post('auth/users/', data).then((response) => {
                notify()
                setData({
                    ...data,
                    first_name: '',
                    last_name: '',
                    birthdate: '',
                    username: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                })
                setIsDisabled(false);
                setLoading(false);
            }).catch(() => {
                notifyerror()
                setIsDisabled(false);
                setLoading(false);
            })
        } else if (data.confirm_password !== data.password) {
            notifyerrorpassconfirm();
            setIsDisabled(false);
            setLoading(false);
        } else if (!regexEmail) {
            notifyerroremail();
            setIsDisabled(false);
            setLoading(false);
        } else {
            notifyerrorpass();
            setIsDisabled(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (regexEmail) {
            setEmailColor("gray")
            setEmailText("")
        } else if (data.email.length === 0) {
            setEmailColor("gray")
            setEmailText("")
        } else {
            setEmailColor("failure");
            setEmailText("Please enter a valid email address.")
        }
    }, [data.email, regexEmail]);

    useEffect(() => {
        if (data.password.length > 0 && data.password.length <= 8) {
            setPasswordColor("failure")
            setPasswordText("Your Password is Weak")
        } else if (data.password.length >= 8 && data.password.length <= 15) {
            setPasswordColor("warning")
            setPasswordText("Your Password is Moderate")
        } else if (data.password.length >= 15) {
            setPasswordColor("success")
            setPasswordText("Your Password is Strong")
        } else {
            setPasswordColor("gray")
            setPasswordText("")
        }
    }, [data.password]);

    useEffect(() => {
        if (data.confirm_password === data.password) {
            setPasswordConfirmColor("gray")
            setPasswordConfirmText("")
        } else if (data.confirm_password.length === 0) {
            setPasswordConfirmColor("gray")
            setPasswordConfirmText("")
        } else {
            setPasswordConfirmColor("failure")
            setPasswordConfirmText("Password didn't match!")
        }
    }, [data.confirm_password, data.password]);


    return (
        <>

            <div className="flex flex-col h-screen justify-center items-center mt-14">
                <div className="w-full max-w-xl border border-black rounded-lg p-6" style={{ alignItems: 'center', marginBottom: '200px' }}>
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstname">Firstname</Label>
                                <TextInput id="firstname" type="text" required
                                    value={data.first_name}
                                    onChange={(event) => setData({ ...data, first_name: event.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="lastname">Lastname</Label>
                                <TextInput id="lastname" type="text" required value={data.last_name}
                                    onChange={(event) => setData({ ...data, last_name: event.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="birthday">Birthdate</Label>
                                <TextInput id="birthday" type="date" required value={data.birthdate}
                                    onChange={(event) => setData({ ...data, birthdate: event.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <TextInput id="username" type="text" required value={data.username}
                                    onChange={(event) => setData({ ...data, username: event.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <TextInput id="email" type="email" required
                                    color={emailColor}
                                    helperText={
                                        <>
                                            {emailText}
                                        </>
                                    }
                                    value={data.email}
                                    onChange={(event) => setData({ ...data, email: event.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <TextInput id="password" type={showPassword ? 'text' : 'password'} required
                                    color={passwordColor}
                                    helperText={
                                        <>
                                            {passwordText}
                                        </>
                                    }
                                    value={data.password}
                                    onChange={(text) => setData({ ...data, password: text.target.value })} />
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <TextInput id="confirmPassword" type={showPassword ? 'text' : 'password'} required
                                    color={passwordConfirmColor}
                                    helperText={
                                        <>
                                            {passwordConfirmText}
                                        </>
                                    }
                                    value={data.confirm_password}
                                    onChange={(text) => setData({ ...data, confirm_password: text.target.value })} />
                            </div>
                            <div className="ml-2 mt-6" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Button>Hide Password</Button> : <Button>Show Password</Button>}
                            </div>
                        </div>
                        <div style={{ marginTop: '20px' }} >
                            <Button type="submit" disabled={isDisabled} isProcessing={loading} gradientDuoTone="cyanToBlue" className="w-full border border-gray rounded px-2 py-1">Register</Button>
                        </div>
                    </form>
                    <ToastContainer
                    />
                    <p className="text-center" style={{ marginTop: '10px' }}> Already have an account? <a href='/' className="text-blue-600 hover:underline">Click Here</a></p>
                </div>
            </div>

        </>
    );
}
