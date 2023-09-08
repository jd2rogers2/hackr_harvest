import { useState } from 'react';

// import logo from './logo.svg';
import './App.css';

const REACT_APP_HH_API_URL = process.env.REACT_APP_HH_API_URL;

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({});

  const getData = async () => {
    const res = await fetch(`http://${REACT_APP_HH_API_URL}/`);
    const data = await res.json();
    setEvents(data.events);
  }

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://${REACT_APP_HH_API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host_id: "host_id",
        attendee_limit: 5,
        location: "location",
        start_time: "2023-09-08",
        end_time: "2023-10-31",
        image_url: "image_url",
        description: "description",
        ...formData,
      }),
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>events data</h1>
        <button onClick={getData}>refresh data</button>
        <ul>
          {events.map(event => (
            <li>id: {event.id} -- name: {event.name} -- created: {event.createdAt}</li>
          ))}
        </ul>
        <h1>send data</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name || ''} onChange={handleTextChange} />
          <button>submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
