const API_URL = `http://localhost:5000`;

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchLists() {
  const res = await fetch(`${API_URL}/user/lists`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error('Failed to fetch lists');
  return res.json();
}

export async function createList(userId, list) {
    const res = await fetch(`${API_URL}/lists/newList`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(list),
    });

  if (!res.ok) throw new Error('Failed to create list');
  return res.json();
}

export async function addItem(listId, rawEntry) {
    const res = await fetch(`${API_URL}/lists/${listId}/items`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ rawEntry }),
    });

    if (!res.ok) throw new Error('Failed to add item');
    return res.json();
}

export async function removeItem(listId, itemId) {
  const res = await fetch(`${API_URL}/lists/items/`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ list_id: listId, item_id: itemId}),
  });

  if (!res.ok) throw new Error('Failed to remove item');
}
