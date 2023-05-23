type ButtonProps = {
  onButtonClick: () => void;
  children: string;
  selectedProduct?: string;
  product?: string;
  custom?: string;
};

export const Button = ({
  onButtonClick,
  children,
  selectedProduct,
  product,
  custom,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear
        bg-gray-600 hover:bg-gray-700 py-2 px-3 mt-1 mb-1 
        ${selectedProduct == product && "bg-slate-50"} ${custom}`}
      onClick={() => onButtonClick()}
    >
      {children}
    </button>
  );
};
