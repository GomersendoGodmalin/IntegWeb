import React, { useState } from 'react'
// import { FloatingLabel, Button } from 'flowbite-react';
import Header from '../../Components/header';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword2() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <Header />
            <div className='justify-center flex items-center' >
                <Card className="max-w-lg border border-black" >
                    <text className='font-bold text-xl'>
                        Reset Password
                    </text>
                    <form className="flex flex-col gap-2 p-20 pt-10 pb-10 flex-wrap" >
                        <div className='mb-10'>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="New Password" />
                            </div>
                            <TextInput id="password1" type={showPassword ? 'text' : 'password'} required />
                        </div>
                        <div className='mb-10'>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="Confirm New Password" />
                            </div>
                            <div className='flex flex-row justify-center items-center'>
                                <TextInput id="password2" type={showPassword ? 'text' : 'password'} required />
                                <div className="ml-2" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </div>
                            </div>
                        </div>

                        <Button type="submit" gradientDuoTone="cyanToBlue" >Reset</Button>
                    </form>
                </Card>
            </div>
            {/* <div className='justify-center flex items-center' >
                <div className='flex-col flex border border-black rounded-lg p-10 justify-center items-center pl-20 pr-20'>
                    <div style={{ backgroundImage: "url(/img/logo-no-background.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat", height: 220, width: 200 }}>
                        <div className='justify-center items-center'>
                            <text className='font-bold'>
                                Forgot Password
                            </text>
                            <form className='mt-10'>
                                <FloatingLabel variant="outlined" label="Email" type='email' required />
                            </form>
                            <Button type="submit" className='flex grow '>Submit</Button>
                        </div>

                    </div>

                </div>
            </div > */}
        </div >
    )
}
