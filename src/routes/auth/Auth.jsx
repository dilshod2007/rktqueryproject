import { Outlet, Link, useNavigate } from 'react-router-dom'
import { TbBrandGravatar } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';


const Auth = () => {
  const navigate = useNavigate();
  const {token} = useSelector(state => state.auth);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if(token){
      navigate("/profile");
    }
  }, [pathname])

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-500'>
        <div className='max-w-[400px] flex-1 flex flex-col items-center bg-white'> 
          <Link to={"/"} className='mt-8'>
           
            </Link>
            <Outlet/>
        </div>
    </div>
  )
}

export default Auth