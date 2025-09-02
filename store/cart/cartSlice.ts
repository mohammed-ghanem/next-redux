import { createSlice } from "@reduxjs/toolkit";

interface IProduct {
    id: number;
    title: string;
    price: number;
    images: string[];
    quantity?: number
}


interface IcartSlice {
    items: { [key: number]: number };
    productFullInfo: IProduct[];
}



const initialState: IcartSlice = {
    items: {},
    productFullInfo: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
});


export default cartSlice.reducer;