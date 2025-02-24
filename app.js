const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const CategorieRouter =require("./routes/categorie.route")
const ScategorieRouter =require("./routes/scategorie.route")
const articles =require("./models/article")
const chatbotRouter=require("./routes/chatbot.route")
const app = express ()
app.use (express.json())
dotenv.config()
app.get('/',(req,res)=>{
    res.send("Bienvenue dans notre site ")
})
// connexion a la base de données
mongoose.connect(process.env.DATABASECLOUD)
.then(()=>{ console.log("Connexion a la base de donnéesréussit")})
.catch(()=>{ console.log("Impossible de se connecter a la base de données",error)
    process.exit()
})
app.use("/api/categories",CategorieRouter)
app.use("/api/scategories", ScategorieRouter)
app.use("/api/articles",articles)
app.use("/api/chat",chatbotRouter)

app.listen(4000,()=>{
    console.log(`Serveur is listen on port ${process.env.PORT}`)
})
module.exports=app ; 