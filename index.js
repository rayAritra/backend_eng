import express from "express"

const app = express();
const port = 3000;

app.get("/",(req, res)=>{
    res.send("hello from aritra")
})
app.get("/ice-tea",(req, res)=>{
    res.send("what ic-tea would you prefer?")
})
app.get("/ice-cofee",(req, res)=>{
    res.send("drink ice-cofee and do nothing")
})

app.use(express.json())

let teaData =[]
let nextId =1


// add a new tea
app.post('/teas',(req,res) => {
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})


//get all the teas
app.get("/teas",(req, res)=> {
    res.status(200).send(teaData)
})


// get a tea with id
app.get('/teas/:id',(req,res)=>{
   const tea = teaData.find(t => t.id == parseInt(req.params.id));

   if(!tea){
    returnres.status(404).send("tea not found")
   }
   res.status(200).send(tea)
})


// update tea

app.put('/teas/:id',(req,res)=> {
  
  const tea = teaData.find(t => t.id == parseInt(req.params.id));
  if(!tea){
    returnres.status(404).send("tea not found")
   }

   const {name,price} = req.body
   tea.name = name
   tea.price = price
   res.send(200).send(tea)
})



// deleat tea

app.delete('/teas/:id',(req,res)=> {
    const index = teaData.findIndex( t => t.id==parseInt(req.params.id))
     
    if(index === -1){
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(204).send('deleated')
})
app.listen(port , ()=> {
    console.log(`Server is running at port: ${port}....`);
    
})