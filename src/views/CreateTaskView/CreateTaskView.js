import './CreateTaskView.css'
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { task } from '../../services';
import { getItem, setItem } from '../../services/localStorage';


function CreateTaskView({ handleUserSession }) {

  const userTokenKey = process.env.REACT_APP_TASK_YEY
  const navigate = useNavigate();

  const [group, setGroup] = useState({ title: "", description: "" });
  const [error, setError] = useState(false);
  const [handleAccessloader, setHandleAccessLoader] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    const NewGroupObj = {
      ...group,
      [name]: value
    }
    setGroup(NewGroupObj)
  }

  const handleSendFormulary = async (e) => {
    e.preventDefault();

    if (group.title !== '' && group.description !== '') {
      
      setHandleAccessLoader(true);

      const res = await task(group.title, group.description);

      setTimeout(() => {

        let DatosLocal = getItem(userTokenKey) ?? '[]';
        setItem(userTokenKey, [...DatosLocal, group])

        navigate('/list');

      }, 3000);
    } else {

      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
      
    }
  }
  const handleAccessToMainView = () => {
    navigate('/list');
  }

  const handleLogOut = () => {
    handleUserSession(false);
  }

  const Back = () => {
    navigate('/list');
  }

  return (
    <div className='container-view-task'>
      <div className='container-top-view-task'>
        <div className='container-image-view-task' >
          <img className='image-view-task'
            alt='Logo'
            src={Imagen}
            onClick={handleAccessToMainView}
          />
        </div>

        <div className='container-log-out-view-task'>
          <button className='button-log-out-view-task'
            onClick={handleLogOut}>Log Out</button>
        </div>

      </div>

      <div className='sub-container-view-task'>

        <div className='container-title-view-task'>

          <div className='container-button-view-task'>

            <h1 className='title-view-task'>Create New Task</h1>

            <button
              onClick={Back}
              className='button-back-view-task'
            >Back</button>

          </div>

        </div>
        <form onSubmit={handleSendFormulary}>
          <div className='container-input-view-task'>
            <Input
              aboveInput='Title'
              onChange={onChange}
              className={true}
              name='title'
              placeholder='Title here'
              value={group.title}
            />
            <Input
              aboveInput='Description'
              onChange={onChange}
              className={true}
              name='description'
              placeholder='Description here'
              value={group.description}
            />
          </div>

          {
            error
            && <p className='error-view-task'>
              All fields are required</p>
          }

          <div className='container-loader-view-task'>
            {handleAccessloader && <p className='loader'></p>}
          </div>


          <div className='container-button-create-view-task'>
            <Button
              type='submit'
              className={true}
              Text='Create Task'
            /></div>
        </form>
      </div>
    </div>
  )
}
export default CreateTaskView;