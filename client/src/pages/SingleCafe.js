import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getCafe } from "../redux/features/cafeSlice";

const SingleCafe = () => {
  const dispatch = useDispatch();
  const {cafe} = useSelector((state) => ({...state.cafe}));
  const {id} = useParams(); // get id from URL

  useEffect(() => {
    if(id) {
        dispatch(getCafe(id))
    }
  }, [id]);

  return (
    <>
    <MDBContainer>
        <MDBCard className="mb-3 mt-2">
            <MDBCardImage
            position="top"
            style={{width:"100%", maxWidth:"600px"}}
            src={cafe.imageFile}
            alt={cafe.title}
            />
            <MDBCardBody>
                <h3>{cafe.title}</h3>
                <span>
                    <p className="text-start tourName">Created By: {cafe?.name}</p>
                </span>
                <div style={{float:"left"}}>
                    <span className="text-start">
                        {cafe && cafe.tags && cafe.tags.map((item) => `#${item} `)}
                    </span>
                </div>
                <br />
                <MDBCardText className="text-start mt-2">
                    <MDBIcon
                    style={{float:"left", margin:"5px"}}
                    far
                    icon="calendar-alt"
                    size="lg"
                    />
                    <small className="text-muted">
                        {moment(cafe.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className="lead mb-0 text-start">
                    {cafe.description}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    </>


  );
};

export default SingleCafe;
