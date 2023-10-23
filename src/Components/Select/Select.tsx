import React, { ChangeEvent } from 'react';

interface SelectProps {
    options: string[];
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    labelTexto: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, labelTexto }) => {
    return (
        <div className="flex flex-col w-fit mb-4 text-center">
            <label className="mb-2 text-black font-roboto">
                {labelTexto}
            </label>
            <select value={value} onChange={onChange}
                className='py-2 px-4 text-lg w-60 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson text-black font-roboto'
            >
                {options.map((option, index) => (
                    <option key={index} value={option}
                        className='py-2 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson text-black font-roboto'
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;