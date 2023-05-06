const User = require('../models/user')

exports.userGet = async (req, res, next) => {
    const allUser = await User.find() //returns all docs


    res.status(200).json(allUser)
    next()
}



exports.userPost = async (req, res, next) => {
    const username = req.body.username    //gives username provided in the form
    try{
        // check if username exists, if Yes, send json res
        const foundUser = await User.findOne({username})
        if (foundUser) {
            return res.json(foundUser)
        }

        // if no username found, create new user
        const userObj = new User({
            username: username
        })
        
        // and save
        const user = await userObj.save()
        console.log(user)

        // and send json response
        res.json(user)
    }catch(err) {
        console.log(err)
    }
    
    next()
}