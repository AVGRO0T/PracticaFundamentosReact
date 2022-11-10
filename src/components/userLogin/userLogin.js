import { useState } from "react";
//import { useAuth } from "./userState";
import { login } from "../../clientApi/petitions";

const UserLogin = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    //const { handleLogin } = useAuth();

    const handleChangeemail = event => setemail(event.target.value);
    const handleChangePassword = event => setPassword(event.target.value);
    const resetError = () => setError(null);
    const handleSubmit = async event => {
        event.preventDefault();
    
        try {
          resetError();
          setIsFetching(true);
          await login({ email, password });
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

      const isButtonEnabled = () => email && password && !isFetching;


      return (
        <div className="userLogin">
            <h1> Iniciar Sesión </h1>
            <form onSubmit={handleSubmit}>  
            <label> Email</label>
            <input type={"email"} onChange={handleChangeemail} name="email" value={email}/>
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