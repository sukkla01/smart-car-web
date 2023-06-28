import React, { useEffect, useState } from "react";
import { Figma, CalendarCheck2, MapPin, User, Database, Car, Check, XCircle } from "lucide-react";
import { Switch, Modal, Form, Input, Select, DatePicker, ConfigProvider, TimePicker, Card, Radio, notification } from "antd";
import axios from "axios";
import config from "../config";
import * as moment from "moment";
import "moment/locale/th";
moment.locale("th");
import th_TH from "antd/lib/locale/th_TH";

import dayjs from 'dayjs';
import 'dayjs/locale/th';
import locale from 'antd/locale/th_TH';
import jwt_decode from "jwt-decode";
import io from "socket.io-client"

const { TextArea } = Input;
const { Meta } = Card;
const BASE_URL = config.BASE_URL;
const socket = io(BASE_URL)

const AdminCar_ = () => {
    const [data, setData] = useState([]);
    const [dataKeeper, setDataKeeper] = useState([]);
    const [dataCar, setDataCar] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        head_id: null,
        keeper: null,
        no_car: "",
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        tcount: null,
        comment: '',
        car_id: null
    });
    const [selectCar, setSelectCar] = useState();
    const [notApprove, setNotApprove] = useState('');
    const [tabFilter, setTabFilter] = useState('waitapprove');
    const [isConnected, setIsConnected] = useState(socket.connected)


    const optionsFilter = [
        { label: 'รออนุมัติ', value: 'waitapprove' },
        { label: 'อนุมัติ', value: 'approve' },
        { label: 'ทั้งหมด', value: 'total' },
    ];

    const openNotificationWithIconSuccess = (type) => {
        notification[type]({
            message: "แจ้งเตือน",
            description: "มีรายการจองรถใหม่หรือแก้ไข",
            duration: 5000,
            style: { backroundColor: "#164E63" },
        });
    };

    

    const openNotificationError = (type) => {
        notification[type]({
            message: "แจ้งเตือน",
            description: "กรุณากรอกข้อมูลให้ครับ",
            duration: 5000,
            style: { backroundColor: "#164E63" },
        });
    };



    useEffect(() => {
        getReserveAll()
        getKeeperAll()
        getCarAll()
        // onChangeFilter(tabFilter)
        // ------------------------------------------------------------------------------------------------- START CONNECT SOCKET
        socket.on("connect", () => {
            setIsConnected(true)
        })

        socket.on("disconnect", () => {
            setIsConnected(false)
        })
        // ------------------------------------------------------------------------------------------------- END CONNECT SOCKET

        socket.on("boss-dept-add-approve", (data) => {
            setTabFilter('waitapprove')
            getReserveAll('waitapprove')
            // console.log(data)
            // AlertNoti()

        })

        return () => {
            socket.off("connect")
            socket.off("disconnect")
          }

    }, []);

    const AlertNoti = () => {
        openNotificationWithIconSuccess('success')
        console.log('cc')
    }

    const getCarAll = async () => {
        const token = localStorage.getItem("token");

        try {
            let res = await axios.get(`${BASE_URL}/get-car-all`, { headers: { "token": token } })
            setDataCar(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getReserveAll = async (value) => {
        const token = localStorage.getItem("token");
        let tmp_value = value == 'waitapprove' ? value : tabFilter
        try {
            let res = await axios.get(`${BASE_URL}/get-reserve-approve/${tmp_value}`, { headers: { "token": token } })
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getKeeperAll = async () => {
        const token = localStorage.getItem("token");
        let tmp = []
        try {
            let res = await axios.get(`${BASE_URL}/get-keeper-all`, { headers: { "token": token } })
            res.data.map((item, i) => {
                tmp.push({
                    value: item.id,
                    label: item.name,
                });
            });
            setDataKeeper(tmp)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = () => {
        setOpen(false)
    }

    const onExit = () => {
        setOpen(false)
    }
    const onSubmitCar = () => {
        setOpen2(false)
    }

    const onExitCar = () => {
        setOpen2(false)
    }
    const onExitNotApprove = () => {
        setOpen3(false)
    }

    const onChangeDateStart = (date, dateString) => {
        setFormData({ ...formData, start_date: dateString })
    }
    const onChangeDateEnd = (date, dateString) => {
        setFormData({ ...formData, end_date: dateString })
    }
    const onSelectKeeper = (id) => {
        setFormData({ ...formData, keeper: id })
    }


    const submitApprove = async () => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);

        let data = {
            id: formData.id,
            head_id: formData.head_id,
            car_id: formData.car_id,
            no_car: formData.no_car,
            keeper: formData.keeper,
            tcount: formData.tcount,
            start_date: formData.start_date,
            start_time: formData.start_time,
            end_date: formData.end_date,
            end_time: formData.end_time,
            approve_status: "Y",
            comment: formData.comment,
            staff: decoded.username
        }

        try {
            let res = await axios.post(`${BASE_URL}/add-approve-admin`, data, { headers: { "token": token } })
            setOpen(false)
            getReserveAll()
            socket.emit('admin-approve')

        } catch (error) {
            console.log(error)
        }

    }

    const onApprove = async (id) => {
        const token = localStorage.getItem("token");
        try {
            let res = await axios.get(`${BASE_URL}/edit-reserve-car/${id}`, { headers: { "token": token } })
            let d = res.data[0]
            console.log(moment(d.start_date).format('YYYY-MM-DD'))
            setFormData({
                id: null,
                head_id: id,
                keeper: null,
                no_car: "",
                start_date: moment(d.start_date).format('YYYY-MM-DD'),
                start_time: d.start_time,
                end_date: moment(d.start_date).format('YYYY-MM-DD'),
                end_time: d.end_time,
                tcount: d.tcount,
                comment: d.detail,
                car_id: null
            })
            setOpen(true)

        } catch (error) {
            console.log(error)
        }


    }

    const onNotApprove = async (id) => {
        setFormData({
            id: null,
            head_id: id,
            keeper: null,
            no_car: "",
            start_date: null,
            start_time: null,
            end_date: null,
            end_time: null,
            tcount: null,
            comment: '',
            car_id: null
        })
        setNotApprove('')
        setOpen3(true)
    }

    const submitNotApprove = async (id) => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);

        let data = {
            id: formData.id,
            head_id: formData.head_id,
            comment: notApprove,
            approve_status: "N",
            staff: decoded.username
        }
        try {
            let res = await axios.post(`${BASE_URL}/add-notapprove-admin`, data, { headers: { "token": token } })
            setOpen3(false)
            getReserveAll()
            socket.emit('admin-approve')

        } catch (error) {
            console.log(error)
        }
    }

    const onEdit = async (id) => {
        const token = localStorage.getItem("token");
        try {
            let res = await axios.get(`${BASE_URL}/get-approve/${id}`, { headers: { "token": token } })
            let d = res.data[0]
            setFormData({
                id: d.id,
                head_id: id,
                keeper: parseInt(d.keeper),
                no_car: d.no_car,
                start_date: moment(d.start_date).format('YYYY-MM-DD'),
                start_time: d.start_time,
                end_date: moment(d.start_date).format('YYYY-MM-DD'),
                end_time: d.end_time,
                tcount: d.tcount,
                comment: d.comment,
                car_id: d.car_id
            })
            setOpen(true)
        } catch (error) {
            console.log(error)
        }
    }
    const onNotApproveEdit = async (id) => {
        const token = localStorage.getItem("token");
        try {
            let res = await axios.get(`${BASE_URL}/get-approve/${id}`, { headers: { "token": token } })
            let d = res.data[0]
            setFormData({
                id: d.id,
                head_id: id,
                keeper: parseInt(d.keeper),
                no_car: d.no_car,
                start_date: moment(d.start_date).format('YYYY-MM-DD'),
                start_time: d.start_time,
                end_date: moment(d.start_date).format('YYYY-MM-DD'),
                end_time: d.end_time,
                tcount: d.tcount,
                comment: d.comment,
                car_id: d.car_id
            })
            setNotApprove(d.comment)
            setOpen3(true)
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeFilter = async ({ target: { value } }) => {
        setTabFilter(value)
        const token = localStorage.getItem("token");
        try {
            let res = await axios.get(`${BASE_URL}/get-reserve-approve/${value}`, { headers: { "token": token } })
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
        // setValue3(value);
    };

    return (
        <div>
            <div className="intro-y    h-10  mt-5">
                <div className="flex  ">
                    <Figma className="top-menu__sub-icon " size={32} />
                    <span className="text-3xl  truncate ml-4">จัดการจองรถ</span>
                </div>
                <br />
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">

                    <div className="dropdown">
                        จำนวนการจอง {data.length} รายการ
                    </div>
                    <div className="hidden md:block mx-auto text-slate-500">
                        <Radio.Group
                            options={optionsFilter}
                            onChange={onChangeFilter}
                            value={tabFilter}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input type="text" className="form-control w-56 box pr-10" placeholder="Search..." />
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="search" className="lucide lucide-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                        </div>
                    </div>
                </div>
                {/* BEGIN: Users Layout */}
                {data.map((item, i) => {
                    return <div className="intro-y col-span-12 md:col-span-3 zoom-in">
                        <div className="intro-y box mt-5 lg:mt-0">
                            <div className="relative flex items-center p-5" style={{ backgroundColor: item.approve_status == null ? 'white' : item.approve_status == 'Y' ? 'skyblue' : '#F58078', borderRadius: 10 }}>
                                <div className="w-12 h-12 image-fit">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/avatar.png"
                                    />
                                </div>
                                <div className="ml-4 mr-auto">
                                    <div className="font-medium text-base">{item.tname}</div>
                                    <div className="text-slate-500">{item.dept_name}</div>
                                </div>
                                <div className="dropdown">
                                    <a className="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false" data-tw-toggle="dropdown"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="more-horizontal" data-lucide="more-horizontal" className="lucide lucide-more-horizontal w-5 h-5 text-slate-500"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg> </a>
                                    <div className="dropdown-menu w-56">

                                    </div>
                                </div>
                            </div>
                            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                                <div className="flex flex-col sm:flex-row items-center">
                                    <div className="mr-auto">
                                        <a className="flex items-center text-primary font-medium" href>
                                            <CalendarCheck2 className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} /> วันเวลาเดินทาง </a>
                                    </div>
                                    <div className="w-full sm:w-auto flex items-center mt-3 sm:mt-0">
                                        <div className="bg-warning/ text-warning rounded px-2 mr-1">{moment(item.start_date).format("DD/MM/") + (parseInt(moment(item.start_date).format("YYYY")) + 543)}  {item.start_time}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center mt-2">
                                    <div className="mr-auto">
                                        <a className="flex items-center text-primary font-medium" href>
                                            <CalendarCheck2 className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} /> วันเวลากลับ </a>
                                    </div>
                                    <div className="w-full sm:w-auto flex items-center mt-3 sm:mt-0">
                                        <div className=" text-success rounded px-2 mr-1"> {moment(item.end_date).format("DD/MM/") + (parseInt(moment(item.end_date).format("YYYY")) + 543)}  {item.end_time}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center mt-2">
                                    <div className="mr-auto">
                                        <a className="flex items-center text-primary font-medium" href>
                                            <User className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} /> จำนวนคน </a>
                                    </div>
                                    <div className="w-full sm:w-auto flex items-center mt-3 sm:mt-0">
                                        <div className="bg-danger text-white rounded px-2 mr-1">{item.tcount} คน</div>

                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center mt-2">
                                    <div className="mr-auto">
                                        <a className="flex items-center text-primary font-medium" href>
                                            <MapPin className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} /> สถานที่ </a>
                                    </div>

                                </div>
                                <div className="mt-1 ml-6" style={{ color: 'grey', fontWeight: 2 }}>{item.location}</div>
                                <div className="flex flex-col sm:flex-row items-center mt-2">
                                    <div className="mr-auto">
                                        <a className="flex items-center text-primary font-medium" href>
                                            <Database className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} /> รายละเอียด </a>
                                    </div>

                                </div>
                                <div className="mt-1 ml-6" style={{ color: 'grey', fontWeight: 2 }}>
                                    {item.detail}
                                </div>



                            </div>

                            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex">
                                <button className={` btn btn btn${item.approve_status == 'N' ? '-danger' : '-outline-danger'}    w-32`} onClick={() => {

                                    if (item.approve_status == 'N') {
                                        onNotApproveEdit(item.id)
                                    } else {

                                        onNotApprove(item.id)
                                    }

                                }}>
                                    <XCircle className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} />
                                    <div>ไม่อนุมัติ</div>
                                </button>
                                <button type="button" className={` btn btn${item.approve_status == 'Y' ? '-success' : '-outline-success'}  ml-auto w-32`} onClick={() => {
                                    if (item.approve_status == 'Y') {
                                        onEdit(item.id)
                                    } else {

                                        onApprove(item.id)
                                    }

                                }}>
                                    <Check className="top-menu__sub-icon  lucide lucide-box w-4 h-4 mr-2" size={18} />
                                    <div>อนุมัติ</div>
                                </button>

                            </div>
                        </div>

                    </div>
                })}



                {/* END: Users Layout */}

            </div>

            <Modal
                headStyle={{ backgroundColor: "red" }}
                title={"บันทึกการอนุมัติ"}
                // centered
                open={open}
                onOk={submitApprove}
                onCancel={onExit}
                width="60%"
                className="modalStyle2"
                okText="บันทึก"
                cancelText="ยกเลิก"
            >
                <div className="modal-body " style={{ marginTop: -30 }}>
                    <div className="intro-y  px-5 pt-0 ">
                        <div className="cols-8  ">
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                            // initialValues={{ size: componentSize }}
                            // onValuesChange={onFormLayoutChange}
                            >
                                <div className="col-span-12 lg:col-span-12 mt-5">
                                    <label style={{ marginRight: 27 }}>เลือกรถ &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <button class="btn btn btn-outline-danger w-40 mr-2 ml-2" onClick={() => setOpen2(true)}>
                                        <Car className="top-menu__sub-icon  lucide lucide-box w-5 h-5 mr-2" size={20} />
                                        <div>คลิกเพื่อเลือกรถ</div>
                                    </button>
                                </div>
                                {formData.no_car == '' ? '' :
                                    <div className="col-span-12 lg:col-span-12 mt-3">
                                        <label style={{ marginRight: 95 }}></label>
                                        <span>{formData.no_car}</span>
                                    </div>}
                                <div className="col-span-12 lg:col-span-12 mt-3">
                                    <label style={{ marginRight: 27 }}>คนขับ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <Select
                                        style={{ width: '80%', marginLeft: 5 }}
                                        showSearch
                                        placeholder="---ระบุคนขับ---"
                                        optionFilterProp="children"
                                        onChange={(e) => onSelectKeeper(e)}
                                        // onSearch={onSearchClinic}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={dataKeeper}
                                        value={
                                            (formData.keeper == null
                                                ? null
                                                : formData.keeper)
                                        }
                                    >
                                        <Select.Option key={1} value={'admin'}>
                                            {'admin'}
                                        </Select.Option>
                                        <Select.Option key={2} value={'general'}>
                                            {'general'}
                                        </Select.Option>
                                    </Select>
                                </div>
                                <div className="col-span-12 lg:col-span-12 mt-3">
                                    <label style={{ marginRight: 27 }}>จำนวนคน &nbsp;&nbsp;&nbsp;</label>
                                    <Input value={formData.tcount} placeholder="---ระบุจำนวนคน---" style={{ width: '80%' }} onChange={(e) => setFormData({ ...formData, tcount: e.target.value })} />
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
                                    {/* <ConfigProvider locale={th_TH}>
                                        <DatePicker
                                            onChange={onChangeDateStart}
                                            placeholder="------เลือกวันที่นัด------"
                                            style={{ width: '50%' }}
                                            value={
                                                formData.start_date == null
                                                    ? null
                                                    : moment(formData.start_date, "YYYY-MM-DD")
                                            }
                                        />
                                    </ConfigProvider> */}
                                    <label style={{ marginRight: 35, marginLeft: 30 }}>
                                        เวลา
                                    </label>
                                    <TimePicker
                                        placeholder="00:00"
                                        defaultValue={moment("00:00", "HH:mm")}
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
                                        defaultValue={moment("00:00", "HH:mm")}
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
                                <div className="col-span-12 lg:col-span-12 mt-3">
                                    <label style={{ marginRight: 27 }}>รายละเอียด</label>
                                    <TextArea value={formData.comment} rows={4} placeholder="---รายละเอียด---" style={{ width: '80%' }} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
                                </div>


                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                headStyle={{ backgroundColor: "red" }}
                title={"ไม่อนุมัติ"}
                // centered
                open={open3}
                onOk={submitNotApprove}
                onCancel={onExitNotApprove}
                width="60%"
                className="modalStyle2"
                okText="บันทึก"
                cancelText="ยกเลิก"
            >
                <div className="modal-body " style={{ marginTop: -30 }}>
                    <div className="intro-y  px-5 pt-0 ">
                        <div className="cols-8  ">
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                            // initialValues={{ size: componentSize }}
                            // onValuesChange={onFormLayoutChange}
                            >


                                <div className="col-span-12 lg:col-span-12 mt-3">
                                    <label style={{ marginRight: 27 }}>เหตุผล</label>
                                    <TextArea value={notApprove} rows={4} placeholder="---รายละเอียด---" style={{ width: '80%' }} onChange={(e) => setNotApprove(e.target.value)} />
                                </div>


                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                headStyle={{ backgroundColor: "red" }}
                title={"เลือกรถ"}
                // centered
                open={open2}
                onOk={onSubmitCar}
                onCancel={onExitCar}
                width="60%"
                className="modalStyle2"
                okText="ตกลง"
                cancelText="ยกเลิก"
            >
                <div className="modal-body " style={{ marginTop: -30 }}>
                    <div className="intro-y  px-5 pt-0 ">
                        {dataCar.map((itemCar, i) => {
                            return <div className="mt-5">
                                <div className="intro-x" onClick={() => {
                                    setSelectCar(itemCar.no)
                                    setFormData({ ...formData, no_car: itemCar.no_car, car_id: itemCar.no })
                                }}>
                                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                        <div className="w-12 h-12 mr-5 float-left image-fit">
                                            <img alt="Midone - HTML Admin Template" src={BASE_URL + '/' + itemCar.image_car} data-action="zoom" className="w-full rounded-md" />
                                        </div>
                                        <div className="ml-4 mr-auto">
                                            <div className="font-medium">{itemCar.no_car}</div>
                                            <div className="text-slate-500 text-xs mt-0.5">{itemCar.type_car} | ผู้รับผิดชอบ  : {itemCar.keeper} </div>
                                        </div>
                                        {selectCar == itemCar.no ? <Check className="top-menu__sub-icon text-success   lucide lucide-box w-6 h-6 mr-2" /> : ''}

                                    </div>
                                </div>

                            </div>
                        })}





                    </div>


                </div>
            </Modal>


        </div>
    )
}

export default AdminCar_