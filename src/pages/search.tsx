import React, { useEffect, useRef, useState } from 'react';
import '../styles/search.css';
import Title from '../components/title';

declare global {
  interface Window {
    kakao: any;
  }
}

const Search: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('환경센터');
  const [location, setLocation] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const tabs = ['환경센터', '공원', '업사이클링 매장'];

  // Kakao 지도 스크립트 로드
  useEffect(() => {
    const scriptId = 'kakao-map-script';
    if (document.getElementById(scriptId)) {
      setIsMapReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cfda5a6c4d0da78e78e9de23b865a907&libraries=services`;
    script.onload = () => {
      setIsMapReady(true);
      console.log('Kakao Map script loaded');
    };
    document.head.appendChild(script);
  }, []);

  // 지도 생성 및 장소 검색
  useEffect(() => {
    if (!isMapReady || !searchKeyword || !window.kakao) return;

    const container = mapRef.current;
    if (!container) return;

    const map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 5,
    });

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();

        data.forEach((place: any) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          new window.kakao.maps.Marker({ map, position });
          bounds.extend(position);
        });

        map.setBounds(bounds);
      }
    });
  }, [isMapReady, searchKeyword]);

  const handleSearch = () => {
    if (!location.trim()) return;
    setSearchKeyword(`${location} ${selectedTab}`);
  };

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
          <button onClick={handleSearch}>검색</button>
        </div>

        <div className="result-placeholder">
          <div ref={mapRef} id="map" style={{ width: '100%', height: '400px' }} />
        </div>
      </div>
    </>
  );
};

export default Search;
