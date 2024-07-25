import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SuccessMessageProps {
    message: string;
}

const SuccessWindow: React.FC<SuccessMessageProps> = ({ message }) => {
    return (
        <div className="text-center bg-white border border-black-hover border-t-4 shadow-md p-8 mt-4 flex flex-col items-center">
            <div className="mb-2">
                <Link id="success-icon-link" href={'/'} className="text-decoration-none">
                    <Image
                        className="max-w-100px mb-2"
                        src={'/product-successfully-saved-icon.svg'}
                        alt={'feature image'}
                        width={50}
                        height={50}
                    />
                </Link>
            </div>
            <div className="text-18px">{message}</div>
        </div>
    );
};

export default SuccessWindow;
