export default function authenticate() {
  const token = localStorage.getItem('token')
  if (!token) {
    return false
  }
  return true
}