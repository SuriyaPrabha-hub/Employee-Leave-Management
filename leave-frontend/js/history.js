let allLeaves=[];

window.onload=function(){

let employeeId=localStorage.getItem("employeeId");
alert("Employee ID = " + employeeId);
fetch("https://employee-leave-system-ajj1.onrender.com/leave/history/" + employeeId)
.then(response=>response.json())

.then(data=>{

allLeaves=data;

displayLeaves(data);

});

}

function displayLeaves(data){

let body=document.getElementById("historyBody");

body.innerHTML="";

data.forEach(leave=>{

let color="pending";

if(leave.status==="Approved"){

color="approved";

}

if(leave.status==="Rejected"){

color="rejected";

}

body.innerHTML+=`

<tr>

<td>${leave.leaveType}</td>

<td>${leave.startDate}</td>

<td>${leave.endDate}</td>

<td>${leave.reason}</td>

<td>

<span class="status-badge ${color}">

${leave.status}

</span>

</td>

</tr>

`;

});

}

function searchLeave(){

let keyword=document.getElementById("search").value.toLowerCase();

let filtered=allLeaves.filter(l=>

l.leaveType.toLowerCase().includes(keyword)

);

displayLeaves(filtered);

}
