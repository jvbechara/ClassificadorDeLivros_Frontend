import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { isAuthenticated, logout } from "../../services/auth";
import Navbar from 'react-bootstrap/Navbar';
import './styles.css';

export default class Menu extends Component {
    authDisable = () => {
        logout();
    }

    privateHeader = () => {
        if(isAuthenticated() == true){
            return (
                <>
                    <Nav className="menu-direita">
                        <Nav className='login'>
                            <Nav.Link onClick={this.authDisable} href="/"><h3>Logout</h3></Nav.Link>
                        </Nav>
                    </Nav>
                </>
            )
        } else{
            return(<>
                <Nav>
                    <Nav.Link eventKey={2} href="/signup">
                        <h3> Cadastre-se </h3>
                    </Nav.Link>
                    <Nav.Link eventKey={2} href="/signin">
                        <h3> Login </h3>
                    </Nav.Link>
                </Nav>            
             </>)
        }
    }

    render() {
        return (
            <div className="main-navbar">
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="/"><h1>Book Ranking</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        {this.privateHeader()}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}