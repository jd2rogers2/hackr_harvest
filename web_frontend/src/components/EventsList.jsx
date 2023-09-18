import { EventCard } from '.';


function EventsList({ events, hasShowMoreButton }) {

  return (
    <>
      {events.map(event => (
        <EventCard event={event} />
      ))}
      {hasShowMoreButton && ()}
    </>
  );
}

export default EventsList;
