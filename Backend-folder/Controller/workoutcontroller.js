const { default: mongoose } = require("mongoose")
const Workout = require("../model/workout")

//get routes
const GetUser = async(req, res) =>{
    const workout = await Workout.find().sort({createdAt : -1})

    try {
        res.status(201).json({message: "data found Sucessfully",
        data : workout
    
    })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//get Single workout
const GetOneUser = async(req, res) =>{
const {id } = req.params
const  workout = await Workout.findById(id)

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such workout"})
}
if (!workout){
    return res.status(404).json({error : "No such workout"})
}
res.status(200).json({msg: workout})
}

//post a new workout
const postUser = async (req, res) =>{
    const {title , reps, load} = req.body

    let emptyFeilds = []

    if(!title){
        emptyFeilds.push("title")
    }

    if(!reps){
        emptyFeilds.push("reps")
    }

    if(!load){
        emptyFeilds.push("load")
    }

    if(emptyFeilds.length > 0 ){
        return res.status(400).json({error : "please fill the empty feilds", emptyFeilds})
    }

    try {
        const workout = await Workout.create({
            title , reps, load  
        })
        res.status(200).json({
            data: workout
        })
    } catch (err) {
        res.status(400).json(err.message)
    }

}

//delete a workout
const DeleteUser = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id : id})

    if (!workout){
        return res.status(400).json({error : "No such workout"})
    }
    res.status(200).json(workout)
}

//update a workout
const PatchUser = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!workout){
        return res.status(404).json({error : "No such workout"})
    }
    res.status(200).json(workout)
}

module.exports = {
    postUser,
    GetOneUser,
    GetUser,
    DeleteUser,
    PatchUser
}