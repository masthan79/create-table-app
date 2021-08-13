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
                {tableBody.map(eachRow => (
                    <tr>
                        {eachRow.map((cell, index) => <td key={index}>{cell}</td>)}
                    </tr>
                ))}
            </>
        );
    }

    renderTableHeaders = () => {
        const {tableData} = this.state;

        const headers = Object.keys(tableData[0]);
        return (
            <tr>
                {headers.map(head => <th>{head}</th>)}
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