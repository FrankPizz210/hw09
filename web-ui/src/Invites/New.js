import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create_comment, fetch_events } from '../api';



export default function InvitesNew() {
  let history = useHistory();
  let [invite, setInvite] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(invite);
    create_comment(invite).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_events();
      }
    });
  }

  function updateBody(ev) {
    let ev1 = Object.assign({}, invite);
    ev1["body"] = ev.target.value;
    setInvite(ev1);
  }

  return (
    <Row>
      <Col>
        <h2>New Invite</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control type="textarea"
                          onChange={updateBody}
                          value={invite.body} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Invite
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
