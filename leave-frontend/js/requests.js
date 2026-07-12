let allLeaves = [];

window.onload = function () {
    loadLeaves();
};

function loadLeaves() {

    fetch("http://localhost:8080/leave")
        .then(response => response.json())
        .then(data => {

            allLeaves = data;
            displayLeaves(data);

        })
        .catch(() => {
            alert("Unable to load leave requests");
        });

}

function displayLeaves(data) {

    let table = document.getElementById("leaveTable");

    table.innerHTML = "";

    data.forEach(leave => {

        let color = "pending";

        if (leave.status === "Approved") {
            color = "approved";
        }

        if (leave.status === "Rejected") {
            color = "rejected";
        }

        table.innerHTML += `

        <tr>

            <td>${leave.id}</td>
            <td>${leave.employeeId}</td>
            <td>${leave.leaveType}</td>
            <td>${leave.startDate}</td>
            <td>${leave.endDate}</td>

            <td>
                <span class="status ${color}">
                    ${leave.status}
                </span>
            </td>

            <td>

    <button class="approve-btn"
    onclick="approveLeave(${leave.id})">

        <i class="fa-solid fa-check"></i>

    </button>
    <button class="pending-btn"
        onclick="pendingLeave(${leave.id})"
        title="Pending">

        <i class="fa-solid fa-clock"></i>

    </button>

    <button class="reject-btn"
    onclick="rejectLeave(${leave.id})">

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
        leave.leaveType.toLowerCase().includes(keyword)
    );

    displayLeaves(filtered);

}

function approveLeave(id) {

    fetch("http://localhost:8080/leave/approve/" + id, {
        method: "PUT"
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

}); 
}

function rejectLeave(id) {

    fetch("http://localhost:8080/leave/reject/" + id, {
        method: "PUT"
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

}); 
}
function pendingLeave(id){

    fetch("http://localhost:8080/leave/pending/" + id, {
        method: "PUT"
    })
    .then(() => {

    Swal.fire({
        icon: "pending",
        title: "Leave Pending",
        text: "The leave request has been pending.",
        confirmButtonColor: "#efca44"
    }).then(() => {

        loadLeaves();

    });

});

}