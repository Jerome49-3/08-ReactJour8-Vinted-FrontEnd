export const validatePassword = (password) => {
  const requirements = [
    {
      regex: /.{16,}/,
      message: "At least 16 characters long",
    },
    {
      regex: /[A-Z]/,
      message: "At least one uppercase letter",
    },
    {
      regex: /[a-z]/,
      message: "At least one lowercase letter",
    },
    {
      regex: /[0-9]/,
      message: "At least one number",
    },
    {
      regex: /[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/,
      message: "At least one special character",
    },
    {
      regex: /^[^\s]*$/,
      message: "No spaces allowed",
    },
  ];

  const errors = requirements.filter((req) => !req.regex.test(password));

  return {
    isValid: errors.length === 0,
    errors: errors.map((err) => err.message),
  };
};
