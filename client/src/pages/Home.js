import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getCafes } from "../redux/features/cafeSlice";
import CardCafe from "../components/CardCafe";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { cafes, loading } = useSelector((state) => ({ ...state.cafe }));

  useEffect(() => {
    dispatch(getCafes());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {cafes.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Cafes Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {cafes && cafes.map((item) => <CardCafe key={item._id} {...item} /> )}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
