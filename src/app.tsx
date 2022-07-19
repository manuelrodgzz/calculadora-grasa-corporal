import React from 'react';
import Header from './components/header'
import FatCalculator from './components/fatCalculator';
import './utilities.css';

function App() {
  return (
    <div className="app">
      <Header />

      <section>
        <div className='container'>
          <FatCalculator />
        </div>
      </section>
    </div>
  );
}

export default App;
