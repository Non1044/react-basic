import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import "./App.css";
import { useState } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { useReducer } from "react";

function App() {
  const design = { color: "red", textAlign: "center", fontSize: "1.5rem" };
  const [items, setItems] = useState([]);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };
  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const income = amounts
      .filter((element) => element > 0)
      .reduce((t, i) => (t += i), 0);
    setReportIncome(income.toFixed(2))
    const expense = amounts
      .filter((element) => element < 0)
      .reduce((t, i) => (t += i), 0)
    setReportExpense(Math.abs(expense).toFixed(2));
  }, [items, reportIncome, reportExpense]);
  // const [showReport,setshowReport]=useState(false)
  // const reduce=(state,action)=>{
  //   switch (action.type) {
  //     case 'SHOW':
  //       return setshowReport(true)
  //     case 'HIDE':
  //       return setshowReport(false)
  //   }
  // }
  // const [result,dispatch]=useReducer(reduce,showReport)
  return (
    <DataContext.Provider
      value={{ income: reportIncome, expense: reportExpense }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        {/* {showReport && <ReportComponent/>} */}
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                {/* <a href="#">ข้อมูลบัญชี</a> */}
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent/>} exact  ></Route>
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }>
                </Route>
            </Routes>
          </div>
        </Router>
      </div>
      {/* <p>{result}</p>
    <button onClick={()=>dispatch({type:'SHOW',payload:10})}>แสดง</button>
    <button onClick={()=>dispatch({type:'HIDE',payload:5})}>ซ่อน</button> */}
    </DataContext.Provider>
  );
}

export default App;
