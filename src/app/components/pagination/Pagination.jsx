import React from 'react'

function createArrayOfSize(n){
    return new Array(n).fill(0);
}

const Pagination = ({totalPages,currentPage,handlePageChange}) => {
    let pages = createArrayOfSize(totalPages).map((a, i) => (
        <button style={{width:"20px"}} key={i+1}
          disabled={currentPage === i + 1}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ));
      return <div>{pages}</div>;
}

export default Pagination