import React from 'react';

import {Row, Col } from 'react-bootstrap';

const Schedule = (props) => {

    return (
        <div>
            <Row>
                <Col>{props.schedule.work}</Col>
                <Col>
                    <select value={props.schedule.roster.Monday} 
                        onChange={(event)=>props.changed('Monday',props.schedule,event)} style={{marginBottom:"2px"}}>

                        <option value=""></option>
                        <option value="X1">X1</option>
                        <option value="X2">X2</option>
                        <option value="X3">X3</option>
                        <option value="X4">X4</option>
                        <option value="X5">X5</option>
                        <option value="X6">X6</option>
                        <option value="X7">X7</option>

                    </select>
                </Col>
                <Col>
                    <select value={props.schedule.roster.Tuesday} 
                        onChange={(event)=>props.changed('Tuesday',props.schedule,event)}>

                        <option value=""></option>
                        <option value="X1">X1</option>
                        <option value="X2">X2</option>
                        <option value="X3">X3</option>
                        <option value="X4">X4</option>
                        <option value="X5">X5</option>
                        <option value="X6">X6</option>
                        <option value="X7">X7</option>

                    </select>
                </Col>
                <Col>
                    <select value={props.schedule.roster.Wednesday} 
                        onChange={(event)=>props.changed('Wednesday',props.schedule,event)}>

                        <option value=""></option>
                        <option value="X1">X1</option>
                        <option value="X2">X2</option>
                        <option value="X3">X3</option>
                        <option value="X4">X4</option>
                        <option value="X5">X5</option>
                        <option value="X6">X6</option>
                        <option value="X7">X7</option>

                    </select>
                </Col>
                <Col>
                    <select value={props.schedule.roster.Thursday} 
                        onChange={(event)=>props.changed('Thursday',props.schedule,event)}>

                        <option value=""></option>
                        <option value="X1">X1</option>
                        <option value="X2">X2</option>
                        <option value="X3">X3</option>
                        <option value="X4">X4</option>
                        <option value="X5">X5</option>
                        <option value="X6">X6</option>
                        <option value="X7">X7</option>

                    </select>
                </Col>
                <Col>
                    <select value={props.schedule.roster.Friday} 
                        onChange={(event)=>props.changed('Friday',props.schedule,event)}>

                        <option value=""></option>
                        <option value="X1">X1</option>
                        <option value="X2">X2</option>
                        <option value="X3">X3</option>
                        <option value="X4">X4</option>
                        <option value="X5">X5</option>
                        <option value="X6">X6</option>
                        <option value="X7">X7</option>

                    </select>
                </Col>
            </Row>
        </div>
    );
};

export default Schedule;