import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import './roles.css';

export default class Rolecard extends Component {
    render(props) {
        return (
            <Card>
                <Card.Header>{this.props.projectName}</Card.Header>
                <Card.Body>
                    <div className='rolecard-content-wrapper'>
                        <div>{this.props.roleName}</div>
                        <div>
                            <Button className='primary'> Apply </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}
