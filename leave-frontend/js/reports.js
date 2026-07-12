window.onload = function () {

    fetch("http://localhost:8080/leave")
        .then(response => response.json())
        .then(data => {

            let approved = 0;
            let pending = 0;
            let rejected = 0;

            data.forEach(leave => {

                if (leave.status === "Approved") {
                    approved++;
                }
                else if (leave.status === "Pending") {
                    pending++;
                }
                else if (leave.status === "Rejected") {
                    rejected++;
                }

            });

            document.getElementById("totalLeaves").innerHTML = data.length;
            document.getElementById("approved").innerHTML = approved;
            document.getElementById("pending").innerHTML = pending;
            document.getElementById("rejected").innerHTML = rejected;

            createChart(approved, pending, rejected);

        })

        .catch(() => {
            alert("Unable to load report");
        });

}
function createChart(approved, pending, rejected) {

    const ctx = document.getElementById("leaveChart");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Approved",
                "Pending",
                "Rejected"
            ],

            datasets: [{

                label: "Leave Requests",

                data: [
                    approved,
                    pending,
                    rejected
                ],

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
                    text: "Leave Status Report"
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
