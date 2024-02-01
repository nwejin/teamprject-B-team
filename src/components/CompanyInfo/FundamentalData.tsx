import React, { useEffect, useRef, useState } from 'react';

interface FundamentalDataProps {
  search: string;
}

const FundamentalData: React.FC<FundamentalDataProps> = ({ search }) => {
  const container = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState('NASDAQ:AAPL'); // 기본값 설정

  useEffect(() => {
    // search 값이 변경될 때마다 symbol 업데이트
    setSymbol(search);
  }, [search]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    script.innerHTML = JSON.stringify({
      isTransparent: false,
      largeChartUrl: '',
      displayMode: 'regular',
      width: 480,
      height: 830,
      colorTheme: 'dark',
      symbol: symbol, // 동적으로 변경된 symbol 사용
      locale: 'kr',
    });

    if (container.current) {
      // 컨테이너 초기화 후 스크립트 추가
      container.current.innerHTML = '';
      container.current.appendChild(script);
    }

    return () => {
      if (container.current && script.parentNode) {
        container.current.removeChild(script);
      }
    };
  }, [symbol]); // symbol이 변경될 때마다 useEffect 재실행

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://kr.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
};

export default FundamentalData;
