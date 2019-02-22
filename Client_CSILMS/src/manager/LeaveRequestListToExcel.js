import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
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
                                <tr key={LeaveRequest.leaveCode}>
                                    <td>{LeaveRequest.leaveCode}</td>
                                    <td>{LeaveRequest.leaveDescr}</td>
                                    <td>{LeaveRequest.entitlement}</td>
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
