const API_URL = `http://localhost:5000`;

export async function createUser(user) {
    const res = await fetch(`${API_URL}/SignIn`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
    });

  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function loginUser(user) {
    const res = await fetch(`${API_URL}/LogIn`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error('Failed to login user');
    return res.json();
}
