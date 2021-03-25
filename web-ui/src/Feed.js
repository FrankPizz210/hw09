
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Event({event, session}) {
  return (
    <Col md="3">
      <Card border="primary">
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          {event.date} <br/>
          {event.description} <br/>
          Posted by {event.user.name} <br/>
          Comments: <br/>
          <p><Link to="/comments/new">New Comment</Link></p>
          {event.comments}
          <p><Link to="/responses/new">Respond</Link></p>
        </Card.Text>
      </Card>
    </Col>
  );
}

function Feed({events, session}) {
  let cards = events.map((event) => (
    <Event event={event} key={event.id} />
  ));

  let new_link = null;
  if (session) {
    new_link = (
      <p><Link to="/events/new">New Event</Link></p>
    )
  }
   return (
    <div>
      <h2>Events</h2>
      { new_link }
      <Row>{cards}</Row>
    </div>
  );
}

export default connect(({events, session}) => ({events, session}))(Feed);
