const mongoose = require('mongoose')
const { unique } = require('next/dist/build/utils')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})


userSchema.statics.signup = async function(email, password){
    const exists = await this.findOne({email}) 

    if(!email || !password){
        throw Error("All feilds are mandatory")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("passowrd is not strong")
    }

    if (exists){
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, slat)

    const user = await this.create({email,password: hash})

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


exports.mongoose = mongoose.model('user', userSchema)