import { createSlice } from "@reduxjs/toolkit";
import ActProducts from "./thunkActions/ActProducts";

interface IProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface IProductsState {
  record: IProduct[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IProductsState = {
  record: [],
  loading: "idle",
  error: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ActProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(ActProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.record = action.payload;
      })
      .addCase(ActProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch products";
      });
  }
});

export { ActProducts };
export default productsSlice.reducer;
