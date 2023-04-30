import React from 'react'
import './InformationIDView.css'
import Image from '../../assets/image/Imagenes/Darlin-01.png';
import Task from '../../Componentes/Task/Task';
import ButtonIcons from '../../Componentes/IconsButton/ButtonIcons';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InformationTask, removeTaskList } from '../../services';

function InformationID({ handleTaskViewAction, handleUserSession }) {

  const navigate = useNavigate();
  const params = useParams();

  const [handleLoadView, setHandleLoadView] = useState(false);
  const [results, setResults] = useState([]);

  const handleResponseInfoTask = async () => {

    setHandleLoadView(true);

    const { data } = await InformationTask(params.id);

    setHandleLoadView(false);

    setResults([data]);

  }

  const removeTask = async () => {

    setHandleLoadView(true);

    const data = await removeTaskList(params.id);

    setHandleLoadView(false);

    navigate('/list');
  }

  const rewriteHomework = () => {
    handleTaskViewAction(params.id);

    navigate(`/list/${params.id}`);
  }

  const handleAccessToMainView = () => {
    navigate('/list');
  }

  const handleLogOut = () => {
    handleUserSession(false);
  }

  useEffect(() => {
    handleResponseInfoTask();
  }, [])

  return (
    <div className='container-id-view'>
      <div className='container-top-id-view'>
        <div className='container-image-id-view' >
          <img className='image-id-view'
            alt='Logo'
            src={Image}
            onClick={handleAccessToMainView}
          />
        </div>
        <div className='container-log-out-id-view'>
          <button className='button-log-out-id-view'
            onClick={handleLogOut}>Log Out</button>
        </div>

      </div>
      <div className='sub-container-id-view'>

        <div className='container-title-create-id'>

          <h1 className='title-id-view'>Information ID</h1>

        </div>

        <div className='container-task-id-view'>

          {results.map((gro, index) =>
            <Task
              key={index}
              title={` ${gro.title ? gro.title : 'Not exist'}`}
              desc={` ${gro.desc ? gro.desc : 'Not exist'}`}
              id={` ${gro._id ? gro._id : 'Not exist'}`}
              accessClass={false}
              access={true}
            />)}

            <ButtonIcons
              removeTask={removeTask}
              cancel={handleAccessToMainView}
              rewriteHomework={rewriteHomework}
            />
        </div>
        <div className='container-loader-id-view'>
          {handleLoadView && <p className='loader'></p>}
        </div>
      </div>
    </div>
  )
}
export default InformationID;