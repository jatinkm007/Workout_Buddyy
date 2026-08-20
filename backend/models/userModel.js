const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.signup = async function(username, email, password){
    // Check if email or username already exists
    const exists = await this.findOne({ $or: [{ email }, { username }] }) 

    if(!username || !email || !password){
        throw Error("All fields are mandatory")
    }

    if (exists){
        throw Error('Email or Username already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash})

    return user
}

// Static login method

userSchema.statics.login = async function (email, password) {

    if(!email || !password){
        throw Error("All feilds are mandatory")
    }

    const user = await this.findOne({email}) 


    if (!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user;
}


module.exports = mongoose.model('user', userSchema)