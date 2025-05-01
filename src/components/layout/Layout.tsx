import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Thiya's Boutique E-Commerce",
  description = "Discover premium fashion and accessories at Thiya's Boutique.",
  canonical,
}) => {
  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
