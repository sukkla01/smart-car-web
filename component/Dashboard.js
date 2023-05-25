import React from 'react'

const Dashboard = () => {
    return (
        <>
            <div className="col-span-12 mt-8">
                <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                        General Report
                    </h2>
                    <a href className="ml-auto flex items-center text-primary"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="refresh-ccw" data-lucide="refresh-ccw" className="lucide lucide-refresh-ccw w-4 h-4 mr-3"><path d="M3 2v6h6" /><path d="M21 12A9 9 0 006 5.3L3 8" /><path d="M21 22v-6h-6" /><path d="M3 12a9 9 0 0015 6.7l3-2.7" /></svg> Reload Data </a>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-5">
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="shopping-cart" data-lucide="shopping-cart" className="lucide lucide-shopping-cart report-box__icon text-primary"><circle cx={9} cy={21} r={1} /><circle cx={20} cy={21} r={1} /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
                                    <div className="ml-auto">
                                        <div className="report-box__indicator bg-success tooltip cursor-pointer"> 33% <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="chevron-up" data-lucide="chevron-up" className="lucide lucide-chevron-up w-4 h-4 ml-0.5"><polyline points="18 15 12 9 6 15" /></svg> </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">4.710</div>
                                <div className="text-base text-slate-500 mt-1">Item Sales</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="credit-card" data-lucide="credit-card" className="lucide lucide-credit-card report-box__icon text-pending"><rect x={1} y={4} width={22} height={16} rx={2} ry={2} /><line x1={1} y1={10} x2={23} y2={10} /></svg>
                                    <div className="ml-auto">
                                        <div className="report-box__indicator bg-danger tooltip cursor-pointer"> 2% <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="chevron-down" data-lucide="chevron-down" className="lucide lucide-chevron-down w-4 h-4 ml-0.5"><polyline points="6 9 12 15 18 9" /></svg> </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">3.721</div>
                                <div className="text-base text-slate-500 mt-1">New Orders</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="monitor" data-lucide="monitor" className="lucide lucide-monitor report-box__icon text-warning"><rect x={2} y={3} width={20} height={14} rx={2} ry={2} /><line x1={8} y1={21} x2={16} y2={21} /><line x1={12} y1={17} x2={12} y2={21} /></svg>
                                    <div className="ml-auto">
                                        <div className="report-box__indicator bg-success tooltip cursor-pointer"> 12% <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="chevron-up" data-lucide="chevron-up" className="lucide lucide-chevron-up w-4 h-4 ml-0.5"><polyline points="18 15 12 9 6 15" /></svg> </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">2.149</div>
                                <div className="text-base text-slate-500 mt-1">Total Products</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="user" data-lucide="user" className="lucide lucide-user report-box__icon text-success"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                                    <div className="ml-auto">
                                        <div className="report-box__indicator bg-success tooltip cursor-pointer"> 22% <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="chevron-up" data-lucide="chevron-up" className="lucide lucide-chevron-up w-4 h-4 ml-0.5"><polyline points="18 15 12 9 6 15" /></svg> </div>
                                    </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">152.040</div>
                                <div className="text-base text-slate-500 mt-1">Unique Visitor</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <table className="table table-report mt-10">
               
                <tbody>
                    <tr className="intro-x">
                        <td className="w-40">
                            <div className="flex">
                                <div className="w-10 h-10 image-fit zoom-in">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-5.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href className="font-medium whitespace-nowrap">Sony A7 III</a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Photography</div>
                        </td>
                        <td className="text-center">50</td>
                        <td className="w-40">
                            <div className="flex items-center justify-center text-success"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Active </div>
                        </td>
                        <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                                <a className="flex items-center mr-3" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Edit </a>
                                <a className="flex items-center text-danger" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="trash-2" data-lucide="trash-2" className="lucide lucide-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg> Delete </a>
                            </div>
                        </td>
                    </tr>
                    <tr className="intro-x">
                        <td className="w-40">
                            <div className="flex">
                                <div className="w-10 h-10 image-fit zoom-in">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-6.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-5.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-4.jpg" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href className="font-medium whitespace-nowrap">Nike Tanjun</a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Sport &amp; Outdoor</div>
                        </td>
                        <td className="text-center">85</td>
                        <td className="w-40">
                            <div className="flex items-center justify-center text-danger"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Inactive </div>
                        </td>
                        <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                                <a className="flex items-center mr-3" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Edit </a>
                                <a className="flex items-center text-danger" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="trash-2" data-lucide="trash-2" className="lucide lucide-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg> Delete </a>
                            </div>
                        </td>
                    </tr>
                    <tr className="intro-x">
                        <td className="w-40">
                            <div className="flex">
                                <div className="w-10 h-10 image-fit zoom-in">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-14.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-12.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-2.jpg" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href className="font-medium whitespace-nowrap">Sony A7 III</a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Photography</div>
                        </td>
                        <td className="text-center">117</td>
                        <td className="w-40">
                            <div className="flex items-center justify-center text-danger"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Inactive </div>
                        </td>
                        <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                                <a className="flex items-center mr-3" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Edit </a>
                                <a className="flex items-center text-danger" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="trash-2" data-lucide="trash-2" className="lucide lucide-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg> Delete </a>
                            </div>
                        </td>
                    </tr>
                    <tr className="intro-x">
                        <td className="w-40">
                            <div className="flex">
                                <div className="w-10 h-10 image-fit zoom-in">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-1.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-4.jpg" />
                                </div>
                                <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img alt="Midone - HTML Admin Template" className="tooltip rounded-full" src="dist/images/preview-13.jpg" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <a href className="font-medium whitespace-nowrap">Nikon Z6</a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Photography</div>
                        </td>
                        <td className="text-center">50</td>
                        <td className="w-40">
                            <div className="flex items-center justify-center text-success"> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Active </div>
                        </td>
                        <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                                <a className="flex items-center mr-3" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="check-square" data-lucide="check-square" className="lucide lucide-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> Edit </a>
                                <a className="flex items-center text-danger" href> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" icon-name="trash-2" data-lucide="trash-2" className="lucide lucide-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg> Delete </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>

    )
}

export default Dashboard