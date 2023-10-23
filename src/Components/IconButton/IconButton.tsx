import React, { ReactNode } from 'react';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    icon: ReactNode;
}

const IconButton: React.FC<ButtonProps> = ({ onClick, children, icon }) => {
    return (
        <button onClick={onClick}
            className="bg-[#C9A5F6] text-slate-950 flex items-center gap-1 font-medium text-2xl py-2 px-4 rounded-full font-roboto hover:bg-[#B278FF] "
        >
            {children}
            {icon}
        </button>
    );
};

export default IconButton;