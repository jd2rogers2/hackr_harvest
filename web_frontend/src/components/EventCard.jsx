import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../logo.svg';


function EventCard({ event }) {

  return (
    <Container>
        <Row>
            <Col>
                <img src={event.imageUrl || logo} alt="the event's img" />
            </Col>
            <Col>
                <Container>
                    <Row>
                        <Col>{event.name}</Col>
                    </Row>
                    <Row>
                        <Col>{event.attendees.find(({ id }) => id === false) ? 'Going!' : ''}</Col>
                    </Row>
                </Container>
            </Col>
            <Col>
                <Container>
                    <Row>
                        <Col>{event.startTime} - {event.endTime}</Col>
                    </Row>
                    <Row>
                        <Col>spots left: {event.attendeeLimit - event.attendees.length}</Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    </Container>
  );
}

export default EventCard;
