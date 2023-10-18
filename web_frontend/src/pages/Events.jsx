import { useEffect, useState } from 'react';

import { Header } from '../components';
import { EventsList } from '../components';


const limitIncremenet = 10;

function Events() {
    const [events, setEvents] = useState([]);
    const [limit, setLimit] = useState(limitIncremenet);

    const getEvents = async () => {
        const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/events?offset=0&limit=${limit}`);
        if (res.ok) {
            const data = await res.json()
            setEvents(data.events);
        }
    }

    const handleShowMoreClick = () => {
        setLimit(limit + limitIncremenet);
    }

    useEffect(() => {
        getEvents();
    }, [limit]);

    return (
        <>
            <Header />
            <EventsList
                events={events}
                hasShowMoreButton
                onShowMoreClick={handleShowMoreClick}
            />
        </>
    );
}

export default Events;
