import AreaBarChart from "./AreaBarChart"
import AreaProgressChart from "./AreaProgressChart"

const AreaCharts = () => {
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
