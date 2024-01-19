import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

//set thai font
pdfMake.fonts = {
  THSarabunNew: {
    normal: "https://api-queue-ss.diligentsoftinter.com/THSarabunNew.ttf",
    bold: "https://api-queue-ss.diligentsoftinter.com/THSarabunNewBold.ttf",
    italics: "https://api-queue-ss.diligentsoftinter.com/THSarabunNewItalic.ttf",
  },
};

export { pdfMake };