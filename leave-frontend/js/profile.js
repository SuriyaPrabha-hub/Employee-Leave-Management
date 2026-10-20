let employeeId = localStorage.getItem("employeeId");

window.onload = function () {
    if (!employeeId) {
        window.location.href = "index.html";
        return;
    }

    if (localStorage.getItem("role") === "ADMIN") {
        let dash = document.getElementById("dashboardLink");
        if (dash) dash.href = "admin.html";
    }

    fetch(API_BASE + "/employees/" + employeeId)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load profile");
            return response.json();
        })
        .then(emp => {
            document.getElementById("name").value = emp.name || "";
            document.getElementById("email").value = emp.email || "";
            document.getElementById("department").value = emp.department || "";
            document.getElementById("role").value = emp.role || "";
        })
        .catch(err => {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load profile data."
            });
        });
};

function updateProfile() {
    if (!employeeId) {
        window.location.href = "index.html";
        return;
    }

    const employee = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        role: document.getElementById("role").value
    };

    if (!employee.name || !employee.email || !employee.department) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill out all required fields."
        });
        return;
    }

    fetch(API_BASE + "/employees/" + employeeId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to update profile");
        return response.json();
    })
    .then(() => {
        Swal.fire({
            icon: "success",
            title: "Profile Updated",
            text: "Your profile has been updated successfully.",
            confirmButtonColor: "#4f46e5"
        });
    })
    .catch(err => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Could not update profile. Please try again."
        });
    });
}
