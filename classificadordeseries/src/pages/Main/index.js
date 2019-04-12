import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./styles.css";
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';
import { BrowserRouter,  Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            rating: [],
            books: [],
            votes: 0
        };
    }

    componentDidMount() {
        this.loadBooks();
        
    }

    componentWillReceiveProps(props){
        this.loadBooks();
    }

    loadBooks = async () => {
        
        const response = await api.get(`/book`);
        this.setState({ books: response.data,  rating: []});
    }

    handleClose() {
        this.setState({ show: false });
        return false;
    }

    handleShow() {
        this.setState({ show: true }, () => {
            console.log(this.state.show)
        });
        return true;
    }

    showConfirm = () => {
        const { books } = this.state;
        return(
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton className='content-book'>
                        <Modal.Title  className='cbook'>
                                <h5>Obrigado! Voto computado com Sucesso!</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='content-book'>
                        
                        {books.map(book =>
                            <div> 
                                <h6>{book.title}</h6>
                                <p>                                    
                                 <StarRatings
                                    rating={book.rating}
                                    starRatedColor="yellow"
                                    numberOfStars={5}
                                    name={book._id}
                                    starDimension='20px'
                                />
                                </p>
                                <p>
                                    Nota: {book.rating.toFixed(2)} em {book.numVotes} Avaliações</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Fechar
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    changeRating = async (newRating, id) => {
        var rating = {};
        rating[id] = newRating;
        rating = Object.assign(this.state.rating, rating);
        this.setState({rating});
        // console.log(rating);
    }

    redirectBook(id){
        this.props.history.push('/book/'+id);
    }

    showCarousel = (books) => {
        if (this.state.books.length > 0) {
            return (
                <div className='livros'>
                    <Carousel>
                        {books.map(book =>
                            <Carousel.Item>
                                <div className="card-book">
                                    <Container>
                                        <Row>
                                            <Col md={4}>
                                                <img
                                                    className="image-slide"
                                                    src={book.image}
                                                    alt="First slide"
                                                />
                                            </Col>
                                            <Col md={{ offset: 2 }} className='content-book'>
                                                <Row className='content-book'>
                                                    <h2>{book.title}</h2>
                                                </Row>
                                                <Row className='content-book'>
                                                    <h6>{book.edition} - {book.year}</h6>
                                                </Row>
                                                <Row className='content-book'>
                                                    <p>{book.author}</p>
                                                </Row>
                                                <Row className='content-book'>
                                                    <div className="btn-update">
                                                        <Button onClick={() => this.redirectBook(book._id)} variant="outline-primary" >saiba mais</Button>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Carousel.Caption>
                                        <h4>Já leu? Deixe Sua Avaliação:</h4>
                                        <StarRatings
                                            rating={this.state.rating[book._id]}
                                            starRatedColor="yellow"
                                            changeRating={this.changeRating}
                                            numberOfStars={5}
                                            starHoverColor="yellow"
                                            name={book._id}
                                            starEmptyColor="grey"
                                        />
                                    </Carousel.Caption>
                                    
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
            )
        }
    }

    submitRating = async() => {
        const { rating, books } = this.state;
        
        for(var i in books){
            var book = books[i];
            if(rating[book._id] !== undefined){
                var votes = book.numVotes + 1;
                var stars = ((book.rating * book.numVotes) + rating[book._id]) / votes;
                var objBook = {}
                objBook.rating = stars;
                objBook.numVotes = votes;
                console.log(objBook);
                await api.put(`/book/${book._id}`, objBook)
            }
        }

        this.handleShow();
        this.loadBooks();
        
    }

    showFooter = () => {
        return (
            <div>
                <div className="phantom" />
                <div className="style">
                    <Button size="lg" onClick={this.submitRating} variant="success">Enviar Avaliação</Button>
                </div>
             </div>
        )
    }

    render() {
        const { books } = this.state;
        return (
            <div>
                {this.showCarousel(books)}                
                {this.showConfirm()}
                {this.showFooter()}
            </div>
        );
    }
}