function login(){

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

fetch("http://localhost:8080/employees/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email:email,

password:password

})

})

.then(response=>{

if(!response.ok){

throw new Error();

}

return response.json();

})

.then(data=>{

if(data.role==="ADMIN"){

window.location.href="admin.html";

}else{

localStorage.setItem("employeeId",data.id);

window.location.href="employee.html";

}

})

.catch(()=>{
Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: "Invalid Email or Password"
});
});

}