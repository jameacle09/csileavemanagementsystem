import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class PublicHoliday extends Component {
    render() {
        const divStyle = {
            background: "#eee",
            padding: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div className="container" style={divStyle}>
                <Form>
                    <FormGroup>
                        <Label for="phDate">Date</Label>
                        <Input type="date" name="phDate" id="phDate" placeholder="Public Holiday Date" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="holiday">Holiday</Label>
                        <Input type="text" name="holiday" id="holiday" placeholder="Description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attachment">Upload data from an Excel</Label>
                        <Input type="file" name="attachment" id="attachment" />
                        <FormText color="muted">
                            Please attach your document.
                        </FormText>
                    </FormGroup>
                        <Button color="primary">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default PublicHoliday;