import React from "react";
import {TableRow} from "./TableRow";
import Table from 'react-bootstrap/Table';
import Row from './Cell';
interface TableProps{
    columns: string[];
    rows?: TableRow[];
    // current_row: TableRow;
    create: boolean
    save: (row: TableRow, cancel?: boolean, save?:boolean)=>void
}
interface TableState{
    columns: string[];
    rows: TableRow[];
    // current_row: TableRow;
    create: boolean
    
   
}


export default class MyTable extends React.Component<TableProps,TableState>{
    state = {
        columns: this.props.columns?this.props.columns:[],
        rows: this.props.rows?this.props.rows: [],
        create: this.props.create? this.props.create: false,
        // current_row: this.props.current_row? this.props.current_row: null,
        
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.rows !== newProps.rows) {
          this.setState({rows: newProps.rows})
        }
    }


    save=(name: String, id: number, key: string)=>{
        let {rows} = this.state
        let row: TableRow = rows.find((row)=>row.id==id)
            row[key] = name

            this.setState({rows:rows})
        
        
        
    }

    cancel=()=>{
        let {rows} = this.state
        this.setState({rows:rows})
    }

    render(){
        let {columns, rows} = this.state
        return(
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>{
                    columns.map((item)=>
                        <th>{item}</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                    
                    {
                    rows!=[] && rows.map((row)=>{
                        let btn_name = row.edit? "save": "edit"
                        return (<tr key={row["id"]}>
                           {                          
                                !row["edit"]
                                ?Object.keys(row).map((key)=>{
                                   if(key!="id" && key!="edit"){
                                        return (<td>{row[key]}</td>)
                                   }
                                   
                               })
                               :
                               Object.keys(row).map((key)=>{
                                if(key !="id" && key !="edit"){
                                    return (<Row name={row[key]} col={key} id={row.id} type={key=="age"? "number" : "text"}save={this.save} cancel={this.cancel}></Row>)
                                }     

                            })
                            }
                            {
                            <td>
                                <button onClick={()=>
                                    {
                                        if(row.name && row.address && row.age){
                                            this.props.save(row, false, false)
                                        } else{
                                            alert("please save each column. name, address, age field cannot be empty")
                                        }
                                    }
                                }>{btn_name}</button>
                                {btn_name=="save"  && 
                                <button onClick={()=>{
                                
                                    this.props.save(row, true)}}>cancel</button>
                                }
                            </td>
                        }
                            
                    </tr>)})

                        
                        }
                        
                    
                </tbody>
        </Table>
        )
    }
}