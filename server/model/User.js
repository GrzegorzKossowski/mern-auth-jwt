import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

/**
 * 
 * @param string  enteredPassword 
 * @returns       boolean
 * Metoda sprawdza, czy hasło tekstowe jest takie samo, jak hasło
 * zaszyfrowane z bazy. Zwraca true/false
*/
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/**
 * Przed zapisem uzera do bazy sprawdza, czy zostało zmodyfikowane hasło.
 * Jeśli nie, przepuszcza dalej.
 * Jeśli tak, generuje sól do hasha, następnie tworzy nowe hasło.
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// tworzy model klasy User
const User = model("User", userSchema)
export default User