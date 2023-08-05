import jwt from 'jsonwebtoken'

export const generateJwtToken = (res, userId) => {
  // wygeneruj token za pomocą biblioteki jwt, dodaj secret i inne ustawienia,
  // np. datę wygaśnięcia
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })

  // JWT as HTTP-Only cookie
  // ustaw obiekt cookie w responsie o nazwie `jwt`.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: process.env.JWT_EXPIRES
  })
}

// generate random hash in console
// openssl rand -base64 12