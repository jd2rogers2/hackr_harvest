import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function EventCard({ event }) {
    const navigate = useNavigate();

    const startDate = moment(event.startTime);
    const endDate = moment(event.endTime);
    let datetimeText = '';
    if (startDate.format("L") === endDate.format("L")) {
        datetimeText += startDate.format("MMM Do");
        datetimeText += `, ${startDate.format("h:mm a")} - ${endDate.format("h:mm a")}`;
    } else {
        datetimeText = `${startDate.format("MMM Do, h:mm a")} - ${endDate.format("MMM Do, h:mm a")}`;
    }

    const goingText = event.attendees.find(({ id }) => id === false) ? 'Going!' : 'Not going';

    const handleEventCardClick = () => {
        navigate(`/events/${event.id}`);
    }

    return (
        <Container fluid style={{ paddingBottom: '10px' }} onClick={handleEventCardClick}>
            <Row style={{ alignItems: 'center' }}>
                <Col xs={{ span: 3 }} style={{ paddingRight: 0 }}>
                    <img src={event.imageUrl} alt="the event's img" style={{ maxWidth: '100%' }} />
                </Col>
                <Col xs={{ span: 5 }} style={{ paddingRight: 0 }}>
                    <Row>
                        <Col style={{ fontWeight: 'bold' }}>{event.name}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontSize: 'x-small' }}>{datetimeText}</Col>
                    </Row>
                </Col>
                <Col xs={{ span: 4 }}>
                    <Row>
                        <Col>{goingText}</Col>
                    </Row>
                    <Row>
                        <Col>spots left: {event.attendeeLimit - event.attendees.length}</Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default EventCard;
