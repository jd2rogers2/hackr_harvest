import { EventCard } from '.';


function EventsList({ events }) {

  return (
    <>
      {events.map(event => (
        <EventCard event={event} />
      ))}
    </>
  );
}

export default EventsList;
