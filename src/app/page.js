'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findBooks } from "@/services/api";
import { BookCard } from "@/components/book";

export default function Home() {
  const [books, setBooks] = useState([]);
  const loadBooks = async () => {
    const data = await findBooks();
    setBooks(data.data);
  }

  useEffect(() => {
    loadBooks();
  }, [])

  return (
    <div className='pt-3'>
      <div className='text-center'>
        <h1>Books</h1>
      </div>
      <Row className="mx-5">
        {books.map((book, index) => (
          <Col lg={3} key={index}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
