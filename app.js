const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require("cors")
const CategorieRouter =require("./routes/categorie.route")
const ScategorieRouter =require("./routes/scategorie.route")
const articles =require("./routes/article.route")
const chatbotRouter=require("./routes/chatbot.route")
const userRouter = require("./routes/user.route")
const chatbotRequeteRouter = require("./routes/chatbot-requete.route")
const paymentRouter =require("./routes/payment.route.js");
const app = express ()
app.use (express.json())
app.use(cors())
dotenv.config()
app.get('/',(req,res)=>{
    res.send("Bienvenue dans notre site ")
})
// connexion a la base de données
mongoose.connect(process.env.DATABASECLOUD)

.then(()=>{ console.log("Connexion a la base de donnéesr réussit")})
.catch(()=>{ console.log("Impossible de se connecter a la base de données",error)
    process.exit()
})

app.use("/api/categories",CategorieRouter)
app.use("/api/scategories", ScategorieRouter)
app.use("/api/articles",articles)
app.use("/api/chat",chatbotRouter)
app.use("/api/users",userRouter)
app.use('/api/chatbot', chatbotRequeteRouter);
app.use('/api/payment', paymentRouter);
app.listen(4000,()=>{
    console.log(`Serveur is listen on port ${process.env.PORT}`)
})
module.exports=app ;