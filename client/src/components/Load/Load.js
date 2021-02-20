import React from 'react';

import {Row, Col } from 'react-bootstrap';

const Load = (props) => {
    return (
        <div>
            <Row>
                <Col>{props.loads.member}</Col>
                <Col>{props.loads.load.Monday}</Col>
                <Col>{props.loads.load.Tuesday}</Col>
                <Col>{props.loads.load.Wednesday}</Col>
                <Col>{props.loads.load.Thursday}</Col>
                <Col>{props.loads.load.Friday} </Col>
                <Col>{props.loads.load.Total}</Col>
            </Row>
        </div>
    );
};

export default Load;