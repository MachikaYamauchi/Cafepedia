import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createCafe } from "../redux/features/cafeSlice"

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditCafe = () => {
  const [cafeData, setCafeData] = useState(initialState);
  const {error, loading} = useSelector((state) => ({...state.cafe}))
  const {user} = useSelector((state) => ({...state.auth}))// get the user name to send MongoDB
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = cafeData;

  useEffect(() =>{
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && description && tags) {
      const updatedCafeData = {...cafeData, name:user?.result?.name};
      dispatch(createCafe({updatedCafeData, navigate, toast}));
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCafeData({ ...cafeData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setCafeData({ ...cafeData, tags: [...cafeData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setCafeData({
      ...cafeData,
      tags: cafeData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setCafeData({title:"", description:"", tags:[]})
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>Add Cafe</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Description"
                type="text"
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setCafeData({ ...cafeData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditCafe;
