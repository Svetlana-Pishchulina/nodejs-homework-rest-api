const { User } = require('../../model').userModel

const logout = async (req, res) => {
  const { _id } = req.user
  User.findByIdAndUpdate(_id, { token: null })
  res.status(204)
}
module.exports = logout
