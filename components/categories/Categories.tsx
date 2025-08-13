"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ActCategories } from "@/store/categories/categoriesSlice";
import { useEffect } from "react";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, record, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(ActCategories());
  }, [dispatch]);

  const categoriesList =
    loading === "pending" || loading === "idle" ? (
      <div>Loading...</div>
    ) : loading === "failed" ? (
      <div>{error || "Error fetching categories"}</div>
    ) : record.length > 0 ? (
      record.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))
    ) : (
      <div>No categories</div>
    );

  return <div>{categoriesList}</div>;
};

export default Categories;
