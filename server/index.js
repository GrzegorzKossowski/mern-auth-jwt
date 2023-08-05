import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
// import colorizer conslole logs
import chalk from 'chalk'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { connectDB } from './mongo/db.js'

dotenv.config()

const app = express()
app.use(cors())
// allow to read the body of req
app.use(express.json())
// allow to read body as form data
app.use(express.urlencoded({ extended: true }))
// allow to read cookies
app.use(cookieParser())

// >>>>>>>>>>>>>>>>> SECURITY
// https://www.npmjs.com/package/express-mongo-sanitize
// prevents NoSQL attack
app.use(mongoSanitize())
// https://www.npmjs.com/package/helmet
// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet())
// prevent XSS attack, changes < char to &lt; symbol
app.use(xss())
// set limits
const limiter = rateLimit({
  windowMs: 1000 * 60 * 10, // 10m
  max: 100
})
app.use(limiter)
// Prevent http param polution
app.use(hpp())

// Mongo DB
connectDB()


import userRouter from './routes/userRoutes.js'
app.use(`/api/${process.env.VERSION}/users`, userRouter)

app.get(`/api/${process.env.VERSION}`, (req, res, next) => res.status(200).json('App is runnign'))

app.use(notFound, errorHandler)

// set PORT
const PORT = process.env.PORT || 5000
// run server
const server = app.listen(PORT, () => console.log(`Server running on port ${chalk.yellow(process.env.PORT)} in ${chalk.green(process.env.NODE_ENV)} mode - http://localhost:${process.env.PORT}`))
// if sth. goes wrong handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`${chalk.red("Error:")} ${err.message}`);
  server.close(() => process.exit(1))
})