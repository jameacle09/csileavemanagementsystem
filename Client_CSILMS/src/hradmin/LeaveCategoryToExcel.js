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
                    filename="Leave Category"
                    sheet="LeaveCategory"
                    buttonText="Export to Excel"
                />
                <table hidden={true} id="table-to-xls">
                    <thead>
                        <tr>
                            <th>Leave Code</th>
                            <th>Leave Description</th>
                            <th>Entitlement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.leaveCategoryDetails.map((leaveCategory, index) => {
                            return (
                                <tr key={index}>
                                    <td>{leaveCategory.leaveCode}</td>
                                    <td>{leaveCategory.leaveDescr}</td>
                                    <td>{leaveCategory.entitlement}</td>
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
