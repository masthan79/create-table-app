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

    handleChange = (index, dataType, value) => {
        const newState = this.state.tableData.map((eachItem, i) => {
            if (i === index) {
                return {...eachItem, [dataType]: value};
            }
            return eachItem;
        });

        this.setState({tableData: newState});
    }

    onClickCell = () => {
        // console.log("clicked cell");
        this.setState({isTableDataSet: false })
    }

    // dataValidation = () => {
        
    // }

    onClickSubmitTable = () => {
        // this.dataValidation()
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

    render(){
        // const columnsData = JSON.parse(localStorage.getItem("columnsData"))
        const {columnsData} = this.props;
        return (
            <div className="editable-table">
            <table className="table">
                <thead>
                    <tr className="rows">
                        {columnsData.map((eachData, index) => (
                            <th key={index}>{eachData.columnName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map((eachData, index) => (
                        <tr className="header-row">
                            {columnsData.map((eachName) => (
                                <td>
                                <input 
                                className = "cell"
                                type={eachName.columnType} 
                                onClick = {this.onClickCell}
                                onChange={e => this.handleChange(index, eachName.columnName, e.target.value)}
                                />
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

