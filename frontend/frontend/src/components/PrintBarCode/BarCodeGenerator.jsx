import { useBarcode } from "next-barcode";
import React from "react";

function BarCodeGenerator({ sku }) {
  const { inputRef } = useBarcode({
    value: `${sku}`,

    options: {
      background: "#FFFFFF",
      height: 50,
      fontSize: 15,
    },
    format: "EAN-13",
  });

  return <svg ref={inputRef} />;
}

export default BarCodeGenerator;
