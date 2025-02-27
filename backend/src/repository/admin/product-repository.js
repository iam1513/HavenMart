const Product = require("../../models/product")

class ProductRepository {

    async addProduct(product) {
        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log("Error in addProduct", error);
            return null;
        }
    }

    async fetchProducts() {
        try {
            const listOfProducts = await Product.find({});
            return listOfProducts;
        } catch (error) {
            console.log("Error in fetchProducts", error);
            return null;
        }
    }

    async updateProduct(id, product) {
        try {
            const findProduct = await Product.findById(id);
            if (!findProduct) {
                return null;
            }
            findProduct.image = product.image || findProduct.image;
            findProduct.title = product.title || findProduct.title;
            findProduct.description = product.description || findProduct.description;
            findProduct.category = product.category || findProduct.category;
            findProduct.brand = product.brand || findProduct.brand;
            findProduct.price = product.price === '' ? 0 : product.price || findProduct.price;
            findProduct.salePrice = product.salePrice === '' ? 0 : product.salePrice || findProduct.salePrice;
            findProduct.totalStock = product.totalStock || findProduct.totalStock;

            await findProduct.save()

            return findProduct;
        } catch (error) {
            console.log("Error in updateProduct", error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            const findProduct = await Product.findById(id)
            if (!findProduct) {
                return null;
            }
            await findProduct.deleteOne()
            return true;
        }
        catch (error) {
            console.log("Error in deleteProduct", error);
            return null;
        }

    }
}

module.exports = ProductRepository;