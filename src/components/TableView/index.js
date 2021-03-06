import { Component } from "react";
import './index.css'

class TableView extends Component {
    state = {
        tableData : JSON.parse(localStorage.getItem("tableData"))
    }

    //TODO: BUILD dynamic table view
    
    renderTableBody = () => {
        const {tableData} = this.state;

        let tableBody = [];
        tableData.map(eachData => tableBody.push(Object.values(eachData)));
        
        return (
            <>
                {tableBody.map((eachRow,index) => (
                    <tr key={`${index}-trbv`}>
                        {eachRow.map((cell, index) => <td key={`${index}-tdv`}>{cell}</td>)}
                    </tr>
                ))}
            </>
        );
    }

    renderTableHeaders = () => {
        // let header_arr = [];
        const columnsData = JSON.parse(localStorage.getItem("columnsData"))
        let header_arr = columnsData.map(eachData => {
            // header_arr.push(eachData.columnName)
            return eachData.columnName
        })

        // const headers = Object.keys(tableData[0]);
        return (
            <tr key="trhv">
                {header_arr.map((head, index) => <th key={`${index}-thv`}>{head}</th>)}
            </tr>
        );
    }

    render() {
        return (
            <div className="table-view">
                <table className="view-table">
                    <thead>
                        {this.renderTableHeaders()}
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableView