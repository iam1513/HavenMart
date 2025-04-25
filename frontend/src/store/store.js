import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/product-slice"
import shopProductsSlice from "./shop/products-slice/index"
import shopCartSlice from "./shop/cart-slice/index"
import shopAddressSlice from "./shop/address-slice/index"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice
    }
})

export default store