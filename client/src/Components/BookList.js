import React, { useEffect, useState } from "react";
import './BookList.css'

function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState(""); 
  const [pageSize, setPageSize] = useState(3);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
   `${process.env.REACT_APP_API_URL}/api/books?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`
);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      if (!data.books || !Array.isArray(data.books)) {
        throw new Error("Invalid response format: 'books' not found or not an array");
      }
      if (typeof data.totalPages !== "number") {
        throw new Error("Invalid response format: 'totalPages' not found or invalid");
      }

      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, pageSize, sortBy, sortOrder]);

  const handleJumpToPage = () => {
    const num = parseInt(pageInput, 10);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      setPage(num);
      setPageInput("");
    } else {
      alert(`Please enter a number between 1 and ${totalPages}`);
    }
  };

  return (
    <div className="container">
      <h2>  Pagination and Sorting for Book API</h2>

      <div className="controls">
        <label htmlFor="sortBy">Sort by: </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
          <option value="publicationYear">Publication Year</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label htmlFor="pageSize" >Items per page: </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}>
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>Error fetching books: {error}</p>}
      {!loading && !error && books.length === 0 && <p>No books found.</p>}

      {!loading && !error && books.length > 0 && (
        <div className="card-list">
          {books.map((book) => (
          <div className="card" key={book._id}>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre || "N/A"}</p>
          <p><strong>Published:</strong> {book.publicationYear || "N/A"}</p>
        </div>
  ))}
</div>

      )}

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Prev
        </button>

        <span >
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
        >
          Next
        </button>
      </div>

      <div className="jump-to-page">
        <label htmlFor="pageInput">Go to page: </label>
        <input
          type="number"
          id="pageInput"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}/>
        <button onClick={handleJumpToPage}>Go</button>
      </div>
    </div>
  );
}

export default BookList;
