import React from 'react';
import './table.css'
import ImportArea from "../import-area/importArea";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [
                {name: "User", value_name: " "},
                {name: "Id", value_name: " "},
                {name: "Email", value_name: " "},
                {name: "Token", value_name: " "},
            ]
        };
    }

    addCells = () => {
        const newRow = [{name: '', value_name: ''}];
        this.setState({
            values: this.state.values.concat(newRow)
        }, function () {
            return this.state.values.map(function (elem, idx) {
                return (<tr key={idx}>
                    <td><textarea id={idx} className="text name" value={elem.name}/></td>
                    <td><textarea id={idx} className="text" onChange={(e) => this.changeValue(idx, e)} value={elem.value_name}/></td>
                    <td className="cross"><i onClick={() => this.deleteCell(idx)} className="fas fa-times"/>
                    </td>
                </tr>)
            })
        });
    };

    deleteCell = (i) => {
        this.setState({
            values: this.state.values.filter((name, index) => index !== i)
        });
    };

    changeValue = (idx, e) => {
        this.state.values[idx].value_name = e.target.value;
        this.forceUpdate();
    };

    addImportData = (data) => {
        this.setState(prevState => ({
            values: [...prevState.values, data]
        }));
    };

    changeName = (idx, e) => {
        this.state.values[idx].name = e.target.value;
        this.forceUpdate();
    };

    getExportData = () => {
        const jsonData = JSON.stringify(this.state.values);
        return jsonData;
    };

    render() {
        const cellValue = this.state.values.map((elem, idx) => {
            return (
                <tr key={idx}>
                    <td><textarea id={idx} placeholder="Введите название" className="text"
                                  onChange={(e) => this.changeName(idx, e)} value={elem.name}/></td>
                    <td><textarea id={idx} placeholder='Введите значение' className="text"
                                  onChange={(e) => this.changeValue(idx, e)} value={elem.value_name}/></td>
                    <td className="cross"><i onClick={() => this.deleteCell(idx)} className="fas fa-times"/>
                    </td>
                </tr>

            )
        });
        return (
            <div className="container">
                <table className="table t_container">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Значение</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cellValue}
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary" onClick={this.addCells}>Добавить ячейки</button>
                <ImportArea addImportData={this.addImportData} getExportData={this.getExportData}/>
            </div>
        )
    }
}

export default Table;