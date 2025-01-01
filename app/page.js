"use client"

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceContent from "@/components/InvoiceContent";
import InvoiceForm from "@/components/InvoiceForm";

export default function Home() {
	const invoiceRef = useRef(null);
	const reactToPrintFn = useReactToPrint({
		contentRef: invoiceRef
	});

	return (
		<div className="text-[16px]">
			<div className="text-center">
				<button onClick={() => reactToPrintFn()}>Print</button>
			</div>
			<div>
				<InvoiceForm />
			</div>
			<InvoiceContent ref={invoiceRef} />
		</div>
	);
}
