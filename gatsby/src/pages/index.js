import React from 'react';
import LoadingGrid from '../components/loadingGrid';

function CurrentlySlicing() {
  return (
    <div>
      <LoadingGrid count={4} />
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <LoadingGrid count={4} />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing />
        <HotSlices />
      </div>
    </div>
  );
}
