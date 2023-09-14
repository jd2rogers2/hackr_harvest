import { useEffect, useState } from 'react';

import { EventsList, Header, HeroContent } from '../components';


function Home() {
  const [events, setEvents] = useState([]);

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
      <EventsList events={events} />
    </>
  );
}

export default Home;
