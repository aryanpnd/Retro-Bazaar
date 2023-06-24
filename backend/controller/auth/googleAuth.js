// google auth data access layer 

const { User } = require("../../model/user");

const googleAuthDal = {
    registerWithGoogle: async (oauthUser) => {
        const isUserExists = await User.findOne({
            accountId: oauthUser.id,
            provider: oauthUser.provider,
        });
        if (!isUserExists) {
            const isNewUser = await User.findOne({
                email:oauthUser.email
            });
            if(!isNewUser){
                const user = new User({
                    accountId: oauthUser.id,
                    name: oauthUser.displayName,
                    provider: oauthUser.provider,
                    email: oauthUser.emails[0].value, //optional - storing it as extra info
                    photoURL: oauthUser.photos[0].value, //optional
                });
                await user.save();
                const success = {
                    message: 'User Registered.',
                };
                return { success };
            }
            else{
                const failure = {
                    message: 'User already Registered.',
                };
                return { failure };

            }
        }else{
            const success = {
                message: 'Wellcome',
            };
            return { success };
        }


    },

    // loginUser: async (oauthUser) => {
    //   const userExists = await User.findOne({ email: oauthUser.emails[0].value });
    //   if (userExists) {
    //     const success = {
    //       message: 'User successfully logged In.',
    //     };
    //     return { success };
    //   }
    //   const failure = {
    //     message: 'Email not Registered. You need to sign up first',
    //   };
    //   return { failure };
    // },

};

module.exports = googleAuthDal;
