'use client'

import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findBooks } from "@/services/api";
import { BookCard } from "@/components/book";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Header } from "@/components/common";

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
      <Header />
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
