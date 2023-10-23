interface PropsButton {
    texto: string;
    onClick?: () => void;
    tipo?: 'submit';
}

const Button = ({ texto, onClick, tipo }: PropsButton) => {
    return (
        <button
            className="bg-[#C9A5F6] text-slate-950  font-medium text-2xl py-2 px-4 rounded-full font-roboto hover:bg-[#B278FF] "
            onClick={onClick}
            type={tipo}
        >
            {texto}
        </button>
    );
};

export default Button;
