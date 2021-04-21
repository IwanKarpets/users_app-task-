import React from 'react';
 

export default props =>{
    return(
    <table className="table">
    <thead>
        <tr>
            <th onClick={props.onSort.bind(null, 'id')}>
                ID {props.sortField === 'id' ? <small>{props.sort}</small>:null}
            </th>
            <th onClick={props.onSort.bind(null, 'name')}>
                Name {props.sortField === 'name' ? <small>{props.sort}</small>:null}
                </th>
            <th onClick={props.onSort.bind(null, 'username')}>
                Username {props.sortField === 'username' ? <small>{props.sort}</small>:null}
                </th>
            <th onClick={props.onSort.bind(null, 'email')}>
                Email {props.sortField === 'email' ? <small>{props.sort}</small>:null}
                </th>
            <th onClick={props.onSort.bind(null, 'phone')}>
                Phone {props.sortField === 'phone' ? <small>{props.sort}</small>:null}
                </th>
        </tr>
    </thead>
    <tbody>
    {props.data.map(item=>{
    return <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
        </tr>
    })}
    </tbody>
    </table>
)}