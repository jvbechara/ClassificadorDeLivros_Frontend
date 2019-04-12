import React, { Component } from 'react';
import "./styles.css";
import api from '../../services/api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
// import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Comments from '../../components/comments';

export default class Book extends Component {
    state = {
        id: '',
        book: []
    };

    async componentDidMount() {
        this.setState({ id: this.props.match.params })
        //const response = await api.get(`/book`);
        const idBook = this.props.match.params.id;
        const response = await api.get(`/book/${idBook}`);
        console.log(response.data);
        this.setState({ book: response.data });
    }

    renderCard = (book) => {
        return(
            <Card className="cardbook">
                <Card.Img className="img-card" variant="top" src={book.image} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                        {book.edition} - {book.year}
                        </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{book.author}</ListGroupItem>
                    <ListGroupItem>{book.description}</ListGroupItem>                        
                    <Comments/>                        
                </ListGroup>
                <Card.Body>
                    <Card.Link href="/">Voltar</Card.Link>
                </Card.Body>
            </Card>
        )
    }

    render() {
        const { book } =  this.state;
        return (
            <div className="bookpage">
                {this.renderCard(book)}
            </div>
        );
    }
}