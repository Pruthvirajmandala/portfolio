let fs= require("fs")
let http =require("http");
let url=require("url");
let port = 8000;

// task planner &remove task
let taskPlanner = `
    <h1 style="color:blue;">Task-Planner<h1/>
    <h3 style="color:skyblue;">Mention Task to do<h3/>
    <form action="/store" method="get">
        <label> Employee Id</label>
        <input type="text" name="eId"/><br/>
        <label> Task </label>
        <input type="text" name="task"/><br/>
        <label> Task Id </label>
        <input type="text" name="tId"/><br/>
        <label>Deadline</label>
        <input type ="date" name="deadline"/><br/>
        <input type="submit" value="Save Task"/>
        <input type="reset" value="reset"/>
    </form>

    <h2 style="color:orange;">Remove completed Tasks</h2>
    <form action="/remove" method="get">
        <label>Task Id</label>
        <input type="text" name="tId"/><br/>
        <input type="submit" value="Remove Task"/>
        <input type="reset" value="reset"/>
    </form>

    <h2 style="color:lightgreen;">All Tasks</h2>
    <form action="/alltasks" method="get">         
          <input type="submit" value="All Tasks" /> 
    </form>    
    `
    //table to display
    let tableColumn =`
    <table style="border:solid">
        <thead>
        <th>Employee Id</th>
        <th>Task</th>
        <th>Task Id</th>
        <th>Deadline</th>
        </thead>
     </table> 
    `
    let server = http.createServer((req,res)=>{
        console.log(req.url)
        res.setHeader("content-type","text/html");
        res.write(taskPlanner);
        
        if(req.url !="/favicon.ico"){
            var pathInfo = url.parse(req.url,true).pathname;
            if(pathInfo=="/store"){
                console.log("save")
                let data =url.parse(req.url,true).query;
                let canAdd =true;
                let tasks = getTasks();
                for (var i in tasks){
                    if(tasks[i].tid == data.tId){
                        canAdd = false;
                    }
                }
            if (canAdd){
                console.log(canAdd)
                let task =makeJSON(data.eId,data.task,data.tId,data.deadline);
                tasks.push(task)
                console.log(tasks)
                var tasksString = JSON.stringify(tasks);
                fs.writeFileSync("task.json",tasksString);
            }
            }else if(pathInfo=="/remove"){
                let data = url.parse(req.url,true).query;
                let tasks = getTasks();
                for (var i in tasks){
                    if(tasks[i].tId == data.tId){
                        tasks.splice(i,1);
                    }
                }
                console.log(tasks)
                var tasksString =JSON.stringify(tasks);
                fs.writeFileSync("task.json",tasksString);
           
            }else if(pathInfo == "/alltasks"){
                let tasks = getTasks()
                let tData = ``
                
                for (var i in tasks){
                    tData +=`
                        <tr style="border:solid">
                            <td>${tasks[i].eId}</td>
                            <td>${tasks[i].task}</td>
                            <td>${tasks[i].tId}</td>
                            <td>${tasks[i].deadline}</td><br/>
                         </tr>
                    `
                }
                res.write(tableColumn)
                res.write(tData)
                res.write(`</table>`)
            }
            res.end();
        }
    });
            
   server.listen(port,()=>console.log(`Server running on port number ${port}`));

   function makeJSON(eId,task,tId,deadline){
       return {"eId":eId, "task":task , "tId":tId , "deadline":deadline};
   }
   function getTasks(){
       let  tasks = new Array();
       try{
           let taskData = fs.readFileSync("task.json");
           let jsonString = taskData.toString();
           let json = JSON.parse(jsonString);
           tasks = [];
           for(var i in json){
               tasks.push(json[i]);
           }
           return tasks;
       }   catch (error){
           return tasks;
       }
   }