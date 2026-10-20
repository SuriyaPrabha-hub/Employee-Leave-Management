function applyLeave(){

    const employeeId = localStorage.getItem("employeeId");

    if(!employeeId){
        window.location.href = "index.html";
        return;
    }

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const reason = document.getElementById("reason").value;

    // Validation
    if(!startDate || !endDate || !reason.trim()){
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill all fields"
        });
        return;
    }

    if(new Date(endDate) < new Date(startDate)){
        Swal.fire({
            icon: "warning",
            title: "Invalid Dates",
            text: "End date cannot be before start date"
        });
        return;
    }

    const leave = {
        employeeId: parseInt(employeeId),
        leaveType: document.getElementById("leaveType").value,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: "Pending"
    };

    fetch(API_BASE + "/leave", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leave)
    })
    .then(response => {
        if(!response.ok){
            throw new Error();
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            icon: "success",
            title: "Leave Applied!",
            text: "Your leave request has been submitted successfully.",
            confirmButtonColor: "#4f46e5"
        }).then(() => {
            window.location.href = "employee.html";
        });
    })
    .catch(() => {
        Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Unable to apply leave. Please try again."
        });
    });
}
