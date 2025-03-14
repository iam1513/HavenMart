import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

const fetchFilteredProducts = createAsyncThunk(
    "/products/fetchProducts",
    async ({ filterParams, sortParams }) => {
        const queryParams = new URLSearchParams();

        // Convert arrays to comma-separated strings
        Object.keys(filterParams).forEach(key => {
            if (Array.isArray(filterParams[key])) {
                queryParams.append(key, filterParams[key].join(','));  // Convert array to string
            } else {
                queryParams.append(key, filterParams[key]);
            }
        });

        queryParams.append("sortBy", sortParams);

        const queryString = queryParams.toString();  // Convert to query string

        const result = await axios.get(`http://localhost:3000/api/shop/products/get?${queryString}`);

        return result?.data;
    }
);

const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
        const result = await axios.get(`http://localhost:3000/api/shop/products/get/${id}`);
        return result?.data;
    }
);

const shopProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredProducts.pending,
            (state, action) => {
                state.isLoading = true
            }
        ).addCase(fetchFilteredProducts.fulfilled,
            (state, action) => {
                state.isLoading = false
                state.productList = action.payload.data
            }
        ).addCase(fetchFilteredProducts.rejected,
            (state, action) => {
                state.isLoading = true
                state.productList = []
            }
        ).addCase(fetchProductDetails.pending,
            (state, action) => {
                state.isLoading = true
            }
        ).addCase(fetchProductDetails.fulfilled,
            (state, action) => {
                state.isLoading = false
                state.productDetails = action.payload.data
            }
        ).addCase(fetchProductDetails.rejected,
            (state, action) => {
                state.isLoading = true
                state.productDetails = []
            }
        )
    }
})

export default shopProductsSlice.reducer
export const { setProductDetails } = shopProductsSlice.actions
export { fetchFilteredProducts, fetchProductDetails }; 