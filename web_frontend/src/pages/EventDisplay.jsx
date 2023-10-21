import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Header } from '../components';
import { UserContext } from '../providers/UserProvider';
import UserBadge from '../components/UserBadge';


function EventDisplay() {
    const { eventId } = useParams();
    const { user } = useContext(UserContext);

    const [event, setEvent] = useState(null);

    const isGoing = user && event?.attendees.find(u => u.id === user.id);
    const isPastEvent = new Date(event?.startTime) <= new Date(Date.now());

    const getEvent = async () => {
        const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/events/${eventId}`);
        const data = await res.json();
        setEvent(data.event);
    }

    const handleRsvpClick = async () => {
        const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/eventAttendees/${user.id}/${eventId}`, {
            method: isGoing ? 'DELETE' : 'POST',
            credentials: 'include',
        });
        if (res.ok) {
            getEvent();
        }
    }

    useEffect(() => {
        if (eventId) {
            getEvent();
        }
    }, [eventId]);

    const spotsLeft = event
        ? event.attendeeLimit - event.attendees.length
        : '';

    return (
        <>
            <Header />
            <Container>
                <Row style={{ marginBottom: '1em', alignItems: 'center', justifyContent: 'center' }}>
                    <Col xs={{ span: 4, offset: 1 }}>
                        <img src={event?.imageUrl} alt="this events view" style={{ maxWidth: '100%' }} />
                    </Col>
                    <Col xs={{ span: 6 }}>
                        <p style={{ fontWeight: 700, fontSize: '2em', textAlign: 'center' }}>
                            {event?.name}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Stack>
                            <p>start date: {event?.startTime}</p>
                            <p>end date: {event?.endTime}</p>
                            <span>host: <UserBadge user={event?.host} /></span>
                            <p>description: {event?.description}</p>
                            <p>spots left: {spotsLeft}</p>
                            <span>
                                who's going:{' '}
                                {event?.attendees.map(user => (
                                    <UserBadge key={user.username} user={user} />
                                ))}
                            </span>
                        </Stack>
                    </Col>
                </Row>
                {user && event && !isPastEvent ? (
                    <Row>
                        <Col xs={{ span: 12 }} style={{ textAlign: 'center' }}>
                            <Button
                                variant={isGoing ? "danger" : "success"}
                                onClick={handleRsvpClick}
                            >
                                RSVP {isGoing ? 'no :(' : 'yes!'}
                            </Button>
                        </Col>
                    </Row>
                ) : null}
            </Container>
        </>
    );
}

export default EventDisplay;
