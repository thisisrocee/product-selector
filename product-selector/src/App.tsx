import { useState } from "react";
import { Product, VariationOption } from "./types/types";
import productsData from "../sample.json";

const products = productsData.items;
const varieties = productsData.varieties;

export const ProductForm = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<
    Record<string, VariationOption | null>
  >({});

  // Function to handle product selection
  const handleProductSelection = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariations({});
  };

  // Function to handle variation selection
  const handleVariationSelection = (
    variationCode: string,
    option: VariationOption
  ) => {
    setSelectedVariations((prevVariations) => ({
      ...prevVariations,
      [variationCode]: option,
    }));
  };

  // Render the form
  return (
    <div className="bg-primary">
      <div className="font-mono flex justify-center pt-7">
        <h2 className="text-5xl">Resulting Code:</h2>
        <p className="font-black text-6xl">
          {selectedProduct?.code}
          {Object.keys(selectedVariations).map((variationCode) => {
            const selectedOption = selectedVariations[variationCode];
            return selectedOption ? `.${selectedOption.code}` : "";
          })}
        </p>
      </div>

      <div className="font-mono text-white  min-w-[320px] min-h-screen flex items-center px-5">
        <div>
          <h1 className="text-4x1 leading-tight">Izvēlies produktu:</h1>
          <ul>
            {products.map((product) => (
              <li key={product.code}>
                <button
                  className={`rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear
                  bg-gray-600 hover:bg-gray-700 hover:text-white py-2 px-3 mt-1 mb-1 
                  ${selectedProduct == product && "bg-slate-50"}`}
                  onClick={() => handleProductSelection(product)}
                >
                  {product.description}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedProduct && (
          <>
            {selectedProduct.varieties.map((variationCode) => {
              const variation = varieties.find((v) => v.code === variationCode);
              if (!variation) return null;
              return (
                <div key={variation.code} className="mx-10">
                  <h3>{variation.description}</h3>
                  <ul>
                    {variation.options.map((option) => (
                      <li key={option.code}>
                        <button
                          className={`rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear
                          bg-gray-600 hover:bg-gray-700 hover:text-white py-2 px-3 mt-1 mb-1 
                          ${selectedVariations[variation.code]?.code === option.code && "bg-slate-50"}`}
                          onClick={() => handleVariationSelection(variation.code, option)}
                        >
                          {option.description}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
