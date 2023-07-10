import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Home,
  ChevronDown,
  Archive,
  LogOut,
  CalendarCheck2,
  Cog,
  BarChart2,
  Tag,
  Car,
  Figma,
  Codesandbox,
  UserCheck,
  FileText
} from "lucide-react";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import config from "../../config";

const BASE_URL = config.BASE_URL;


const Menu_ = () => {
  const router = useRouter();
  const [selectId, setSelectId] = useState(0);
  const [ActiveText, setIsActiveText] = useState("");
  const [isShowMenu, setIsShowMenu] = useState(true);

  const [role, setRole] = useState('');

  useEffect(() => {
    setSelectId(localStorage.getItem("NavId"));
    const token = localStorage.getItem("token");

    if (!(token == null || token == undefined)) {
      const decoded = jwt_decode(token);
      setRole(decoded.role)
    }

  }, []);



  const onSelect = (id, path) => {
    localStorage.setItem("NavId", id);
    console.log(id)

    router.push({
      pathname: path,
      // query: { dep: dep, date: date, profile: profile, tname: tname, hn_: hn, time: '' },
    });


  };

  return (
    // <div>
    <nav
      className="top-nav"
      style={{ marginTop: -107, marginLeft: 0, marginRight: 0, zIndex: 10 }}
    >
      <ul style={{ backgroundColor: "#C8D6DC", borderRadius: 10, height: 62 }}>
        <li onClick={() => onSelect(1, '/')}>
          <a
            href="#"
            className={selectId == 1 ? "top-menu top-menu--active" : "top-menu"}
          >
            <div className="top-menu__icon">
              <Home
                className="top-menu__sub-icon"
                color="#164E63"
                size={22}
              />
            </div>
            <div className="top-menu__title">หน้าหลัก</div>
          </a>
        </li>


        {/* <li onClick={() => onSelect(1, '/')}>
          <a
            href="#"
            className={selectId == 1 ? "top-menu top-menu--active" : "top-menu"}
          >
            <div className="top-menu__icon">
              <Home className="top-menu__sub-icon" color="#164E63" size={22} />
            </div>
            <div className="top-menu__title">
              หน้าหลัก
            </div>
          </a>
        </li> */}
        <li onClick={() => onSelect(2, '/reserve')}>
          <a
            href="#"
            className={selectId == 2 ? "top-menu top-menu--active" : "top-menu"}
          >
            <div className="top-menu__icon">
              <CalendarCheck2
                className="top-menu__sub-icon"
                color="#164E63"
                size={22}
              />
            </div>
            <div className="top-menu__title">จองรถ</div>
          </a>
        </li>
        <li onClick={() => onSelect(10, '/boss-dept')}>
          <a
            href="#"
            className={selectId == 10 ? "top-menu top-menu--active" : "top-menu"}
          >
            <div className="top-menu__icon">
              <Codesandbox
                className="top-menu__sub-icon"
                color="#164E63"
                size={24}
              />
            </div>
            <div className="top-menu__title">
              หัวหน้าแผนก
            </div>
          </a>
        </li>
        <li onClick={() => onSelect(3, '/admin-car')}>
          <a
            href="#"
            className={selectId == 3 ? "top-menu top-menu--active" : "top-menu"}
          >
            <div className="top-menu__icon">
              <Figma
                className="top-menu__sub-icon"
                color="#164E63"
                size={24}
              />
            </div>
            <div className="top-menu__title">
              จัดการจองรถ
            </div>
          </a>
        </li>

        <li onClick={() => onSelect(11, '/boss-admin')}>
          <a
            href="#"
            className={selectId == 11 ? "top-menu top-menu--active" : "top-menu"}
          >
            <div className="top-menu__icon">
              <UserCheck
                className="top-menu__sub-icon"
                color="#164E63"
                size={24}
              />
            </div>
            <div className="top-menu__title">
              รองบริหาร
            </div>
          </a>
        </li>
        {role == 'admin' || role == 'superadmin' ?
          <li>
            <a href="#" className={selectId == 4 ? "top-menu top-menu--active" : "top-menu"}>
              <div className="top-menu__icon">
                <Cog className="top-menu__sub-icon" color="#164E63" size={22} />
              </div>
              <div className="top-menu__title">
                ตั่งค่า
                <ChevronDown
                  className="top-menu__sub-icon"
                  color="#164E63"
                  size={16}
                />
              </div>
            </a>

            <ul className>
              <li onClick={() => onSelect(4, '/dept')}>
                <a
                  href="#"
                  className="top-menu"
                >
                  <div className="top-menu__icon"> </div>
                  <div className="top-menu__title">
                    <Tag color="#164E63" size={16} style={{ marginRight: 10 }} />
                    หน่วยงาน
                  </div>
                </a>
              </li>
              <li onClick={() => onSelect(5, '/users')}>
                <a
                  href="#"
                  className="top-menu"
                >
                  <div className="top-menu__icon"> </div>
                  <div className="top-menu__title">
                    <Tag color="#164E63" size={16} style={{ marginRight: 10 }} />
                    ผู้ใช้งาน
                  </div>
                </a>
              </li>

              <li onClick={() => onSelect(6, '/manage-car')}>
                <a
                  href="#"
                  className="top-menu"
                >
                  <div className="top-menu__icon"> </div>
                  <div className="top-menu__title">
                    <Tag color="#164E63" size={16} style={{ marginRight: 10 }} />
                    จัดการรถ
                  </div>
                </a>
              </li>
            </ul>
          </li>
          : ''}
        <li >
          <a href={`${BASE_URL}/doc_car.pdf`} className="top-menu" target="_blank">
            <div className="top-menu__icon">
              <FileText
                className="top-menu__sub-icon"
                color="#164E63"
                size={22}
              />
            </div>
            <div className="top-menu__title"> คู่มือ </div>
          </a>
        </li>
        <li onClick={() => onSelect(9, '/login')}>
          <a href="#" className="top-menu">
            <div className="top-menu__icon">
              <LogOut
                className="top-menu__sub-icon"
                color="#164E63"
                size={22}
              />
            </div>
            <div className="top-menu__title"> LOGOUT </div>
          </a>
        </li>
      </ul>
    </nav>
    // </div>
  );
};

export default Menu_;
