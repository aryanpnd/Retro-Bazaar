const { User } = require('../../model/user');


// // get the User data
const getUserInfo = async (req, res) => {
    await User.findOne({ email: req.session.passport.user.email }).then((data) => {
        res.status(200).json({ data: data });
    }).catch((err) => { res.status(200).send("some error occurred while fetching the data") })
}


// // Signout the User (destroying session)
const signOutUser = (req, res) => {
    try {
        req.session.destroy(function (err) {
            res.status(200).send({ message: 'User signout successfully' });
        });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out user' });
    }
}



module.exports = { getUserInfo,signOutUser }