
import {getItem} from './localStorage';

const API_URL = "https://serverless-gamma-topaz.vercel.app/api";

const { token } = getItem(process.env.REACT_APP_USER_TOKEN);

async function register(email, password) {

    const resgisterURL = `${API_URL}/auth/register`;

    const response = await fetch(resgisterURL, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (response.status !== 409 && response.status !== 201) {
        throw data
    }

    return data;

}

async function login(email, password) {

    const loginURL = `${API_URL}/auth/login`;

    const response = await fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json()

    return data;
}

async function update(id, title, desc) {

    const response = await fetch(`https://serverless-gamma-topaz.vercel.app/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            desc
        }),
        headers: {
            'Authorization': `${token}`,
            'content-type': 'application/json'

        }
    });

    const data = await response.json();

    return data;

}

async function task(title, desc) {

    const response = await fetch('https://serverless-gamma-topaz.vercel.app/api/todos/', {
        method: 'POST',
        headers: {
            'Authorization': `${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title,
            desc
        })
    });

    const data = await response.json();
    return data;
}

async function getList() {

    const response = await fetch('https://serverless-gamma-topaz.vercel.app/api/todos/', {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        },
    });

    const data = await response.json();
    return data;
}

async function InformationTask(resulId) {

    const URLId = `https://serverless-gamma-topaz.vercel.app/api/todos/${resulId}`

    let { token } = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_TOKEN));

    const response = await fetch(URLId, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`

        }
    });

    const data = await response.json();
    return data;

}

async function removeTaskList(resulId) {

    const URLId = `https://serverless-gamma-topaz.vercel.app/api/todos/${resulId}`

    const response = await fetch(URLId, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}`
        }
    });

    const data = await response.json();
    return data;
}

export {
    register,
    login,
    task,
    getList,
    InformationTask,
    removeTaskList,
    update
}