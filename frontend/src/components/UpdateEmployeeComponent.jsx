import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            emailId: ""
        }

        this.onChange = this.onChange.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }


    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id)
            .then(res => {
                let employee = res.data;
                Object.keys(employee).forEach((key) => {
                    this.setState({[key]: employee[key]});
                })
            })
    }


    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    updateEmployee(e) {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log("employee => " + JSON.stringify(employee));
        EmployeeService.updateEmployee(employee, this.state.id)
            .then((res)=>{
                this.props.history.push("/employees");
            });
    }

    cancel() {
        this.props.history.push("/employees");
    }

    render() {
        return (
            <div>
                <div className="container" style={{marginTop: "2rem"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Email Address: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                               value={this.state.emailId} onChange={this.onChange}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;