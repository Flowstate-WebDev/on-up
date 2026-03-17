import { CategoryHeading } from "./CategoryHeading";
import { ProductCard } from "@/routes/components/ProductCard";
import { ProductCarousel } from "@/routes/components/ProductCarousel";

export function CategorySection({
  title,
  books,
}: {
  title: string;
  books: any[];
}) {
  return (
    <section className="overflow-hidden">
      <CategoryHeading>{title}</CategoryHeading>
      <div className="w-full">
        <ProductCarousel>
          {books.map((book: any) => (
            <div
              key={book.id}
              className="shrink-0 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <ProductCard data={book} />
            </div>
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
}
