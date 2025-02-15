const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { dbConfig, serverConfig } = require('./config')
const app = express()
const authRouter = require('./routes/auth/auth-routes')

app.use(
    cors({
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "AUthorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
)

app.use(cookieParser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);

app.listen(serverConfig.PORT, async () => {
    console.log(`Server live on ${serverConfig.PORT}`)
    dbConfig.connect;
    console.log("Database connection successful")
})