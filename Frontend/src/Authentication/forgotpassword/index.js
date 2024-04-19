import React from 'react'
// import { FloatingLabel, Button } from 'flowbite-react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';

export default function ForgotPassword() {
    return (
        <div>
            <div className='justify-center flex items-center' >
                <Card className="max-w-lg border border-black" >
                    <text className='font-bold text-xl'>
                        Forgot Password
                    </text>
                    <form className="flex flex-col gap-4 p-20 pt-10 pb-10 flex-wrap" >
                        <div className='mb-10'>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Email" />
                            </div>
                            <TextInput id="email1" type="email" icon={HiMail} placeholder="name@gmail.com" required />
                        </div>

                        <Button type="submit" gradientDuoTone="cyanToBlue" >Submit</Button>
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
