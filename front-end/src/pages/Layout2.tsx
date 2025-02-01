import React from "react";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <CDBSidebar
      textColor="#fff"
      backgroundColor="#333"
      className="sidebar"
      breakpoint={800}
      toggled={false}
      minWidth="250px"
      maxWidth="300px"
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        With CTA
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large" iconSize="lg">
            <Link to="/">Dashboard</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note" iconSize="sm">
            <Link to="/budget">Budget</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="credit-card"
            iconType="solid"
            textFontSize="14px"
          >
            <Link to="/income">Income</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="gamepad"
            iconType="solid"
            textFontSize="14px"
          >
            <Link
              to="/login"
              onClick={() => {
                sessionStorage.removeItem("access_token");
              }}
            >
              Logout
            </Link>
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter>
        <div
          className="sidebar-btn-wrapper"
          style={{ textAlign: "center", padding: "20px 5px" }}
        >
          By Cesar Diaz
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
