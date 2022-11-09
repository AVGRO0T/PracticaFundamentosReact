import { useState } from "react";
//import { useAuth } from "./userState";
import { login } from "../clientApi/petitions";

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    //const { handleLogin } = useAuth();

    const handleChangeUsername = event => setUsername(event.target.value);
    const handleChangePassword = event => setPassword(event.target.value);
    const resetError = () => setError(null);
    const handleSubmit = async event => {
        event.preventDefault();
    
        try {
          resetError();
          setIsFetching(true);
          await login({ username, password });
         // useAuth();
          //const to = location.state?.from?.pathname || '/';
    
          // const to =
          //   (location.state &&
          //     location.state.from &&
          //     location.state.from.pathname) ||
          //   '/';
    
         // navigate(to, { replace: true });
        } catch (error) {
          setError(error);
          setIsFetching(false);
        }
      };

      const isButtonEnabled = () => username && password && !isFetching;


      return (
        <div className="userLogin">
            <h1> Iniciar Sesión </h1>
            <form onSubmit={handleSubmit}>  
            <label> Usuario</label>
            <input type={"text"} onChange={handleChangeUsername} name="username" value={username}/>
            <label> Contraseña</label>
            <input type={"password"} onChange={handleChangePassword} name="password" value={password}/>
            <input disabled={!isButtonEnabled()} type="submit" value="Enviar datos"/>
            </form>
            {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )};
        </div>
      );
};

export default UserLogin;