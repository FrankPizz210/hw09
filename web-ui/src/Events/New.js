import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create_event, fetch_events } from '../api';


export default function EventsNew() {
  let history = useHistory();
  let [event, setEvent] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(event);
    create_event(event).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_events();
      }
    });
  }

  function updateName(ev) {
    let ev1 = Object.assign({}, event);
    ev1["name"] = ev.target.value;
    setEvent(ev1);
  }

  function updateDate(ev) {
    let ev1 = Object.assign({}, event);
    ev1["date"] = ev.target.value;
    setEvent(ev1);
  }

  function updateDescription(ev) {
    let ev1 = Object.assign({}, event);
    ev1["description"] = ev.target.value;
    setEvent(ev1);
  }

  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text_input"
                          onChange={updateName}
                          value={event.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date"
                          onChange={updateDate}
                          value={event.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="textarea"
                          onChange={updateDescription}
                          value={event.description} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Post Event
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
