import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import { books, categories, cartTotal, filterBooks } from './catalog.js';

const CartContext = createContext(null);
const money = (value) => `$${value.toFixed(2)}`;

function useCart() {
  return useContext(CartContext);
}

function Cover({ book, className = '' }) {
  return (
    <div className={`book-cover ${className}`} style={{ backgroundColor: book.color }}>
      <img src={`https://images.unsplash.com/${book.image}?auto=format&fit=crop&w=700&q=82`} alt={`Cover art for ${book.title}`} loading="lazy" />
      <div className="cover-shade" />
      <div className="cover-type"><span className="cover-author">{book.author}</span><strong>{book.title}</strong></div>
      {book.tag && <span className="book-badge">{book.tag}</span>}
    </div>
  );
}

function BookCard({ book }) {
  const { add } = useCart();
  return (
    <article className="book-card">
      <Link to={`/books/${book.id}`} aria-label={`View ${book.title}`}><Cover book={book} /></Link>
      <div className="book-info">
        <div className="book-info-top"><div><h3><Link to={`/books/${book.id}`}>{book.title}</Link></h3><div className="book-author">{book.author}</div></div><span className="book-price">{money(book.price)}</span></div>
        <div className="book-meta"><span className="rating">★ {book.rating} <span className="book-category">· {book.category}</span></span><button className="add-mini" onClick={() => add(book)} aria-label={`Add ${book.title} to cart`} title="Add to bag">+</button></div>
      </div>
    </article>
  );
}

function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Margin home"><span className="brand-mark" />Margin</Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/books">Books</NavLink><a href="/#about">Our story</a><a href="/#journal">The journal</a>
      </nav>
      <div className="header-actions"><Link className="icon-link" to="/books"><Search size={17} strokeWidth={1.6} /><span>Search</span></Link><Link className="icon-link" to="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={18} strokeWidth={1.6} /><span className="cart-count">{count}</span></Link></div>
    </header>
  );
}

function BookGrid({ items }) {
  if (!items.length) return <div className="empty-results"><Sparkles size={22} /><h2>No books found just yet.</h2><p>Try another title, author, or shelf.</p></div>;
  return <div className="book-grid">{items.map((book) => <BookCard key={book.id} book={book} />)}</div>;
}

function Home() {
  const featured = books.slice(0, 4);
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow">An independent bookstore</span><h1>For the love<br />of a <em>good story.</em></h1><p>Books chosen with care, for the curious and the quietly ambitious. Find your next somewhere-to-be.</p><Link to="/books" className="button">Find your next read <ArrowRight size={16} /></Link></div>
        <div className="hero-art" role="img" aria-label="A quiet landscape at golden hour"><div className="hero-note">GOOD BOOKS<br />GOOD COMPANY<br />SINCE 2021</div><span className="hero-art-label">A little room to get lost in</span></div>
      </section>
      <section aria-labelledby="featured-heading">
        <div className="shelf-head"><div><span className="eyebrow">Picked for you</span><h2 id="featured-heading">On our reading table</h2></div><Link to="/books" className="text-link">Explore all books <ArrowRight size={13} /></Link></div>
        <BookGrid items={featured} />
      </section>
      <div className="strip"><span><b>01</b> Read a little wider</span><span>Thoughtful picks, always</span><span><b>02</b> Find your next favorite</span></div>
      <section id="about" className="shelf-head"><div><span className="eyebrow">A note from us</span><h2>Good books make room.</h2></div><p style={{ maxWidth: 420, color: 'var(--muted)', fontSize: 13, lineHeight: 1.8 }}>Margin is an independent bookshop for the stories, ideas, and voices that stay with you long after the last page. Every title on our shelves has a reason to be here.</p></section>
      <div id="journal" />
    </main>
  );
}

