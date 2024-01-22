import { useState } from "react";

const StockGuidePage =()=>{
    const [type, setType] = useState("stock");
    return<>
        <div className="outer-wrapper">
            
            <div className="page-title">주식 길잡이</div>
            {type==='stock'&& <>
                <ul>
                    <li className="selected-blue" onClick={()=>setType('stock')}>주식</li>
                    <li onClick={()=>setType('exchange')}>환율</li>
                    <li onClick={()=>setType('invest')}>모의 투자</li>
                </ul>
                <div className="stock-guide">
                    <div className="stock-section">
                        <div className="stock-chart"></div>
                        <div className="stock-explain"></div>
                    </div>
                    <div className="trade-control"></div>    
                </div>
            </>
            }
            {type==='exchange'&& <>
                <ul>
                    <li onClick={()=>setType('stock')}>주식</li>
                    <li className="selected-blue" onClick={()=>setType('exchange')}>환율</li>
                    <li onClick={()=>setType('invest')}>모의 투자</li>
                </ul>    
                <div>환율</div>    
            </>
            }
            {type==='invest'&& <>
                <ul>
                    <li onClick={()=>setType('stock')}>주식</li>
                    <li onClick={()=>setType('exchange')}>환율</li>
                    <li className="selected-blue" onClick={()=>setType('invest')}>모의 투자</li>
                </ul>    
                <div>모의투자</div>    
            </>
            }
        </div>
    </>
}

export default StockGuidePage; 