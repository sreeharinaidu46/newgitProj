import React, { useState } from "react";


import { filterBook, getOneBook } from "../actions/book_action";
import { getAllIssuedBook, issueABookByAdmin,BookIsuueDeletedByAdmin,BookRenewByAdmin } from "../actions/Issue_action";
import { getStudentDetails } from "../actions/user_action";
import { useDispatch, useSelector } from "react-redux";


import BookLibrary from "./BookLibrary";
import "./Issues.css";
import { Grid, Segment } from "semantic-ui-react";
const RecomBook = () => {
  const dispatch = useDispatch();
  const [access_no, setAcess] = useState("");
  const [member_id, setMember] = useState("");
  let issueEnable = false;
  let returnEnable = false;
  const { bookItem } = useSelector((state) => state.getOneBookReducer);
  const { userDetails } = useSelector(
    (state) => state.getStudentDetailsReducer
  );
  const { all_IssuedBook } = useSelector((state) => state.allIssuedBookReducer);
  let filterBooks;
  if (Object.keys(userDetails).length > 0) {
    filterBooks =
      all_IssuedBook &&
      all_IssuedBook.filter((book) => book.userId == userDetails._id);
  }
  if (Object.keys(userDetails).length > 0 && Object.keys(bookItem).length > 0) {
    const dataBooks =
      filterBooks && filterBooks.filter((book) => book.bookId == bookItem._id);
   
    if (dataBooks.length > 0) {
     
      issueEnable = false;
      returnEnable = true;
    } else {
      if(bookItem.copies>0 && userDetails.taken<=1){
        issueEnable = true;
      }
      returnEnable = false;
    }
  } else {
    issueEnable = false;
    returnEnable = false;
  }


  
  const readBookDetails = () => {
  
    dispatch(getOneBook(access_no));
  };

  const getMemberId = () => {
    dispatch(getAllIssuedBook());
    dispatch(getStudentDetails(member_id));
  };
  

  const issueHandler = () => {
   
    
    var userId = userDetails._id;
    var userName = userDetails.name;
    const userBranch = userDetails.branch;
    const { accession_no, title, author, publisher, year, _id, copies } =
      bookItem;
    const issueUser = {
      accession_no,
      title,
      author,
      publisher,
      year,
      userId,
      bookId: _id,
      userBranch,
      userName,
      copies,
    };

   

    dispatch(issueABookByAdmin(issueUser));
    dispatch(getAllIssuedBook());
    dispatch(getStudentDetails(member_id));
    
   
  };

  const returnReqHandler=()=>{
    
   
    dispatch(BookIsuueDeletedByAdmin(userDetails._id,bookItem._id));
    dispatch(getAllIssuedBook());
    dispatch(getStudentDetails(member_id));
    
   
   
  }

  const renewReqHandler=()=>{
    
    dispatch(BookRenewByAdmin(userDetails._id,bookItem._id));
    // dispatch(getAllIssuedBook());
    
    

  }

  const clearReqHandler=()=>{
    setAcess("");
    setMember("");
    dispatch(getOneBook(""));
    dispatch(getStudentDetails(""));
    dispatch(getAllIssuedBook());

  }

  return (
    <div className="col-md-9 m-auto" >

<Grid stackable columns={2} className="gridclasses">
    <Grid.Column  className="gridclasses">
      <Segment className="gridclasses">
      <div >
          <label htmlFor="book_id" className="book_label">
            Accession No
          </label>
          <input
            type="text"
            id="book_id"
            style={{ width: "50%" }}
            placeholder="Please Enter Accession No"
            value={access_no}
            onChange={(e) => setAcess(e.target.value)}
          />
          <button type="button" onClick={readBookDetails}>
            Read
          </button>
          <button type="button" onClick={() => setAcess("")}>
            Clear
          </button>

          <div>
            <h5 style={{marginTop:"10px"}}>Book Details</h5>
          </div>

          {Object.keys(bookItem).length > 0 && (
            <div className="item_detailss">
              <p>
                Accession
                No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.accession_no}</span>
              </p>
              <p>
                Item
                Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>Book</span>
              </p>
              <p>
                Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.title}</span>
              </p>
              <p>
                Author
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.author}</span>
              </p>
              <p>
                Call
                Num&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.call_no}</span>
              </p>
              <p>
                Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>Main Library Books</span>
              </p>
              <p>
                Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>null</span>
              </p>
            </div>
          )}
        </div>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment className="gridclasses">
      <div >
          <label htmlFor="book_id" className="book_label">
            Member Id
          </label>
          <input
            type="text"
            id="book_id"
            style={{ width: "50%" }}
            placeholder="Please Enter the Member Id"
            value={member_id}
            onChange={(e) => setMember(e.target.value)}
          />
          <button type="button" onClick={getMemberId}>
            Read
          </button>
          <button type="button">Clear</button>

          <div >
            <h5 style={{marginTop:"12px"}}>Member Details</h5>
          </div>
          {Object.keys(userDetails).length > 0 && (
            <div >
              <p>
                Member
                Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>{userDetails.roll_no}</span>
              </p>
              <p>
                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>{userDetails.name}</span>
              </p>
              <p>
                Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>Student</span>
              </p>
              <p>
                Department&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>{userDetails.branch}</span>
              </p>
              <p>
                Semester&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{userDetails.sem}</span>
              </p>
              <p>
                Branch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>null</span>
              </p>
              <p>
                Roll
                No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>0</span>
              </p>
              {/* <p>
                Taken Books&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{userDetails.taken}</span>
              </p> */}
            </div>
          )}
        </div>
      </Segment>
    </Grid.Column>
    {/* <Segment>
      <Grid.Column>

      </Grid.Column>
    </Segment> */}
  </Grid>
       <div >
       {/*<div className="left">
          <label htmlFor="book_id" className="book_label">
            Accession No
          </label>
          <input
            type="text"
            id="book_id"
            style={{ width: "50%" }}
            placeholder="Please Enter Accession No"
            value={access_no}
            onChange={(e) => setAcess(e.target.value)}
          />
          <button type="button" onClick={readBookDetails}>
            Read
          </button>
          <button type="button" onClick={() => setAcess("")}>
            Clear
          </button>

          <div className="book_details">
            <h5>Book Details</h5>
          </div>

          {Object.keys(bookItem).length > 0 && (
            <div className="item_detailss">
              <p>
                Accession
                No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.accession_no}</span>
              </p>
              <p>
                Item
                Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>Book</span>
              </p>
              <p>
                Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.title}</span>
              </p>
              <p>
                Author
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.author}</span>
              </p>
              <p>
                Call
                Num&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>{bookItem.call_no}</span>
              </p>
              <p>
                Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>Main Library Books</span>
              </p>
              <p>
                Location&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>null</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="right">
          <label htmlFor="book_id" className="book_label">
            Member Id
          </label>
          <input
            type="text"
            id="book_id"
            style={{ width: "50%" }}
            placeholder="Please Enter the Member Id"
            value={member_id}
            onChange={(e) => setMember(e.target.value)}
          />
          <button type="button" onClick={getMemberId}>
            Read
          </button>
          <button type="button">Clear</button>

          <div className="book_details">
            <h5>Member Details</h5>
          </div>
          {Object.keys(userDetails).length > 0 && (
            <div className="item_detailss">
              <p>
                Member
                Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>{userDetails.roll_no}</span>
              </p>
              <p>
                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>{userDetails.name}</span>
              </p>
              <p>
                Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>Student</span>
              </p>
              <p>
                Department&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span style={{ color: "red" }}>{userDetails.branch}</span>
              </p>
              <p>
                Course&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>null</span>
              </p>
              <p>
                Branch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>null</span>
              </p>
              <p>
                Roll
                No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>0</span>
              </p>
              <p>
                Remarks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "red" }}>null</span>
              </p>
            </div>
          )}
        </div> */}

        {/* <div className="col-md-9 m-auto">
      <br />
      <br />
      <h3 className="text-center bg-success p-2">Total Books :{books.length} </h3>
      <button  type="button" style={{border:"1px solid #ff3399", backgroundColor:"#ff3399",margin:"1% 40%",padding:"10px",borderRadius:"5px",color:"white"}} onClick={handleClick}>Download Report</button>
    </div> */}
        <div style={{ display:"flex",justifyContent:"center",marginTop:"20px" }}>
          <div className="issue_buttons">
            <button
              type="button"
              style={{ backgroundColor: "green" }}
              disabled={!issueEnable}
              onClick={issueHandler}
              className={!issueEnable&&'disabledClass'}
            >
              Issue
            </button>
            <button
              type="button"
              style={{ backgroundColor: "orange" }}
              disabled={!returnEnable}
              onClick={returnReqHandler}
              className={!returnEnable&&'disabledClass'}
            >
              Return
            </button>
            <button
              type="button"
              style={{ backgroundColor: "blue" }}
              disabled={!returnEnable}
              onClick={renewReqHandler}
              className={!returnEnable&&'disabledClass'}
            >
              Renewal
            </button>
            <button type="button" style={{ backgroundColor: "orange" }} onClick={clearReqHandler}>
              Clear
            </button>
          </div>
        </div>
      </div>
      

      <div className="down_container">
        <div className="col-md-12 m-auto !important">
          <h5
            style={{
              fontFamily: "sans-serif",
              textAlign: "center",
              padding: "5px",
              fontStyle: "oblique",
              color: "#003300",
            }}
          >
            List of the Items Issued to the Member
          </h5>
          <table className="table table-bordered table-responsive-sm">
            <thead className="thead-dark">
              <tr style={{ backgroundColor: "#00ccff" }}>
                <th>Seq</th>
                <th>Accn No</th>
                <th>Author</th>
                <th>Item Type/Category</th>
                <th>Description</th>
                <th>Issue date</th>
                <th>Due date</th>
                <th>Remaining Days</th>
                <th>Renewed</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {filterBooks &&
                filterBooks.map((book, index) => {
                  

                  return (
                    <BookLibrary key={book._id} book={book} index={index} />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{height:"200px"}}>

      </div>
    </div>
  );
};

export default RecomBook;
