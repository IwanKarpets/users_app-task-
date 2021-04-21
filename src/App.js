import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from './Loader/Loader';
import Table from './Table/Table';
import ReactPaginate from 'react-paginate';
import * as _ from 'lodash';
import DetailRowView from'./DetailRowView/DetailRowView';
import TableSearch from './TableSearch/TableSearch';


class App extends Component {
  state ={
    isLoading: true,
    data: [],
    sort: 'asc',
    sortField: 'id',
    row: null,
    currentPage:0,
    search: '',
  }


  async componentDidMount(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    this.setState({
      isLoading:false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })

  }

    onSort=sortField=>{
      const clonedData = this.state.data.concat()
      const sortType = this.state.sort==='asc'?'desc':'asc'
      const orderedData = _.orderBy(clonedData,sortField, sortType)
      
    
    this.setState({
      data:orderedData,
      sort: sortType,
      sortField
    })
    
    }

    onRowSelect = row =>{
      this.setState({row})
    }
    pageChangeHadler = page =>{
      this.setState({
        currentPage:page.selected
      })
    }

      onSearch = search=>{
        this.setState({search, currentPage:0})
      }
  
      getFilteredData=()=>{
        const {data, search} = this.state;
        if(!search){
          return data
        }

        return data.filter(item=>{
          return item['name'].toLowerCase().includes(search.toLowerCase())
          ||item['username'].toLowerCase().includes(search.toLowerCase())
        })
      }
    

  render(){
    const pageSize=5;
    const filteredData = this.getFilteredData()
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
    
    const pageCount = Math.ceil(filteredData.length/pageSize)
  
    
    return (
      <div className="container">
        {
          this.state.isLoading
          ? <Loader/>
          :<React.Fragment>
          <TableSearch onSearch={this.onSearch}/>
          <Table
            data={displayData}
            onSort={this.onSort}
            sort={this.state.sort}
            sortField={this.state.sortField}
            onRowSelect = {this.onRowSelect}
          />
          </React.Fragment>
        }

        {
          this.state.data.length> pageSize
          ?  <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'} 
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={2}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.pageChangeHadler}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          forcePage={this.state.currentPage}

        />: null
        }
        {
          this.state.row
            ? <DetailRowView person={this.state.row}/>
            :null
        }
  
      </div>
    );
  }
  
}

export default App;