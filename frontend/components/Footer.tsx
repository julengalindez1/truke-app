import React from 'react';
import Link from "next/link";
import {footerLinks} from "@/constants";

const Footer = () => {
    return (
        <footer className="bg-gray-50 flex flex-col text-black-100 border-t">
            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
                <div className="flex flex-col justify-start items-start gap-6">
                    <p className="text-base text-gray-950">
                        Truke 2023 <br/>
                        All rights reserved &copy
                    </p>
                </div>
                <div className="footer__links">
                    {footerLinks.map((link)=>(
                        <div key={link.title} className="footer__link">
                            <h3 className="font-bold">
                                {link.title}
                            </h3>
{/*                            {link.links.map((item)=>(
                                <Link
                                    key=item.
                                    href=item.url/>
                            ))}*/}
                        </div>
                        )
                    )}
                </div>

            </div>
            
        </footer>
    );
};

export default Footer;