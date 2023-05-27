import React, { useEffect, useState } from "react";
import Hoc from '../component/Layout/Hoc'
import AdminCar_ from '../component/AdminCar_'
import Permission_ from '../component/Permission_';
import jwt_decode from "jwt-decode";


const AdminCar = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setRole(decoded.role)
    console.log(decoded.role)
  }, []);


  return (
    <Hoc>
      {role == 'admin' || role == 'superadmin' ?
        <AdminCar_ /> : <Permission_ />}
    </Hoc>
  )
}

export default AdminCar