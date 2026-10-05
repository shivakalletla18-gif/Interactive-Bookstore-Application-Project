export const books = [
  { id: 'blue-hour', title: 'The Blue Hour', author: 'Martha Batalha', category: 'Fiction', price: 18, rating: '4.8', tag: 'Staff pick', year: 2024, pages: 288, color: '#385b64', image: 'photo-1519682337058-a94d519337bc', description: 'A luminous, quietly defiant story about the lives we build in the spaces between expectation and desire. For readers who like their fiction tender, sharp, and a little bit strange.' },
  { id: 'wild-places', title: 'Wild Places', author: 'Robert Macfarlane', category: 'Nature', price: 24, rating: '4.9', tag: 'Bestseller', year: 2023, pages: 336, color: '#697a49', image: 'photo-1470770841072-f978cf4d019e', description: 'An invitation to look closer at the living world, tracing the hidden stories of landscapes and the people who learn to listen to them.' },
  { id: 'small-things', title: 'Small Things Like These', author: 'Claire Keegan', category: 'Fiction', price: 16, rating: '4.9', tag: 'Reader favorite', year: 2022, pages: 128, color: '#9c6652', image: 'photo-1470252649378-9c29740c9fa8', description: 'In a small Irish town, one ordinary man faces a choice that will change everything. A quietly powerful novella about courage, kindness, and the cost of looking away.' },
  { id: 'ways-of-seeing', title: 'Ways of Seeing', author: 'John Berger', category: 'Art & design', price: 21, rating: '4.7', tag: 'A Margin classic', year: 1972, pages: 176, color: '#d59854', image: 'photo-1500530855697-b586d89ba3ee', description: 'A classic, pocket-sized invitation to see the familiar differently. Berger reshapes how we look at images, objects, and the stories we tell about them.' },
  { id: 'open-water', title: 'Open Water', author: 'Caleb Azumah Nelson', category: 'Fiction', price: 17, rating: '4.6', tag: '', year: 2021, pages: 160, color: '#355367', image: 'photo-1500375592092-40eb2168fd21', description: 'Two young artists fall in love in south-east London. Told in a voice as rhythmic and intimate as music, this is a story about tenderness, masculinity, and being seen.' },
  { id: 'braiding', title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', category: 'Nature', price: 22, rating: '4.9', tag: 'A Margin classic', year: 2013, pages: 408, color: '#618468', image: 'photo-1448375240586-882707db888b', description: 'Drawing on Indigenous wisdom and scientific knowledge, botanist Robin Wall Kimmerer explores the gifts of the natural world and our responsibility to care for it.' },
  { id: 'design-everyday', title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Art & design', price: 26, rating: '4.7', tag: '', year: 2013, pages: 368, color: '#c47d58', image: 'photo-1494438639946-1ebd1d20bf85', description: 'A deeply human account of how good design makes the everyday easier. Norman reveals why some objects delight us and others leave us quietly furious.' },
  { id: 'convenience-store', title: 'Convenience Store Woman', author: 'Sayaka Murata', category: 'Fiction', price: 16, rating: '4.8', tag: '', year: 2018, pages: 176, color: '#6f7e79', image: 'photo-1516979187457-637abb4f9353', description: 'Keiko Furukura has found her place in the world: the bright, orderly aisles of a convenience store. A funny, incisive novella about choosing your own way to live.' },
];

export const categories = ['All books', 'Fiction', 'Nature', 'Art & design'];

export function filterBooks(items, { query = '', category = 'All books', sort = 'featured' } = {}) {
  const normalized = query.trim().toLowerCase();
  const matches = items.filter((book) => {
    const matchesQuery = !normalized || `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(normalized);
    return matchesQuery && (category === 'All books' || book.category === category);
  });
  if (sort === 'price-low') return matches.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') return matches.sort((a, b) => b.price - a.price);
  if (sort === 'title') return matches.sort((a, b) => a.title.localeCompare(b.title));
  return matches;
}

export function cartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}