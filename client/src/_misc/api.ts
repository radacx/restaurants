let BASE = process.env.url
  || 'http://ruby-api.eu-gb.mybluemix.net/'
  || 'http://localhost:4567';

if (BASE.endsWith('/')) {
  BASE = BASE.substring(0, BASE.length - 1);
}

export const RESTAURANTS = `${BASE}/restaurants`;
export const RESTAURANTS_FREE_TABLES = (restaurantId: string) => `${RESTAURANTS}/${restaurantId}/free_tables`;

export const RESERVATIONS = `${BASE}/reservations`;
export const RESERVATIONS_CREATE = (restaurantId: string) => `${RESTAURANTS}/${restaurantId}/create_reservation`;
export const RESERVATIONS_REMOVE = (reservationId: string) => `${RESERVATIONS}/${reservationId}/remove`;
