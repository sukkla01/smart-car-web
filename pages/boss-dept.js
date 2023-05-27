import React, { useEffect, useState } from "react";
import Hoc from '../component/Layout/Hoc'
import BossDept_ from '../component/BossDept_'
import Permission_ from '../component/Permission_';
import jwt_decode from "jwt-decode";

const BossDept = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setRole(decoded.role)
    console.log(decoded.role)
  }, []);
  return (
    <Hoc>
      {role == 'boss_dept' || role == 'superadmin' ?
        <BossDept_ /> : <Permission_ />}
    </Hoc>
  )
}

export default BossDept