const bcrypt = require('bcrypt');

class UsersController {

  static async postRegister(req, res, next) {
    // Set our internal DB variable
    const db = req.db;

    // Get our form values. These rely on the "name" attributes
    const userName = req.body.username;
    const userPassword = req.body.password;

    try {
      const [ countUsers ] = await db.query("SELECT COUNT(*) AS count FROM users WHERE username = ?", [ userName ]);
      
      // Make sure we are not creating a duplicate user
      console.log(countUsers[0]);
      if (countUsers[0].count !== 0) {
        return res.status(400).json({
          error: "username already exists"
        })
      }

      // Hash the password with bcrypt
      bcrypt.genSalt(10)
      .then(salt => {
        bcrypt.hash(userPassword, salt)
          .then(async hash => {
            // create user object
            const user = {
              username: userName,
              password: hash
            }

            // insert into the db
            await db.query("INSERT INTO users SET username = ?, pass = ?", [ user.username, user.password ])

            return res.status(200).json({
              message: "success"
            });
          });
      });
    }
    catch (err) {
      res.status(500).json({
        error: "an error occurred with the database"
      })
      throw err;
    }
  }

  static async putChangePassword(req, res, next) {
    bcrypt.compare(req.body.oldPassword, req.user.pass)
      .then(isMatch => {
        if (isMatch) {
          const db = req.db;

          const newPassword = req.body.newPassword;

          // Hash the password with bcrypt
          bcrypt.genSalt(10)
            .then(salt => {
              bcrypt.hash(newPassword, salt)
                .then(async hash => {
                  // save pass to hash
                  const hashedPassword = hash;
                  try {
                    await db.query("UPDATE users SET `pass` = ?", [ hashedPassword ]);
                    return res.status(200).json({
                      message: "success"
                    });
                  }
                  catch (err) {
                    res.status(500).json({
                      error: "an error occurred while updating the database"
                    })
                    throw err;
                  }
                });
            });
        }
        else {
          return res.status(401).json({
            error: "old password was incorrect"
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = UsersController;