import moment from "moment";
import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BarCodeGenerator from "./BarCodeGenerator";
import { BiSolidPrinter } from "react-icons/bi";

const PrintToPdf = forwardRef(({ product, printPaper, printPage }, ref) => {
	const { pageName, col, row } = printPaper;
	const page = printPage?.find((pp) => pp.pageSizeName == pageName);
	const totalBarcode = parseInt(row) * parseInt(col);
	const width = `${page?.width * 25.4}mm` || "210mm";
	const height = `${page?.height * 25.4}mm` || "297mm";

	//print barcode function
	const barcodeComponents = [];
	for (let i = 0; i < totalBarcode; i++) {
		barcodeComponents.push(
			<div className='min-w-[50.68px] max-w-[500.0px] min-h-[ 117.060px] max-h-[124.100px] border border-dotted px-1 py-1 flex flex-col justify-center items-center'>
				<span className='text-sm text-center'>{product?.name}</span>
				<BarCodeGenerator sku={product?.sku} />
			</div>
		);
	}

	// A4 size page style
	const styles = {
		a4Page: {
			width: width,
			height: height,
			padding: "5px",
			margin: "auto",
		},
	};

	return (
		<div ref={ref} style={styles.a4Page}>
			<div className='flex justify-between'>
				<span className='text-gray-500 text-sm w-[200px]'>
					{moment().format("MM/DD/YY, h:mm A")}
				</span>
				<span className='w-[200px] text-gray-500'>
					Print Barcode | Sale Flow
				</span>
				<span className='w-[200px]'>{""}</span>
			</div>

			<div className={`grid print-cols-${col} print-rows-${row} m-[15px]`}>
				{barcodeComponents}
			</div>
		</div>
	);
});

PrintToPdf.displayName = "printToPdf";

export default function AllCodePrint({ product, printPaper, printPage }) {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div>
			<div className='hidden'>
				<PrintToPdf
					ref={componentRef}
					product={product}
					printPaper={printPaper}
					printPage={printPage}
				/>
			</div>
			{
				<button
					onClick={handlePrint}
					className='bg-[#5660d9] hover:bg-[#5660d9]/80 duration-200 font-medium mx-3 px-5 py-2 text-white rounded'>
					Print <BiSolidPrinter className='inline' />
				</button>
			}
		</div>
	);
}
