import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { formatDateDMY } from "../util/APIUtils";
import "../common/Styles.css";

class ExportToExcel extends Component {
    render() {
        return (
            <div style={{ marginRight: "25px" }}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="exportToExcelButton"
                    table="table-to-xls"
                    filename="Leave Request List"
                    sheet="LeaveRequest"
                    buttonText="Export to Excel"
                />
                <table hidden="true" id="table-to-xls">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Job Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Type</th>
                            <th>Half Day</th>
                            <th>Duration</th>
                            <th>Leave Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.leaveRequestData.map(LeaveRequest => {
                            return (
                                <tr key={LeaveRequest.id.emplid}>
                                    <td>{LeaveRequest.id.emplid}</td>
                                    <td>{LeaveRequest.employeeDetails.name}</td>
                                    <td>{LeaveRequest.employeeDetails.jobTitle}</td>
                                    <td>{formatDateDMY(LeaveRequest.id.startDate)}</td>
                                    <td>{formatDateDMY(LeaveRequest.endDate)}</td>
                                    <td>{LeaveRequest.leaveCategory.leaveDescr}</td>
                                    <td>{LeaveRequest.halfDay}</td>
                                    <td>{LeaveRequest.leaveDuration}</td>
                                    <td>{LeaveRequest.leaveStatus}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ExportToExcel;
