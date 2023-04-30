import './MainView.css'
import Input from '../../Componentes/Input/Input';
import Imagen from '../../assets/image/Imagenes/Darlin-01.png';
import Task from '../../Componentes/Task/Task';
import Button from '../../Componentes/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getList } from '../../services';
import { setItem } from "../../services/localStorage";

function MainView({ handleUserSession }) {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [group, setGroup] = useState([]);
  const [values, setValues] = useState('');
  const [loader, setLoader] = useState(false);
  const [alertGuide, setAlertGuide] = useState(false);

  const handleChange = async (e) => {
    const { value } = e.target;

    const newGroup = group.filter(item =>
      item.title && item.title.toLowerCase()
        .includes(value.toLocaleLowerCase())
    );

    setResults(newGroup);
    setValues(value);
  }

  const handleSendFormulary = useCallback(async () => {
    setLoader(true);

    const { data } = await getList();

    setGroup(data)
    setResults(data);
    setLoader(false);

    setItem(process.env.REACT_APP_TASK_YEY, data);
  }, [])

  const handleRemoveTask = (index) => (e) => {
    e.stopPropagation();

    const taskRemovedFiltered = results.filter((gro, i) => i !== index);

    setResults(taskRemovedFiltered)
    setItem(process.env.REACT_APP_TASK_YEY, results)
  }

  const handleReturnMainView = () => {
    navigate('/list');
  }

  const handleLogOut = () => {
    handleUserSession(false);
  }

  useEffect(() => {
    handleSendFormulary();
  }, [handleSendFormulary]);

  const handleAlertCreateTask = () => {
    if (results.length === 0) {
      setAlertGuide(true);
    }
  }

  return (
    <div className='container-view-main'>
      <div className='container-top-view-main'>
        <div className='container-image-view-main' >
          <img className='image-view-main'
            alt='Logo'
            src={Imagen}
            onClick={handleReturnMainView}
          />
        </div>

        <div className='container-log-out-view-main'>
          <button
            className='button-log-out-view-main'
            onClick={handleLogOut}>Log Out
          </button>
        </div>

      </div>

      <div className='sub-container-view-main'>
        <div className='container-title-view-main'>
          <h1 className='title-view-main'>My Task List</h1>
          <div className='container-button-view-main'>
            <Button
              className={false}
              Text='Create'
              onClick={() => navigate('/create')}
              alertGuide={alertGuide}
            />
          </div>
        </div>

        <div className='container-input-view-main'>
          <Input
            onChange={handleChange}
            name='name'
            placeholder='Search'
            value={values}
            handleAlertCreateTask={handleAlertCreateTask}
            style={alertGuide}
          />
        </div>

        <div className='container-task-view-main'>
          {results.length !== 0 ? results.map((gro, index) =>
              <Task
                key={index}
                title={<h3 style={{ fontWeight: 700 }}>{gro.title}</h3>}
                desc={gro.desc}
                onClick={() => navigate(`/list/${gro._id}`)}
                removeTask={handleRemoveTask(index)}
                accessClass={true}
                handleColorTitle={true}
              />
            ):<p className='container-empty-task-list-view-main'>Empty task list</p>}
        </div>

        <div className='container-loader-view-main'>
          {loader && <p className='loader'></p>}
        </div>
      </div>
    </div>
  )
}
export default MainView;