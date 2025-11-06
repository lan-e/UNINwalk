// fetches professors data for both UI and chatbot
export async function fetchProfessorsData() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/professors`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch professors: ${response.status}`);
  }
}

// fetches rooms data for UI
export async function fetchRoomsData() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/rooms`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch room data: ${response.status}`);
  }
}

// fetches all unin data for chatbot
export async function fetchUninData() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/unin-data`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch unin data: ${response.status}`);
  }
}
