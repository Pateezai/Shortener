import { react, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col, Row, Table } from "react-bootstrap";
import axios from "axios";

const Content = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [managetable, setManagetable] = useState(false);
  const [managecopybtn, setManagecopybtn] = useState(false);
  const [managegetdata, setManagegetdata] = useState(false);  
  const [editbtn, setEditbtn] = useState(false)
  const [editvalue, setEditvalue] = useState({})

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get("http://localhost:8000");
  //       setData(res.data);
  //     } catch (err) {
  //       setError(err);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);
  // console.log(data)

  // const { data, loading, error } = useFetch("http://localhost:8000");

  //////////////////////////////////////INPUT VALUE////////////////////////////////////
  const [inputValue, setInputValue] = useState({
    original: "",
    custom: "",
    customize: "",
  });
  //////////////////////////////////////NOTICE////////////////////////////////////
  const [notice, setNotice] = useState({
    text1: "",
    copybtn: "Copy",
    copytxt: "",
    isempty:"data is empty",
  });
  //////////////////////////////////////HANDLEINPUT////////////////////////////////////
  
  const handleInputValue = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };
  //////////////////////////////////////GET////////////////////////////////////
  const handleGet = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://shortener-api-m65u.onrender.com/");
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      setError(err);
      console.error(err);
    }
    setLoading(false);
    setManagetable(true);
    setManagegetdata(true)
  };
  //////////////////////////////////////UPDATE////////////////////////////////////
  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      // Send the data to your desired endpoint using POST request
      // const res = await axios.post(`http://localhost:8000/update/id/${id}`, {
      const res = await axios.put(`https://shortener-api-m65u.onrender.com/update/id/${id}`, {
        custom: inputValue.customize,
        id: id,
      });
      setData((prevData) =>
        prevData.map((val) => {
          if (val._id === id) {
            return {
              ...val,
              custom: inputValue.customize,
              shorturl: res.data.shorturl,
            };
          }
          return val;
        })
      );
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        customize: "",
      }));
      console.log(res.data);
    } catch (err) {
      setError(err);
      // Handle the error here
      console.error(err);
    }
    setLoading(false);
  };
  //////////////////////////////////////DELETE////////////////////////////////////
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      // Send the data to your desired endpoint using POST request
      const res = await axios.delete(`https://shortener-api-m65u.onrender.com/del/id/${id}`);
      setData(
        data.filter((val) => {
          return val._id != id;
        })
      );
      // alert('deleted')
      console.log(res.data);
      console.log("deleted");
    } catch (err) {
      setError(err);
      // Handle the error here
      console.error(err);
    }
    setLoading(false);
  };

  
  //////////////////////////////////////COPY////////////////////////////////////
  const handleCopy = () => {
    navigator.clipboard
      .writeText(notice.shorturl)
      .then(() => {
        setNotice((prevNotice) => ({
          ...prevNotice,
          copybtn: "Copied",
          // shorturl: notice.shorturl,
          // original: notice.original,
          copytxt: "Your short link has been copied!!",
        }));
        setTimeout(() => {
          setNotice((prevNotice) => ({
            ...prevNotice,
            copybtn: "Copy",
            // shorturl: notice.shorturl,
            // original: notice.original,
            copytxt: "Here!! It's your Short URL",
          }));
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };
  //////////////////////////////////////CREATE////////////////////////////////////
  const handleCreate = async () => {
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
        setLoading(true);
        try {
          // Send the data to your desired endpoint using POST request
          const res = await axios.post("https://shortener-api-m65u.onrender.com/create", {
            original: validated,
            custom: inputValue.custom,
          });
          // Handle the response here, if needed

          console.log(res.data);
          setInputValue({
            ...inputValue,
            original: "",
            custom: "",
          });
          setData([...data, res.data]); // Add the new entry to the data state
          setNotice({
            ...notice,
            text1: "",
            shorturl: res.data.shorturl, // Set the short URL in the notice state
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
        setManagegetdata(true)
        setManagecopybtn(true);

      }
    }
  };

  return (
    <>
    <div className="head-title d-flex justify-content-center">

      <h2 className="mt-4 ">The URL Shortener</h2>
    </div>
      {/* <h2 className='mt-4'>{data.original}</h2> */}

      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="my-5"
      >
        <Col>
          <Row className="justify-content-center">
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Paste your Link here"
                  id="original"
                  value={inputValue.original}
                  onChange={handleInputValue}
                />
                <div className="my-1" id="warning">
                  <p className="text-danger">{notice.text1}</p>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customize</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="www.example.com/yourcustomize"
                  id="custom"
                  value={inputValue.custom}
                  onChange={handleInputValue}
                />
                <Form.Text className="text-muted">
                  Customize your own "Short"!!
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" onClick={handleCreate}>
            Shorten
          </Button>
        </Col>
      </Form>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="my-2"
      >

      </Form>
      <div className="store">
        {notice.shorturl && (
          <a href={notice.shorturl} target="_blank" rel="noopener noreferrer">
            {notice.shorturl}
          </a>
        )}
        <br />
      </div>
      <div className="st">
        {notice.original && (
          <a href={notice.original} target="_blank" rel="noopener noreferrer">
            {notice.original}
          </a>
        )}
      </div>
      <br />
      <Form.Text className="text-muted">{notice.copytxt}</Form.Text>
      <br />
      {managecopybtn && 
      (<Button
        variant="primary"
        id="copy-btn"
        className="mt-3"
        onClick={handleCopy}
      >
        {notice.copybtn}
      </Button>

      )}
      <br />
      <Button variant="success" onClick={handleGet}>
        Show All Data
      </Button>
      <br />

      <div className="datas">
        {managetable && data.length > 0 ?(
        <Table striped bordered hover>
        <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Original</th>
              <th>Custom</th>
              <th>Short</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => (
              <tr key={key}>
                <td>{val._id}</td>
                <td>{val.original}</td>
                <td>{val.custom}</td>
                <td>{val.shorturl}</td>
                <td className="d-flex">
                  <Form.Control
                    type="text"
                    style={{ width: "300px" }}
                    placeholder="update custom"
                    className="form-control"
                    id="customize"
                    value={inputValue.customize}
                    onChange={handleInputValue}
                  />
                  <Button
                    variant="warning"
                    type="submit"
                    onClick={() => {
                      handleUpdate(val._id, inputValue.customize);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(val._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        ):(
        <>
        {managegetdata ? 
        (notice.isempty):(null)
        }
      </>
        )}

      </div>
    </>
  );
};

export default Content;
