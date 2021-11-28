import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContractKit } from '@celo-tools/use-contractkit';
import AppContext from '../../AppContext';
import Spinner from '../../components/Spinner/Spinner';
import Offer from '../../components/Offer/Offer';
import { getOffers } from '../../api';
import './Offers.css';

export default function Offers() {
  const { state, dispatch } = useContext(AppContext);
  const { address: addr } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      loading: true
    });

    getOffers({ address }).then(({ currentPage, lastPage, offers }) => {
      dispatch({
        type: 'SET_OFFERS',
        currentPage: Number(currentPage),
        lastPage: Number(lastPage),
        offers
      });
      dispatch({
        type: 'SET_LOADING',
        loading: false
      });
    });
  }, [dispatch, address]);

  const [loadingMore, setLoadingMore] = useState(false);

  if (state.loading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  if (!state.offers) {
    return null;
  }

  const loadMoreHandler = () => {
    setLoadingMore(true);
    getOffers({ page: Number(state.currentPage) + 1 }).then(
      ({ currentPage, lastPage, offers }) => {
        setLoadingMore(false);
        dispatch({
          type: 'SET_OFFERS',
          currentPage: Number(currentPage),
          lastPage: Number(lastPage),
          offers: [...state.offers, ...offers]
        });
      }
    );
  };

  let loadMore = null;
  if (loadingMore) {
    loadMore = <Spinner />;
  } else if (state.currentPage < state.lastPage) {
    loadMore = (
      <div className="center" style={{ marginTop: '16px' }}>
        <button className="button--small" onClick={loadMoreHandler}>
          Load more
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="list-header">
        <h2>Available offers</h2>
        <Link to="/add" className="small-link">
          Add offer
        </Link>
      </div>
      <ul className="offers">
        {state.offers.map((offer) => {
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
      {loadMore}
      {state.offers.length === 0 && (
        <div className="center">
          <br />
          It seems we ran out of offers
        </div>
      )}
    </div>
  );
}
