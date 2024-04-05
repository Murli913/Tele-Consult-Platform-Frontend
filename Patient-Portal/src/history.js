import './history.css';
function History(){
    return (
        <div className="history-content">
            <h2 className="history-title">Previous Consultations</h2>
            <div className='hist-content'>
                <div className="hist-title"></div>
                <h4 className='hist-apt'>Dr. Maharshi Patel (MBBS)</h4>
                <p className='hist-apt'><b>Date:</b> 01-04-2024</p>
                <p className='hist-apt'><b>Time:</b> 11:15</p>
                <p className='hist-apt'><b>Purpose:</b> High Fever</p>
            </div>
        </div>
    );
}

export default History;