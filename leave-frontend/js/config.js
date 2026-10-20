// ========================================
// API Configuration
// ========================================
// PRODUCTION: Replace with your actual Render service URL after deploying to Render
// LOCAL: Automatically uses http://localhost:8080 when running on localhost
const RENDER_BACKEND_URL = "https://leave-backend.onrender.com"; // <-- PUT YOUR RENDER URL HERE

const API_BASE = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8080"
    : RENDER_BACKEND_URL;

// Logout - clears session and redirects to login
function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
