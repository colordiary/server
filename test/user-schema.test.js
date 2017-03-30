const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const assert = require('chai').assert;
const User = require('../lib/models/user');

describe('testing the user schema', () => {
        const testOne = new User({ 
            username: 'colordiary',
            email: 'not correct email format',
            password: 'password',
        })
        const testTwo = new User({ 
            username: 'testTwo',
            email: 'colordiary@gmail.com',
            password: 'password',
        })
    
    it('validates email and username', () => {

        //validtor returns true or false, in this case we are purposely setting it to false to test
        const emailVal = validator.isEmail(testOne.email);

        //validator returns true or false, in this case we are purposely setting it to true
        const usernameVal = validator.isAlpha(testOne.username)

        //username should be true since it is not not empty
        assert.isTrue(usernameVal)

        //emailVail should be false since it is not in email format
        assert.isFalse(emailVal)

    })

    it('saves new user and assigns hash and user id, checks if properties are correct', () => {
        //username matches
        assert.equal(testTwo.username, 'testTwo')

        //email matches
        assert.notEqual(testTwo.username, 'colordiary@gmail.com')

        //checking to see if the new user object is getting saved and assigned a hased password and id
        assert.isDefined(testTwo._id)
        assert.isDefined(testTwo.hash)
    })

    it('sets hash from password and compares correctly', () => {
        const testThree = { username: 'colordiary', email: 'colordiary@gmail.com', password: 'colorzRcool' };
        const user = new User(testThree);
        
        //password is undefined but the hash is
        assert.isUndefined(user.password);
        assert.isDefined(user.hash);
        
        //correct password comparison
        assert.isTrue(user.comparePassword('colorzRcool'));
        assert.isFalse(user.comparePassword('this is not the password'));
        
        //testThree password is user password
        assert.isTrue(user.comparePassword(testThree.password));
        assert.notEqual(user.hash, testThree.password);
    })
});