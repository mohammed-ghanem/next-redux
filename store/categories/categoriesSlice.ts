import { createSlice } from "@reduxjs/toolkit";

interface ICategories {
    record: { id: number, title: string }[],
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: string | null
}

const initialState : ICategories = {
    record: [],
    loading: "idle",
    error: null
}


const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        
    }
})


export default categoriesSlice.reducer