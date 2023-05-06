const Exercise = require('../models/exercise')
const User = require('../models/user')

exports.postExercise = async (req, res, next) => {
    try{
        const id = req.params._id
        const { description, duration, date } = req.body

        const user = await User.findById(id)
        if (!user) {
            res.send(`No user found with this id : ${user}`)
        } else {
            const exerciseObj = new Exercise({
                user_id: user._id,
                username: user.username,
                description, 
                duration, 
                // if date is given, then {new Date(date)}, else Current date {new Date()}
                date: date ? new Date(date) : new Date()
            })
            const exercise = await exerciseObj.save()
            // const username = await User.findOne({username})
    
            res.status(200).json({
                _id: user._id, 
                username: user.username,
                description: exercise.description,
                duration: exercise.duration, 
                // converting it to a date object and then formating it to Datestring
                date: new Date(exercise.date).toDateString()
            })
        }
    }catch(err)
        {console.log(err)
        res.send("Something went wrong")
        }
    next()
}