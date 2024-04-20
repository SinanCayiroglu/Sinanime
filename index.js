const express = require("express")
const ejs = require("ejs")
const axios = require("axios")

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/",async(req,res)=>{
    const response = await axios.get("https://api.cloudyflare.workers.dev/home")
    const result = response.data.results.anilistTrending
    res.render("index.ejs",{data:result})
})

app.get("/search",async(req,res)=>{
    try{
        const query = req.query.search
        const response = await axios.get("https://api.cloudyflare.workers.dev/search/"+query)
        const result = response.data.results
        res.render("index.ejs",{search:result,query})
    }catch(error){
        console.error(error)
    }
})

app.get("/anime/:id",async(req,res)=>{
    const id = req.params.id
    const response = await axios.get("https://api.cloudyflare.workers.dev/anime/"+id)
    const result = response.data.results
    console.log(result)
    res.render("anime.ejs",{anime:result,id:id})
})

app.get("/episode/:id",async(req,res)=>{
    const id = req.params.id
    const response = await axios.get("https://api.cloudyflare.workers.dev/episode/"+id)
    const result = response.data.results
    console.log(result)
    res.render("episode.ejs",{episode:result,id:id})
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})