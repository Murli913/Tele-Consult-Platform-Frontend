import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";
import { useNavigate } from "react-router-dom";

const TABLE_HEADS = [
  "S.NO",
  "Call_Time",
  "Call_Date",
  "End_Time",
  "Prescription",
  "DID",
  
  "Action",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "1",
    order_id: "11:10 PM",
    date: "Jun 29,2022",
    customer: "12:10 AM",
    status: "done",
    amount: 4,
  },
  {
    id: 101,
    name: "2",
    order_id: "11:10 PM",
    date: "Jun 29,2022",
    customer: "12:10 AM",
    status: "pending",
    amount: 2,
  },
  {
    id: 102,
    name: "3",
    order_id: "11:10 PM",
    date: "Jun 29,2022",
    customer: "12:10 AM",
    status: "canceled",
    amount: 5,
  },
  {
    id: 103,
    name: "4",
    order_id: "11:10 PM",
    date: "Jun 29,2022",
    customer: "12:10 AM",
    status: "done",
    amount: 1,
  },
  {
    id: 104,
    name: "5",
    order_id: "11:10 PM",
    date: "Jun 29,2022",
    customer: "12:10 AM",
    status: "done",
    amount: 6,
  },
  {
    id: 105,
    name: "6",
    order_id: "11:10 PM",
    date: "Jun 29,2022",
    customer: "12:10 AM",
    status: "done",
    amount: 8,
  },
];

const AreaTable = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Todays Appointment</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.customer}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td>{dataItem.amount}</td>
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
