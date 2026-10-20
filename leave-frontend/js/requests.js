let allLeaves = [];

window.onload = function () {
    // Auth check - admin only
    if (localStorage.getItem("role") !== "ADMIN") {
        window.location.href = "index.html";
        return;
    }
    loadLeaves();
};

function loadLeaves() {
    fetch(API_BASE + "/leave")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch leaves");
            }
            return response.json();
        })
        .then(data => {
            allLeaves = data;
            displayLeaves(data);
        })
        .catch(err => {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load leave requests. Please ensure backend is running."
            });
        });
}

function displayLeaves(data) {
    let table = document.getElementById("leaveTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #64748b;">No leave requests found</td></tr>`;
        return;
    }

    data.forEach(leave => {
        let statusNormalized = (leave.status || "Pending").toLowerCase();
        let color = "pending";

        if (statusNormalized === "approved") {
            color = "approved";
        } else if (statusNormalized === "rejected") {
            color = "rejected";
        }

        table.innerHTML += `
        <tr>
            <td>${leave.id}</td>
            <td>${leave.employeeId}</td>
            <td>${leave.leaveType || "-"}</td>
            <td>${leave.startDate || "-"}</td>
            <td>${leave.endDate || "-"}</td>
            <td>
                <span class="status ${color}">
                    ${leave.status}
                </span>
            </td>
            <td>
                <button class="approve-btn" onclick="approveLeave(${leave.id})" title="Approve">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="pending-btn" onclick="pendingLeave(${leave.id})" title="Pending">
                    <i class="fa-solid fa-clock"></i>
                </button>
                <button class="reject-btn" onclick="rejectLeave(${leave.id})" title="Reject">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </td>
        </tr>
        `;
    });
}

function searchLeave() {
    let keyword = document.getElementById("search").value.toLowerCase();
    let filtered = allLeaves.filter(leave =>
        (leave.leaveType && leave.leaveType.toLowerCase().includes(keyword)) ||
        (leave.status && leave.status.toLowerCase().includes(keyword)) ||
        (leave.employeeId && String(leave.employeeId).includes(keyword))
    );
    displayLeaves(filtered);
}

function approveLeave(id) {
    fetch(API_BASE + "/leave/approve/" + id, {
        method: "PUT"
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to approve");
        return response.json();
    })
    .then(() => {
        Swal.fire({
            icon: "success",
            title: "Leave Approved",
            text: "The leave request has been approved successfully.",
            confirmButtonColor: "#22c55e"
        }).then(() => {
            loadLeaves();
        });
    })
    .catch(err => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to approve leave request."
        });
    });
}

function rejectLeave(id) {
    fetch(API_BASE + "/leave/reject/" + id, {
        method: "PUT"
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to reject");
        return response.json();
    })
    .then(() => {
        Swal.fire({
            icon: "warning",
            title: "Leave Rejected",
            text: "The leave request has been rejected.",
            confirmButtonColor: "#ef4444"
        }).then(() => {
            loadLeaves();
        });
    })
    .catch(err => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to reject leave request."
        });
    });
}

function pendingLeave(id) {
    fetch(API_BASE + "/leave/pending/" + id, {
        method: "PUT"
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to mark pending");
        return response.json();
    })
    .then(() => {
        Swal.fire({
            icon: "info",
            title: "Leave Pending",
            text: "The leave request status is set to Pending.",
            confirmButtonColor: "#f59e0b"
        }).then(() => {
            loadLeaves();
        });
    })
    .catch(err => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update leave request."
        });
    });
}
