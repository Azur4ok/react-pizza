import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingBlock = () => {
  return (
    <ContentLoader
    className='pizza-block'
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="133" cy="129" r="115" />
      <rect x="1" y="315" rx="6" ry="6" width="280" height="84" />
      <rect x="7" y="418" rx="6" ry="6" width="91" height="31" />
      <rect x="1" y="276" rx="6" ry="6" width="280" height="26" />
      <rect x="137" y="408" rx="25" ry="25" width="140" height="46" />
    </ContentLoader>
  );
};

export default LoadingBlock;
