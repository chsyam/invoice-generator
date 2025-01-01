"use client"

import { useReactToPrint } from "react-to-print";
import InvoiceContent from "@/components/InvoiceContent";
import InvoiceForm from "@/components/InvoiceForm";
import invoiceData from "./../public/data/invoiceForm.json";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const [formData, setFormData] = useState({});
	useEffect(() => {
		setFormData(invoiceData)
	}, []);

	const invoiceRef = useRef(null);
	const reactToPrintFn = useReactToPrint({
		contentRef: invoiceRef
	});

	return (
		<div className="text-[16px]">
			<div className="text-center">
				<button onClick={() => reactToPrintFn()}>Print</button>
			</div>
			<div className="mx-[10px] my-[10px] p-[10px]">
				<InvoiceForm formData={formData} setFormData={setFormData} />
			</div>
			<InvoiceContent ref={invoiceRef} formData={formData} setFormData={setFormData} />
		</div>
	);
}
