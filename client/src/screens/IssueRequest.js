import React, { useState, useEffect } from "react";
import {
  getAllBookIssueReq,
  issuedReq,
  issuedReqDeletedByAdmin,
  getAllIssuedBook,
  getReturns
} from "../actions/Issue_action";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Segment, Card, Image, Icon, GridColumn } from "semantic-ui-react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import AllIssuedBook from "./AllissuedBook";
import moment from 'moment';
const IssueRequest = () => {
  const [startDate, setStartDate] = useState(new Date());
//   moment().format('dddd');

  const dispatch = useDispatch() ;

  // console.log(startDate.getMonth())

  useEffect(() => {
    dispatch(getAllIssuedBook());
    dispatch(getReturns());
  }, []);

  const { all_IssuedBook } = useSelector((state) => state.allIssuedBookReducer);
  const { all_returns } = useSelector((state) => state.returnedBookReducer);

  
  const filterReturns=all_returns.length>0&& all_returns.filter((book)=>moment(book.createdAt).format('MMM Do YY')===moment(startDate).format('MMM Do YY'));

  console.log(filterReturns)
  var filterBooks =
    all_IssuedBook.length>0 &&
    all_IssuedBook.filter(
      (book) =>

      moment(book.createdAt).format('MMM Do YY')===moment(startDate).format('MMM Do YY')
     
        // book.createdAt.getDate() == startDate.getDate() &&
        // book.createdAt.getMonth() == startDate.getMonth() &&
        // book.createdAt.getFullYear() === startDate.getFullYear()
        
    );

  // const {issuebooks} = useSelector(state => state.getAllIssueBookReqReducer)
  // const newIssuedBook = issuebooks && issuebooks.filter(item => !item.isIssue && !item.isRecom)

  return (
    <div className="col-md-8 m-auto">
    <Grid columns={"equal"}>
    <Grid.Column width='2'>
        <h4>select date:</h4>
    </Grid.Column>
        <Grid.Column>
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
        </Grid.Column>

    </Grid>
    <h3 style={{padding:"5px",borderBottom:"1.5px solid #7eb3de",textAlign:"center"}}>Issued Books</h3>
      {/* <p style={{fontFamily:"sans-serif",fontSize:"30px",textAlign:"center",padding:"10px"}}>Students Requested to Admin to issue these Books</p> */}
      <table className="table table-bordered table-responsive-sm" style={{marginTop:"10px"}}>
        <thead className="thead-dark bg-success">
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Student Name</th>
            <th>Student Branch</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {filterBooks &&
            filterBooks.map((book, index) => {
              return (
                <tr key={book._id}>
                  <td>{index+1}</td>

                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.userName}</td>
                  <td>{book.userBranch}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <h3 style={{padding:"5px",borderBottom:"1.5px solid #968887",textAlign:"center"}}>Return Books</h3>
      <table className="table table-bordered table-responsive-sm" style={{marginTop:"20px"}}>
        <thead className="thead-dark bg-info">
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Student Name</th>
            <th>Student Branch</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {filterReturns &&
            filterReturns.map((book, index) => {
              return (
                <tr key={book._id}>
                  <td>{index+1}</td>

                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.userName}</td>
                  <td>{book.userBranch}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      

      <div style={{ marginBottom: "500px" }}></div>
    </div>
  );
};

export default IssueRequest;
