import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./styles.css";
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import StarRatings from 'react-star-ratings';

export default class Main extends Component {

    state = {
        books: [],
        rating: 0
    };

    componentDidMount(){
        this.loadBooks();
    }

    loadBooks = async() => {
        const response = await api.get(`/book`);
        this.setState({books: response.data}, () => { console.log(this.state.books)})
    }

    changeRating = ( newRating, name ) => {
        this.setState({
          rating: newRating
        });
    }

    showCarousel = (books) => {
        if(this.state.books.length > 0){
            return(
                <div className='livros'>
                    <Carousel>
                        { books.map(book => 
                            <Carousel.Item>
                                <div className="card-book">
                                    <img
                                        className="image-slide"
                                        src="https://images-na.ssl-images-amazon.com/images/I/81ePE61DwpL.jpg"
                                        alt="First slide"
                                    />
                                    <div className='content-book'>
                                        <h2>{book.title}</h2>
                                        <h4>{book.description}</h4>
                                        <div className="btn-update">
                                            <Button variant="outline-primary">saiba mais</Button>
                                        </div>
                                    </div>
                                    <Carousel.Caption className="info-livro">
                                        <StarRatings
                                            rating={this.state.rating}
                                            starRatedColor="yellow"
                                            changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
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

    render() {
        const { books } = this.state;
        return(
            <div>
                {this.showCarousel(books)}
            </div>
        );
    }
}