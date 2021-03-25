import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create_comment, fetch_events } from '../api';



export default function ResponsesNew() {
  let history = useHistory();
  let [response, setResponse] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(response);
    create_comment(response).then((resp) => {
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
    let ev1 = Object.assign({}, response);
    ev1["body"] = ev.target.value;
    setResponse(ev1);
  }

  return (
    <Row>
      <Col>
        <h2>New Response</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control type="textarea"
                          onChange={updateBody}
                          value={response.body} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Response
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
