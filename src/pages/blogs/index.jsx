import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./style.scss";
import { db } from "../../firebase";
import { collection, Timestamp, doc, setDoc } from "firebase/firestore";

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
  const [blogData, setBlogData] = useState([]);
  const [data, setData] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

    //Cover image
    var coverimage = formDataObj["cover-image"];
    var coverimageId = coverimage.split("/")[5];

    const metaData = {
      Title: formDataObj["about-blog"],
      PostedOn: Timestamp.now()["seconds"],
      BlogDesc: formDataObj["blog-desc"],
      CoverImage:
        "https://drive.google.com/thumbnail?id=" + coverimageId + "&sz=w1000",
    };

    const data = { ...metaData };
    data["BlogData"] = blogData;

    const metaDocRef = doc(collection(db, "BlogsMetaData"));
    const docRef = doc(collection(db, "Blogs"), metaDocRef.id);
    try {
      await setDoc(metaDocRef, metaData);
      await setDoc(docRef, data);
      alert("Image Posted Successfully");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const addImage = () => {
    var image = data;
    var imageId = image.split("/")[5];
    image = "https://drive.google.com/thumbnail?id=" + imageId + "&sz=w1000";
    setBlogData([...blogData, { type: "image", data: image }]);
  };

  const addContent = () => {
    var content = data;
    setBlogData([...blogData, { type: "description", data: content }]);
  };

  const addTitle = () => {
    var content = data;
    setBlogData([...blogData, { type: "title", data: content }]);
  };

  return (
    <Container className="m-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-5" controlId="about-blog">
          <Row>
            <Col>
              <Form.Label>Blog Title</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="string"
                name="about-blog"
                placeholder="Enter Title"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-5" controlId="blog-desc">
          <Row>
            <Col>
              <Form.Label>Brief Details about Blog</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="string"
                name="blog-desc"
                placeholder="Enter Short Description"
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

        <Form.Group className="mb-5" controlId="description">
          <Row>
            <Col>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="description"
                as="textarea"
                rows={50}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" className="m-5" onClick={addImage}>
          Add Image
        </Button>

        <Button variant="primary" className="m-5" onClick={addContent}>
          Add Content
        </Button>

        <Button variant="primary" className="m-5" onClick={addTitle}>
          Add Title
        </Button>

        <Button variant="primary" className="m-5" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
