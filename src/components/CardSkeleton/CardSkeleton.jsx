import React from 'react';
import ContentLoader from 'react-content-loader';

const CardSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={335}
      height={369}
      viewBox="0 0 335 369"
      backgroundColor="#e0e0e0"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="0" y="0" rx="3" ry="3" width="335" height="159" />
      <rect x="20" y="178" rx="3" ry="3" width="290" height="11" />
      <rect x="20" y="198" rx="3" ry="3" width="290" height="11" />
      <rect x="20" y="218" rx="3" ry="3" width="290" height="11" />
      <rect x="20" y="248" rx="3" ry="3" width="244" height="8" />
      <rect x="20" y="263" rx="3" ry="3" width="244" height="8" />
      <rect x="20" y="278" rx="3" ry="3" width="244" height="8" />
      <rect x="20" y="293" rx="3" ry="3" width="244" height="8" />
      <rect x="20" y="342" rx="3" ry="3" width="71" height="17" />
      <rect x="170" y="342" rx="3" ry="3" width="40" height="17" />
      <rect x="220" y="342" rx="3" ry="3" width="40" height="17" />
      <rect x="270" y="342" rx="3" ry="3" width="40" height="17" />
    </ContentLoader>
  );
};

export default CardSkeleton;
