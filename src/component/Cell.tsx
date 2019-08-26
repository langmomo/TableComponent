import React from "react";
import { TableRow } from "./TableRow";
interface RowProps{
    name: string;
    col: string;
    id: number;
    type: string;
    save: (name: string, id:number, key: string)=>void
    cancel: ()=>void
}
interface RowState{
    name: string;
    id: number;
    col: string;
    type: string;
    save: boolean;
}
export default class Row extends React.Component<RowProps,RowState>{
    state={
        name: this.props.name || " ",
        id: this.props.id || 0,
        col: this.props.col || " ",
        type: this.props.type || "text",
        save: false
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
        let {name, id, col, type, save} = this.state
        console.log(this.state.col)
        return(
            
           
                <td>
                    <div>
                    <input 
                    type={type}
                   
                    value = {name}
                    onChange = {(e)=>{
                        name=e.currentTarget.value
                        this.setState({name: name})
                    }}
                    >
                    </input>
                    <button
                    onClick={()=>{
                        //console.log(this.props.col)
                        this.setState({save: true})
                        this.props.save(name, id, col)
                        
                    }}
                    >save</button>
                     
                    </div>
                    {save &&
                        <text>save success!</text>
                    }
                   
                </td>
          
        )
    }
}