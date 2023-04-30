import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './views/MainView/MainView';
import CreateTaskView from './views/CreateTaskView/CreateTaskView';
import { ProtectedRoutes } from './Componentes/ProtecteRoutes/ProtectedRoutes';
import LoginView from './views/LoginView/LoginView';
import RegisterView from './views/RegisterView/RegisterView';
import { useCallback, useState } from 'react';
import InformationIDView from './views/InformationIDView/InformationIDView';
import RewriteTaskView from './views/RewriteTaskView/RewriteTaskView';
import { getItem, setItem } from "./services/localStorage";

const userTokenKey = process.env.REACT_APP_USER_TOKEN

function App() {

  const token = getItem(userTokenKey) ?? false;

  const [userToken, setUserToken] = useState(token);
  const [access, setAccess] = useState(false);

  const handleUserSession = useCallback((res) => {
    setItem(userTokenKey, res)
    setUserToken(res);
  }, []);

  const handleTaskViewAction = (id) => {
    setAccess(id);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route index element={
            <ProtectedRoutes user={userToken} redirecTo='/list'>
              <LoginView handleUserSession={handleUserSession} />
            </ProtectedRoutes>
          } />

          <Route path='/login' element={
            <ProtectedRoutes user={userToken} redirecTo='/list'>
              <LoginView handleUserSession={handleUserSession} />
            </ProtectedRoutes>
          } />

          <Route path='/register' element={
            <ProtectedRoutes user={userToken} redirecTo='/list'>
              <RegisterView handleUserSession={handleUserSession} />
            </ProtectedRoutes>
          } />

          <Route index element={
            <LoginView handleUserSession={handleUserSession} />
          } />

          <Route element={
            <ProtectedRoutes user={userToken} redirecTo='/login' />
          }>

            <Route path='/list' element={
              <MainView handleUserSession={handleUserSession} />
            } />

            <Route path='/create'
              element={<CreateTaskView
                handleUserSession={handleUserSession} />
              } />

            {
              access
                ? <Route
                  path='list/:id'
                  element={
                    <RewriteTaskView
                      handleTaskViewAction={handleTaskViewAction}
                      handleUserSession={handleUserSession}
                    />
                  }
                />
                : <Route
                  path='list/:id'
                  element={
                    <InformationIDView
                      handleTaskViewAction={handleTaskViewAction}
                      handleUserSession={handleUserSession}
                    />
                  }
                />
            }

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
