
const data = [
  {
    id: 1,
    name: "Dr. Aziz",
    percentValues: 70,
  },
  {
    id: 2,
    name: "Dr. Teja",
    percentValues: 40,
  },
  {
    id: 3,
    name: "Dr. Guru",
    percentValues: 60,
  },
  {
    id: 4,
    name: "Dr. Maharishi",
    percentValues: 80,
  },
  {
    id: 5,
    name: "Dr. Murli",
    percentValues: 20,
  },
];

const AreaProgressChart = () => {
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Patient FeedBack</h4>
      </div>
      <div className="progress-bar-list">
        {data?.map((progressbar) => {
          return (
            <div className="progress-bar-item" key={progressbar.id}>
              <div className="bar-item-info">
                <p className="bar-item-info-name">{progressbar.name}</p>
                <p className="bar-item-info-value">
                  {progressbar.percentValues}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${progressbar.percentValues}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaProgressChart;
