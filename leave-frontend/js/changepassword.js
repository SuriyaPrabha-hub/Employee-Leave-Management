let employeeId = localStorage.getItem("employeeId");

function changePassword(){

    let current = document.getElementById("currentPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    if(newPassword !== confirm){

        Swal.fire({
            icon:"error",
            title:"Passwords do not match"
        });

        return;
    }

    fetch("http://localhost:8080/employees/changePassword/" + employeeId,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            password:newPassword
        })

    })

    .then(response=>response.json())

    .then(()=>{

        Swal.fire({
            icon:"success",
            title:"Password Updated Successfully"
        });

        document.getElementById("currentPassword").value="";
        document.getElementById("newPassword").value="";
        document.getElementById("confirmPassword").value="";

    });

}