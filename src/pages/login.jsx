import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo_escuro.png";
import '../pages/style/login.css'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'; 



const Login = () => {
  const [username, setUsername] = useState("dione");
  const [password, setPassword] = useState("dione");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  
  const handleLogin = async () => {
    
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const userData = {
      username: username,
      password: password,
    };
        
      
    try {
      const response = await fetch('https://lwlc-proj-2024.onrender.com/users/login',
        {
          method: 'POST',
          headers: {          
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        }
        
      );
      console.log(response);
      if (response.ok) {  
        const token = await response.json();
        localStorage.setItem("token", token);

        navigate('/gerenciar-produtos');
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setError("Erro ao tentar fazer login. Tente novamente mais tarde.");
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
      <label className="labelSignup">
        Não tem conta. <a href="/registo" className="link">Registre-se</a>
      </label>
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


