'use client'

import { useEffect, useState } from "react";
import { findOrder } from "@/services/api";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Header } from "@/components/common";
import { getUser } from "@/services/localstorage";
import { CardOrder, ModalCancel } from "@/components/my-order";

export default function Home() {
  const user = getUser();
  const limit = 8;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [modalCancel, setModalCancel] = useState({
    show: false,
    id: null,
  })

  const loadData = async (isFirst) => {
    setLoading(true);
    const data = await findOrder({ offset: skip, limit, email: user?.email });
    const { rows, count } = data.data;
    if (count < limit + skip) {
      setHasMore(false);
    }

    if (isFirst) {
      setData(rows);
      setSkip(limit);
    } else {
      setData(prevData => [...prevData, ...rows]);
      setSkip(prevSkip => prevSkip + limit);
    }
  
    setLoading(false);
  };

  const handleClose = () => {
    setModalCancel({
      show: false,
      id: null,
    });
  };

  useEffect(() => {
    loadData(true);
  }, []);

  return (
    <div >
      <div className="mx-4">
        <InfiniteScroll
            dataLength={data.length}
            next={loadData}
            hasMore={hasMore}
            loader={loading && <div className='text-center'><h4>Loading...</h4></div>}
          >
            {data.map((item, key) => (
              <CardOrder
                key={key}
                item={item}
                setModalCancel={setModalCancel} />
            ))}
          </InfiniteScroll>
          <ModalCancel handleClose={handleClose} modalCancel={modalCancel} />
      </div>
    </div>
  );
}
