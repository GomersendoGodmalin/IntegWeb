import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react';
import Cookies from 'js-cookie'; // For secure token storage
import { useNavigate } from 'react-router-dom'
import http from '../../axios';
import { ToastContainer } from 'react-toastify'

export default function Profile() {
    const navigate = useNavigate();
    const tokens = Cookies.get('auth_token');
    const [data, setData] = useState(null);


    useEffect(() => {
        if (!tokens) {
            navigate("/");
        } else {
            http.get('auth/users/me/', {
                headers: {
                    'Authorization': `Token ${tokens}`
                }
            }).then((response) => setData(response.data)
            ).catch(

            )
        }
    }, [tokens, navigate]);

    const handleLogout = () => {
        Cookies.remove('auth_token');
        navigate('/');
    }

    return (
        <div>
            {data ? (<div className='flex flex-col items-center w-full'>
                <div className='font-bold text-3xl mb-5 mt-20'>
                    
                </div>
                <div className='font-bold text-3xl mb-5 mt-20'>
                    {data.username}
                </div>
                <div className='font-semibold text-xl underline underline-offset-8 decoration-1 mb-8'>
                    {data.email}
                </div>
                <div className='flex flex-row pt-2 pr-10 pl-10 gap-x-60 border border-black rounded-md shadow-lg'>
                    <div className='mb-5 '>
                        <p className='font-bold text-lg'>
                            Full Name:
                        </p>
                        <p className='text-lg mt-3'>
                            {data.first_name} {data.last_name}
                        </p>
                    </div>
                    <div className=''>
                        <p className='font-bold text-lg'>
                            Birth Date:
                        </p>
                        <p className='text-lg mt-3'>
                            {data.birthdate}
                        </p>
                    </div>
                </div>
                <form onSubmit={handleLogout}>
                    <div style={{ marginTop: '20px' }} className='mb-20'>
                        <Button type="submit" gradientDuoTone="cyanToBlue" className="w-full border border-gray rounded px-2 py-1" size="lg">Logout</Button>
                    </div>

                </form>
                <ToastContainer/>
            </div >) : (
                <p>Loading user data...</p>
            )
            }
        </div>
    )
}
