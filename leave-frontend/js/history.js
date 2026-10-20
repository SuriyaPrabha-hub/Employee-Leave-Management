let allLeaves = [];

window.onload = function () {
    let employeeId = localStorage.getItem("employeeId");
    let role = localStorage.getItem("role");

    if (!employeeId) {
        window.location.href = "index.html";
        return;
    }

    // Admins should use their own dashboard
    if (role === "ADMIN") {
        window.location.href = "admin.html";
        return;
    }

    fetch(API_BASE + "/leave/history/" + employeeId)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load leave history");
            return response.json();
        })
        .then(data => {
            allLeaves = data;
            displayLeaves(data);
        })
        .catch(err => {
            console.error(err);
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to load leave history."
                });
            }
        });
};

function displayLeaves(data) {
    let body = document.getElementById("historyBody");
    body.innerHTML = "";

    if (!data || data.length === 0) {
        body.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">No leave history found</td></tr>`;
        return;
    }

    data.forEach(leave => {
        let status = (leave.status || "Pending").toLowerCase();
        let color = "pending";

        if (status === "approved") {
            color = "approved";
        } else if (status === "rejected") {
            color = "rejected";
        }

        body.innerHTML += `
        <tr>
            <td>${leave.leaveType || "-"}</td>
            <td>${leave.startDate || "-"}</td>
            <td>${leave.endDate || "-"}</td>
            <td>${leave.reason || "-"}</td>
            <td>
                <span class="status-badge ${color}">
                    ${leave.status || "Pending"}
                </span>
            </td>
        </tr>
        `;
    });
}

function searchLeave() {
    let keyword = document.getElementById("search").value.toLowerCase();
    let filtered = allLeaves.filter(l =>
        (l.leaveType && l.leaveType.toLowerCase().includes(keyword)) ||
        (l.reason && l.reason.toLowerCase().includes(keyword)) ||
        (l.status && l.status.toLowerCase().includes(keyword))
    );
    displayLeaves(filtered);
}
