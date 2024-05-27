import { useState } from "react";
import logo from "../img/logo_escuro.png";
import "../pages/style/registo.css";
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
    
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirme, setPasswordConfirme] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState("false");

  const navigate = useNavigate();

  const handleRegisto = async () => {
    const userData = {
      username: username,
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      address: address,
      password: password,
      is_admin: isAdmin,
    };

    if (!username || !fullName || !email || !phoneNumber || !address || !password || !passwordConfirme) {
      setError("Preencha todos os campos");
      return;
    }
    if (password !== passwordConfirme) {
      setError("As senhas não são iguais");
      return;
    }
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*]/.test(password) ||
      !/\d/.test(password)
    ) {
      setError(
        "A senha deve conter pelo menor 8 caracteres, 1 letra maiúscula, 1 caractere especial e um número"
      );
      return;
    }
    
    try {
      const response = await fetch("https://lwlc-proj-2024.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (response.username === userData.username || response.email === userData.email || response.phoneNumber === userData.phone_number) {
        setError("Este usuário/email já existe!");
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError("Erro! Verifique os dados e tente novamente.");
        
      } else {
        
        alert("Cadastro realizado com sucesso!");
        navigate("/listar-utilizadores");
      }
      
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);          
    }
    
      
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className="body">
    <div className="container-registo">
      <div className="content-registo">
        <img src={logo} alt="logo" className="logomarca-registo" />

        <label>Preencha os dados para se registar!</label>
       
        
        <input
        className="input-text-registo"
          type="text"
          id="username"
          name="username"
          placeholder="Nome de Utilizador"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        
        <input
        className="input-text-registo"
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Nome Completo"
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
        className="input-text-registo"
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
        className="input-text-registo"
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Telefone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
        className="input-text-registo"
          type="text"
          id="address"
          name="address"
          placeholder="Morada"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

<input
        className="input-text-registo"
        type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

    
       
  <input
    className="input-text-registo"
    type={showPassword ? "text" : "password"}
    id="confirm-password"
    name="passwordConfirme"
    placeholder="Confirme sua senha"
    value={passwordConfirme}
    onChange={(e) => setPasswordConfirme(e.target.value)}
  />
  <button onClick={togglePasswordVisibility} className="toggle-password-button">
    {!showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
  </button>
    <div className="AdminOrNot">
      <label>Será admin?</label>
      <select className="optionsIsAdmin" value={isAdmin.toString()} onChange={(e) => setIsAdmin(e.target.value === 'true')}>
        <option value="false">Não</option>
        <option value="true">Sim</option>
      </select>
      </div>   

        <label className="labelError-registo">{error}</label>
        <button className="registoButton" onClick={handleRegisto}>Inscrição</button>
        <label className="labelRegisto">
          <strong>
            <a className="link-registo" href="/listar-utilizadores">Cancelar</a>
          </strong>
        </label>
      </div>
    </div>
    </div>
  );
};

export default Signup;
