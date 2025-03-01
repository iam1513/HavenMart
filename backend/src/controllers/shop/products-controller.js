const Product = require('../../models/product')

const getFilteredProducts = async (requestAnimationFrame, res) => {
    try {

        const products = await Product.find({})

        res.status(200).json({
            success: true,
            data: products
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occurred in get filtered products"
        })
    }
}

module.exports = { getFilteredProducts }