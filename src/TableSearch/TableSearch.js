import React, {useState} from 'react'

function TableSearch(props) {
    const [value, setValue] = useState('')

    const valueChangeHandler = e=>{
        setValue(e.target.value)
    }
    return (
        <div className="input-group mt-3 mb-3">
            <div className="input-group-prepend">
               <button className="btn btn-outline-secondary"
               onClick ={()=>props.onSearch(value)}
               >
                   Search
                </button>
             </div>
         <input 
         type="text" 
         className="form-control" 
         placeholder="Username" 
         value={value}
         onChange={valueChangeHandler}
         />
        </div>
    )
}

export default TableSearch
