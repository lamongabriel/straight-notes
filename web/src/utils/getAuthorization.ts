export function getAuthorization () {
  const token = localStorage.getItem('straightnotes@token') as string
  const Authorization = `Bearer ${JSON.parse(token) as string}`
  if (token) {
    return Authorization
  }
}
