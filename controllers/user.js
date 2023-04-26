const bcrypt = require('bcrypt');
const crypto = require('crypto');

require('dotenv').config();

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);
        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, userName, userId: users[0].id });
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

// signup function
const signup = async(req, res) => {
    try {
        const { fullName, userName, phone, password, avatarURL } = req.body;
        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);
        res.status(200).json({ name, userId, hashedPassword, phone });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}


const signupG = async(req, res) => { res.send('Hello, World! in signup'); }
const loginG = async(req, res) => { res.send('Hello, World! in login'); }

// export login and signup
module.exports = { signup, login, signupG, loginG }