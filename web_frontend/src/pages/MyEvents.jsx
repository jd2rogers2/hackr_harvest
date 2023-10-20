import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../components';
import { EventsList } from '../components';


const limitIncremenet = 10;

function MyEvents() {
    const { userId } = useParams();

    const [upcoming, setUpcoming] = useState([]);
    const [upcomingLimit, setUpcomingLimit] = useState(limitIncremenet);
    const [past, setPast] = useState([]);
    const [pastLimit, setPastLimit] = useState(limitIncremenet);

    const getUpcoming = async () => {
        const url = `http://${process.env.REACT_APP_HH_API_URL}/events?offset=0&limit=${upcomingLimit}&userId=${userId}`;
        const res = await fetch(url, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json()
            setUpcoming(data.events);
        }
    }

    const getPast = async () => {
        const url = `http://${process.env.REACT_APP_HH_API_URL}/events?offset=0&limit=${upcomingLimit}&userId=${userId}&past=true`;
        const res = await fetch(url, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json()
            setPast(data.events);
        }
    }

    useEffect(() => {
        getUpcoming();
    }, [upcomingLimit, userId]);

    useEffect(() => {
        getPast();
    }, [pastLimit, userId]);

    return (
        <>
            <Header />
            <h3 style={{ paddingLeft: '12px' }}>Upcoming</h3>
            <EventsList
                events={upcoming}
                hasShowMoreButton
                onShowMoreClick={() => setUpcomingLimit(upcomingLimit + limitIncremenet)}
            />
            <h3 style={{ paddingLeft: '12px' }}>Past</h3>
            <EventsList
                events={past}
                hasShowMoreButton
                onShowMoreClick={() => setPastLimit(pastLimit + limitIncremenet)}
            />
        </>
    );
}

export default MyEvents;
