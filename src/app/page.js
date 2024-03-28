'use client'

import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findBooks } from "@/services/api";
import { BookCard } from "@/components/book";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  const limit = 8;
  const [books, setBooks] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(1400);
  const [hasMore, setHasMore] = useState(true);

  const loadBooks = async (isFirst = false) => {
    setLoading(true);
    const data = await findBooks({ offset: skip });
    const { rows, count } = data.data;
    if (count < limit + skip) {
      setHasMore(false);
    }

    if (isFirst) {
      setBooks(rows);
      setSkip(limit);
    } else {
      setBooks(prevBooks => [...prevBooks, ...rows]);
      setSkip(prevSkip => prevSkip + limit);
    }
  
    setLoading(false);
  }

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
      <InfiniteScroll
        dataLength={books.length}
        next={loadBooks}
        hasMore={hasMore}
        loader={loading && <div className='text-center'><h4>Loading...</h4></div>}
      >
        <Row className={width > 900 ? 'mx-5' : 'mx-1'}>
          {books.map((book, index) => (
            <Col lg={3} key={index}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row> 
      </InfiniteScroll>
    </div>
  );
}
