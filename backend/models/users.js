const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true,
  },
  photoURL: String,
  location: String,
  education: String,
  bio: String,
  socialMedia: {
    facebook: String,
    twitter: String,
    github: String,
    linkedIn: String,
  },
  skills: [String],
});

userSchema.methods.generatePassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha512").toString('hex');
};

userSchema.methods.validatePassword = function (password) {
  // salt của user schema cũ đóng vai trò như một param để chuyển dạng hash 
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha512").toString('hex');
  return hash === this.hash;
};

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };

