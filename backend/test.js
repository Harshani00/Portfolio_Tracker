const bcrypt = require('bcrypt');

(async () => {
  const inputPassword = '23'; // The password entered during login
  const storedHashedPassword = '$2b$10$x8fDMSFL1ww9d'; // From database

  const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
  console.log('Password match:', isMatch);
})();
