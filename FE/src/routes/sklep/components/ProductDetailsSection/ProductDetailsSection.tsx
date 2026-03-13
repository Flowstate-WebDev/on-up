import { ProductQualifsList } from "./ProductQualifsList";
import { ProductPrice } from "./ProductPrice";
import { ProductReleaseYear } from "./ProductReleaseYear";
import AddToCartForm from "./AddToCartForm";
import { Heading } from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";

import { useToast } from "@/context/ToastContext";

import type { ProductDetailsSectionProps } from "./ProductDetailsSection.types";

export const ProductDetailsSection = ({
  product,
}: ProductDetailsSectionProps) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { professions, title, qualifications, price, stock, releaseYear } =
    product;

  const handleAddToCart = (quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`Książka "${title}" została dodana do koszyka`);
  };

  return (
    <div className="content-center md:px-0 md:max-w-1/3">
      <h2 className="font-semibold text-text-secondary">
        {professions.map((p) => p.profession.name).join(", ")}
      </h2>
      <Heading size="xl">{title}</Heading>
      <ProductReleaseYear releaseYear={releaseYear} />
      <ProductQualifsList qualifications={qualifications} />
      <ProductPrice price={price} />
      {stock > 0 ? (
        <>
          <AddToCartForm MaxStock={stock} onAdd={handleAddToCart} />
          <p className="text-text-tertiary opacity-70 mt-2 font-semibold">
            Dostępnych sztuk: {stock}
          </p>
        </>
      ) : (
        <p className="text-error font-semibold">Produkt niedostępny</p>
      )}
    </div>
  );
};
