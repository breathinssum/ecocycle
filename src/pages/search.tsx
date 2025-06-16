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
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const tabs = ['환경센터', '공원', '업사이클링 매장'];

  // Kakao 지도 SDK 로드
  useEffect(() => {
    const scriptId = 'kakao-map-script';
    if (document.getElementById(scriptId)) {
      setIsMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cfda5a6c4d0da78e78e9de23b865a907&autoload=false&libraries=services`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log('Kakao SDK loaded');
        setIsMapLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  // 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    if (location.trim() === '') return;

    // 탭에 따라 키워드 다르게 설정 가능
    const keyword = `${location} ${selectedTab}`;
    setSearchKeyword(keyword);
  };

  // 맨 처음 로드되거나 탭 이동 시 "서울 + selectedTab" 자동 검색
  useEffect(() => {
    if (!isMapLoaded) return;

    // 사용자가 location을 입력하지 않았더라도, 자동으로 "서울 + 선택된 탭"으로 검색
    setSearchKeyword(`서울 ${selectedTab}`);
  }, [isMapLoaded, selectedTab]);


  // 검색 키워드가 있을 때만 검색 결과 지도에 표시
  useEffect(() => {
    if (!isMapLoaded || !searchKeyword) return;

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
          const marker = new window.kakao.maps.Marker({ map, position });

          const link = `https://map.kakao.com/link/map/${place.place_name},${place.y},${place.x}`;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px; font-size:14px;"><a href="${link}" target="_blank">${place.place_name}</a></div>`,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });

          bounds.extend(position);
        });

        map.setBounds(bounds);
      }
    });
  }, [isMapLoaded, searchKeyword]);




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
            placeholder="검색창에 지역만 입력해주세요.  예) 서울, 대구"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        <div className="result-placeholder">
          <div ref={mapRef} id="map" />
        </div>
      </div>
    </>
  );
};

export default Search;
