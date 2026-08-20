import { Link } from "react-router-dom";

function HomePage() {
  return <main className="page home-page"><section className="hero"><p className="eyebrow">COLLEGE LIBRARY / 2026</p><h1>Find your next<br /><em>good read.</em></h1><p className="hero-copy">A calm, simple space to browse the collection and keep every borrowing record in order.</p><div className="hero-actions"><Link className="button button-primary" to="/books">Browse books</Link><Link className="button button-secondary" to="/borrow">Borrow a book</Link></div></section><section className="home-note"><span className="note-number">01</span><div><p className="eyebrow">THE COLLECTION</p><h2>Stories, ideas, and practical wisdom.</h2></div><p>Explore programming classics, thoughtful non-fiction, and the books your classmates are reading.</p></section></main>;
}

export default HomePage;