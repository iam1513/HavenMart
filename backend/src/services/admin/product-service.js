const ProductRepository = require("../../repository/admin/product-repository");

const ProductRepo = new ProductRepository();

class ProductService {
    async addProduct(product) {
        try {
            const newProduct = await ProductRepo.addProduct(product);
            return newProduct;
        } catch (error) {
            console.log("Error in createProduct in Services", error);
            return null;
        }
    }

    async fetchProducts() {
        try {
            const listOfProducts = await ProductRepo.fetchProducts();
            return listOfProducts;
        } catch (error) {
            console.log("Error in fetchProducts in Services", error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            const isDeleted = await ProductRepo.deleteProduct(id);
            return isDeleted;
        } catch (error) {
            console.log("Error in deleteProduct in Services", error);
            return null;
        }
    }

    async updateProduct(id, product) {
        try {
            const updatedProduct = await ProductRepo.updateProduct(id, product);
            return updatedProduct;
        } catch (error) {
            console.log("Error in updateProduct in Services", error);
            return null;
        }
    }
}

module.exports = ProductService;