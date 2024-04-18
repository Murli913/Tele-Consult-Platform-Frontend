
import { useNavigate } from "react-router-dom";
import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);

  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
