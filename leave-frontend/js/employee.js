window.onload=function(){

let id=localStorage.getItem("employeeId");

if(id==null){

window.location.href="index.html";

}

document.getElementById("employeeName").innerHTML="Employee";

}