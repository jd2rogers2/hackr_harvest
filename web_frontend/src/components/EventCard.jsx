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
            <Row>
                <Col xs={{ span: 2 }}>
                    <img src={event.imageUrl} alt="the event's img" />
                </Col>
                <Col xs={{ span: 6 }}>
                    <Container>
                        <Row>
                            <Col style={{ fontWeight: 'bold' }}>{event.name}</Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: 'x-small' }}>{datetimeText}</Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={{ span: 4 }}>
                    <Container>
                        <Row>
                            <Col>{goingText}</Col>
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
