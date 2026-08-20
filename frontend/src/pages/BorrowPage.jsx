import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL || "";

function BorrowPage() {
  const [memberName, setMemberName] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setSubmitError("");

    try {
      const requestUrl = apiUrl ? `${apiUrl}/api/v1/borrowings` : "/api/v1/borrowings";
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: memberName,
          bookId: selectedBook,
          borrowDate,
          returnDate,
          status: "borrowed"
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create borrowing record.");
      setSubmitted(true);
    } catch (requestError) {
      setSubmitError(requestError.message || "Failed to create borrowing record.");
    } finally {
      setSubmitting(false);
    }
  }

  return <main className="page borrow-layout"><div className="page-heading"><p className="eyebrow">CHECKOUT DESK</p><h1>Borrow a book</h1><p>Leave with a good story. Bring it back on time.</p></div><div className="borrow-content"><form className="borrow-form" onSubmit={handleSubmit}><label>Member name<input value={memberName} onChange={(event) => setMemberName(event.target.value)} placeholder="Your full name" required /></label><label>Book title<input value={selectedBook} onChange={(event) => setSelectedBook(event.target.value)} placeholder="What would you like to read?" required /></label><div className="date-fields"><label>Borrow date<input type="date" value={borrowDate} onChange={(event) => setBorrowDate(event.target.value)} required /></label><label>Return date<input type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required /></label></div><button className="button button-primary" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Create borrowing record"}</button>{submitError && <p className="error-message">{submitError}</p>}</form><aside className="preview-panel"><p className="eyebrow">LIVE PREVIEW</p><h2>{memberName || "Your name"}</h2><p>{selectedBook || "Selected title"}</p><div className="preview-dates"><span>Borrow<br /><strong>{borrowDate || "-- / -- / ----"}</strong></span><span>Return<br /><strong>{returnDate || "-- / -- / ----"}</strong></span></div>{submitted && <p className="success-message">Borrowing record sent successfully.</p>}</aside></div></main>;
}

export default BorrowPage;