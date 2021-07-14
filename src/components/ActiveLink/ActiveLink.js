import { Link, useRouteMatch } from "react-router-dom";
import './ActiveLink.style.scss'
function ActiveLink({ label, to, activeOnlyWhenExact }) {
   let match = useRouteMatch({
     path: to,
     exact: activeOnlyWhenExact
   });
 
   return (
     <li className={match ? "active" : ""}>
       <Link to={to} className="navlink">{label}</Link>
     </li>
   );
 }

export default ActiveLink
 