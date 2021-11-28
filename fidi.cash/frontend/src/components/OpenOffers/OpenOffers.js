import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useContractKit } from '@celo-tools/use-contractkit';
import Spinner from '../../components/Spinner/Spinner';
import Offer from '../../components/Offer/Offer';
import { getOpenOffers } from '../../api';
import './OpenOffers.css';

export default function OpenOffers() {
  const { address: addr } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const loadOffers = useCallback(async (address, page = 0) => {
    setLoading(true);
    const { currentPage, lastPage, offers } = await getOpenOffers({
      address,
      page
    });
    setOffers((prevOffers) => [...prevOffers, ...offers]);
    setCurrentPage(Number(currentPage));
    setLastPage(Number(lastPage));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!address) {
      return;
    }
    loadOffers(address);
  }, [address, loadOffers]);

  const handleLoadMore = () => {
    loadOffers(address, currentPage + 1);
  };

  return (
    <div>
      <div className="list-header">
        <h2>Open Offers</h2>
        <Link to="/add" className="small-link">
          Add offer
        </Link>
      </div>
      <ul className="offers">
        {offers.map((offer) => {
          const { address, price, amount, details, user } = offer;
          return (
            <Offer
              key={address}
              address={address}
              price={price}
              amount={amount}
              details={details}
              user={user.address}
            />
          );
        })}
      </ul>
      {offers.length === 0 && (
        <div className="center">
          <br />
          No open offers for now.
        </div>
      )}
      {loading && <Spinner />}
      {!loading && currentPage < lastPage && (
        <div className="center" style={{ marginTop: '16px' }}>
          <button className="button--small" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
