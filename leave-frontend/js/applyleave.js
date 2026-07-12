function applyLeave(){

const employeeId=localStorage.getItem("employeeId");

const leave={

employeeId:employeeId,

leaveType:document.getElementById("leaveType").value,

startDate:document.getElementById("startDate").value,

endDate:document.getElementById("endDate").value,

reason:document.getElementById("reason").value,

status:"Pending"

};
fetch("https://employee-leave-system-ajj1.onrender.com/leave", {

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(leave)

})

.then(response=>{

if(!response.ok){

throw new Error();

}

return response.json();

})

.then(data=>{

Swal.fire({
    icon: "success",
    title: "Leave Applied!",
    text: "Your leave request has been submitted successfully.",
    confirmButtonColor: "#4f46e5"
}).then(() => {

    window.location.href = "employee.html";

});

})

.catch(()=>{

alert("Unable to Apply Leave");

});

}
