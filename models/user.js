
const mongoose =  require('mongoose') //mongoose required
const schema =  mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR=10

//Schema for creating new user
const userSchema =  new schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      default: 0
    },
    posts: [{
      type: schema.Types.ObjectId,
      ref: 'Post'
    }]
  },
  {timestamps: true}
)

//hashing plain password
userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err)

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      })
  })
})



//model of Schema exported
module.exports = mongoose.model('User',userSchema)