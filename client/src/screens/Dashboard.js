import {React,useState} from 'react';
//import  Sidebar from "../components/Sidebar"
import {Switch,Route,Link} from "react-router-dom";
import AddBook from "./AddBook"
import AllBook from "./AllBook"
import AllStudent from "./AllStudent"
import IssueRequest from "./IssueRequest"
import UserHome from "../components/UserHome"
import UserIssuedBook from "./UserIssuedBook"
import Recom_Book from "./Recom_Book"
import RecomdationBook from "./Recommdation"
import Messages from "./Messages"
import AllIssuedBook from "./AllissuedBook"
import Navbar from "../components/Navbar"
import IssueReturn from "./Issue_Return";
import Addemployee from "./Add_Employee"
import { logoutUser } from '../actions/user_action';
import { useDispatch, useSelector } from 'react-redux'


 import { Header, Icon, Image, Menu, Segment, Sidebar,Container } from 'semantic-ui-react'

import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch() ;

    const [datss,setdatas]=useState(false);
    return (
        //  <div>
        //      <div style={{marginBottom:"100px"}}>
               
        //        <Navbar  />
             
        //      </div>
        
        //     <div style={{display:"flex"}}>
        //           <div style={{height:"940px",marginLeft:"10px",width:"14%",backgroundColor:"#635c5b"}}>
        //                <Sidebar  />         
        //           </div>

                  
        //           <div style={{height:"940px",marginLeft:"10px",width:"80%"}}>
        //           <Switch>
        //           <Route path="/dashboard/" component={UserHome} exact />
        //     <Route path="/dashboard/addBook" component={AddBook} exact />
        //         <Route path="/dashboard/allBook" component={AllBook} exact />
        //         <Route path="/dashboard/manageStudent" component={AllStudent} exact />
        //         <Route path="/dashboard/issuedBook" component={UserIssuedBook} exact /> 
        //         <Route path="/dashboard/allissuedBook" component={AllIssuedBook} exact /> 
        //         <Route path="/dashboard/RecomBook" component={Recom_Book} exact /> 
        //         <Route path="/dashboard/Recommandation" component={RecomdationBook} exact /> 
        //         <Route path="/dashboard/stuReqIssue" exact component={IssueRequest} />
        //         <Route path="/dashboard/messages" exact component={Messages} />
        //         <Route path="/dashboard/issue_return" exact component={IssueReturn} />
        //         <Route path="/dashboard/addEmployee" exact component={Addemployee} />
        //     </Switch>  
        //           </div>
        //     </div>
        // </div>
        <div>
        <Segment className='segmentclass'>
        <Menu className='menu_classes'>
            <Menu.Item className='menuu_ietm'>
            <img className='imageclass' src='https://www.mystudyindia.com/storage/colleges/logos/ofiqem_1620695585.webp' width="100%" height="100%" style={{padding:'0',margin:'0'}}></img>
            <button style={{border:"none",background:"none",display:"none"}} className="buttonClass" onClick={()=>setdatas(!datss)}><Icon name='bars'  size='big'/></button>
            
            </Menu.Item>
            <Menu.Item className='menu_item'>
             <div >
             <h4 style={{textAlign:"center"}}>AMC Engineering College</h4>
             <h5 style={{textAlign:"center"}}>Library and Information Centre</h5>
             </div>
             </Menu.Item>
        </Menu>
    
  </Segment>
            <Sidebar.Pushable as={Segment} className="sidebarpushable">
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible={true}
      width='thin'
      className={"sidebar " + (datss && "sidebaropend")}
    >
      <Menu.Item>
        <Icon name='home' />
        <Link  to="/dashboard/"> Home </Link>  
      </Menu.Item>
      <Menu.Item>
        <Icon name='th' />
        <Link  to="/dashboard/issue_return"> Summary </Link>
      </Menu.Item>
      <Menu.Item >
        <Icon name='ils' />
        <Link  to="/dashboard/Recommandation" > Circulation </Link>         
      </Menu.Item>
      <Menu.Item>
        <Icon name='database' />

        <Link  to="/dashboard/messages"> Reports </Link>
   
      </Menu.Item>
      <Menu.Item>
        <Icon name='user' />
        <Link  to="/dashboard/stuReqIssue" > Issue/Returned Books </Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Icon name='user' />
        <Link  to="/dashboard/addEmployee" > Add Student </Link>
      </Menu.Item> */}
      <Menu.Item>
        <Icon name='book' />
        <Link  to="/dashboard/addBook"> Add Book </Link>
      </Menu.Item>
      <Menu.Item>
        <Icon name='user' />
        <Link  to="/dashboard/manageStudent"> Manage Students </Link>
      </Menu.Item>
      <Menu.Item>
        <Icon name='user' />
        <Link  to="/dashboard/addEmployee" > Add Student </Link>
      </Menu.Item>

      

     

      <Menu.Item>
        <Icon name='sign-out' />
        <Link  onClick={() => dispatch(logoutUser())} > Logout </Link>
      </Menu.Item>

      
      {/* <Menu.Item>
        <Icon name='home' />
        <Link  to="/dashboard/manageStudent"> Manage Students </Link>
      </Menu.Item> */}
    </Sidebar>

    <Sidebar.Pusher >
      <Segment basic>
      <Switch>
                  <Route path="/dashboard/" component={UserHome} exact />
            <Route path="/dashboard/addBook" component={AddBook} exact />
                <Route path="/dashboard/allBook" component={AllBook} exact />
                <Route path="/dashboard/manageStudent" component={AllStudent} exact />
                <Route path="/dashboard/issuedBook" component={UserIssuedBook} exact /> 
                <Route path="/dashboard/allissuedBook" component={AllIssuedBook} exact /> 
                <Route path="/dashboard/RecomBook" component={Recom_Book} exact /> 
                <Route path="/dashboard/Recommandation" component={RecomdationBook} exact /> 
                <Route path="/dashboard/stuReqIssue" exact component={IssueRequest} />
                <Route path="/dashboard/messages" exact component={Messages} />
                <Route path="/dashboard/issue_return" exact component={IssueReturn} />
                <Route path="/dashboard/addEmployee" exact component={Addemployee} />
            </Switch>  
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
        </div>
    );
};

export default Dashboard;