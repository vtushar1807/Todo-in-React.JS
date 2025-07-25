import http from "http";
const server = http.createServer((req,res) => {

    res.end();
});


server.listen(5000, (error)=>{
    if(error)
        console.log(error);
    else
        console.log("Server started at 5000");
})