let employeeId = localStorage.getItem("employeeId");

window.onload = function () {

    fetch("http://localhost:8080/employees/" + employeeId)

    .then(response => response.json())

    .then(emp => {

        document.getElementById("name").value = emp.name;
        document.getElementById("email").value = emp.email;
        document.getElementById("department").value = emp.department;
        document.getElementById("role").value = emp.role;

    });

}

function updateProfile(){

    const employee = {

        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        department:document.getElementById("department").value,
        role:document.getElementById("role").value,
        password:"1234"

    };

    fetch("http://localhost:8080/employees/" + employeeId,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(employee)

    })

    .then(()=>{
      Swal.fire({
    icon: "success",
    title: "Profile Updated",
    text: "Your profile has been updated successfully.",
    confirmButtonColor: "#4f46e5"
   });
    
    });

}