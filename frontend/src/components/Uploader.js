import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styled from "styled-components";

const Main = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 1);
  padding: 5rem;

  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: center;
  border-radius: 20px;

  h2 {
    margin-bottom: 5vh;
    color: rgba(0, 0, 0, 0.8);
  }

  label {
    cursor: pointer;
    z-index: 11;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .file-upload {
    display: flex;
    justify-content: center;
    width: 600px;
    height: 40vh;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .file-upload img {
    height: 100%;
  }

  button:focus,
  input:focus {
    outline: none;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 2vh;
  }
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 600px;
  height: 30vh;
`;

const HeadingInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 3vh;
  text-align: center;
`;

const DescriptionInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin: 3vh 0;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 40%;
  border: none;
  background: rgb(0, 149, 246);
  padding: 1vh;
  color: white;
  font-weight: 700;
  border-radius: 8px;
`;

const CancelBtn = styled.button`
  width: 40%;
  border: none;
  background: rgb(0, 149, 246);
  padding: 1vh;
  color: white;
  font-weight: 700;
  border-radius: 8px;
`;

const Uploader = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.post(url, title, description);
    props.setClicked(false);
  };

  const handleChange = async (e) => {
    try {
      const client = create("https://ipfs.infura.io:5001/api/v0");
      const created = await client.add(
        `{"description": "Dehidden", "external_url": "www.dehidden.com", "image": "https://ipfs.infura.io/ipfs/QmdRqib9DswGrP4qgH85pZkVCteq7reLEVuDEoJZrSFJ8p" ,"animation_url": "https://ipfs.infura.io/ipfs/QmYL3L6T1EwFjSdCkx8iQ6EH9DeCpMzuVxrmnxRWHggdFu", "name": "Dhruva NFT"}`
      );
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrl(url);
      console.log(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    props.setClicked(false);
  };

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const headingChange = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Main>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h2>Create New Post</h2>
        {!url ? (
          <div className="file-upload">
            <label id="label" for="upload-photo">
              Select Photo
            </label>
            <FileInput
              name="photo"
              id="upload-photo"
              type={"file"}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <div className="file-upload">
            <img src={url} />
          </div>
        )}
        <HeadingInput
          placeholder="Add Some Title"
          onChange={(e) => headingChange(e)}
        />
        <DescriptionInput
          placeholder="Add Some Description"
          onChange={(e) => descriptionChange(e)}
        />
        <div className="buttons">
          <SubmitBtn type="submit">Upload</SubmitBtn>
          <CancelBtn type="reset" onClick={handleCancel}>
            Close
          </CancelBtn>
        </div>
      </Form>
    </Main>
  );
};

export default Uploader;
