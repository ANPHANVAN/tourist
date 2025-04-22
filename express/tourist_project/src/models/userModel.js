const HASH_SALT = Number(process.env.HASH_SALT)

const { pgPool } = require('../config/db/postgres');
const bcrypt = require('bcrypt');

const User = {
  // Tạo user mới (register)
  create: async (fullname, username, email, password) => {
    const hashPassword = await bcrypt.hash(password, HASH_SALT); // Hash mật khẩu với salt 10
    const query = `
      INSERT INTO users (fullname, username, email, hash_password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, fullname
    `;
    const values = [fullname, username, email, hashPassword];
    try {
      const result = await pgPool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    }
  },

  // Tìm user theo email (login)
  checkByUsername: async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
      const result = await pgPool.query(query, values);
      if (result.rows.length === 0) {
        return false; // Không tìm thấy user
      }
      return result.rows[0];

    } catch (err) {
        throw new Error('Error fetching user: ' + err.message);
    }
  },
};

module.exports = User;