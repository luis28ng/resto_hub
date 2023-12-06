import { Navbar, Container, NavbarBrand } from "react-bootstrap";

const Footer = () => {
    return(
        <div className="fixed-bottom">  
            <Navbar color="dark" bg="dark" variant="dark" sticky="bottom">
                <Container>
                    <NavbarBrand>
                        &nbsp;
                    </NavbarBrand>
                </Container>
            </Navbar>
        </div>
    )
};

export default Footer;