
import Navbar from '../Components/Navber';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
     return (
          <div>
               <Navbar></Navbar>
               <Outlet></Outlet>
          </div>
     );
};

export default MainLayout;