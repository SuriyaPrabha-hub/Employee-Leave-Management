function registerEmployee(){

    let employee={

        name:document.getElementById("name").value,

        email:document.getElementById("email").value,

        password:document.getElementById("password").value,

        department:document.getElementById("department").value,
         
        role: "EMPLOYEE"


    };

    if(employee.name=="" ||
       employee.email=="" ||
       employee.password=="" ||
       employee.department==""){

        alert("Please fill all fields");

        return;

    }

    fetch("http://localhost:8080/employees/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(employee)

    })

    .then(response=>{

        if(!response.ok){

            throw new Error("Registration Failed");

        }

        return response.json();

    })

    .then(data=>{

       Swal.fire({
    icon: "success",
    title: "Registration Successful",
    text: "Redirecting to Login...",
    confirmButtonColor: "#4f46e5"
}).then(() => {
    window.location.href = "index.html";
});
    })

    .catch(error=>{

      Swal.fire({
    icon: "error",
    title: "Registration Failed",
    text: "Please try again.",
    confirmButtonColor: "#ef4444"
});      

    });

}