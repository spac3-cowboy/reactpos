import React from "react";
import BarCodeGenerator from "./BarCodeGenerator";
import moment from "moment";

export default function PreviewBarCode({ product, printPaper, printPage }) {
	const { pageName, col, row } = printPaper;
	const page = printPage?.find((pp) => pp.pageSizeName == pageName);
	const totalBarcode = parseInt(row) * parseInt(col);
	const width = `${page?.width * 25.4}mm` || "210mm";
	const height = `${page?.height * 25.4}mm` || "297mm";
	//print barcode function
	const barcodeComponents = [];
	for (let i = 0; i < totalBarcode; i++) {
		barcodeComponents.push(
			<div className='min-w-[147.68px] max-w-[4004.724px] min-h-[ 117.060px] max-h-[124.100px] border border-dotted px-1 py-1 flex flex-col justify-center items-center'>
				<span className='text-sm text-center'>{product?.name}</span>
				<BarCodeGenerator sku={product.sku} />
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
		<div className='overflow-hidden'>
			<div style={styles.a4Page}>
				<div className='flex justify-between'>
					<span className='text-gray-500 text-sm w-[200px]'>
						{moment().format("MM/DD/YY, h:mm A")}
					</span>

					<span className='w-[200px]'>{""}</span>
				</div>

				<div className={`grid print-cols-${col} print-rows-${row} m-[30px]`}>
					{barcodeComponents}
				</div>
			</div>
		</div>
	);
}
