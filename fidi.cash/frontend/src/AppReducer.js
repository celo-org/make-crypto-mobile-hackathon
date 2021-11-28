import { saveState } from './api';

const initialState = {
  loading: false,
  address: null,
  user: null,
  offers: null,
  currentPage: 0,
  lastPage: 0,
  deals: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE': {
      const { state: newState } = action;
      return {
        ...state,
        ...newState
      };
    }
    case 'SAVE_STATE': {
      saveState({
        offers: state.offers,
        deals: state.deals
      });
      return state;
    }
    case 'SET_ADDRESS': {
      const { address } = action;
      return {
        ...state,
        address
      };
    }
    case 'SET_USER': {
      const { user } = action;
      return {
        ...state,
        user
      };
    }
    case 'SET_LOADING': {
      const { loading } = action;
      return {
        ...state,
        loading
      };
    }
    case 'SET_OFFERS': {
      const { offers, currentPage, lastPage } = action;
      return {
        ...state,
        offers,
        currentPage,
        lastPage
      };
    }
    case 'DEPOSIT': {
      const { id, amount, collateral, price, comment } = action;
      const offers = [
        ...state.offers,
        {
          id,
          type: 'USD',
          price,
          amount,
          collateral,
          comment,
          user: {
            name: state.address
          }
        }
      ];
      return {
        ...state,
        offers
      };
    }
    case 'BUY': {
      const { offerId, dealId, address, amount, deposit, collateral, comment } =
        action;
      const offer = {
        ...state.offers.find((offer) => offerId === offer.id)
      };
      offer.amount -= amount;
      const offers = state.offers.filter((offer) => offerId !== offer.id);
      const deal = {
        id: dealId,
        offerId: offerId,
        seller: offer.user,
        buyer: address,
        amount,
        deposit,
        collateral,
        price: offer.price,
        comment
      };
      return {
        ...state,
        offers: [...offers, offer],
        deals: [...state.deals, deal]
      };
    }
    case 'CANCEL_OFFER': {
      const { id, amount } = action;
      const offer = {
        ...state.offers.find((offer) => id === offer.id)
      };
      offer.amount = 0;
      offer.collateral -= amount;
      const offers = state.offers.filter((offer) => id !== offer.id);
      return {
        ...state,
        offers: [...offers, offer]
      };
    }
    case 'CLOSE': {
      const { id, stake } = action;
      const deal = state.deals.find((deal) => id === deal.id);
      const offer = {
        ...state.offers.find((offer) => offer.id === deal.offerId)
      };
      offer.collateral -= stake;

      const offers = state.offers.filter((offer) => offer.id !== deal.offerId);

      const deals = state.deals.filter((deal) => id !== deal.id);
      return {
        ...state,
        deals,
        offers: [...offers, offer]
      };
    }

    default:
      return state;
  }
};

export { reducer, initialState };
