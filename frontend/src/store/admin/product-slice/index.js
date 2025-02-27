import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk("/products/addnewproduct",
    async (formData) => {
        const result = await axios.post('http://localhost:3000/api/admin/products/add', formData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        return result?.data
    }
)

export const editProduct = createAsyncThunk("/products/editProduct",
    async ({ id, formData }) => {

        const result = await axios.put(`http://localhost:3000/api/admin/products/edit/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return result?.data
    }
)

export const deleteProduct = createAsyncThunk("/products/deleteProduct",
    async (id) => {
        const result = await axios.delete(`http://localhost:3000/api/admin/products/delete/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        return result?.data
    }
)

export const fetchProducts = createAsyncThunk("/products/fetchProducts",
    async () => {
        const result = await axios.get('http://localhost:3000/api/admin/products/fetch')

        return result?.data
    }
)

const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (
        builder
    ) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            console.log(action.payload)

            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchProducts.rejected, (state, action) => {
            console.log(action.payload)

            state.isLoading = false
            state.productList = []
        })
    }
})

export default AdminProductSlice.reducer