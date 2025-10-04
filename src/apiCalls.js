export async function fetchProfessorsData() {
  const apiUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${apiUrl}/professors`)
  if (response.ok) {
    return await response.json()
  }
  else {
    throw new Error(`Failed to fetch professors: ${response.status}`)
  }
}