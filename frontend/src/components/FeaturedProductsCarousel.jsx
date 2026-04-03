import React from "react";
import ProductCard from "./ProductCard";

export default function FeaturedProductsCarousel({ products = [] }) {
  const [current, setCurrent] = React.useState(0);
  const visible = 4;
  const max = Math.max(0, products.length - visible);

  const next = () => setCurrent((c) => Math.min(c + 1, max));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  return (
    <div className="relative w-full">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-primary-100 transition disabled:opacity-30"
        disabled={current === 0}
        aria-label="Previous"
      >
        &#8592;
      </button>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
        >
          {products.map((product, i) => (
            <div key={product._id || i} className="w-72 min-w-[18rem] max-w-xs mx-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:bg-primary-100 transition disabled:opacity-30"
        disabled={current === max}
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
  );
}
