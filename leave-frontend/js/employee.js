window.onload = function(){

    let id = localStorage.getItem("employeeId");

    if(id == null){
        window.location.href = "index.html";
        return;
    }

    // Fetch employee name
    fetch(API_BASE + "/employees/" + id)
    .then(response => response.json())
    .then(emp => {
        document.getElementById("employeeName").innerHTML = emp.name;
    })
    .catch(() => {
        document.getElementById("employeeName").innerHTML = "Employee";
    });

    // Fetch leave history for dashboard stats
    fetch(API_BASE + "/leave/history/" + id)
    .then(response => response.json())
    .then(data => {
        let total = data.length;
        let pending = data.filter(l => (l.status || "").toLowerCase() === "pending").length;
        let approved = data.filter(l => (l.status || "").toLowerCase() === "approved").length;
        let rejected = data.filter(l => (l.status || "").toLowerCase() === "rejected").length;

        document.getElementById("totalLeave").innerHTML = total;
        document.getElementById("pending").innerHTML = pending;
        document.getElementById("approved").innerHTML = approved;
        document.getElementById("rejected").innerHTML = rejected;

        // Show recent leaves in table (last 5)
        let table = document.getElementById("historyTable");
        table.innerHTML = "";
        data.slice(-5).reverse().forEach(leave => {
            let s = (leave.status || "Pending").toLowerCase();
            let color = "pending";
            if(s === "approved") color = "approved";
            if(s === "rejected") color = "rejected";
            table.innerHTML += `
                <tr>
                    <td>${leave.leaveType}</td>
                    <td>${leave.startDate}</td>
                    <td>${leave.endDate}</td>
                    <td><span class="status ${color}">${leave.status}</span></td>
                </tr>
            `;
        });
    });
}