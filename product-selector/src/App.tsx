import { useState } from "react";
import { Product, VariationOption } from "./types/types";
import productsData from "../sample.json";
import { Button } from "./components/Button";

const products = productsData.items;
const varieties = productsData.varieties;

export const ProductForm = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<
    Record<string, VariationOption | null>
  >({});

  const handleProductSelection = (product: Product) => {
    setSelectedProduct(product);
    setSelectedVariations({});
  };

  const handleVariationSelection = (
    variationCode: string,
    option: VariationOption
  ) => {
    setSelectedVariations((prevVariations) => ({
      ...prevVariations,
      [variationCode]: option,
    }));
  };

  return (
    <div className="bg-primary">
      <div className="font-mono flex justify-center pt-7">
        <p className="font-black text-6xl">
          {selectedProduct ? "" : "0000"}
          {selectedProduct?.code}
          {Object.keys(selectedVariations).map((variationCode) => {
            const selectedOption = selectedVariations[variationCode];
            return selectedOption ? `.${selectedOption.code}` : "";
          })}
        </p>
      </div>

      <div className="font-mono text-white  min-w-[320px] min-h-screen flex items-center justify-center px-5">
        <Button
          onButtonClick={() => {
            setSelectedProduct(null);
            setSelectedVariations({});
          }}
          custom={`mx-10 ${!selectedProduct && "hidden"}`}
        >
          Back
        </Button>
        <div
          className={`${
            selectedProduct && "hidden"
          } items-center justify-center`}
        >
          <h1 className="text-4x1 leading-tight">Izvēlies produktu:</h1>
          <ul>
            {products.map((product) => (
              <li key={product.code}>
                <Button
                  onButtonClick={() => handleProductSelection(product)}
                  selectedProduct={selectedProduct?.code}
                  product={product.code}
                >
                  {product.description}
                </Button>
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
                        <Button
                          onButtonClick={() =>
                            handleVariationSelection(variation.code, option)
                          }
                          selectedProduct={
                            selectedVariations[variation.code]?.code
                          }
                          product={option.code}
                        >
                          {option.description}
                        </Button>
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
