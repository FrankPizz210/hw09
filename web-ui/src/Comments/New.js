import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { create_comment, fetch_events } from '../api';



export default function CommentsNew() {
  let history = useHistory();
  let [comment, setComment] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(comment);
    create_comment(comment).then((resp) => {
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
    let ev1 = Object.assign({}, comment);
    ev1["body"] = ev.target.value;
    setComment(ev1);
  }

  return (
    <Row>
      <Col>
        <h2>New Comment</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control type="textarea"
                          onChange={updateBody}
                          value={comment.body} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Comment
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
