import { Component } from "react";
import EditableTable from "../EditableTable";
import './index.css'

class ColumnCreation extends Component {
    state = {
        fromData : [{
            columnName: "", 
            columnType: "date", 
            multiSelectValue: []
        }],
        isEditableTable: false
    };

    handleSubmit = event => {
        event.preventDefault();
    }

    onSubmitForm = () => {
        localStorage.setItem("columnsData", JSON.stringify(this.state.fromData));
        this.setState({isEditableTable: true})
    }

    onClickAddColumn = () => {
        this.setState(({
            fromData: [...this.state.fromData, {columnName: "", columnType: "date", multiSelectValue: []}]
        }))
    }

    onChangeField = (i, event, field) => {
        let {fromData} = this.state;
        if (field === "multiSelectValue") {
            const inputStr = event.target.value;
            const inputStrArr = inputStr.split(",");
            fromData[i][field] = inputStrArr.map(eachItem => eachItem.trim())
        } else {
            fromData[i][field] = event.target.value;
        }
        this.setState({fromData});
    }

    multiSelectValueInput = (element, index) => {
        return (
            <div className="multi-select-input-container">
                <label htmlFor = "multiSelectValue" className="label-input">Values</label>
                <input
                    className="input"
                    type = "text"
                    id = "multiSelectValue"
                    value = {element.multiSelectValue}
                    onChange = {event => this.onChangeField(index, event, 'multiSelectValue')}
                />
            </div>
        )
    }

    render(){
        const {fromData} = this.state
        return (
            <>
                <form onSubmit = {this.handleSubmit}>
                    {
                        fromData.map((element, index) => (
                            <div key={index} className="input-container">
                                <label htmlFor = "columnName" className="label-input">Column Name</label>
                                <input
                                    className="input"
                                    type = "text"
                                    id = "columnName"
                                    value = {element.columnName}
                                    onChange = {event => this.onChangeField(index, event, 'columnName')}
                                />
                                <label htmlFor = "columnType" className="label-input">
                                    Column Type 
                                </label>
                                <select 
                                        className="dropdown-input"
                                        value = {element.columnType} 
                                        id = "columnType" 
                                        onChange = {event => this.onChangeField(index, event, 'columnType')}
                                    >
                                        <option value="date">Date</option>
                                        <option value="number">Number</option>
                                        <option value="multiSelect">Multi Select</option>
                                    </select>
                                {(element.columnType === "multiSelect") && this.multiSelectValueInput(element, index)}
                            </div>
                        ))
                    }

                    <div className="btns-container">
                        <button type="button" onClick={this.onClickAddColumn} className="btn">Add Column</button>
                        <button type="submit" onClick={this.onSubmitForm} className="btn">Submit</button>
                    </div>
                </form>

                {this.state.isEditableTable &&<EditableTable columnsData={this.state.fromData}/>}
            </>
        )
    }
}

export default ColumnCreation

