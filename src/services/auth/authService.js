const DEMO_USER = {
    id: "demo-user",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
};

const AUTH_STORAGE_KEY = "financeDashboardUser";

export async function login(email, password) {
    // Simulate a small API delay.
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
        email !== DEMO_USER.email ||
        password !== DEMO_USER.password
    ) {
        throw new Error("Invalid email address or password.");
    }

    const authenticatedUser = {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
    };

    localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(authenticatedUser)
    );

    return authenticatedUser;
}

export function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getCurrentUser() {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
}