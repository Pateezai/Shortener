import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sector.css";

import {
  Button,
  Form,
  Col,
  Row,
  Table,
  Container,
  Card,
  InputGroup,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Sector = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showtable, setShowtable] = useState(false);
  const [showres, setShowres] = useState(false);
  const [checkdata, setCheckdata] = useState(false);
  const [edit, setEdit] = useState(false)
  //////////////////////////////////////INPUT VALUE////////////////////////////////////
  const [inputValue, setInputValue] = useState({
    original: "",
    custom: "",

  });
    //////////////////////////////////////HANDLEINPUT////////////////////////////////////
    const handleInputValue = (e) => {
      setInputValue({
        ...inputValue,
        [e.target.id]: e.target.value,
      });
    };
    // console.log(inputValue.original);
    // console.log(inputValue.custom);
  const [updateInput, setUpdateInput] = useState({
    customupdate: "",
    originalupdate: "",
  })

  const [newcustom, setNewcustom] = useState('')

  const handleUpdateInput = (e) =>{
        setUpdateInput({
          ...updateInput,
          [e.target.id]: e.target.value,
        });
  }
  //////////////////////////////////////NOTICE////////////////////////////////////
  const [notice, setNotice] = useState({
    text1: "",
    text2: "Customize your own Short!!",
    copybtn: "Copy",
    copybtntable: "Copy",
    copytxttable: "",
    copytxt: "",
    copyeach:"",
    isempty: "data is empty",
  });
  //////////////////////////////////////HANDLEEdit////////////////////////////////////
