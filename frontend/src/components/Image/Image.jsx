import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import image2 from "../../image2.jpg";

function ShapeExample() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={image2} rounded style={{ width: "1700px", height: "500px" }} />
        </Col>
      </Row>
    </Container>
  );
}

export default ShapeExample;
