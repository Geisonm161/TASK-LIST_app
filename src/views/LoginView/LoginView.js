import './LoginView.css'
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services';

function LoginView({ handleUserSession }) {

  const navigate = useNavigate();

  const [users, setUsers] = useState({ userName: '', pasword: '' });
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userExist, setUserExist] = useState(null);

  const onChange = (e) => {

    const { value, name } = e.target;
    const NewGroupObj = {
      ...users,
      [name]: value
    }
    setUsers(NewGroupObj)
  }

  const handleSendFormulary = async (e) => {
    e.preventDefault();

    setLoader(true);

    const res = await login(users.userName, users.pasword);

    setLoader(false);

    if (users.userName !== '' && users.pasword !== '') {
      
      if (res.message === 'User and/or Password Incorrect') {
        setUserExist(true);
        setLoader(false);
        setTimeout(() => {
          setUserExist(false);
        }, 5000);
      } else {
        handleUserSession(res);
        navigate('/list');
      }

    } else {
      setLoader(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

  }

  const register = () => {
    navigate('/register');
  }

  return (
    <div className='container-login'>
      <div className='container-top-login'>
        <div className='container-image-login' >
          <img className='image-login'
            alt='Logo'
            src={Imagen}
          />
        </div>
        <div className='container-log-out-login'>
          <button className='button-log-out-login' onClick={register}>Register</button>
        </div>

      </div>
      <div className='sub-container-login'>

        <div className='container-title-login'>

          <h1 className='title-login'>Login</h1>

        </div>
        <div className='container-input-login'>
          <form onSubmit={handleSendFormulary}>

            <Input
              aboveInput='UserName'
              onChange={onChange}
              className={true}
              name='userName'
              placeholder='UserName here'
              value={users.userName}
              type='text'
              required={true}
            />

            <Input
              aboveInput='Pasword'
              onChange={onChange}
              className={true}
              name='pasword'
              placeholder='Pasword here'
              value={users.pasword}
              type='password'
            />

            {
            error 
            && <p className='error-login'>
              All capos are required</p>
              }

            {
            userExist 
            && <p className='error-user-login'>
              User and/or Password Incorrect</p>
              }

            <div className='container-loader'>
              {loader && <p className='loader'></p>}
            </div>

            <div className='container-button-login'>
              <Button
                type='submit'
                className={true}
                Text='Login'
              /></div>
          </form>
        </div>

      </div>
    </div>
  )
}


export default LoginView;