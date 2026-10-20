// Clear session when login page loads (user navigated here / logged out)
localStorage.clear();

function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please enter email and password"
        });
        return;
    }

    fetch(API_BASE + "/employees/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if(!response.ok){
            throw new Error();
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("employeeId", data.id);

        if(data.role === "ADMIN"){
            localStorage.setItem("role", "ADMIN");
            window.location.href = "admin.html";
        } else {
            localStorage.setItem("role", "EMPLOYEE");
            window.location.href = "employee.html";
        }
    })
    .catch(() => {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid Email or Password"
        });
    });
}
