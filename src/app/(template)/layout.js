'use client'

import { Header } from "@/components/common";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
