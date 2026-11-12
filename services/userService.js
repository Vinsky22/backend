import * as userModel from '../models/userModel.js';
import ValidationError from '../utils/ValidationError.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const doesUserExist = async(email) =>{
    const existing = await userModel.findUserByEmail(email);

    if(existing.length > 0){
        return {result: true, user: existing[0]};
    }
    
    return {result: false, user: undefined};
}

export const createAccount = async(user) =>{
    if(!user.name || !user.email || !user.password){
        throw new ValidationError(400, 'Name, email and password is required!');
    }

    if(!validator.isEmail(user.email)){
        throw new ValidationError(400, 'Improper email format');
    }

    if(!validator.isStrongPassword(user.password)){
        throw new ValidationError(400, 'Weak password, not strong enough');
    }

    const existing = await doesUserExist(user.email);

    if(existing.result){
        throw new ValidationError(400, 'An account with that email already exist')
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const result = await userModel.insert(user.name, user.email, hashedPassword);

    if(!result || result <= 0){
        throw new Error('unable to create an account. Please try again later.')
    }

    return 'Account created successfully';
}

export const login = async(user) =>{
    if(!user.email || !user.password){
        throw new ValidationError(400, 'email and password is required!');
    }
    
    const existing = await doesUserExist(user.email);

    if(!existing.result){
        throw new ValidationError(400, 'An account with that email does not exist')
    }

    const isCorrectPassword = await bcrypt.compare(user.password, existing.user.password);

    if(!isCorrectPassword){
        throw new Error('Incorrect Password');
    }

    return 'Login successfully!';
}