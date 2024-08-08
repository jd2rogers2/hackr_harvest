import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import { Header } from '../components';
import { UserContext } from '../providers/UserProvider';
import UserBadge from '../components/UserBadge';
import { ToastContext } from '../providers/ToastProvider';


function EventDisplay() {
    const { eventId } = useParams();
    const { user } = useContext(UserContext);
    const { sendToastMessage } = useContext(ToastContextContext);
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    const isGoing = user && event?.attendees.find(u => u.id === user.id);
    const isPastEvent = new Date(event?.startTime) <= new Date(Date.now());

    const getEvent = async () => {
        const res = await fetch(`${process.env.REACT_APP_HH_API_URL}/events/${eventId}`);
        const data = await res.json();
        setEvent(data.event);
    }

    const handleRsvpClick = async () => {
        const res = await fetch(`${process.env.REACT_APP_HH_API_URL}/eventAttendees/${user.id}/${eventId}`, {
            method: isGoing ? 'DELETE' : 'POST',
            credentials: 'include',
        });
        if (res.ok) {
            getEvent();
        }
    }

    const handleDeleteClick = async () => {
      const res = await fetch(`${process.env.REACT_APP_HH_API_URL}/events/${eventId}`, {
          method: 'DELETE',
          credentials: 'include',
      });
      if (res.ok) {
          sendToastMessage(`Successfully deleted event ${event.name}`);
          navigate('/events');
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
                {user?.role === 'admin' ? (
                    <Button
                        variant="danger"
                        onClick={handleDeleteClick}
                    >Delete this event</Button>
                ) : null}
                <Row style={{ marginBottom: '1em', alignItems: 'center', justifyContent: 'center' }}>
                    <Col xs={{ span: 4, offset: 1 }}>
                        <img src={event?.imageUrl} alt="this event's photo" style={{ maxWidth: '100%' }} />
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
