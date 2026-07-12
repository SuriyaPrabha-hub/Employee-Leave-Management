window.onload=function(){

fetch("http://localhost:8080/admin/dashboard")

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