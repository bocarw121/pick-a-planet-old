const generatePassword = () => {
  let set = 8;
  let charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let value = '';

  for (let i = 0, n = charset.length; i < set; ++i) {
    value += charset.charAt(Math.floor(Math.random() * n));
  }
  return value;
};

module.exports = generatePassword;
