const Product = require('../../models/product');

const getFilteredProducts = async (req, res) => {
    try {
        console.log("Query Parameters:", req.query);

        const { sortBy = "price-lowtohigh", ...filters } = req.query;

        const filterCriteria = {};
        for (const key in filters) {
            if (filters[key].length) {
                const normalizedKey = key.toLowerCase();
                filterCriteria[normalizedKey] = { $in: filters[key].split(",").map(item => item.trim()) };
            }
        }

        let sort = {};

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1;
                break;
            case 'price-hightolow':
                sort.price = -1;
                break;
            case 'title-atoz':
                sort.title = 1;
                break;
            case 'title-ztoa':
                sort.title = -1;
                break;
            default:
                sort.price = 1;
                break;
        }

        const products = await Product.find(filterCriteria).sort(sort);

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred in get filtered products"
        });
    }
};

module.exports = { getFilteredProducts };