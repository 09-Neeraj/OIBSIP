const API_URL = "http://127.0.0.1:5000/api/auth";

/* =========================
   REGISTER
========================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("registerMessage");

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {
                message.style.color = "green";

                registerForm.reset();

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
            } else {
                message.style.color = "red";
            }

        } catch (error) {
            console.error(error);

            message.textContent = "Unable to connect to server.";
            message.style.color = "red";
        }
    });
}


/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            console.log("Login response:", data);
            console.log("Status:", response.status);

            if (response.ok) {
                message.textContent = "Login successful!";
                message.style.color = "green";

                setTimeout(() => {
                    window.location.href = "./dashboard.html";
                }, 500);

            } else {
                message.textContent = data.message;
                message.style.color = "red";
            }

        } catch (error) {
            console.error("Login Error:", error);

            message.textContent = "Unable to connect to server.";
            message.style.color = "red";
        }
    });
}


/* =========================
   LOGOUT
========================= */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            console.log("Logout:", response.status, data);

            if (response.ok) {
                window.location.href = "login.html";
            }

        } catch (error) {
            console.error("Logout Error:", error);
        }
    });
}


/* =========================
   DASHBOARD
========================= */

const dashboardUsername = document.getElementById("dashboardUsername");

if (dashboardUsername) {
    loadDashboard();
}

async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/dashboard`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        console.log("Dashboard Status:", response.status);
        console.log("Dashboard Data:", data);

        if (!response.ok) {
            window.location.href = "login.html";
            return;
        }

        document.getElementById("dashboardUsername").textContent =
            data.user.username;

        document.getElementById("userUsername").textContent =
            data.user.username;

        document.getElementById("userEmail").textContent =
            data.user.email;

    } catch (error) {
        console.error("Dashboard Error:", error);
        window.location.href = "login.html";
    }
}
