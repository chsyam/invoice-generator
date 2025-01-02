"use client"

import { useReactToPrint } from "react-to-print";
import InvoiceContent from "@/components/InvoiceContent";
import InvoiceForm from "@/components/InvoiceForm";
import invoiceData from "./../public/data/invoiceForm.json";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { Download } from "lucide-react";

export default function Home() {
	const [formData, setFormData] = useState({});

	useEffect(() => {
		let temp = invoiceData;
		temp['invoice_date'] = new Date();
		temp['data_of_supply'] = new Date();
		setFormData(temp);
	}, []);

	const invoiceRef = useRef(null);
	const reactToPrintFn = useReactToPrint({
		contentRef: invoiceRef
	});

	return (
		<div>
			<div className="mx-[10px] my-[10px] p-[10px]">
				<InvoiceForm formData={formData} setFormData={setFormData} />
			</div>
			<div className="flex justify-center mx-[10px] my-[10px] p-[10px]">
				<Button startIcon={<Download />} variant="contained" sx={{ textTransform: 'none' }} onClick={() => reactToPrintFn()}>
					Print
				</Button>
			</div>
			<InvoiceContent ref={invoiceRef} formData={formData} setFormData={setFormData} />
		</div>
	);
}
