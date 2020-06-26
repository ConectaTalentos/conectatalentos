import bcrypt from 'bcryptjs'

export default async function checkPassword(password: string, password_hash: string) {
  return await bcrypt.compare(password, password_hash)
}
