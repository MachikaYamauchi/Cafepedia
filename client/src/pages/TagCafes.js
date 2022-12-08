import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getCafesByTag } from "../redux/features/cafeSlice";
import { excerpt } from "../utility";

const TagCafes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagCafes, loading } = useSelector((state) => ({ ...state.cafe }));
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getCafesByTag(tag));
    }
  }, [tag]);



  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Cafes with tag: {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagCafes &&
        tagCafes.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{maxWidth:"600px"}} className="mt-2">
                <MDBRow className="g-0">
                    <MDBCol md="4">
                        <MDBCardImage
                        className="rounded"
                        src={item.imageFile}
                        alt={item.title}
                        fluid
                        />
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBCardTitle className="text-start">
                                {item.title}
                            </MDBCardTitle>
                            <MDBCardText className="text-start">
                                {excerpt(item.description, 40)}
                            </MDBCardText>
                            <div style={{marginTop:"-10px"}} className="d-flex">
                                <MDBBtn
                                size="sm"
                                rounded
                                color="info"
                                onClick={() => navigate(`/cafe/${item._id}`)}
                                >
                                    Read More
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default TagCafes;
