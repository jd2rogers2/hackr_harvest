import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { EventCard } from '.';


function EventsList({ events, hasShowMoreButton = false, onShowMoreClick }) {
  return (
    <>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
      {hasShowMoreButton && (
        <Container fluid>
          <Row>
            <Col xs={{ span: 4, offset: 8 }} sm={{ span: 2, offset: 10 }}>
              <Button variant="primary" onClick={onShowMoreClick}>Show more</Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default EventsList;
