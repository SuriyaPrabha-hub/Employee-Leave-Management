function changePassword() {
    let employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
        window.location.href = "index.html";
        return;
    }

    let currentPassword = document.getElementById("currentPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (!currentPassword || !newPassword || !confirm) {
        Swal.fire({
            icon: "warning",
            title: "Required Fields",
            text: "Please fill all password fields."
        });
        return;
    }

    if (newPassword.length < 4) {
        Swal.fire({
            icon: "warning",
            title: "Password Too Short",
            text: "Password must be at least 4 characters long."
        });
        return;
    }

    if (newPassword !== confirm) {
        Swal.fire({
            icon: "error",
            title: "Passwords Do Not Match",
            text: "The new password and confirmation password do not match."
        });
        return;
    }

    fetch(API_BASE + "/employees/changePassword/" + employeeId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(msg => { throw new Error(msg || "Failed to update password"); });
        }
        return response.json();
    })
    .then(() => {
        Swal.fire({
            icon: "success",
            title: "Password Updated",
            text: "Your password has been changed successfully.",
            confirmButtonColor: "#4f46e5"
        });

        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
    })
    .catch(err => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message.includes("incorrect") ? "Current password is incorrect." : "Failed to update password. Please try again."
        });
    });
}
