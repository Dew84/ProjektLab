import React, { useState } from 'react';
import AdCard from './AdCard';
import ReactPaginate from 'react-paginate';
import './AdList.css';

export default function AdList({ ads, pageSize, setSelectedAdId, setCurrentPage }) {
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * pageSize;
  const displayAds = ads.slice(pagesVisited, pagesVisited + pageSize);
  const pageCount = Math.ceil(ads.length / pageSize);

  const changePage = ({ selected }) => setPageNumber(selected);

  if (ads.length === 0) return <p>Nincsenek hirdetések ebben a kategóriában.</p>;

  return (
    <>
      <div className="ads-grid">
        {displayAds.map(ad => (
          <AdCard
            key={ad.id}
            ad={ad}
            onClick={() => {
              setSelectedAdId(ad.id);
              setCurrentPage('adDetails');
            }}
          />
        ))}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Előző"}
          nextLabel={"Következő →"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination-link"}
          nextLinkClassName={"pagination-link"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      )}
    </>
  );
}
