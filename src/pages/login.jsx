import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";
import logo from "../img/logo_escuro.png";
import '../pages/style/login.css'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'; 

const Login = () => {
  const [username, setUsername] = useState("dione");
  const [password, setPassword] = useState("dione");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const { login } = useAuth(); 


  const handleLogin = async () => {
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const success = await login(username, password); 

    if (success) {
      navigate('/modo-de-venda');
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="body">
    <div className="container-login">
      <div className="content-login">
      <img src={logo} alt="logo" className="logomarca-login" />
      <input
      className="input-text-login"
        type="email"
        placeholder="Digite seu email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
      className="input-text-login"
      type={showPassword ? "text" : "password"}
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={togglePasswordVisibility} className="toggle-password-button-login">
    {!showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
  </button>
      <label className="labelError-login">{error}</label>
      <button onClick={handleLogin} className="loginButton">Login</button>
      </div>
    </div>
    </div>
  );
};

export default Login;
