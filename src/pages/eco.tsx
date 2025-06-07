import React, { useState, useEffect } from 'react';
import Title from '../components/title';
import '../styles/eco.css';
import axios from 'axios';

const Eco: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0); // 현재 퀴즈 번호
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>(Array(5).fill(null)); // 사용자의 OX 선택 결과 저장

  const newsList = [
    { id: 1, title: '대기 오염: 침묵의 살인자는 어떻게 우리 건강을 해치나', link: 'https://www.bbc.com/korean/articles/cwyx0y07d1do', image: '/img/pic2.webp' },
    { id: 2, title: '플라스틱 해양 오염은 재난이다', link: 'https://www.hjnews.co.kr/news/articleView.html?idxno=18814', image: '/img/pic4.jpg' },
    { id: 3, title: '전세계 바다에 떠다니는 미세플라스틱 무려 230만톤', link: 'https://m.dongascience.com/news.php?idx=58895', image: '/img/pic5.png' },
    { id: 4, title: '"민가로 번질라"…대구 산불, 야간 방화선 구축 안간힘', link: 'https://www.yna.co.kr/view/AKR20250428125553053?section=society/all&site=topnews01', image: '/img/pic1.jpg' },
    { id: 5, title: '강물에 버려진 약물, 전 세계 보건 위협한다', link: 'https://www.bbc.com/korean/international-60398956', image: '/img/pic3.webp' }
  ];


  // OX 퀴즈 문제 데이터
  const quizList = [
    { question: '기후변화는 인간의 활동에 의해서만 발생한다.', answer: false, explanation: '기후변화는 자연적인 요인과 인간의 활동 모두에 의해 발생합니다.' },
    { question: '온실가스가 없다면 다양한 생물들이 더 좋은 환경에서 살아갈 수 있다.', answer: false, explanation: '온실가스는 지구를 따뜻하게 유지하는 데 필요합니다. 완전히 없으면 생존이 어려워요.' },
    { question: '녹색제품을 구매하면 온실가스 발생을 줄일 수 있다.', answer: true, explanation: '녹색제품은 친환경적으로 생산되어 온실가스 배출을 줄입니다.' },
    { question: '기후는 우리가 매일 경험하는 바람, 비 등의 대기 상태를 말한다.', answer: false, explanation: '그건 날씨에 해당되고, 기후는 오랜 시간 평균적인 대기 상태를 말해요.' },
    { question: '기후변화는 말라리아, 일본뇌염 등의 감염병을 유발한다.', answer: true, explanation: '기후변화로 모기 등의 서식지가 넓어져 감염병이 확산될 수 있어요.' }
  ];

  // OX 선택 함수
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationText, setExplanationText] = useState('');

  const handleAnswer = (answer: boolean) => {
    const isCorrect = quizList[quizIndex].answer === answer;

    const updatedAnswers = [...userAnswers];
    updatedAnswers[quizIndex] = answer;
    setUserAnswers(updatedAnswers);

    if (!isCorrect) {
      setExplanationText(quizList[quizIndex].explanation);
      setShowExplanation(true);
    } else {
      setShowExplanation(false); // 정답이면 이전에 열려 있던 해설 닫기
    }
  };

  // 다음 퀴즈로 이동
  const nextQuiz = () => {
    setQuizIndex((prev) => (prev < quizList.length - 1 ? prev + 1 : prev));
  };

  // 이전 퀴즈로 이동
  const prevQuiz = () => {
    setQuizIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };


  const [dustAlert, setDustAlert] = useState<any[]>([]); // string 대신 any 배열로

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const res = await axios.get(
          'https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo',
          {
            params: {
              serviceKey: 'JJf3ieyTjNxr+Art/iZmsrOOyhO9v0zzpQPxwRu3ah6oM5+S/h7ph29sE5BD/aqFab8hCMZOLw4+guQNpjdtXg==',
              returnType: 'json',
              numOfRows: 100,
              pageNo: 1,
              year: yyyy,
              searchDate: todayStr,
            }
          }
        );

        const items = res.data.response.body.items;
        if (items && Array.isArray(items)) {
          const activeAlerts = items
            .filter(item => item.issueGbn === '경보' || item.issueGbn === '주의보')
            .sort((a, b) => Number(b.issueTime) - Number(a.issueTime))
            .slice(0, 5);
          setDustAlert(activeAlerts);
        }
      } catch (err) {
        console.error('에러 발생:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <Title title="지금 세계는?" />

      {/* 뉴스 슬라이드 */}
      <div className="section1">
        {newsList.map((item, index) => (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <div
              key={item.id}
              className="news-item"
              style={{
                display: currentIndex === index ? 'block' : 'none',
                background: `url(${item.image}) center / cover no-repeat`
              }}
            >
              <div className='newsT'>
                {item.title}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="navigation">
        <button className='nobg' onClick={() => setCurrentIndex((prev) => (prev === 0 ? newsList.length - 1 : prev - 1))}>&lt;</button>
        {newsList.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={currentIndex === index ? 'active' : ''}></button>
        ))}
        <button className='nobg' onClick={() => setCurrentIndex((prev) => (prev === newsList.length - 1 ? 0 : prev + 1))}>&gt;</button>
      </div>

      <div className='Section2'>
        {/* OX 퀴즈 섹션 */}
        <div className="quiz-section">
          <h2>기후 퀴즈</h2>
          <p>{quizList[quizIndex].question}</p>

          <div className="quiz-buttons">
            <button className={userAnswers[quizIndex] === true ? 'selected' : ''} onClick={() => handleAnswer(true)}>⭕</button>
            <button className={userAnswers[quizIndex] === false ? 'selected' : ''} onClick={() => handleAnswer(false)}>❌</button>
          </div>

          {/* 정답 확인 */}
          {userAnswers[quizIndex] !== null && (
            <p className="result">
              {userAnswers[quizIndex] === quizList[quizIndex].answer ? '✅ 정답입니다!' : ''}
            </p>
          )}

          {/* ❌ 틀렸을 때만 미니 팝업 표시 */}
          {showExplanation && (
            <div className="explanation-overlay">
              <div className="explanation-popup">
                <button className="close-btn" onClick={() => setShowExplanation(false)}>✖</button>
                <p>{explanationText}</p>
              </div>
            </div>
          )}

          {/* 이전/다음 버튼 */}
          <div className="quiz-navigation">
            <button onClick={prevQuiz} disabled={quizIndex === 0}>← 이전</button>
            <button onClick={nextQuiz} disabled={quizIndex === quizList.length - 1}>다음 →</button>
          </div>


        </div>
        <div className='munji'>
          <h2>📡 실시간 전국 미세먼지 경보</h2>
          {dustAlert.length === 0 ? (
            <p>현재 경보 없음 😊</p>
          ) : (
            dustAlert.map((alert, idx) => (
              <div key={idx}>
                <p>📍 {alert.districtName} - {alert.issueGbn} 시간: {alert.dataDate} {alert.issueTime}</p>
                <hr />
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Eco;
