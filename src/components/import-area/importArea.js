import React from 'react';
import './importArea.css'

class ImportArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataValue: [],
            newData: this.props.list,
            exportData: this.props.exportData
        };
    }

    importData=()=>{
       let data = JSON.parse(this.state.dataValue);
        data.forEach((item) => {
            const element =
                {
                    "name": `${item.name}`,
                    "value_name": `${item.value}`
                };
            this.props.addImportData(element);
        });
    };

    handleChange=(e)=>{
        this.setState({dataValue: e.target.value})
    };

    showExportData=()=>{
        const exportedData = this.props.getExportData();
        this.setState({dataValue: exportedData});
    };

    render() {
        return (
            <div>
                <textarea placeholder='Введите значение в формате JSON:[{"name":"name1","value":"value1"},{"name":"name2","value":"value2"}]' className="form-control data" onChange={this.handleChange} value={this.state.dataValue}/>
                <button type = "button" className="btn btn-primary" onClick={this.importData}>Импортировать</button>
                <button type = "button" className="btn btn-primary" onClick={this.showExportData}>Экспортировать</button>
            </div>
        )
    }
}

export default ImportArea;