const handleEdit = (id, key) =>{
  console.log(id)

  data.forEach((val) =>{
    if(val._id === id && key === key){
      setEdit(true)
      console.log('let go')
    }
  })
}

  //////////////////////////////////////HANDLEUPDATED////////////////////////////////////
  const handleUpdate = async (id) =>{
    setLoading(true);
    try {
      const res = await axios.put(`https://shortener-api-m65u.onrender.com/update/id/${id}`, {
        custom: newcustom,
       _id: id,
      })
      setData((prevData) =>
        prevData.map((val) => {
          if(val._id === id){
            return{
              ...val,
              custom: newcustom,
              shorturl: res.data.shorturl,
            }
          }
          return val;
        })
      )
      setUpdateInput((prevUpdateInput) => ({
        ...prevUpdateInput,
        customupdate: "",
      }));
      setNotice((prevNotice) => ({
        ...prevNotice,
        shorturl: res.data.shorturl,
      }));
    } catch (err) {
      setError(err)
    }
    setLoading(false);
    setEdit(false)
    setShowtable(true)
    setShowres(true);
  }

  //////////////////////////////////////CopyEach////////////////////////////////////
  const handleCopyEach = (id) => {
    data.map((val) => {
      if(val._id === id){
        setNotice({
          ...notice,
          copyeach: val.shorturl

        })
        console.log(copyeach)

      }
    })
    

    // .then(() => {
    //   setNotice()
    // })

  }
  //////////////////////////////////////Copy////////////////////////////////////
  const handleCopy = () => {
    navigator.clipboard
      .writeText(notice.shorturl)
      .then(() => {
        setNotice((prevNotice) => ({
          ...prevNotice,
          copybtn: "Copied",
          shorturl: notice.shorturl,
          original: notice.original,
          copytxt: "Your short link has been copied!!",
        }));
        setTimeout(() => {
          setNotice((prevNotice) => ({
            ...prevNotice,
            copybtn: "Copy",
            shorturl: notice.shorturl,
            original: notice.original,
            copytxt: "Here!! It's your Short URL",
          }));
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };
  //////////////////////////////////////GET////////////////////////////////////
  const handleShowData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://shortener-api-m65u.onrender.com/");
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
    setShowtable(true);
  };
  //////////////////////////////////////DELETE////////////////////////////////////
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`https://shortener-api-m65u.onrender.com/del/id/${id}`);
      setData(
        data.filter((val) => {
          return val._id != id;
        })
      );
      console.log("deleted");
      console.log(res.data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
    setShowtable(true);
    setCheckdata(true);
  };
  //////////////////////////////////////CREATE////////////////////////////////////
  const handleShorten = async () => {
    const pattern =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    let validated = inputValue.original;
    if (!inputValue.original) {
      setNotice({
        ...notice,
        text1: "Please provide your link before shorten!",
      });
    } else {
      if (!pattern.test(inputValue.original)) {
        setNotice({
          ...notice,
          text1: "Invalid URL!!",
        });
      } else {
        setNotice({
          ...notice,
          text1: "",
        });
        if (
          !inputValue.original.startsWith("http://") &&
          !inputValue.original.startsWith("https://")
        ) {
          (validated = `http://${inputValue.original}`),
            console.log(inputValue.original);
        }
        const FetchPost = async () => {
          setLoading(true);
          try {
            const res = await axios.post("https://shortener-api-m65u.onrender.com/create", {
              original: validated,
              custom: inputValue.custom,
            });
            console.log(res.data);
            setInputValue({
              ...inputValue,
              original: "",
              custom: "",
            });
            setData([...data, res.data]);
            setNotice({
              ...notice,
              text1: "",
              shorturl: res.data.shorturl,
              original: res.data.original,
              copytxt: "Here!! It's your Short URL",
            });
          } catch (err) {
            // Handle the error here
            setError(err);
            console.error(err);
          }
          setLoading(false);
          // setManagetable(true);
          setShowtable(true);
          setShowres(true);
        };
        FetchPost();
      }
    }
  };

  return (
    <>
      <div className="sector">
        <Container>
          <br />
          <br />
          <Row className="mt-5 d-flex justify-content-center">
            <Col md={12}>
              <Card border="info">
                <Card.Header>
                  <h1 className="text-center mt-2 align-middle">
                    THE SHORTENER
                  </h1>
                </Card.Header>
                <Card.Body
                  className="text-center mt-3"
                  style={{ padding: "60px 40px" }}
                >
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Form.Group className="mb-3 d-flex justify-content-center">
                      <Col md={8}>
                        <Form.Control
                          type="text"
                          id="original"
                          name="original"
                          value={inputValue.original}
                          onChange={handleInputValue}
                          placeholder="Paste your Link here!!"
                        />
                      </Col>
                    </Form.Group>
                    <div className="">
                      <Form.Text className="text-danger align-middle">
                        {notice.text1}
                      </Form.Text>
                    </div>

                    <Form.Group className="mt-3 d-flex justify-content-center">
                      <Col md={8}>
                        <Form.Label>Customize</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="www.example/customize.com"
                          id="custom"
                          name="custom"
                          value={inputValue.custom}
                          onChange={handleInputValue}
                        />
                      </Col>
                    </Form.Group>
                    <div className="mt-2">
                      <Form.Text className="text-muted"></Form.Text>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleShorten}
                      className="mt-3"
                    >
                      Shorten
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {showres && data.length > 0 ?(
            <Row className="d-flex justify-content-center my-5">
              <Col md={12}>
                <Card border="primary">
                  <Card.Header className="text-center">
                    <h3 className="mt-2">Short URL</h3>
                  </Card.Header>
                  <Card.Body
                    className="text-center"
                    style={{ padding: "40px" }}
                  >
                    <div>
                      <p>
                        Original URL:
                        {notice.original && (
                          <a
                            href={notice.original}
                            style={{ paddingLeft: "10px" }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {notice.original}
                          </a>
                        )}
                      </p>
                    </div>

                    <InputGroup className="mb-3 d-flex justify-content-center">
                      {notice.shorturl && (
                        <Col md={4}>
                          <Form.Control
                            disabled
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={notice.shorturl}
                          />
                        </Col>
                      )}
                      <Button
                        variant="outline-primary"
                        id="button-addon2"
                        onClick={handleCopy}
                      >
                        {notice.copybtn}
                      </Button>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      {notice.copytxt}
                    </Form.Text>

                    <br />
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={handleShowData}
                    >
                      Show your List!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ):('')}

          {showtable && data.length > 0 ? (
            <Row className="d-flex justify-content-center my-5">
              <Col>
                <Card border="success">
                  <Card.Header className="text-center">
                    <h2 className="mt-2">Here Link List</h2>
                  </Card.Header>
                  <Table
                    bordered
                    responsive
                    className="noWarp text-center"
                    variant="light"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Original URL</th>
                        <th>Custom</th>
                        <th>Short URL</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((val, key) => {return (
                        <tr key={key}>
                          <td>{key +1}</td>
                          {edit? (
                            <>
                          <td className="col-4">
                            <Form.Control
                              disabled
                              id="originalupdate"
                              name="originalupdate"
                              placeholder={val.original}
                              value={updateInput.originalupdate}
                              onChange={handleUpdateInput}
                            />
                          </td>
                          <td className="col-2">
                            <Form.Control
                              id="customupdate"
                              name="customupdate"
                              placeholder={val.custom}
                              onChange={(e) => {setNewcustom(e.target.value)}}

                            />
                          </td>
                          </>
                          
                          ): (
                            <>
                            <td className="col-4">
                            <Form.Control
                              disabled
                              id="originalupdate"
                              name="originalupdate"
                              placeholder={val.original}
                              value={updateInput.originalupdate}
                              onChange={handleUpdateInput}
                            />
                          </td>
                          <td className="col-2">
                            <Form.Control
                              disabled
                              id="customupdate"
                              name="customupdate"
                              placeholder={val.custom}
                              value={updateInput.customupdate}
                              onChange={handleUpdateInput}

                            />
                          </td>
                          </>
                          )}
                          <td className="col-2 text-center align-middle">
                            <a href="">{val.shorturl}</a>
                          </td>
                          <td className="col d-flex gap-1 justify-content-center">
                            {edit ?(
                              <>
                              <Button variant="success" onClick={()=>{handleUpdate(val._id)}}>Save</Button>
                              <Button variant="secondary" onClick={()=>{setEdit(false)}}>Discard</Button>
                              </>
                            ):(
                              <Button variant="warning" onClick={()=>{handleEdit(val._id, key)}}>Edit</Button>
                            )}
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleDelete(val._id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button variant="primary" onClick={() => {
                                handleCopyEach(val._id);
                              }}>Copy</Button>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          ) : (
               <>
               {checkdata && data.length > 0? (
                <Row className="text-center mb-5">
                <Col>
                  <Toast
                    className="d-inline-block m-1 "
                    bg="primary"
                  >
                    <Toast.Body className="text-white text-center align-middle"
                    >
                      You don't have any list!
                    </Toast.Body>
                  </Toast>
                </Col>
              </Row>
               ):(null)}
               </>
          )}
        </Container>
      </div>
    </>
  );
};

export default Sector;
