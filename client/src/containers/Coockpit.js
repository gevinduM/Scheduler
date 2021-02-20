import React, { Component } from 'react';

import {Container, Row, Col } from 'react-bootstrap';

import Load from '../components/Load/Load';
import Schedule from '../components/Schedule/Schedule';

import axios from 'axios';

class Coockpit extends Component{

    state = {
        schedule : [],
        loads:[],
    };

    componentDidMount(){
        axios.get('/api/state')
            .then(response => {
                console.log('componentDidMount');
                this.setState({schedule: response.data.schedule});
                this.setState({loads: response.data.loads});
            }).catch(error => {
                console.log(error);
            })
    }

    postDataHandler = () => {
        axios.post('/api/state', this.state)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
    }

    onEmpChanged = (day,item,event) =>{

        // let myJSON = JSON.stringify(this.state);
        // console.log(myJSON);

        const scheduleIndex = this.state.schedule.findIndex(p => {
            return p.id === item.id;
        });

        const schecduleItem = {
            ...this.state.schedule[scheduleIndex]
        };

        //if roster already got a emp and new emp is not him remove previos employes load

        if(schecduleItem.roster[day] !== '' && schecduleItem.roster[day] !== event.target.value){

            this.resetMemberLoad(day,item);
        }

        schecduleItem.roster[day] = event.target.value;

        const schedule = [...this.state.schedule];

        schedule[scheduleIndex] = schecduleItem;

        this.setState( {schedule: schedule} );

        if(event.target.value !== '' && !this.isConsecutiveLunchSlots(day,item) && !this.inTwoPlacesAtOnce(day,item)){
            this.calculateMembersLoad(day,item);
        }

    }


    resetMemberLoad = (day,item) => {

        const employee = item.roster[day];

        const employeeIndex = this.state.loads.findIndex(p => {
            return p.member === employee;
        });

        const empLoadItem = {
            ...this.state.loads[employeeIndex]
        };

        empLoadItem.load[day] = empLoadItem.load[day] - 1;
        empLoadItem.load.Total = empLoadItem.load.Total - 1;

        const loads = [...this.state.loads];

        loads[employeeIndex] = empLoadItem;

        this.setState( {loads: loads} );

    }

    calculateMembersLoad = (day,item) =>{

        const employee = item.roster[day];

        const employeeIndex = this.state.loads.findIndex(p => {
            return p.member === employee;
        });

        const empLoadItem = {
            ...this.state.loads[employeeIndex]
        };

        if(empLoadItem.load[day] + 1 > 2){
            alert(`${employee} has more than 2 shifts on ${day}`);
            this.unDoLastSchedule(day,item);
        }else if(empLoadItem.load.Total + 1 > 7){
            alert(`${employee} has more than 7 shifts per week`);
            this.unDoLastSchedule(day,item);
        }else{
            empLoadItem.load[day] = empLoadItem.load[day] + 1;
            empLoadItem.load.Total = empLoadItem.load.Total + 1;

            const loads = [...this.state.loads];

            loads[employeeIndex] = empLoadItem;

            this.setState( {loads: loads} );
            this.postDataHandler();
   
        }

    }

    unDoLastSchedule = (day,item) =>{

        const scheduleIndex = this.state.schedule.findIndex(p => {
            return p.id === item.id;
        });

        const schecduleItem = {
            ...this.state.schedule[scheduleIndex]
        };

        schecduleItem.roster[day] = '';

        const schedule = [...this.state.schedule];

        schedule[scheduleIndex] = schecduleItem;

        this.setState( {schedule: schedule} );

    }
    
    isConsecutiveLunchSlots = (day,item) => {
        let isConsecutive = false;
        
        if(['04','05','06','07'].includes(item.id)){
            const employee = item.roster[day];

            const lunchEmpArr = [];

            lunchEmpArr.push(this.state.schedule[3].roster[day]);
            lunchEmpArr.push(this.state.schedule[4].roster[day]);
            lunchEmpArr.push(this.state.schedule[5].roster[day]);
            lunchEmpArr.push(this.state.schedule[6].roster[day]);

            for(let index =0;index < lunchEmpArr.length; index++){

                let nextIndex = index + 1;
                if(nextIndex < lunchEmpArr.length){
                    if(lunchEmpArr[index] !== ''){
                        if(lunchEmpArr[index] === employee && lunchEmpArr[nextIndex] === employee){
                            isConsecutive = true;
                            this.unDoLastSchedule(day,item);
                            alert(`${employee} is in consecutive lunch slots on ${day}`);
                            break;
                        }
                    }
                }
            };
        }

        return isConsecutive;
    }

    countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    inTwoPlacesAtOnce = (day,item) =>{

        const employee = item.roster[day];
        let inTwoPlacesAtOnce = false;

        if(['01','02','03'].includes(item.id)){

            const morningShiftArr = [];

            morningShiftArr.push(this.state.schedule[0].roster[day]);
            morningShiftArr.push(this.state.schedule[1].roster[day]);
            morningShiftArr.push(this.state.schedule[2].roster[day]);

            if(this.countOccurrences(morningShiftArr,employee) > 1){
                inTwoPlacesAtOnce = true;
                this.unDoLastSchedule(day,item);
                alert(`${employee} is already in a morning shift on ${day}`);
            }
            
        }else if(['08','09','10'].includes(item.id)){

            const afternoonShitArr = [];

            afternoonShitArr.push(this.state.schedule[7].roster[day]);
            afternoonShitArr.push(this.state.schedule[8].roster[day]);
            afternoonShitArr.push(this.state.schedule[9].roster[day]);

            if(this.countOccurrences(afternoonShitArr,employee) > 1){
                inTwoPlacesAtOnce = true;
                this.unDoLastSchedule(day,item);
                alert(`${employee} is already in afternoon shift on ${day}`);
            }

        }
        
        return inTwoPlacesAtOnce;

    }

    render(){

        let mapSchedule = this.state.schedule.map((item,i)=>{
            if(item.id === '04' || item.id === '08')
                return <div key={item.id} style={{marginTop:"10px"}}><Schedule schedule={item}  changed={this.onEmpChanged}/></div>
            else
                return <Schedule schedule={item} key={item.id} changed={this.onEmpChanged}/>
        });

        let mapLoads = this.state.loads.map((item,i)=>{
            return <Load loads={item} key={item.member}/>
        });

        return(
            <div>
                <Container fluid>
                    <Row>
                        <Col><p style={{textAlign:"center"}}>Schedule</p></Col>
                    </Row>

                    <Row>
                        <Col></Col>
                        <Col>Monday</Col>
                        <Col>Tuesday</Col>
                        <Col>Wednesday</Col>
                        <Col>Thursday</Col>
                        <Col>Friday </Col>
                    </Row>

                    {mapSchedule}

                    <p style={{textAlign:"center", marginTop:"20px"}}>Load</p>
                    <Row>
                        <Col>Staff Member</Col>
                        <Col>Monday</Col>
                        <Col>Tuesday</Col>
                        <Col>Wednesday</Col>
                        <Col>Thursday</Col>
                        <Col>Friday </Col>
                        <Col>Totals</Col>
                    </Row>

                    {mapLoads}

                </Container>
            </div>
        )
    }

}

export default Coockpit;