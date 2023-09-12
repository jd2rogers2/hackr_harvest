import { useState } from 'react';

// import logo from './logo.svg';
import './App.css';

const REACT_APP_HH_API_URL = process.env.REACT_APP_HH_API_URL;

function App() {
  const [events, setEvents] = useState([]);
  const [eventFormData, setEventFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [userFormData, setUserFormData] = useState({});

  const getUsers = async () => {
    const res = await fetch(`http://${REACT_APP_HH_API_URL}/users`);
    const data = await res.json();
    setUsers(data.users);
  }

  const handleUserChange = (e) => {
    setUserFormData({
      ...eventFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://${REACT_APP_HH_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: 'jd2rogers2@gmail.com',
        image_url: '',
        tagline: 'founder',
        city: 'seattle',
        role: 'admin',
        ...userFormData,
      }),
    });
  }

  const getEvents = async () => {
    const res = await fetch(`http://${REACT_APP_HH_API_URL}/events`);
    const data = await res.json();
    setEvents(data.events);
  }

  const handleEventChange = (e) => {
    setEventFormData({
      ...eventFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://${REACT_APP_HH_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hostId: 1,
        attendeeLimit: 5,
        location: "location",
        startTime: "2023-09-08",
        endTime: "2023-10-31",
        imageUrl: "image_url",
        description: "description",
        ...eventFormData,
      }),
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>users data</h1>
        <button onClick={getUsers}>refresh users</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>id: {user.id} -- username: {user.username} -- email: {user.email}</li>
          ))}
        </ul>
        <h1>send user data</h1>
        <form onSubmit={handleUserSubmit}>
          <input type="text" name="username" value={userFormData.username || ''} onChange={handleUserChange} />
          <button>submit</button>
        </form>
        <h1>events data</h1>
        <button onClick={getEvents}>refresh events</button>
        <ul>
          {events.map(event => (
            <li key={event.id}>id: {event.id} -- name: {event.name} -- created: {event.createdAt}</li>
          ))}
        </ul>
        <h1>send event data</h1>
        <form onSubmit={handleEventSubmit}>
          <input type="text" name="name" value={eventFormData.name || ''} onChange={handleEventChange} />
          <button>submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
