import bcrypt from 'bcryptjs'

export default function checkPassword(password: string, password_hash: string) {
  return bcrypt.compare(password, password_hash)
}
