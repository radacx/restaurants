const template = (strings: any, ...keys: any[]) =>
  ((...values: any[]) => {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });

const BASE = 'http://localhost:4567';

export const RESTAURANTS = `${BASE}/restaurants`;
export const RESTAURANTS_FREE_TABLES = template`${RESTAURANTS}/${0}/free_tables`;

export const RESERVATIONS = `${BASE}/reservations`;
export const RESERVATIONS_CREATE = template`${RESTAURANTS}/${0}/create_reservation`;
export const RESERVATIONS_REMOVE = template`${RESERVATIONS}/${0}/remove`;
