import React, {Component} from 'react'

class Search extends Component {
  render() {
    return (
      <React.Fragment>
      {/* <h1 id='main-page-title'>Find</h1> */}
      <div className='search_form'><h3>Find a class near you...</h3>
        <div className="ui large icon input">
          <input
            type="text"
            placeholder='Search by location'
            onChange={this.props.onSearchHandler}
            value={this.props.value}
          />
          <i className="search icon" />
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Search;
