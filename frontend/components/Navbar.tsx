"use client"

import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "next/navigation";
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth';
import Image from "next/image";

const Navbar = () => {
    const router = useRouter();
    const { logout, user } = useAuth({ middleware: 'guest' });
    const providerUrl = `/provider?${encodeURIComponent('providerId')}=${encodeURIComponent(user?.provider_id)}`;


    const [dropdownVisible, setDropdownVisible] = useState(false);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    // Set a timer for having the animation lasting some fix time
    const [animateBounce, setAnimateBounce] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimateBounce(false);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // Make the icon bounce always in main page
    const pathname = usePathname();
    useEffect(() => {
        setAnimateBounce(pathname === '/');

        const timeout = setTimeout(() => {
            setAnimateBounce(false);
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [pathname]);

    return (
        <header className="w-full absolute z-20 mb-10">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
                <Link href="/" className="flex justify-center items-center">
                    <span className="text-2xl font-bold">TRUKE</span>
                </Link>

                {user ? (
                    <div className="relative">
                        <button ref={buttonRef} onClick={toggleDropdown} className="flex items-center focus:outline-none">
                            <div className={`mr-2 ${animateBounce ? 'animate-bounce transition Ïduration-500 ease-in-out' : ''}`}>
                                <Image src="/proveedores-icon.svg" alt="profile-icon" width={50} height={50} />
                            </div>
                            <span>{user.username}</span>
                        </button>

                        {dropdownVisible && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-md"
                            >
                                <CustomButton
                                    title="Contact"
                                    btnType="button"
                                    containerStyles="!py-2 !px-4 w-full text-xs text-black border-black-hover"
                                    handleClick={() => {
                                        router.push("/contact");
                                        closeDropdown();
                                    }}
                                    disabled={false}
                                />
                                <CustomButton
                                    title="Mis productos"
                                    btnType="button"
                                    containerStyles="!py-2 !px-4 w-full text-xs text-black border-black-hover"
                                    handleClick={() => {
                                        router.push(providerUrl);
                                        closeDropdown();
                                    }}
                                    disabled={false}
                                />

                                <CustomButton
                                    title="Logout"
                                    btnType="button"
                                    containerStyles="!py-2 !px-4 w-full text-xs text-black border-black-hover"
                                    handleClick={() => {
                                        logout();
                                        closeDropdown();
                                    }}
                                    disabled={false}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    usePathname() !== '/login' && usePathname() !== '/signup' && (
                        <CustomButton
                            title="Iniciar sesión"
                            btnType="button"
                            containerStyles="!py-2 !px-2 text-black border-2 border-black rounded-lg"
                            handleClick={() => router.push('/login')}
                            disabled={false}
                        />
                    )
                )}
            </nav>
        </header>
    );
};

export default Navbar;