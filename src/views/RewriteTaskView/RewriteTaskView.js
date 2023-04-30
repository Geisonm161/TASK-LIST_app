import React from 'react'
import './RewriteTaskView.css'
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Button from '../../Componentes/Button/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { update } from '../../services';
import TextArea from '../../Componentes/TextArea/TextArea';
import { setItem, getItem } from '../../services/localStorage';

function RewriteTaskView({ handleTaskViewAction, handleUserSession }) {

  const navigate = useNavigate();
  const params = useParams();
  const userTokenKey = process.env.REACT_APP_TASK_YEY

  const [group, setGroup] = useState({ title: "", description: "" });
  const [error, setError] = useState(false);
  const [handleAccessLoader, setHandleAccessLoader] = useState(false);

  const idInUse = () => {

    let datosStorage = getItem(userTokenKey) ?? '[]';

    const newGroup = datosStorage.filter(group => group._id === params.id);

    const newGroup1 = newGroup[0];

    setGroup({ title: newGroup1.title, description: newGroup1.desc });

  }

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

    const { data } = await update(params.id, group.title, group.description);

    if (group.title !== '' || group.description !== '') {

      setHandleAccessLoader(true);

      setTimeout(() => {
        let datosStorage = getItem(userTokenKey) ?? '[]';
        setItem(userTokenKey, ...datosStorage, group);
        handleTaskViewAction(false);
      }, 3000);

    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }

  const Back = () => {
    handleTaskViewAction(false);
  }

  const handleAccessViewMain = () => {
    navigate('/list');
  }

  const close = () => {
    handleUserSession(false);
  }

  useEffect(() => {
    idInUse();
  }, []);

  return (
    <div className='container-rewrite'>
      <div className='container-top-rewrite'>
        <div className='container-image-rewrite' >
          <img className='image-rewrite'
            alt='Logo'
            src={Imagen}
            onClick={handleAccessViewMain}
          />
        </div>
        <div className='container-log-out-rewrite'>
          <button className='button-log-out-rewrite' onClick={close}>Log Out</button>
        </div>

      </div>
      <div className='sub-container-rewrite'>
        
        <div className='container-button-back-rewrite'>
          <button
            onClick={Back}
            className='button-back-rewrite'>
            Back
          </button>
        </div>

        <form onSubmit={handleSendFormulary}>
          <div className='container-input-rewrite'>
            <Input
              aboveInput='Title'
              onChange={onChange}
              className={true}
              name='title'
              placeholder='Title here'
              value={group.title} />

            <TextArea
              classNameTextarea={true}
              abovetext='Description'
              onChange={onChange}
              name='description'
              placeholderTextarea='Description here'
              value={group.description}
            />
          </div>

          {error && <p className='error'>Todos los campos son obligatorios</p>}

          <div className='container-loader-rewrite'>
            {handleAccessLoader && <p className='loader'></p>}
          </div>

          <div className='container-button-rewrite'>
            <Button
              type='submit'
              className={true}
              Text='Actualizar'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
export default RewriteTaskView;