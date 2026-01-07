import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const FooterWrapper = () => {
 
    const location = useLocation();
    const noFooter = ['/login', '/register'];
      const showFooter = !noFooter.includes(location.pathname);
  return showFooter?<Footer/> :  null;
};

export default FooterWrapper