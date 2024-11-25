import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title || 'Traveller'}</title>
        <meta name="description" content={description || 'Welcome to Traveller.com'} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
