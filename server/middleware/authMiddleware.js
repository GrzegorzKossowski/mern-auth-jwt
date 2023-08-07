import jwt from 'jsonwebtoken'
import { asyncHandler } from './asyncHandler.js'
import User from '../model/User.js'

// protect routes
/**
 * Sprawdza, czy klient ma http token, i ewentualnie blokuje zasoby.
 */
export const protect = asyncHandler(async (req, res, next) => {

  let token

  // sprawdza, czy w zapytaniu jest automatycznie dołączony token 
  // o nazwie `jwt`, wymaga cookie-parser
  token = req.cookies.jwt

  if (token) {
    // jeśli jest token, zdekoduj go
    try {
      // za pomocą biblioteki jwt zweryfikuj token na podstawie zmiennej 
      // środowiskowej SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // po zdekodowaniu, na podstawie zawartości tokena, konkretnie
      // userId, pobierz dane z bazy, o ile są, ale bez hasła (nie jest
      // potrzebne) i dodaj je jako obiekt user do requesta (uwaga, 
      // będzie dostępne to na dalszym etapie - w kontrolerze)
      req.user = await User.findById(decoded.userId).select('-password')
      // przejdź dalej (założenie, że skoro jest token, to jest uzer, 
      // moim zdaniem powinno być sprawdzane, czy jest uzer jeszcze raz)
      next()
    } catch (error) {
      res.status(401)
      throw new Error(`Invalid token`)
    }
  } else {
    // jeśli nie ma tokenu, rzuć błąd
    res.status(401)
    throw new Error(`Not authorized, no token`)
  }
})

// sprawdza, czy user jest adminem. Zakładamy, że user już jest zalogowany
// za pomocą metody protect
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // jeśli jest uzer i jest adminem, dopuść go dalej
    next()
  } else {
    res.status(401)
    throw new Error(`Not authorized as admin`)
  }
}