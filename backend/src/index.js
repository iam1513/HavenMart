const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { dbConfig, serverConfig } = require('./config')
const app = express()
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-route')
const shopProductsRouter = require("./routes/shop/products-routes")

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);

app.listen(serverConfig.PORT, async () => {
    try {
        await dbConfig.connect();
        console.log("Database connection successful");
        console.log(`Server live on ${serverConfig.PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
});
