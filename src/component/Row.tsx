import React from "react";
import { TableRow } from "./TableRow";
interface RowProps{
    name: string;
    col: string;
    id: number;
    save: (name: string, id:number, key: string)=>void
    cancel: ()=>void
}
interface RowState{
    name: string;
    id: number;
    col: string;
}
export default class Row extends React.Component<RowProps,RowState>{
    state={
        name: this.props.name || " ",
        id: this.props.id || 0,
        col: this.props.col || " ",
    }

    componentWillReceiveProps(){
        console.log("row update"+this.state.name)
        this.setState({
            name:this.state.name,
            id: this.props.id,
            col: this.props.col
        })
    }



    render(){
        let {name, id, col} = this.state
        console.log(this.state.col)
        return(
            
           
                <td>
                    <div>
                    <input 
                    value = {name}
                    onChange = {(e)=>{
                        name=e.currentTarget.value
                        this.setState({name: name})
                    }}
                    >
                    </input>
                    <button
                    onClick={()=>{
                        console.log(this.props.col)
                        this.props.save(name, id, col)
                        
                    }}

                    
                    >save</button>
                    </div>
                </td>
          
        )
    }
}