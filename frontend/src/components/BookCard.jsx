function BookCard({ title, author, category, available }) {
  return <article className="book-card"><div className="book-cover" aria-hidden="true">{title.slice(0, 1)}</div><div className="book-details"><span className="book-category">{category}</span><h3>{title}</h3><p>by {author}</p><span className={available ? "availability available" : "availability unavailable"}>{available ? "Available" : "Not Available"}</span></div></article>;
}

export default BookCard;