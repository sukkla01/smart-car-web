import React from 'react'
import { pdfMake } from "../../lib/pdfmake";


const Test = () => {
    const onPdf = () => {
        pdfMake.createPdf({
            watermark: { text: 'ทดสอบ', color: 'grey', opacity: 0.3, fontSize: 20 ,angle : 45},
            pageSize: 'A5',
            pageOrientation: 'landscape',
            pageMargins: 10, //default 10 //[left,top,right,bottom]
            content: [
                'สวัสดี Pdf'
            ],
            defaultStyle: {
                font: 'THSarabunNew',
                // bold : true,
                // italics : true,
                fontSize: 16
            }
        }).open()
    }

    return (
        <div>
            <button onClick={onPdf}>pdf</button>
        </div>
    )
}

export default Test