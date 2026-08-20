import { useState } from "react";

function BorrowPage() {
  const [memberName, setMemberName] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ memberName, selectedBook, borrowDate, returnDate });
    setSubmitted(true);
  }

  return <main className="page borrow-layout"><div className="page-heading"><p className="eyebrow">CHECKOUT DESK</p><h1>Borrow a book</h1><p>Leave with a good story. Bring it back on time.</p></div><div className="borrow-content"><form className="borrow-form" onSubmit={handleSubmit}><label>Member name<input value={memberName} onChange={(event) => setMemberName(event.target.value)} placeholder="Your full name" required /></label><label>Book title<input value={selectedBook} onChange={(event) => setSelectedBook(event.target.value)} placeholder="What would you like to read?" required /></label><div className="date-fields"><label>Borrow date<input type="date" value={borrowDate} onChange={(event) => setBorrowDate(event.target.value)} required /></label><label>Return date<input type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required /></label></div><button className="button button-primary" type="submit">Show borrowing details</button></form><aside className="preview-panel"><p className="eyebrow">LIVE PREVIEW</p><h2>{memberName || "Your name"}</h2><p>{selectedBook || "Selected title"}</p><div className="preview-dates"><span>Borrow<br /><strong>{borrowDate || "-- / -- / ----"}</strong></span><span>Return<br /><strong>{returnDate || "-- / -- / ----"}</strong></span></div>{submitted && <p className="success-message">Borrowing details ready for the library desk.</p>}</aside></div></main>;
}

export default BorrowPage;