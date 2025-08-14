"use client";

import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ActProducts } from "@/store/products/productsSlice";
import Image from "next/image";
import { useEffect } from "react";

const ProductsCard = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();
  const { loading, record, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (categoryId) {
      dispatch(ActProducts(Number(categoryId)));
    }
  }, [dispatch, categoryId]);

  if (loading === "pending" || loading === "idle") {
    return <div>Loading...</div>;
  }

  if (loading === "failed") {
    return <div>{error}</div>;
  }

  if (record.length === 0) {
    return <div>No products in this category</div>;
  }

  return (
    <div>
      {record.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          {product.images?.[0] && (
            <Image src={product.images[0]} alt={product.title} width="150" height="150" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsCard;
