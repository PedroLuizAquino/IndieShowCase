interface InputProps {
    labelTexto: string;
    placeholder: string;
    tipo?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
    nome?: string;
    value?: string | number;
    color?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
    placeholder,
    tipo = 'text',
    labelTexto,
    nome,
    value,
    color,
    onChange,
}: InputProps) => {
    return (
        <div className="flex flex-col w-fit mb-4 text-center">
            <label className="mb-2 text-black font-roboto">
                {labelTexto}
            </label>
            <input
                type={tipo}
                placeholder={placeholder}
                name={nome}
                value={value}
                className="py-2 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson text-black font-roboto"
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
