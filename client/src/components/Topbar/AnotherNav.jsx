import { useState } from "react";
import {
  Button,
  Card,
  Row,
  Table,
  Container,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";
const AnotherNav = () => {
  const [popuplogin, setPopuplogin] = useState(false);
  const [popupsignup, setPopusignup] = useState(false);
  const handleCloseLogin = () => setPopuplogin(false);
  const handleCloseSignup = () => setPopusignup(false);
  const handleShowLogin = () => setPopuplogin(true);
  const handleShowSignup = () => setPopusignup(true);
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">The URL Shortener</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Form 
              className="d-flex m-auto w-50 my-1"
              // style={{width:"500px"}}
            >
              <Form.Control
              hidden
                disabled
                type="search"
                placeholder="Not in use yet"
                className="me-2"
                aria-label="Search"
              />
              <Button  hidden disabled className="text-primary" variant="light">
                Search
              </Button>
            </Form>
            <Nav
              className="my-2 my-lg-0 "
              style={{ maxHeight: "200px", alignItems: "center" }}
              navbarScroll
            >
              <div className="d-flex gap-4 my-1">
                {/* <Nav.Link disabled>Login</Nav.Link> */}
                <Button
                  hidden
                  className="text-light"
                  variant="primary"
                  onClick={handleShowLogin}
                >
                  Login
                </Button>
                <div
                  hidden
                  className="vr"
                  style={{ padding: "1px", color: "white" }}
                ></div>
                <Button
                  hidden
                  className="text-light"
                  variant="primary"
                  onClick={handleShowSignup}
                >
                  Sign Up
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
          {/* //////////////////////////////// Sign Up Modalsss //////////////////////////// */}
          <Modal
            className="mt-5"
            size="xl"
            show={popupsignup}
            onHide={handleCloseSignup}
          >
            <Modal.Header closeButton>
              {/* <h3 className="d-flex justify-content-center text-center">
                  Later Bois
              </h3> */}
              {/* <Modal.Title className="d-flex justify-content-center text-center">Modal heading</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <Row className="d-flex justify-content-center text-center">
                <Col lg={8}>
                  <h2 className="mb-5">Registration</h2>
                  <div>
                    <Form>
                      <Form.Group className="mb-3 text-start">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Username" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3 text-start">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group className="mb-3 text-start">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <div className="">
                        <Form.Text className="text-danger align-middle">
                          test
                        </Form.Text>
                      </div>
                      <Nav.Link>
                        Already have an account? Click Here
                      </Nav.Link>
                      <Button
                        className="mt-2"
                        disabled
                        variant="primary"
                        type="submit"
                      >
                        Confirm
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <div className="d-flex text-center gap-1">
                <Button variant="secondary" onClick={handleCloseSignup}>
                  Continue as Guest
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
          {/* //////////////////////////////// Login Modalsss //////////////////////////// */}
          <Modal
            className="mt-5"
            size="xl"
            show={popuplogin}
            onHide={handleCloseLogin}
          >
            <Modal.Header closeButton>
              {/* <h3 className="d-flex justify-content-center text-center">
                  Later Bois
              </h3> */}
              {/* <Modal.Title className="d-flex justify-content-center text-center">Modal heading</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <Row className="text-center">
                <Col className="mt-0 align-middle">
                  <h2 className="align-middle">Benefits</h2>
                  <ListGroup className="text-start" style={{ border: "none" }}>
                    <ListGroup.Item className="border-0" as="li">
                      <span className="badge rounded-pill ml-2" text="light">
                        ✔
                      </span>
                      Have a datatable for your shorten Link!
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" as="li">
                      <span className="badge rounded-pill ml-2" text="light">
                        ✔
                      </span>
                      Can custom shorten name
                      eg:'www.example.com/yourcustomize!'
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" as="li">
                      <span className="badge rounded-pill ml-2" text="light">
                        ✔
                      </span>
                      Manage your link!
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0" as="li">
                      <span className="badge rounded-pill ml-2" text="light">
                        ✔
                      </span>
                      Can use Search method
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <div className="col-lg-6 vr" style={{ padding: "1px" }}></div>
                <Col>
                  <h2 className="mb-2">Login</h2>
                  <div>
                    <Form
                     onSubmit={(e) => {
                        e.preventDefault();
                     }}
                    >
                      <Form.Group
                        as={Row}
                        className="mb-2 d-flex justify-content-center"
                      >
                        <Form.Label column sm="2">
                          Username
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control 
                          id="username"
                          name="username"
                          type="text" 
                          placeholder="Username" 
                          />
                        </Col>
                        <Form.Text></Form.Text>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-2 d-flex justify-content-center"
                      >
                        <Form.Label column sm="2">
                          Password
                        </Form.Label>
                        <Col sm="8">
                          <Form.Control
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </Col>
                      </Form.Group>
                      <div className="">
                        <Form.Text className="text-danger align-middle">
                          test
                        </Form.Text>
                      </div>
                      <Nav.Link>
                        Don't have an account? Click Here
                      </Nav.Link>
                      <Button
                        className="mt-2"
                        variant="primary"
                        type="submit"
                      >
                        Login
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <div className="d-flex text-center gap-1">
                <Button variant="secondary" onClick={handleCloseLogin}>
                  Continue as Guest
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </Container>
      </Navbar>
    </div>
  );
};

export default AnotherNav;
