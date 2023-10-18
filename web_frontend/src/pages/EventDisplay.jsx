import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Header } from '../components';


function EventDisplay() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    const getEvent = async () => {
        const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/events/${eventId}`);
        const data = await res.json();
        setEvent(data.event);
    }

    useEffect(() => {
        if (eventId) {
            getEvent();
        }
    }, [eventId]);

    const attendeeNames = event?.attendees.map(user => user.username).join(', ') || '';
    const spotsLeft = event
        ? event.attendeeLimit - event.attendees.length
        : '';

    return (
        <>
            <Header />
            <Container>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                            <p>host: {event?.host.username}</p>
                            <p>description: {event?.description}</p>
                            <p>spots left: {spotsLeft}</p>
                            <p>who's going: {attendeeNames}</p>
                        </Stack>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 12 }} style={{ textAlign: 'center' }}>
                        <Button type="primary">RSVP yes!</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EventDisplay;
