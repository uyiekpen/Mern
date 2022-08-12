require("dotenv").config()
const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const workoutRoutes = require("./Routes/workout")
const cors = require("cors")

//middleware
app.use(express.json())
app.use(cors())
app.use((req, res , next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api", workoutRoutes)

//connect to db
mongoose.connect(process.env.URL)
.then(()=> {
//listen to request
    app.listen(process.env.PORT , () => {
        console.log(` connected to db and listening on port 2345`)
    })
})
.catch((error) => {
    console.log(error)
})


