import React from "react"
import ReactDOM from "react-dom"
import MyTable from "./MyTable";
import Button from 'react-bootstrap/Button';
import { TableRow } from "./TableRow";
export interface CustomTableState{
    rows: TableRow[],
    current_row: TableRow;
    create: boolean;
    
    
}
export default class CustomTable extends React.Component<{},CustomTableState>{
    state={
        rows:[
            {
                name: "default",
                age: "default",
                address: "default",
                id: 1,
                edit: false
            }
        ],
        current_row: null,
        create: false
    
    }

    save=(row: TableRow, cancel?:boolean, save?: boolean):void=>{
        let {rows} = this.state
        if(cancel && save){
            this.setState({
                current_row: null
            })
        }
        else if(cancel){
            let new_rows = rows.filter(item=>item.id != row.id)
            console.log(new_rows)
            this.setState({
                rows: new_rows,
                current_row: null
            })
        }else if(save){
            rows.push(row);
            this.setState({rows: rows})
        }else{
            let cur: TableRow = rows.filter(item=>item.id == row.id)[0]
            
            row.edit = !row.edit;
            if(!cancel) cur = row;
            console.log(row)
            this.setState({rows: rows})
        }
        
        
    }

    



    
    render(){
        let {rows, current_row, create} = this.state
        console.log(rows)
        return(
            <div>
                <button id="primary"
                    onClick={()=>{
                        let r: TableRow = {
                            name: "",
                            age: "",
                            address: "",
                            id: rows.length+1,
                            edit: true
                            };
                        rows.push(r);
                        this.setState({rows: rows,
                        create: true,
                        })
                                    
                    }}>new row</button>
                <MyTable columns={["name","age","address","operation"]}
                rows={rows}
                create = {create}
                // current_row = {current_row}
                save = {this.save}
                ></MyTable>
            </div> 
        )
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<CustomTable/>, wrapper) : false;

