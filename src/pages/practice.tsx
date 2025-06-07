import React, { useState } from 'react';
import Title from '../components/title';
import '../styles/practice.css';

const Practice: React.FC = () => {
  const missions = {
    기후: ['대중교통 이용하기', '에어컨 덜 켜기', '친구·가족과 기후위기 정보 나누기', '가까운 거리는 도보나 자전거 이용하기', '일주일에 한두 번이라도 채식하기', '고기 소비 줄이기'],
    물: ['양치컵 사용하기', '설거지할 때 물 잠그기', '샴푸 펌프 횟수를 줄이기', '빨랫감 모아서 한번에 빨기', '밥 짓는 물, 야채 씻은 물은 화초에 재사용하기', '절수형 변기 사용하기'],
    쓰레기: ['텀블러 사용하기', '비닐봉지 대신 장바구니', '쓰레기는 쓰레기통에 버리기', '분리수거 하기', '다 쓴 유리병, 옷 등을 DIY나 기부로 재사용하기', '중고 물건 거래하기'],
    에너지: ['불필요한 조명 끄기', '절전 모드 설정', '사용하지 않는 전기제품 플러그 뽑기', '에너지 효율 높은 제품 사용하기', '이메일 정리해서 서버 에너지 사용 줄이기', '스트리밍 시간 줄이기'],
  };

  const categories = Object.keys(missions) as (keyof typeof missions)[];

  const getRandomMission = (
    category: keyof typeof missions,
    completed: Record<string, string[]>
  ): string => {
    const available = missions[category].filter(
      (mission) => !completed[category].includes(mission)
    );
    return available.length === 0 ? '모든 미션 완료!' : available[Math.floor(Math.random() * available.length)];
  };

  const [completed, setCompleted] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(categories.map((cat) => [cat, []]))
  );

  const [currentMissions, setCurrentMissions] = useState(() =>
    Object.fromEntries(
      categories.map((cat) => [
        cat,
        getRandomMission(cat, Object.fromEntries(categories.map((c) => [c, []])))
      ])
    ) as Record<keyof typeof missions, string>
  );

  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>(
    () => Object.fromEntries(categories.map((cat) => [cat, false]))
  );

  const handleCheck = (category: keyof typeof missions) => {
    if (currentMissions[category] === '모든 미션 완료!') return;

    setCheckedStates((prev) => ({ ...prev, [category]: true }));

    const updatedCompleted = {
      ...completed,
      [category]: [...completed[category], currentMissions[category]],
    };

    setTimeout(() => {
      setCompleted(updatedCompleted);

      setCurrentMissions((prev) => ({
        ...prev,
        [category]: getRandomMission(category, updatedCompleted),
      }));

      // 체크박스 상태 초기화
      setCheckedStates((prev) => ({ ...prev, [category]: false }));
    }, 500);
  };



  return (
    <>
      <Title title="환경을 지키려면?" />
      <div className="section3">
        {categories.map((category, idx) => (
          <div key={idx} className={`checkBox c${idx + 1}`}>
            <p>{category} 🌱</p>
            {currentMissions[category] === '모든 미션 완료!' ? (
              <p className="done-message">모든 미션 완료! 🎉</p>
            ) : (
              <label className="mission-label">
                <input
                  type="checkbox"
                  checked={checkedStates[category]}
                  onChange={() => handleCheck(category)}
                />

                <span>{currentMissions[category]}</span>
              </label>
            )}
            <div className="complete">
              <h3>완료한 미션 ✅</h3>
              {completed[category].map((item, idx) => (
                <div key={idx}>✅ {item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Practice;
