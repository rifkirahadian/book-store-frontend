'use client'

import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { findBooks } from "@/services/api";
import { BookCard, ModalOrder } from "@/components/book";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Header } from "@/components/common";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/localstorage";

export default function Home() {
  const router = useRouter();
  const limit = 8;
  const [books, setBooks] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(1400);
  const [hasMore, setHasMore] = useState(true);
  const [modalOrder, setModalOrder] = useState({
    id: null,
    show: false,
    title: null,
    writer: null,
    cover_image: null,
    point: null,
  });
  const [search, setSearch] = useState();

  const loadBooks = async (isFirst = false) => {
    setLoading(true);
    const data = await findBooks({ offset: skip, search });
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

  const handleClose = () => {
    setModalOrder({
      id: null,
      show: false,
      title: null,
      writer: null,
      cover_image: null,
      point: null,
    });
  }

  const onOpenModalOrder = (book) => {
    const user = getUser();
    if (!user) {
      router.push('/login')
    } else {
      const { id, title, writer, cover_image, point } = book;
      setModalOrder({
        id,
        show: true,
        title,
        writer,
        cover_image,
        point
      })
    }
  };

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      setSkip(0);
      setSearch(e.target.value);
    }
  }

  useEffect(() => {
    loadBooks(true);
    window.addEventListener('resize', ()=> {
      setWidth(window.innerWidth);
    })
  }, []);

  useEffect(() => {
    if (search !== undefined) {
      setBooks([]);
      loadBooks(true);
    }
  }, [search]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end mx-5 pb-2">
        <Row>
          <Col>
            <Form.Control
                type="text"
                placeholder="Search"
                required
                onKeyDown={onSearch}
              />
          </Col>
        </Row>
      </div>
      <InfiniteScroll
        dataLength={books.length}
        next={loadBooks}
        hasMore={hasMore}
        loader={loading && <div className='text-center'><h4>Loading...</h4></div>}
      >
        <Row className={width > 900 ? 'mx-5' : 'mx-1'}>
          {books.map((book, index) => (
            <Col lg={3} key={index}>
              <BookCard book={book} onOpenModalOrder={onOpenModalOrder} />
            </Col>
          ))}
        </Row> 
      </InfiniteScroll>
      <ModalOrder handleClose={handleClose} modalOrder={modalOrder} />
    </div>
  );
}
