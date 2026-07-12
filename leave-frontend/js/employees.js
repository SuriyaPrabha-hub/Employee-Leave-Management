let allEmployees = [];

window.onload = function () {
    loadEmployees();
};

function loadEmployees() {

    fetch("https://employee-leave-system-ajj1.onrender.com/employees")
        .then(response => response.json())
        .then(data => {

            allEmployees = data;
            displayEmployees(data);

        })
        .catch(() => {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load employees."
            });

        });

}

function displayEmployees(data) {

    let table = document.getElementById("employeeBody");

    table.innerHTML = "";

    data.forEach(emp => {

        table.innerHTML += `

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>${emp.role}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${emp.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

function searchEmployee() {

    let keyword = document.getElementById("search").value.toLowerCase();

    let filtered = allEmployees.filter(emp =>

        emp.name.toLowerCase().includes(keyword) ||

        emp.department.toLowerCase().includes(keyword) ||

        emp.role.toLowerCase().includes(keyword)

    );

    displayEmployees(filtered);

}

function deleteEmployee(id) {

    Swal.fire({

        title: "Delete Employee?",
        text: "You won't be able to recover this employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Delete"

    }).then((result) => {

        if (result.isConfirmed) {

            fetch("https://employee-leave-system-ajj1.onrender.com/employees/" + id, {

                method: "DELETE"

            })

            .then(() => {

                Swal.fire({

                    icon: "success",
                    title: "Deleted!",
                    text: "Employee deleted successfully.",
                    confirmButtonColor: "#22c55e"

                });

                loadEmployees();

            });

        }

    });

}

function exportExcel() {

    const table = document.getElementById("employeeTable");

    const workbook = XLSX.utils.table_to_book(table, {

        sheet: "Employees"

    });

    XLSX.writeFile(workbook, "Employees.xlsx");

}
