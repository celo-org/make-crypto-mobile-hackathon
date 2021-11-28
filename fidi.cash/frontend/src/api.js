const API_URL = '/api/v1';

const getState = async () => {
  try {
    const url = `${API_URL}/state`;
    const response = await fetch(url, {
      method: 'GET'
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `${url} ➞ ${response.status} ${response.statusText} ${body}`
      );
    }
    const state = await response.json();
    return state;
  } catch (error) {
    console.error(error);
  }
};

const saveState = async (state) => {
  const url = `${API_URL}/state`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return state;
};

const registerUser = async ({ address }) => {
  const url = `${API_URL}/users`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ address })
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const DEFAULT_SIZE = 2;

const getOffers = async ({
  address = null,
  page = 0,
  size = DEFAULT_SIZE
} = {}) => {
  const baseUrl = address
    ? `${API_URL}/users/${address}/offers`
    : `${API_URL}/offers`;
  const url = `${baseUrl}?page=${page}&size=${size}`;

  const response = await fetch(url, {
    method: 'GET'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  const { currentPage, lastPage, offers } = await response.json();

  return { currentPage, lastPage, offers };
};

const getOpenDeals = async (address) => {
  const url = `${API_URL}/users/${address}/open/deals`;

  const response = await fetch(url, {
    method: 'GET'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const getOpenOffers = async ({
  address,
  page = 0,
  size = DEFAULT_SIZE
} = {}) => {
  const url = `${API_URL}/users/${address}/open/offers?page=${page}&size=${size}`;

  const response = await fetch(url, {
    method: 'GET'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  const { currentPage, lastPage, offers } = await response.json();

  return { currentPage, lastPage, offers };
};

const getOffer = async (address) => {
  const url = `${API_URL}/offers/${address}`;

  const response = await fetch(url, {
    method: 'GET'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const getDeal = async (address) => {
  const url = `${API_URL}/deals/${address}`;

  const response = await fetch(url, {
    method: 'GET'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const createOffer = async (data) => {
  const url = `${API_URL}/offers`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const buy = async (data) => {
  const url = `${API_URL}/deals`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const cancelOffer = async (address) => {
  const url = `${API_URL}/offers/${address}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const closeDeal = async (address) => {
  const url = `${API_URL}/deals/${address}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const fulfillDeal = async (address) => {
  const url = `${API_URL}/deals/${address}/fulfill`;
  const response = await fetch(url, {
    method: 'PATCH'
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${url} ➞ ${response.status} ${response.statusText} ${body}`
    );
  }
  return response.json();
};

const getBalance = async (address) => {
  try {
    const url = `${API_URL}/profile/${address}`;
    const response = await fetch(url, {
      method: 'GET'
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `${url} ➞ ${response.status} ${response.statusText} ${body}`
      );
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  getState,
  saveState,
  registerUser,
  getOffers,
  getOpenOffers,
  getOpenDeals,
  getOffer,
  getDeal,
  createOffer,
  buy,
  cancelOffer,
  fulfillDeal,
  closeDeal,
  getBalance
};
