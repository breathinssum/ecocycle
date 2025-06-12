import React, { useState } from 'react';
import '../styles/search.css';
import Title from '../components/title';

const Search: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('환경센터');
  const [location, setLocation] = useState('');

  const tabs = ['환경센터', '공원', '업사이클링 매장'];

  return (
    <>
      <Title title="내 손 안의 환경" />
      <div className="search">

        <div className="tab-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="예: 노원구, 종로구"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>검색</button>
        </div>

        <div className="result-placeholder">
          {/* 여기에 지도나 결과가 들어갈 예정 */}
          <p>‘{selectedTab}’ 탭에서 ‘{location || '지역'}’ 검색 결과가 여기에 표시됩니다.</p>
        </div>
      </div>
    </>
  );
};

export default Search;
