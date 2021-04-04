let obj = require("readline-sync");
let fs = require("fs");

module.exports.logfile = function () {
  let id = obj.question("Enter id ");
  console.log("You id is " + id);
  debugger;
  let firstname = obj.question("Enter First Name ");
  console.log("You First Name is " + firstname);
  debugger;
  let lastname = obj.question("Enter Last name ");
  console.log("You Last name is " + lastname);
  debugger;
  let gender = obj.question("Enter gender ");
  console.log("You gender is " + gender);
  debugger;
  let salary = obj.question("Entersalary ");
  console.log("You salary is " + salary);
  debugger;
  
  let jsonArray = new Array();
  let data = fs.readFileSync("details.json");       //reading files in json
  if (data.toString()) {
    jsonArray = JSON.parse(data.toString());
  }

  let currentDate = new Date();                   //object to get Date.
  let date =  currentDate.getDate() + "-" +(currentDate.getMonth() + 1) + "-" +   currentDate.getFullYear() + " time : " +  currentDate.getHours() +":" +  currentDate.getMinutes() + ":" + currentDate.getSeconds();
  currentDate.getDate() 

  let jsonObj = {
    id,
    firstname,
    lastname,
    gender,
    salary,
    date,
  };
  jsonArray.push(jsonObj);

  let jsonString = JSON.stringify(jsonArray);
  fs.writeFileSync("details.json", jsonString);           // we write files in to json
  console.log("logs saved");
  debugger;
};