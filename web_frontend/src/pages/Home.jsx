import { useEffect, useState } from 'react';

import { EventsList, Header, HeroContent } from '../components';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const getEvents = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/events?limit=3`);
    const data = await res.json();
    setEvents(data.events);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Header />
      <HeroContent />
      <EventsList
        events={events}
        hasShowMoreButton
        onShowMoreClick={() => navigate('/events')}
      />
    </>
  );
}

export default Home;
