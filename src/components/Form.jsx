import Input from '../components/Input';

const Form = ({ }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Vos mots de passe ne sont pas identiques")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input label="Name" value={username} id="username" type="text" placeholder="jerome" setState={setUsername} />
        <Input label="Email" value={email} id="email" type="email" placeholder="jerome@test.com" setState={setEmail} />
        <Input label="Password" value={password} id="password" type="password" placeholder="password" setState={setPassword} />
        <Input label="Confirm Password" value={confirmPassword} id="confirmPassword" type="password" placeholder="Confirm Password" setState={setConfirmPassword} />
        <Input type="submit" value="Register" />
      </form>
    </>
  )
}

export default Form