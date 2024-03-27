import Image from "next/image";
import styles from "./page.module.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          {/* <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the cards content.
              </Card.Text> */}
              <Button variant="primary">Go somewhere</Button>
            {/* </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}
