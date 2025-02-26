const express = require("express")

const router = express.Router();

const { handleImageUpload,
    addProduct,
    deleteProduct,
    fetchProducts,
    editProduct,
} = require("../../controllers/admin/products-controller")

const { upload } = require("../../helpers/cloudinary")

router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/add-product', addProduct)
router.get('/fetch-products', fetchProducts)
router.delete('/delete-product/:id', deleteProduct)
router.put('/edit-product/:id', editProduct)
module.exports = router