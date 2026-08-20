import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const apiUrl = import.meta.env.VITE_API_URL || "";

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const requestUrl = apiUrl ? `${apiUrl}/api/v1/books` : "/api/v1/books";
        const response = await fetch(requestUrl);
        if (!response.ok) throw new Error("Failed to load books.");
        const result = await response.json();
        setData(result.data);
      } catch (requestError) { setError(requestError.message || "Failed to load books."); } finally { setLoading(false); }
    }
    loadBooks();
  }, []);

  return <main className="page"><div className="page-heading"><p className="eyebrow">THE SHELVES</p><h1>Browse the collection</h1><p>Every title, at a glance.</p></div>{loading && <p className="status-message">Loading books...</p>}{error && <p className="status-message error-message">{error}</p>}{!loading && !error && <section className="book-grid">{data.map((book) => <BookCard key={book.id || book._id} {...book} />)}</section>}</main>;
}

export default BooksPage;