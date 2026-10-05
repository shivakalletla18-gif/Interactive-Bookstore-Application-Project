import { describe, expect, it } from 'vitest';
import { books, cartTotal, filterBooks } from './catalog.js';

describe('filterBooks', () => {
  it('searches title, author, and category without case sensitivity', () => {
    expect(filterBooks(books, { query: 'ROBIN' }).map((book) => book.id)).toEqual(['braiding']);
    expect(filterBooks(books, { query: 'nature' })).toHaveLength(2);
  });

  it('combines category filters with search and sorts results', () => {
    const result = filterBooks(books, { category: 'Art & design', sort: 'price-high' });
    expect(result.map((book) => book.id)).toEqual(['design-everyday', 'ways-of-seeing']);
    expect(filterBooks(books, { query: 'everyday', category: 'Art & design' })).toHaveLength(1);
    expect(filterBooks(books, { category: 'Fiction', sort: 'price-low' })[0].price).toBe(16);
  });

  it('returns an empty list when no books match', () => {
    expect(filterBooks(books, { query: 'unlisted title' })).toEqual([]);
  });
});

describe('cartTotal', () => {
  it('multiplies each book price by its quantity', () => {
    expect(cartTotal([{ price: 18, quantity: 2 }, { price: 16, quantity: 1 }])).toBe(52);
    expect(cartTotal([])).toBe(0);
  });
});