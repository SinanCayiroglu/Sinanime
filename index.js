const express = require("express")
const ejs = require("ejs")
const axios = require("axios")

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",async(req,res)=>{
    try{const response = await axios.get("http://api3.sinanime.workers.dev/home")
    const result = response.data.results.anilistTrending
    res.render("index.ejs",{data:result})}
    catch(error){
        console.error(error)
    }
})

app.get("/popular",async(req,res)=>{
    try{const response = await axios.get("http://api3.sinanime.workers.dev/home")
    const result = response.data.results.gogoPopular
    res.render("popular.ejs",{data:result})}
    catch(error){
        console.error(error)
    }
})

app.get("/search",async(req,res)=>{
    try{
        const query = req.query.search
        const response = await axios.get("https://api3.sinanime.workers.dev/search/"+query)
        const result = response.data.results
        res.render("index.ejs",{search:result,query})
    }catch(error){
        console.error(error)
    }
})

app.get("/anime/:id",async(req,res)=>{
    try{const id = req.params.id
    const response = await axios.get("https://api3.sinanime.workers.dev/anime/"+id)
    const result = response.data.results
    res.render("anime.ejs",{anime:result,id:id})}
    catch(error){
        console.error(error)
    }
})

app.get("/anime/:animeID/episode/:episodeID",async(req,res)=>{
    try{const animeID = req.params.animeID
        const episodeID = req.params.episodeID
    const response = await axios.get("https://api3.sinanime.workers.dev/episode/"+episodeID)
    const result = response.data.results
    const response2 = await axios.get("https://api3.sinanime.workers.dev/anime/"+animeID)
    const result2 = response2.data.results
    res.render("episode.ejs",{episode:result,anime:result2,animeID:animeID,episodeID:episodeID})}
    catch(error){
        console.error(error)
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})