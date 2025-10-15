const bcrypt = require("bcryptjs");

(async () => {
  // put the password you want to hash
  const password = "12345678910";
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log("Hashed password:", hash);
})();