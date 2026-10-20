window.onload = function () {
    // Auth check - admin only
    if (localStorage.getItem("role") !== "ADMIN") {
        window.location.href = "index.html";
        return;
    }

    fetch(API_BASE + "/leave")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch leaves");
            return response.json();
        })
        .then(data => {
            let approved = 0;
            let pending = 0;
            let rejected = 0;

            data.forEach(leave => {
                let status = (leave.status || "").toLowerCase();
                if (status === "approved") {
                    approved++;
                } else if (status === "pending") {
                    pending++;
                } else if (status === "rejected") {
                    rejected++;
                }
            });

            document.getElementById("totalLeaves").innerHTML = data.length;
            document.getElementById("approved").innerHTML = approved;
            document.getElementById("pending").innerHTML = pending;
            document.getElementById("rejected").innerHTML = rejected;

            createChart(approved, pending, rejected);
        })
        .catch(err => {
            console.error(err);
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to load reports data."
                });
            } else {
                alert("Unable to load reports data.");
            }
        });
};

function createChart(approved, pending, rejected) {
    const canvas = document.getElementById("leaveChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Approved", "Pending", "Rejected"],
            datasets: [{
                label: "Leave Requests",
                data: [approved, pending, rejected],
                backgroundColor: [
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444"
                ],
                borderRadius: 10,
                borderSkipped: false,
                barThickness: 60
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Leave Status Overview",
                    font: {
                        size: 16,
                        weight: '600'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}
