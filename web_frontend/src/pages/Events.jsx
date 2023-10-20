import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Header } from '../components';
import { EventsList } from '../components';


const limitIncremenet = 10;

function Events() {
    const [events, setEvents] = useState([]);
    const [limit, setLimit] = useState(limitIncremenet);

    const [searchParams] =  useSearchParams();
    const past = searchParams.get('past', '');

    const getEvents = async () => {
        const pastStr = past ? '&past=true' : '';
        const url = `http://${process.env.REACT_APP_HH_API_URL}/events?offset=0&limit=${limit}${pastStr}`;
        const res = await fetch(url);
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
    }, [limit, past]);

    return (
        <>
            <Header />
            <h3>
                {past ? 'Past' : 'Upcoming'}
            </h3>
            <EventsList
                events={events}
                hasShowMoreButton
                onShowMoreClick={handleShowMoreClick}
            />
        </>
    );
}

export default Events;
