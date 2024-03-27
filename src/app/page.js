'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findBooks } from "@/services/api";
import { BookCard } from "@/components/book";

export default function Home() {
  const limit = 8;
  const [books, setBooks] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(1400);

  const loadBooks = async (isFirst = false) => {
    if (!isFirst && skip > total) {
      return false;
    }
    
    setLoading(true);
    const data = await findBooks({ offset: skip });
    const { rows, count } = data.data;
    setTotal(count);
    if (isFirst) {
      setBooks(rows);
      setSkip(limit);
    } else {
      setBooks(prevBooks => [...prevBooks, ...rows]);
      setSkip(prevSkip => prevSkip + limit);
    }
    setLoading(false);
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= 0.8 * scrollHeight) {
      loadBooks();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [skip]);

  useEffect(() => {
    loadBooks(true);
    window.addEventListener('resize', ()=> {
      setWidth(window.innerWidth);
    })
  }, []);

  return (
    <div>
      <Navbar className="bg-dark mb-3">
        <Container>
          <Navbar.Brand href="#home" className='text-light'>Book Store</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='text-light'>
              {/* Signed in as: <a href="#login" className='text-light'>User</a> */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className={width > 900 ? 'mx-5' : 'mx-1'}>
        {books.map((book, index) => (
          <Col lg={3} key={index}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
      {loading && <div className='text-center'>Loading...</div>}
    </div>
  );
}
