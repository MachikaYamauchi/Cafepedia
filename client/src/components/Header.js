import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit"

const Header = () => {
    const [show, setShow] = useState(false);
  return (
    <MDBNavbar fixed='top' expand="lg" style={{backgroundColor:"#f0e6ea"}}>
        <MDBContainer>
            <MDBNavbarBrand href="/" style={{color:"#606080", fontWeight:"600", fontSize:"22px"}}>
                Cafepedia
            </MDBNavbarBrand>
            <MDBNavbarToggler
                type="button"
                aria-expanded="false"
                aria-label="Toogle navigation"
                onClick={() => setShow(!show)}
                style={{ color: "#606080" }}
                >
                <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
        </MDBContainer>

    </MDBNavbar>
  )
}

export default Header