// // const http=require('http');
// // var calculate = require("./calculator")

// // const server=http.createServer((req,res)=>{
// //     res.writeHead(200,{"content-Type":"text/html"});
// //     // res.end("<h1>Hello World<h2>")
// //     res.end(calculate.add(10,20))
// // });
// // server.listen(3000,()=>{
// //     console.log("Server running at http://127.0.0.1:3000/")
// // });

// const fs = require('fs')
// const newPerson  = {
//     naem:"john",
//     age:35,
//     city:"New York",
//     amount : 1500
// }

// fs.readFile('sample.json','utf8',(err,data) => {
//     if(err){
//         console.log(err)
//         return 
//     }
//     const json = JSON.parse(data)
//     const newList = {...json,newPerson}
//     console.log(json);
// })

const fs = require('fs'); 
const http = require('http'); 

const arrayOfObjects = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

fs.writeFile('sample.json', JSON.stringify(arrayOfObjects, null, 2), (err) => {
  if (err) {
    console.log('Error writing to sample.json:', err);
  } else {
    console.log('Array has been successfully written to sample.json!');
  }
});

fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading input.txt:', err);
  } else {
    console.log('Content of input.txt:', data);

    const server = http.createServer((req, res) => {
      if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Content from input.txt</h1><pre>${data}</pre>`);
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Page Not Found</h1>');
        res.end();
      }
    });

    server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  }
});
