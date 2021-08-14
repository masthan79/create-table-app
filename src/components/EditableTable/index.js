import { Component } from "react";
import TableView from "../TableView";

import './index.css'

let obj = {}

const initializeObj = (columnsData) => {
    // const columnsData = JSON.parse(localStorage.getItem("columnsData"))
    columnsData.map(eachColumnData => obj[eachColumnData.columnName]= "")

    // return obj
}


class EditableTable extends Component {
    constructor(props) {
        super(props);
        let {columnsData} = props;
        initializeObj(columnsData)
    }

    InitialData = () => {
        const arr = []
        for (let i=0; i<20; i++) {
            arr.push(obj) 
        }
        return arr
    }

    state = {
        tableData : this.InitialData(),
        isTableDataSet: false
    }

    handleChange = (index, cellName, value) => {

        const newState = this.state.tableData.map((eachItem, i) => {
            if (i === index) {
                return {...eachItem, [cellName]: value};
            }
            return eachItem;
        });

        this.setState({tableData: newState});
    }

    onClickCell = () => {
        this.setState({isTableDataSet: false })
    }

    onClickSubmitTable = () => {
        localStorage.setItem("tableData", JSON.stringify(this.state.tableData));
        this.setState({isTableDataSet: true})
    }

    onClickAddRow = () => {
        this.setState(
            {
                tableData : [...this.state.tableData, obj]
            }
        )
    }

    onClickMultiSelect = (eachValue) => {
        console.log(eachValue);
    }

    render(){
        // const columnsData = JSON.parse(localStorage.getItem("columnsData"))
        const {columnsData} = this.props;
        return (
            <div className="editable-table">
            <table className="table">
                <thead>
                    <tr className="rows" key={`trhe`}>
                        {columnsData.map((eachData, index) => (
                            <th key={`${index}-the`}>{eachData.columnName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map((eachData, index) => (
                        <tr className="header-row" key={`${index}-trbe`}>
                            {columnsData.map((eachName,indexTr) => (
                                <td key={`${indexTr}-tde`}>
                                    {(eachName.columnType === "multiSelect") ? (
                                        <select
                                            // value = {eachName.multiSelectValue[0]}
                                            id = "multiSelectOpts"
                                            className = "cell"
                                            onClick = {this.onClickCell}
                                            onChange={event => this.handleChange(index, eachName.columnName, event.target.value)}
                                        >
                                            {eachName.multiSelectValue.map(eachValue => (
                                                <option 
                                                    value={eachValue} 
                                                    onClick={this.onClickMultiSelect(eachValue)}
                                                    defaultValue={eachName.multiSelectValue[1]}
                                                >{eachValue}</option>
                                            ))}
                                        </select>
                                     ) : (
                                        <input 
                                            className = "cell"
                                            type={eachName.columnType} 
                                            onClick = {this.onClickCell}
                                            onChange={event => this.handleChange(index, eachName.columnName, event.target.value)}
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

                <div className="btn-container-edit">
                    <button type="button" onClick={this.onClickAddRow} className="btn">Add Row</button>
                    <button type="button" onClick={this.onClickSubmitTable} className="btn">Submit</button>
                </div>

                {this.state.isTableDataSet && <TableView/>}
            </div>
        )
    }
}

export default EditableTable

