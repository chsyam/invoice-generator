"use client"

import { useRef } from "react";
import Logo from "./../public/images/logo.png";
import Signature from "./../public/images/signature.png";
import styles from "./../styles/invoiceStyles.module.css";
import { useReactToPrint } from "react-to-print";
import QrCode from "./../public/images/qrcode.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
	const invoiceRef = useRef(null);
	const reactToPrintFn = useReactToPrint({ invoiceRef });

	const typeOfRecipient = {
		"Original for Recepient": true,
		"Duplicate for Transporter": false,
		"Triplicate for Supplier": false
	}

	const handleGeneratePDF = async () => {
		const inputData = invoiceRef.current;

		try {
			const canvas = await html2canvas(inputData);
			const imgData = canvas.toDataURL("pdf");

			const pdf = new jsPDF({
				orientation: 'l',
				unit: 'px',
				format: "a4"
			})

			// const width = pdf.internal.pageSize.getWidth();
			// const height = (canvas.height * width) / canvas.width;

			// pdf.addImage(imgData, "pdf", 0, 0, width, height);
			// pdf.save("invoice.pdf");
			// Adjust dimensions based on your needs
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const imageWidth = canvas.width;
			const imageHeight = canvas.height;

			// Calculate the scale to fit the content into the PDF page
			const scale = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);

			// Center content in PDF
			const x = (pageWidth - imageWidth * scale) / 2;
			const y = (pageHeight - imageHeight * scale) / 2;

			pdf.addImage(imgData, 'PNG', x, y, imageWidth * scale, imageHeight * scale);
			pdf.save('capture.pdf');
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="text-[16px]">
			<div className="text-center">
				<button onClick={() => handleGeneratePDF()}>Print</button>
			</div>
			<div ref={invoiceRef} style={{ zoom: 1 }} className="mx-[20px] my-[20px] p-[20px]">
				<div className="border border-black relative flex justify-between items-center gap-4 flex-nowrap bg-blue-200">
					<div className="text-2xl font-bold h-[40px] flex-1 leading-10 text-center">
						TAX INVOICE
					</div>
					<div className="absolute right-0">
						{
							Object.keys(typeOfRecipient).map((type, index) => {
								return (
									typeOfRecipient[type] && (
										<div key={index}>
											<span className="px-2">{type}</span>
										</div>
									)
								)
							})
						}
					</div>
				</div>
				<div className={styles.invoiceMetadata}>
					<table>
						<tbody>
							{/* <tr>
								<td rowSpan={5}>
									<img src={Logo.src} alt="logo image" width={200} height={200} />
								</td>
							</tr> */}
							<tr>
								<td className="text-2xl font-semibold">
									Phata Phat Delivery
								</td>
							</tr>
							<tr>
								<td>
									11-2-284, BESIDE ALHAMDULILLAH HOTEL, NEAR HABEEB NAGAR PS, NAMPALLY, HYDERABAD, Telengana, 500001
								</td>
							</tr>
							<tr>
								<td className="font-semibold">
									ph: 8534099966
								</td>
							</tr>
							<tr>
								<td>
									GSTIN: <span className="font-bold">36BLAPJ5919F1Z7</span> <br />
									PAN No: <span className="font-bold">BLAPJ5919F</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<tbody>
							<tr>
								<td>Reverse Charge</td>
								<td>:</td>
								<td>No</td>
							</tr>
							<tr>
								<td>Reverse No.</td><td>:</td>
								<td>385</td>
							</tr>
							<tr>
								<td>Invoice Date</td><td>:</td>
								<td>30-10-2024</td>
							</tr>
							<tr>
								<td>Date of Supply</td><td>:</td>
								<td>30-10-2024</td>
							</tr>
							<tr>
								<td>Place of Supply</td><td>:</td>
								<td>Gachibowli</td>
							</tr>
							<tr>
								<td>State</td><td>:</td>
								<td>Telangana-36</td>
							</tr>
						</tbody>
					</table>
					<table>
						<tbody>
							<tr>
								<td>Challan No. </td><td>:</td>
								<td></td>
							</tr>
							<tr>
								<td>Transportation Mode</td>
								<td>:</td>
								<td>Road</td>
							</tr>
							<tr>
								<td>Transporter Name</td>
								<td>:</td>
								<td>PORTER</td>
							</tr>
							<tr>
								<td>Vehicle No.</td><td>:</td>
								<td>TS13UD0661</td>
							</tr>
							<tr>
								<td>LR Number</td><td>:</td>
								<td></td>
							</tr>
							<tr>
								<td>LR Date</td><td>:</td>
								<td>30-10-2024</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className={styles.shippingDetails}>
					<div>
						<div className="font-semibold my-1">Customer Details:</div>
						<div>Ch Syam Kumar,</div>
						<div>Ph: 8008331438</div>
						<div className="font-semibold my-2">Billing Address:</div>
						<div className="max-w-[400px]">
							Plot No 41 H NO 2-37/25, Vinayak Nagar, Gachibowli,
						</div>
						<div>Hyderabad, Rangareddy</div>
						<div>Telangana, 500032</div>
						<div>
							GSTIN:<span className="font-semibold px-1">36BXBPK0778G1ZG</span>
						</div>
					</div>
					<table>
						<thead>
							<tr>
								<th colSpan={3}>
									Shipping Address
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Name</td>
								<td>:</td>
								<td>M/S PPD</td>
							</tr>
							<tr>
								<td>Address</td>
								<td>:</td>
								<td>PLOT NO 41 H NO 2-37/25, VINAYAK NAGAR, GACHIBOWLI, Rangareddy, GACHIBOWLI, Telangana, 500032</td>
							</tr>
							<tr>
								<td>GSTIN</td>
								<td>:</td>
								<td>36BXBPK0778G1ZG</td>
							</tr>
							<tr>
								<td>State</td>
								<td>:</td>
								<td>Telangana-36</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className={styles.itemsList}>
					<table>
						<thead>
							<tr>
								<th rowSpan={2}>#</th>
								<th rowSpan={2}>Name of Product</th>
								<th rowSpan={2}>HSN/SAC</th>
								<th rowSpan={2}>QTY</th>
								<th rowSpan={2}>Unit</th>
								<th rowSpan={2}>Rate</th>
								<th rowSpan={2}>Taxable Value</th>
								<th colSpan={2}>CGST</th>
								<th colSpan={2}>SGST</th>
								<th rowSpan={2}>Total</th>
							</tr>
							<tr>
								<th>Rate</th>
								<th>Amount</th>
								<th>Rate</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>BASMATI</td>
								<td>1006</td>
								<td>3000</td>
								<td>KGS</td>
								<td>85.0</td>
								<td>255,000</td>
								<td>0.00%</td>
								<td>0.00</td>
								<td>0.00%</td>
								<td>0.00</td>
								<td>255,000</td>
							</tr>
							<tr>
								<td>
									<div className="min-h-[100px]"></div>
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td colSpan={6}>Freight Charges :</td>
								<td>
									<div className="text-center">
										1500.00
									</div>
								</td>
								<td>0.0%</td>
								<td>0.00</td>
								<td>0.0%</td>
								<td>0.00</td>
								<td>1,500</td>
							</tr>
							<tr>
								<td colSpan={3}>Total Quantity</td>
								<td colSpan={3}>
									<div className="text-center">
										3000
									</div>
								</td>
								<td>₹2,56,500</td>
								<td colSpan={2}>₹0</td>
								<td colSpan={2}>₹0</td>
								<td>₹2,56,500</td>
							</tr>
							<tr>
								<td colSpan={12}>Total invoice amount (in words): INR <span className="font-semibold px-1">{'Ten Thousand Five Hundred Fifty Thousand Only'}.</span> </td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className={styles.amountDetails}>
					<table>
						<thead>
							<tr>
								<th colSpan={3}>Bank Details</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Account Number</td>
								<td>: 025063200000070</td>
							</tr>
							<tr>
								<td>IFSC Code</td>
								<td>: YESB0000250</td>
							</tr>
							<tr>
								<td>Bank Name</td>
								<td>: Yes Bank</td>
							</tr>
							<tr>
								<td>Branch</td>
								<td>: BANJARA HILLS, HYDERABAD</td>
							</tr>
							<tr>
								<td>For UPI Payment</td>
								<td>: 8534099966</td>
							</tr>
						</tbody>
					</table>
					<table>
						<tbody>
							<tr>
								<td>Total Amount Before Tax :</td>
								<td>₹2,56,500</td>
							</tr>
							<tr>
								<td>Add: CGST</td>
								<td>₹0</td>
							</tr>
							<tr>
								<td>Add: SGST</td>
								<td>₹0</td>
							</tr>
							<tr>
								<td>Total Amount</td>
								<td>₹2,56,500</td>
							</tr>
							{/* <tr>
								<td colSpan={2}>
									<div className="text-center flex flex-col items-center">
										<img src={Signature.src} alt="signature" width={100} height={100} />
										Authorised Signatory
									</div>
								</td>
							</tr> */}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
