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
router.post('/add', addProduct)
router.get('/fetch', fetchProducts)
router.delete('/delete/:id', deleteProduct)
router.put('/edit/:id', editProduct)
module.exports = router