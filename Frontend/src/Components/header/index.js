import React from 'react'
import { Outlet } from "react-router-dom";
import { Navbar } from 'flowbite-react';

export default function Header() {
    return (
        <div className='flex flex-col'>
            {/*<div className='border-black border mb-5'>*/}
                <Navbar fluid rounded>
                    <Navbar.Brand href="/">
                        {/*<img src="/img/logo-no-background.png" className="mr-3 h-6 sm:h-9" alt="SandySurf Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">SandySurf</span>*/}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse >
                        {/*<Navbar.Link href="#">About</Navbar.Link>
                        <Navbar.Link href="#" className='mr-14'>Download</Navbar.Link>*/}
                    </Navbar.Collapse>
                </Navbar>
            {/*</div>*/}
            <div id="detail" >
                <Outlet />
            </div>
        </div>
    )
}
