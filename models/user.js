const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean
  }
})

UserSchema.statics.signup = async function (username, password, role) {
  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error('Username already exists')
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash, role, isPremium: false });

  return user;
}

UserSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error('Incorrect username');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;