const { imageUploadUtils } = require("../../helpers/cloudinary")
const product = require("../../models/product")

const handleImageUpload = async (req, res) => {
    try {

        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64

        const result = await imageUploadUtils(url)

        res.json({
            success: true,
            result
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: 'False',
            message: 'Image upload failed'
        })
    }
}

// Added a new product

const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body
        const newProduct = new product({
            image, title, description, category, brand, price, salePrice, totalStock
        })

        await newProduct.save()

        res.status(201).json({
            success: "true",
            data: newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'false',
            message: 'Product add failed'
        })
    }
}

// Fetch all products
const fetchProducts = async (req, res) => {
    try {
        const listOfProducts = await product.find({})
        res.status(200).json({
            success: 'true',
            data: listOfProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'false',
            message: 'Product fetch failed'
        })
    }
}

// Edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body

        const findProduct = await product.findById(id)

        if (!findProduct) {
            return res.status(404).json({
                success: 'false',
                message: 'Product not found'
            })
        }

        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock

        await findProduct.save()
        res.status(200).json({
            success: 'true',
            data: findProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'false',
            message: 'Product edit failed'
        })
    }
}

// Delete a products
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await product.findById(id)
        if (!product) {
            return res.status(404).json({
                success: 'false',
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'false',
            message: 'Product delete failed'
        })
    }
}

module.exports = { handleImageUpload, addProduct, fetchProducts, editProduct, deleteProduct }