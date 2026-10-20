window.onload = function(){

    // Auth check - admin only
    if(localStorage.getItem("role") !== "ADMIN"){
        window.location.href = "index.html";
        return;
    }

    fetch(API_BASE + "/admin/dashboard")
    .then(response => response.json())
    .then(data => {
        document.getElementById("employees").innerHTML = data.totalEmployees;
        document.getElementById("leaves").innerHTML = data.totalLeaves;
        document.getElementById("approved").innerHTML = data.approvedLeaves;
        document.getElementById("pending").innerHTML = data.pendingLeaves;
        document.getElementById("rejected").innerHTML = data.rejectedLeaves;
    })
    .catch(() => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to Load Dashboard"
        });
    });
}
