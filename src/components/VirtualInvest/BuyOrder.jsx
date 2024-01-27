import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTheme } from 'styled-components';

const Order = ({ currentVal, prevInvest, updatePrevInvest, close }) => {
  const account = useSelector((state) => state.account).toFixed(2); //잔고 (소수 둘째자리)
  const stock = useSelector((state) => state.stock); //보유주식 수
  const purchasePrice = useSelector((state) => state.purchasePrice); //보유주식 평단가
  const [buyOrder, setBuyOrder] = useState(0); // text로 입력 받은 주식 수
  const dispatch = useDispatch();

  const cookie = useCookies(['jwtCookie']);
  const navigate = useNavigate(); //페이지 이동
  const notLogin = () => {
    navigate('/signin');
  };

  useEffect(() => {
    console.log('purchase', purchasePrice);
  }, [purchasePrice]);

  const CalculatorOrder = () => {
    if (cookie[0].jwtCookie) {
      const cal = (buyOrder * currentVal).toFixed(2); //투자 금액

      // 주문 총 금액이 잔고보다 많을 때만 적용
      if (account - cal >= 0) {
        dispatch({ type: 'SET_ACCOUNT', payload: account - cal });
        const newStock = Number(stock) + Number(buyOrder);

        updatePrevInvest(prevInvest + Number(cal)); //지금까지의 투자금액은 잔고가 유효한지 확인 필요

        //stock이 0이면 평단가를 현재 가격으로 설정
        const newPurchasePrice =
          newStock === 0
            ? Number(currentVal)
            : (Number(purchasePrice) * stock + Number(cal)) / newStock;

        dispatch({
          type: 'SET_STOCK',
          payload: newStock,
        });

        dispatch({
          type: 'SET_PURCHASE_PRICE',
          payload: newPurchasePrice.toFixed(2),
        });
        alert(
          `${buyOrder}주 매수가 완료되었습니다. 현재 ${newStock}주 보유중입니다.`
        );
        close();
      } else {
        alert('돈없음');
      }
    } else {
      alert('로그인이 필요함');
      notLogin();
    }
  };

  // 퍼센트 범위 표시
  const [range, setRange] = useState();
  const [calPerVal, setCalPerVal] = useState();

  const dataChange = (e) => {
    const perValue = e.target.value;
    setRange(perValue);

    // 퍼센트 조작에 대한 변경
    const availablePurchase = parseInt(account / currentVal); //구매 가능한 최대
    console.log('ava', availablePurchase);
    const cal = parseInt(availablePurchase * (range / 100));
    setCalPerVal(cal);
  };

  return (
    <div className="buy-wrapper">
      <p>
        <span>매수(구매)</span> 하기
      </p>
      <div className="buy-inputBox">
        <label htmlFor="selfRange">직접 입력</label>
        <div style={{ display: 'flex', width: '80%' }}>
          <input
            id="selfRange"
            type="text"
            placeholder="구매할 주식 수를 입력하세요"
            onChange={(e) => setBuyOrder(e.target.value)}
            style={{ width: '87%' }}
            value={calPerVal}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="주"
            readOnly
            style={{
              width: '13%',
              border: 'none',
              textAlign: 'center',
            }}
          />
        </div>

        <label htmlFor="range">범위 지정</label>
        <div style={{ display: 'flex', width: '80%' }}>
          <input
            id="range"
            type="range"
            name=""
            min="1"
            max="10"
            step="10"
            list="tickmarks"
            onChange={dataChange}
            style={{ width: '87%' }}
          />
          <datalist id="tickmarks">
            <option value="0"></option>
            <option value="10"></option>
            <option value="20"></option>
            <option value="30"></option>
            <option value="40"></option>
            <option value="50"></option>
            <option value="60"></option>
            <option value="70"></option>
            <option value="80"></option>
            <option value="90"></option>
            <option value="100"></option>
          </datalist>
          <input
            type="text"
            name=""
            id=""
            value={range}
            placeholder="0%"
            readOnly
            style={{
              width: '13%',
              border: 'none',
              textAlign: 'center',
            }}
          />
        </div>
      </div>
      {/* <div style={{ marginTop: '50px' }}>
        <p>내 주식 현황: {stock} 주</p>
        <p>평단가: {purchasePrice}</p>
      </div>
      <div style={{ display: 'inline-block' }}>
        <p>잔액: {account} $ </p>
      </div> */}
      <div className="btn-wrapper">
        <button className="orderBtn" type="button" onClick={CalculatorOrder}>
          매수
        </button>
        <button className="closeBtn" onClick={close}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Order;