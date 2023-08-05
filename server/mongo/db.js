import mongoose from 'mongoose'
import chalk from 'chalk'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

    console.log(`MongoDB conndected: ${chalk.green(conn.connection.host)}`);
  } catch (error) {
    console.log(`${chalk.red('MongoDB NOT conndected\n')} ${chalk.yellow(error.message)}\n`)
    process.exit(1)
  }
}