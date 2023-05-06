const User = require('../models/user')
const Exercise = require('../models/exercise')

// getting all logs of a user
exports.getLog = async (req, res, next) => {
    try{
        // defining while destructuring queries from request 
        const { from, to, limit } = req.query
        // getting id of the user
        const id = req.params._id
        // finding with the given id in the User collection
        const user = await User.find({}).select('_id')

        // check if user exists
        if(!user) {
            return res.send(`No user found with id ${user}`)
        }

        // if yes, then made an object, find same named query and apply mongo frim, to and limit query
        let dateObj = {}
        if(from) {
            dateObj['$gte'] = new Date(from)
        }
        if(to) {
            dateObj['$lte'] = new Date(to)
        }
        // defining filter variable, based on user id
        let filter = {
            user_id: id
        }
        // filtering from or to or both, and then remaining date will be saved in the dateObj variable
        if(from || to) {
            filter.date = dateObj
        }

        // finding logs in exercise collection with the filtered date, {using "+" to parse ot from string } if limit is null, then useing 500 as a limit (no of logs to show)
        const exercises = await Exercise.find(filter).limit(+limit ?? 500)

        // mapping the log data, which makes the whole output aligned
        const log = exercises.map(e => ({
            description: e.description,
            duration: e.duration,
            // not using "new Date()" but e.date {while in a fn.} and converting it to Date String
            date: e.date.toDateString(),

        }))

        // sending response in in json
        res.json({
            username: user.username,
            count: exercises.length,
            _id: user._id,
            log 
        })

    }catch(err){
        console.log(err)
    }
    next()
}