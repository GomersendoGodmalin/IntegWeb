import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import http from '../../axios';
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'; // For secure token storage


export default function Login() {
    const [isDelayed, setIsDelayed] = useState(false);
    const navigate = useNavigate();
    const tokens = Cookies.get('auth_token');
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    // const [token, setToken] = useState()

    useEffect(() => {
        if (tokens) {
            navigate("/content/profile");
        }
    }, [tokens, navigate])

    const notifyerror = () => toast.error('Login Failed!! Incorrect email or password or Make sure that the email is activated', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });
    const notifysuccess = () => toast.success('Login Successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true
    });

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        setIsDisabled(!isDisabled);
        setLoading(!loading);
        http.post('auth/token/login', data).then(response => {
            if (response.status === 200) {
                notifysuccess();
                setIsDelayed(true);
                setTimeout(() => {
                    Cookies.set('auth_token', response.data.auth_token, { expires: 1, secure: true }); // Set appropriate expiration and secure flag
                    navigate('/content/profile')
                }, 1000); // Delay of 3 seconds (adjust as needed)
            }
            setData({ ...data, username: '', password: '' })
            setIsDisabled(false);
            setLoading(false);
        }).catch(() => {
            notifyerror()
            setIsDisabled(false);
            setLoading(false);
        })
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div className="flex flex-col h-screen justify-center items-center">
                    <div className="w-full max-w-md border border-black rounded-lg p-6" style={{ alignItems: 'center', marginBottom: '200px' }}>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="flex flex-col gap-4">
                                <p className="text-2xl font-bold mb-4 text-center">Login</p>
                                <label htmlFor="email">Email Address</label>
                                <input id="email" type="email" className="w-full border border-gray rounded px-2 py-1"
                                    value={data.email}
                                    onChange={(text) => setData({ ...data, email: text.target.value })} />
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" className="w-full border border-gray rounded px-2 py-1"
                                    value={data.password}
                                    onChange={(text) => setData({ ...data, password: text.target.value })} />
                            </div>

                            <div style={{ marginTop: '20px' }} >
                                <Button type="submit" disabled={isDisabled} isProcessing={loading} gradientDuoTone="cyanToBlue" className="w-full border border-gray rounded px-2 py-1">Login</Button>
                            </div>

                        </form>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '-0.01em', textAlign: 'center', marginTop: '10px' }}> <a href='/forgotpassword' className="text-grey-600 hover:underline">Forgot your password?</a></p>

                            <p style={{ marginTop: '10px' }}> Don't have an account? <a href='/register' className="text-blue-600 hover:underline"> Register</a></p>
                           
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
