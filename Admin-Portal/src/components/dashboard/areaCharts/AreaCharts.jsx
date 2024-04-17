import { useNavigate } from "react-router-dom";
import AreaBarChart from "./AreaBarChart"
import AreaProgressChart from "./AreaProgressChart"
import { useEffect } from "react";

const AreaCharts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  return (
    <section className="content-area-charts">
      <AreaBarChart />
      <AreaProgressChart />
    </section>
  )
}

export default AreaCharts
