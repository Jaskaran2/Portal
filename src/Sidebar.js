import React from 'react';
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import {useStateValue} from "./StateProvider";
import { Avatar } from '@material-ui/core';


function Sidebar(){
    const[{user},dispatch]=useStateValue();

  return(
    <div className="Sidebar">
      <div className="avatar"> <Avatar src={user.photoURL} />
  <SidebarRow title={user.displayName||user.email} /></div>
  <a href="https://covid19.uk.gov.in/HealthFacilities.aspx" target="_blank" rel="noreferrer noopener"> <SidebarRow Icon={LocalHospitalIcon}title="Covid Hospitals In Dehradun" /></a> 
    <a href="https://jaskaran2.github.io/COVID-TRACKER/" target="_blank" rel="noreferrer noopener"><SidebarRow Icon={EmojiFlagsIcon} title="Word Wide Covid Cases" /></a>
    <a href="https://www.justdial.com/Dehradun/Oxygen-Cylinder-Dealers/nct-10346749" target="_blank" rel="noreferrer noopener"> <SidebarRow Icon={StorefrontIcon} title="Oxygen Cylender Dealers In Dehradun" /></a>
   <a href="https://health.uk.gov.in/pages/view/100-corona-guidelines"  rel="noreferrer noopener"target="_blank" rel="noreferrer noopener">  <SidebarRow Icon={ChatIcon } title="Covid 19 Guidelines From Department of Medical Health and Family Welfare " /></a>
    </div>
  )

}

export default Sidebar;
