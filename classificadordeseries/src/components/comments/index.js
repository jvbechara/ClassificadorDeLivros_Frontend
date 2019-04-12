import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../services/api';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { isAuthenticated, getToken } from "../../services/auth";

export default class Comments extends Component {
    state = {
        id: '',
        comments: [],
        userComments: [],
        currComment: ''
    }

    componentDidMount() {
        this.loadComments();
    }

    loadComments = async() => {
        var url = window.location.href;
        var id = url.split('/');
        id = id[id.length-1];
        this.setState({id})
        
        const response = await api.get(`/comments`);
        //console.log(response.data);
        this.setState({comments: response.data})
        
        const {comments} = this.state;

        comments.map(cmt => {
            if(cmt.bookId === this.state.id)
                this.getUser(cmt.userId, cmt);
        })
    }
    
    getUser = async(id, cmt) => {
        var all = {};
        var obj = this.state.userComments;
        var response = await api.get(`/user/${id}`);
        all['user'] = response.data.name;
        all['comment'] = cmt.comments;
        obj.push(all);
        //console.log(this.state.userComments);
        await this.setState({userComments:obj})
    }

    onSubmit = async(evento) => {
        var objComment = {};
        //console.log(JSON.parse(evento.target.value).ids);
        const postComment = JSON.parse(evento.target.value);
        //console.log(postComment);

        //console.log(serieUpdate);
        var comments = postComment.currComment;
        objComment = {comments};
        console.log(JSON.stringify(objComment));
        evento.preventDefault();
        console.log(objComment);
        await api.post(`/comments/${this.state.id}`, objComment);
        window.location.href = `/book/${this.state.id}`;
    }

    onChangeComment = (evento) => {
        this.setState({currComment: evento.target.value});
        console.log(evento.target.value);
    }

    renderComments = () => {
        const { userComments } = this.state;
        const { currComment } = this.state;
        const obj = { currComment };
        return (
            <div>
                <ListGroupItem> <h5>Comentários:</h5>  </ListGroupItem>
                {userComments.map(uc =>    
                    <ListGroupItem> {uc.user} diz: {uc.comment}  </ListGroupItem>
                )}
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label><h6>Deixe sua Opinião:</h6></Form.Label>
                                <Form.Control type="text" value={currComment} onChange={this.onChangeComment} placeholder="Comentário..." />
                            </Form.Group>

                            <Button type="submit" onClick={this.onSubmit} value={JSON.stringify(obj)}>Enviar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderComments()}
            </div>
        );
    }
}