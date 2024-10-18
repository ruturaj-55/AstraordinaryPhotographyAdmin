import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./style.scss";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

/*
Name: Name of image
About : About Image
CoverImg = Link for cover image
Description: Long Description of image
Images = [Array of images]
Date: Date of image
PostedOn = Date

*/

const PostForm = () => {
  const [capturedOn, setCapturedOn] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date(capturedOn);
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

    // Convert images to links
    var imagelinks = [];
    imagelinks = formDataObj["images"].split(",");
    const images = imagelinks.map((element) => {
      element = element.split("/")[5];
      return "https://drive.google.com/thumbnail?id=" + element + "&sz=w1000";
    });

    //Cover image
    var coverimage = formDataObj["cover-image"];
    var coverimageId = coverimage.split("/")[5];

    const data = {
      Title: formDataObj["about-shot"],
      CoverImage:
        "https://drive.google.com/thumbnail?id=" + coverimageId + "&sz=w1000",
      Images: images,
      Description: formDataObj["description"],
      CapturedOn: date.getTime() / 1000,
      PostedOn: Timestamp.now()["seconds"],
      ObjectName: formDataObj["object-name"],
    };

    try {
      await addDoc(collection(db, "Posts"), data);
      alert("Image Posted Successfully");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container className="m-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-5" controlId="captured-on">
          <Row>
            <Col>
              <Form.Label>Image Captured On</Form.Label>
            </Col>
            <Col>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Select capture date"
                    value={capturedOn}
                    onChange={(value) => setCapturedOn(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="about-shot">
          <Row>
            <Col>
              <Form.Label>Brief Details about shot</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="string"
                name="about-shot"
                placeholder="Enter Title"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="object-name">
          <Row>
            <Col>
              <Form.Label>Enter Object Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="string"
                name="object-name"
                placeholder="Enter Object Name"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="cover-image">
          <Row>
            <Col>
              <Form.Label>Cover Image</Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="cover-image"
                type="string"
                placeholder="Enter URL for Cover Image"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="images">
          <Row>
            <Col>
              <Form.Label>Images</Form.Label>
            </Col>
            <Col>
              <Form.Control name="images" as="textarea" rows={3} />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="description">
          <Row>
            <Col>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col>
              <Form.Control name="description" as="textarea" rows={50} />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
