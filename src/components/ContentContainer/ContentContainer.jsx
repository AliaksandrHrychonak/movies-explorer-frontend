import React from 'react';
import './ContentContainer.css'

const ContentContainer = ({ type, children }) => {
  return (
    <main className={`main main_type_${type}`}>
      {children}
    </main>
  );
}

export default ContentContainer;
