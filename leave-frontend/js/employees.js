let allEmployees = [];

// Load Employees
window.onload = function () {
    loadEmployees();
};

// Function to Load Employees
function loadEmployees() {

    fetch("http://localhost:8080/employees")
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

// Display Employees
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

// Search Employee
function searchEmployee() {

    let keyword = document.getElementById("search").value.toLowerCase();

    let filtered = allEmployees.filter(emp =>

        emp.name.toLowerCase().includes(keyword) ||

        emp.department.toLowerCase().includes(keyword) ||

        emp.role.toLowerCase().includes(keyword)

    );

    displayEmployees(filtered);

}

// Delete Employee
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

            fetch("http://localhost:8080/employees/" + id, {

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

// Export Excel
function exportExcel() {

    const table = document.getElementById("employeeTable");

    const workbook = XLSX.utils.table_to_book(table, {

        sheet: "Employees"

    });

    XLSX.writeFile(workbook, "Employees.xlsx");

}