function Listing() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || 'All books');
  const [sort, setSort] = useState('featured');
  const items = useMemo(() => filterBooks(books, { query, category, sort }), [query, category, sort]);
  return (
    <main className="page listing-page">
      <div className="listing-top"><div><span className="eyebrow">The collection</span><h1>All the good ones.</h1><p>Considered reads for wherever you are right now.</p></div><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, or subject" aria-label="Search books" />{query && <button onClick={() => setQuery('')} aria-label="Clear search" style={{ background: 'none', border: 0, cursor: 'pointer' }}><X size={15} /></button>}</label></div>
      <div className="filters"><div className="category-list" aria-label="Filter by category">{categories.map((item) => <button key={item} className={`filter-chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div><label><span className="sr-only">Sort books</span><select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Sort: Featured</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="title">Title: A to Z</option></select><ChevronDown size={13} /></label></div>
      <div className="result-count">{items.length} {items.length === 1 ? 'book' : 'books'} on this shelf</div><BookGrid items={items} />
    </main>
  );
}

function Detail() {
  const { id } = useParams();
  const { add } = useCart();
  const navigate = useNavigate();
  const book = books.find((item) => item.id === id);
  if (!book) return <main className="page empty-results"><h2>We couldn't find that book.</h2><Link className="button" to="/books">Back to the shelves</Link></main>;
  return <main className="page"><div style={{ paddingTop: 28 }}><button className="text-link" onClick={() => navigate(-1)} style={{ border: 0, background: 'none', cursor: 'pointer' }}><ArrowLeft size={14} /> Back to the shelves</button></div><section className="detail-layout"><div className="detail-cover"><Cover book={book} /></div><div className="detail-copy"><span className="eyebrow">{book.category} · {book.year}</span><h1>{book.title}</h1><div className="author">by {book.author} &nbsp;·&nbsp; ★ {book.rating}</div><div className="detail-price">{money(book.price)}</div><p>{book.description}</p><div className="detail-facts"><span>FORMAT<b>Paperback</b></span><span>PAGES<b>{book.pages}</b></span><span>DISPATCH<b>1–2 days</b></span></div><div className="detail-actions"><button className="button" onClick={() => add(book)}>Add to bag <ShoppingBag size={15} /></button><button className="button light" aria-label="Add to wishlist" title="Add to wishlist"><Heart size={16} /></button></div></div></section></main>;
}

function OrderSummary({ items, total, buttonLabel, onSubmit, disabled }) {
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total >= 40 || total === 0 ? 0 : 4.5;
  return <aside className="summary"><h2>Your order</h2><div className="summary-row"><span>Subtotal · {quantity} items</span><span>{money(total)}</span></div><div className="summary-row"><span>Shipping</span><span>{shipping ? money(shipping) : 'On us'}</span></div><div className="summary-row total"><span>Total</span><span>{money(total + shipping)}</span></div>{onSubmit && <button className="button" onClick={onSubmit} disabled={disabled}>{buttonLabel}<ArrowRight size={15} /></button>}<p className="summary-note">Shipping is on us when you spend $40 or more. Every order is carefully packed in recyclable materials.</p></aside>;
}

function Cart() {
  const { items, remove, update } = useCart();
  const navigate = useNavigate();
  const total = cartTotal(items);
  if (!items.length) return <main className="page empty-cart"><span className="eyebrow" style={{ justifyContent: 'center' }}>Your bag</span><h2>Room for a good book.</h2><p>Your bag is empty for now. The shelves are full of possibility.</p><Link to="/books" className="button">Browse the shelves <ArrowRight size={15} /></Link></main>;
  return <main className="page cart-layout"><section><div className="cart-heading"><span className="eyebrow">A good choice</span><h1>Your book bag.</h1></div><div className="cart-list">{items.map((item) => <article className="cart-row" key={item.id}><Link to={`/books/${item.id}`}><Cover book={item} /></Link><div><h3><Link to={`/books/${item.id}`}>{item.title}</Link></h3><p>{item.author}</p><div className="quantity"><button onClick={() => update(item.id, item.quantity - 1)} aria-label={`Decrease ${item.title} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => update(item.id, item.quantity + 1)} aria-label={`Increase ${item.title} quantity`}>+</button><button className="remove-button" onClick={() => remove(item.id)}>Remove</button></div></div><span className="line-price">{money(item.price * item.quantity)}</span></article>)}</div></section><OrderSummary items={items} total={total} buttonLabel="Continue to checkout" onSubmit={() => navigate('/checkout')} /></main>;
}

function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const total = cartTotal(items);
  if (placed) return <main className="page"><section className="confirmation"><span className="confirmation-mark"><Check size={29} /></span><span className="eyebrow" style={{ justifyContent: 'center' }}>Order confirmed</span><h1>On its way to you.</h1><p>Thank you for giving these stories a home. Your order <strong>#{orderNumber}</strong> is being prepared. A confirmation would be sent to your email.</p><Link to="/books" className="button">Back to the shelves <ArrowRight size={15} /></Link></section></main>;
  if (!items.length) return <main className="page empty-cart"><h2>Nothing to check out yet.</h2><Link to="/books" className="button">Browse books</Link></main>;
  const submitOrder = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get('email') || !data.get('name') || !data.get('address')) return;
    setOrderNumber(Math.random().toString(36).slice(2, 8).toUpperCase());
    setPlaced(true);
    clear();
  };
  return <main className="page"><div className="checkout-wrap"><div className="checkout-heading"><span className="eyebrow">Almost there</span><h1>Make it yours.</h1></div><div className="checkout-grid"><form className="checkout-form" onSubmit={submitOrder}><div className="field full"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required /></div><div className="field full"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" placeholder="Your name" required /></div><div className="field full"><label htmlFor="address">Street address</label><input id="address" name="address" autoComplete="street-address" placeholder="123 Bookshop Lane" required /></div><div className="field"><label htmlFor="city">City</label><input id="city" name="city" autoComplete="address-level2" placeholder="City" required /></div><div className="field"><label htmlFor="postal">Postal code</label><input id="postal" name="postal" autoComplete="postal-code" placeholder="00000" required /></div><button className="button" type="submit">Place your order <ArrowRight size={15} /></button><p className="secure-note">This demo checkout collects no payment details. Your order is confirmed locally in this browser.</p></form><OrderSummary items={items} total={total} /></div></div></main>;
}

function Footer() {
  return <footer className="site-footer"><Link to="/" className="footer-brand">Margin</Link><span className="footer-caption">Independent books for the in-between.</span><span>© 2025 Margin Bookshop</span></footer>;
}

export default function App() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('margin-cart') || '[]'); } catch { return []; }
  });
  useEffect(() => localStorage.setItem('margin-cart', JSON.stringify(items)), [items]);
  const cart = {
    items,
    add(book) { setItems((current) => { const found = current.find((item) => item.id === book.id); return found ? current.map((item) => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...book, quantity: 1 }]; }); },
    remove(id) { setItems((current) => current.filter((item) => item.id !== id)); },
    update(id, quantity) { setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item)); },
    clear() { setItems([]); },
  };
  return <CartContext.Provider value={cart}><Header /><Routes><Route path="/" element={<Home />} /><Route path="/books" element={<Listing />} /><Route path="/books/:id" element={<Detail />} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="*" element={<main className="page empty-results"><h2>That page wandered off.</h2><Link className="button" to="/">Return home</Link></main>} /></Routes><Footer /></CartContext.Provider>;
}