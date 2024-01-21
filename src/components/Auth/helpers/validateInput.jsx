const validateInput = (...args) => {
  const { username, email, password, confirmPassword } = args[0];
  const [setError, setLoading] = args.slice(1);
  switch (true) {
    case "username" in args[0] && !username:
      setError("username is required");
      setLoading(false);
      return false;
    case "email" in args[0] && !email:
      setError("email is required");
      setLoading(false);
      return false;
    case "password" in args[0] && !password:
      setError("password is required");
      setLoading(false);
      return false;
    case "confirmPassword" in args[0] && password !== confirmPassword:
      setError("passwords don't match");
      setLoading(false);
      return false;
    default:
      return true;
  }
};

export default validateInput;
