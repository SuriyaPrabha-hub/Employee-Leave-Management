window.onload=function(){

fetch("https://employee-leave-system-ajj1.onrender.com/admin/dashboard")

.then(response=>response.json())

.then(data=>{

document.getElementById("employees").innerHTML=data.totalEmployees;

document.getElementById("leaves").innerHTML=data.totalLeaves;

document.getElementById("approved").innerHTML=data.approvedLeaves;

document.getElementById("pending").innerHTML=data.pendingLeaves;

document.getElementById("rejected").innerHTML=data.rejectedLeaves;

})

.catch(()=>{

alert("Unable to Load Dashboard");

});

}
