import React, { useEffect, useState } from "react";
import { CalendarCheck2, Plus, Trash, ClipboardEdit, MoreHorizontal } from "lucide-react";
import {
    Button,
    Modal,
    notification,
    Select,
    ConfigProvider,
    DatePicker,
    TimePicker,
    Input,
    Popconfirm,
    Badge
} from "antd";
import * as moment from "moment";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/locale/th_TH';
import config from "../../config";
import jwt_decode from "jwt-decode";
import axios from "axios";

const { TextArea } = Input;




const BASE_URL = config.BASE_URL;

const Reserve_ = () => {
    const [dataHistory, setDataHistory] = useState([1]);
    const [DataDept, setDataDept] = useState([]);
    const [DataTname, setDataTname] = useState([]);
    const [DataPosition, setDataPosition] = useState([]);
    const [formData, setFormData] = useState({ id: null, username: null, dept: null, position: null, tcount: '', location: '', start_date: null, start_time: null, end_date: null, end_time: null, detail: '', staff: '' });
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);


    useEffect(() => {
        getReserve()
        getDept()
        getTname()
        getPosition()
    }, []);


    const openNotificationWithIconSuccess = (type) => {
        notification[type]({
            message: "แจ้งเตือน",
            description: "บันทึกรายการนัดเรียบร้อยแล้ว",
            duration: 5,
            style: { backroundColor: "#164E63" },
        });
    };

    const getReserve = async () => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        setFormData({ ...formData, staff: decoded.username })
        try {
            let res = await axios.get(`${BASE_URL}/get-reserve-car-user/${decoded.username}`, {
                headers: { token: token },
            });
            setDataHistory(res.data)
        } catch (error) {
            console.log(error);
        }
    };
    const getDept = async () => {
        const token = localStorage.getItem("token");
        let tmp = []
        try {
            let res = await axios.get(`${BASE_URL}/get-dept`, {
                headers: { token: token },
            });
            res.data.map((item, i) => {
                tmp.push({
                    value: item.id,
                    label: item.name,
                });
            });
            setDataDept(tmp)
        } catch (error) {
            console.log(error);
        }
    };
    const getTname = async () => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        let tmp = []
        try {
            let res = await axios.get(`${BASE_URL}/get-user-all`, {
                headers: { token: token },
            });

            res.data.map((item, i) => {
                tmp.push({
                    value: item.username,
                    label: item.tname,
                });
            });
            setDataTname(tmp)
        } catch (error) {
            console.log(error);
        }
    };
    const getPosition = async () => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        let tmp = []
        try {
            let res = await axios.get(`${BASE_URL}/get-position`, {
                headers: { token: token },
            });

            res.data.map((item, i) => {
                tmp.push({
                    value: item.id,
                    label: item.name,
                });
            });
            setDataPosition(tmp)
        } catch (error) {
            console.log(error);
        }
    };
    const onSelectTname = (id) => {
        setFormData({ ...formData, username: id })
    }
    const onSelectDept = (id) => {
        setFormData({ ...formData, dept: id })
    }
    const onSelectPosition = (id) => {
        setFormData({ ...formData, position: id })
    }

    const onChangeDateStart = (date, dateString) => {
        setFormData({ ...formData, start_date: dateString });

    }
    const onChangeDateEnd = (date, dateString) => {
        setFormData({ ...formData, end_date: dateString });

    }

    const onSubmit = async () => {
        const token = localStorage.getItem("token");
        // console.log(formData)
        try {
            let res = await axios.post(`${BASE_URL}/add-reserve-car`, formData, {
                headers: { token: token },
            });
            openNotificationWithIconSuccess('success')
            onReset()
            setOpen(false)
            getReserve()
        } catch (error) {
            console.log(error);
        }
    }
    const onCancelModal = () => {
        setOpen(false)
        onReset()
    }
    const onReset = () => {
        setFormData({ ...formData, id: null, username: null, dept: null, position: null, tcount: '', location: '', start_date: null, start_time: null, end_date: null, end_time: null, detail: '' })
    }

    const deleteCar = async (id) => {
        const token = localStorage.getItem("token");
        let data = {
            id: id
        }
        try {
            let res = await axios.post(`${BASE_URL}/del-reserve-car`, data, {
                headers: { token: token },
            });
            openNotificationWithIconSuccess('success')
            getReserve()
        } catch (error) {
            console.log(error);
        }
    }
    const EditCar = async (id) => {
        const token = localStorage.getItem("token");
        let data = {
            id: id
        }

        try {
            let res = await axios.get(`${BASE_URL}/edit-reserve-car/${id}`, {
                headers: { token: token },
            });
            let r = res.data[0]
            console.log(r)
            setFormData({
                id: r.id, username: r.username, dept: r.dept, position: r.position, tcount: r.tcount, location: r.location,
                start_date: r.start_date, start_time: r.start_time, end_date: r.end_date, end_time: r.end_time, detail: r.detail,
                staff: r.staff
            })
            setOpen(true)

        } catch (error) {
            console.log(error);
        }
    }

    const onDetail = async (id) => {
        setOpen2(true)
    }

    return (
        <div className="intro-y    h-10">
            <div className="flex mt-5">
                <CalendarCheck2 className="top-menu__sub-icon " size={32} />
                <span className="text-3xl  truncate ml-4">รายการจองรถ  </span>

            </div>
            <br />
            <div className="intro-y flex items-center h-2 mt-5">
                <div
                    className="form-check form-switch w-full sm:w-auto sm:ml-auto mt-0 sm:mt-0"
                    style={{ width: 150 }}
                ></div>
                <div
                    className="form-check form-switch w-full  mt-0 sm:mt-0"
                    style={{ width: 150 }}
                >
                    <button
                        className="btn btn-success  mr-2 mb-2  col-span-2  w-40"
                        // data-tw-toggle="modal"
                        // data-tw-target="#header-footer-modal-preview"
                        onClick={() => {
                            setOpen(true)
                            onReset()
                            // formData.cid == ""
                            //     ? openNotificationWithIcon("error")
                            //     : getPatientId(formData.cid)
                            // setStatusEA('A')
                            // setActiveModal(2)
                        }
                        }
                    >
                        <Plus
                            className="top-menu__sub-icon "
                            size={22}
                            style={{ marginRight: 5 }}
                        />
                        <div>บันทึกจองรถ</div>
                    </button>
                </div>
            </div>
            <div className="intro-y flex items-center h-2 mt-5">
                จำนวนการจอง {dataHistory.length} รายการ
            </div>


            <div className="intro-y overflow-auto lg:overflow-visible mt-2 sm:mt-0">
                <table className="table table-report sm:mt-2">
                    <tbody style={{ marginTop: -50 }}>
                        {dataHistory.map((item, i) => {
                            return (

                                <tr className="intro-x cursor-pointer zoom-in box" key={i}
                                    onClick={() => {
                                        // getPatientId(item.cid)
                                        // setOpen(true)
                                        // // setFormData({ ...formData, cid: item.cid })
                                        // setStatusEA('A')
                                        // setActiveModal(2)
                                    }}
                                >
                                    <td className="w-20 ">
                                        <div className="flex">
                                            <div className="w-12 h-12 image-fit zoom-in">
                                                <img
                                                    alt="Midone - HTML Admin Template"
                                                    className="tooltip rounded-full"
                                                    src="dist/images/avatar.png"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-lg"> {item.location} </span>

                                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                            <span className="mr-2"> วันเวลาเดินทาง :  {moment(item.start_date).format('DD/MM/YYYY')}  {item.start_time}    </span>
                                            {/* <span className="ml-2">เวลาเดินทาง :  {item.start_time} </span> */}
                                        </div>
                                    </td>
                                    {/* <td className="text-left w-24">
                      <span className="text-sm"> {moment(item.nextdate).format('DD/MM/yyyy')} </span>

                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        <span className="mr-2"> วันที่นัด</span>
                      </div>
                    </td> */}
                                    <td className="text-right w-40 " onClick={item.approve_status == null ? console.log('not') : () => onDetail(item.id)}>
                                        <span className="text-sm"> {item.no_car == null ? '' : <><Badge status="success" text=" " />{item.type_car}</>}   </span>
                                        <div className="text-slate-500   whitespace-nowrap mt-0.5">
                                            {item.approve_status == null ? <><Badge status="warning" text=" " /><span className="mr-0 text-warning"> รออนุมัติ</span></> :
                                                item.approve_status == 'Y' ?
                                                    <button className="btn btn-sm btn-primary  "><div>{item.no_car}</div></button> :
                                                    <> <Badge status="error" text=" " /><span className="mr-0 text-danger"> ไม่อนุมัติ</span></>
                                            }
                                        </div>


                                    </td>

                                    <td className="table-report__action w-32" >
                                        <div>
                                            {item.approve_status == null ?
                                                <button className="btn btn-warning mr-1 mb-2" onClick={() => EditCar(item.id)}>
                                                    <ClipboardEdit
                                                        className="top-menu__sub-icon "
                                                        size={14}
                                                    />
                                                </button> :
                                                <button className="btn btn-secondary mr-1 mb-2" >
                                                    <ClipboardEdit
                                                        className="top-menu__sub-icon "
                                                        size={14}
                                                    />
                                                </button>}
                                            {item.approve_status == null ?
                                                <Popconfirm
                                                    title="คุณต้องการลบหรือไม่"
                                                    onConfirm={() => deleteCar(item.id)}
                                                    // onCancel={cancel}
                                                    okText="ตกลง"
                                                    cancelText="ออก"
                                                >
                                                    <button className="btn btn-danger mr-1 mb-2">
                                                        <Trash
                                                            className="top-menu__sub-icon "
                                                            size={14}
                                                        />
                                                    </button>
                                                </Popconfirm> : <button className="btn btn-secondary mr-1 mb-2">
                                                    <Trash
                                                        className="top-menu__sub-icon "
                                                        size={14}
                                                    />
                                                </button>}


                                        </div>
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Modal
                title={'บันทึกการจอง'}
                // centered
                open={open}
                onOk={onSubmit}
                onCancel={onCancelModal}
                width="60%"
                // className="modalStyle2"
                okText="บันทึก"
                cancelText="ยกเลิก"
                bodyStyle={{ backgroundColor: "#F8FAFC" }}
                closable={false}
                maskClosable={false}
            // visible={true}
            >
                <div className="modal-body " style={{ marginTop: -30 }}>

                    <div>
                        <div className=" grid grid-cols-12 gap-3">
                            {/* //--------------------------------------------------------- เลือกรายการนัด  -------------------------------------------------------------------// */}
                            <div className="col-span-12 lg:col-span-12">
                                <div className="box intro-y mt-3">
                                    <div className="box">
                                        <div className="intro-y box p-5 mt-5 sm:mt-2">
                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>ชื่อ-สกุล &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                {/* <Input placeholder="---ระบุชื่อ-สกุล---" style={{ width: '80%' }} /> */}
                                                <Select
                                                    style={{ width: '80%', marginLeft: 5 }}
                                                    showSearch
                                                    placeholder="---ระบุชื่อ-สกุล---"
                                                    optionFilterProp="children"
                                                    onChange={(e) => onSelectTname(e)}
                                                    // onSearch={onSearchClinic}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? "")
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                    options={DataTname}
                                                    value={
                                                        (formData.username == null
                                                            ? null
                                                            : formData.username)
                                                    }
                                                />

                                            </div>
                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>แผนก &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                                {/* <Input placeholder="---ระบุแผนก---" style={{ width: '80%' }} /> */}
                                                <Select
                                                    style={{ width: '80%', marginLeft: 5 }}
                                                    showSearch
                                                    placeholder="---ระบุแผนก---"
                                                    optionFilterProp="children"
                                                    onChange={(e) => onSelectDept(e)}
                                                    // onSearch={onSearchClinic}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? "")
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                    options={DataDept}
                                                    value={
                                                        (formData.dept == null
                                                            ? null
                                                            : parseInt(formData.dept))
                                                    }
                                                />
                                            </div>
                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>ตำแหน่ง &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                {/* <Input placeholder="---ระบุตำแหน่ง---" style={{ width: '80%' }} /> */}
                                                <Select
                                                    style={{ width: '80%', marginLeft: 5 }}
                                                    showSearch
                                                    placeholder="---ระบุตำแหน่ง---"
                                                    optionFilterProp="children"
                                                    onChange={(e) => onSelectPosition(e)}
                                                    // onSearch={onSearchClinic}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? "")
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                    options={DataPosition}
                                                    value={
                                                        (formData.position == null
                                                            ? null
                                                            : parseInt(formData.position))
                                                    }
                                                />
                                            </div>
                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>จำนวนคน &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <Input value={formData.tcount} placeholder="---ระบุจำนวนคน---" style={{ width: '80%' }} onChange={(e) => setFormData({ ...formData, tcount: e.target.value })} />
                                            </div>


                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>สถานที่ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <Input value={formData.location} placeholder="---ระบุสถานที่---" style={{ width: '80%' }} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                            </div>
                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>วันที่เดินทาง</label>
                                                <ConfigProvider locale={locale}>
                                                    <DatePicker
                                                        onChange={onChangeDateStart}
                                                        placeholder="------เลือกวันที่นัด------"
                                                        style={{ width: '50%' }}
                                                        value={
                                                            formData.start_date == null
                                                                ? null
                                                                : dayjs(formData.start_date, 'YYYY-MM-DD')
                                                        }
                                                    />
                                                </ConfigProvider>
                                                <label style={{ marginRight: 35, marginLeft: 30 }}>
                                                    เวลา
                                                </label>
                                                <TimePicker
                                                    placeholder="00:00"
                                                    defaultValue={moment("08:00", "HH:mm")}
                                                    format={"HH:mm"}
                                                    style={{ width: 120 }}
                                                    onChange={(time, timeString) => {
                                                        setFormData({
                                                            ...formData,
                                                            start_time: timeString,
                                                        });
                                                    }}
                                                    value={
                                                        formData.start_time == null
                                                            ? null
                                                            : dayjs(formData.start_time, "HH:mm")
                                                    }
                                                />

                                            </div>
                                            <div className="col-span-12 lg:col-span-12 mt-3">
                                                <label style={{ marginRight: 27 }}>วันที่กลับ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <ConfigProvider locale={locale}>
                                                    <DatePicker
                                                        onChange={onChangeDateEnd}
                                                        placeholder="------เลือกวันที่นัด------"
                                                        style={{ width: '50%' }}
                                                        value={
                                                            formData.end_date == null
                                                                ? null
                                                                : dayjs(formData.end_date, 'YYYY-MM-DD')
                                                        }
                                                    />
                                                </ConfigProvider>
                                                <label style={{ marginRight: 35, marginLeft: 30 }}>
                                                    เวลา
                                                </label>
                                                <TimePicker
                                                    placeholder="00:00"
                                                    defaultValue={dayjs("16:30", "HH:mm")}
                                                    format={"HH:mm"}
                                                    style={{ width: 120 }}
                                                    onChange={(time, timeString) => {
                                                        setFormData({
                                                            ...formData,
                                                            end_time: timeString,
                                                        });
                                                    }}
                                                    value={
                                                        formData.end_time == null
                                                            ? null
                                                            : dayjs(formData.end_time, "HH:mm")
                                                    }
                                                />

                                            </div>

                                            <div className="col-span-12 lg:col-span-12  mt-3">
                                                <label style={{ marginRight: 27 }}>รายละเอียด </label>
                                                <TextArea value={formData.detail} rows={4} placeholder="---รายละเอียด---" style={{ width: '80%' }} onChange={(e) => setFormData({ ...formData, detail: e.target.value })} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* //------------------------------------------------------------- เลือกรายการนัด  ------------------------------------------------------------------// */}


                        </div>

                    </div>
                </div>
            </Modal>
            <Modal
                headStyle={{ backgroundColor: "red" }}
                title={"รายละเอียด"}
                // centered
                open={open2}
                onOk={() => setOpen2(false)}
                onCancel={() => setOpen2(false)}
                width="60%"
                className="modalStyle2"
                okText="ตกลง"
                cancelText="ยกเลิก"
            >
                <div className="modal-body " style={{ marginTop: -30 }}>
                    <div className="intro-y  px-5 pt-0 ">





                    </div>


                </div>
            </Modal>
        </div>
    )
}

export default Reserve_