import styles from "./../styles/invoiceStyles.module.css";
import AddressComponent from "./AddressComponent";
import BankComponent from "./BankComponent";

export default function InvoiceContent({ ref }) {
    const typeOfRecipient = {
        "Original for Recepient": true,
        "Duplicate for Transporter": false,
        "Triplicate for Supplier": false
    }

    return (
        <div ref={ref} style={{ zoom: 0.7 }} className="mx-[10px] my-[10px] p-[10px]">
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
                <div className="border-l border-black flex-1 px-4 py-2">
                    <div className="flex my-2">
                        <div className={styles.key}>Invoice Date</div>
                        <div className={styles.value}>: 30-10-2024</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>Date of Supply</div>
                        <div className={styles.value}>: 30-10-2024</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>Place of Supply</div>
                        <div className={styles.value}>: Gachibowli</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>State</div>
                        <div className={styles.value}>: Telangana-36</div>
                    </div>
                </div>
                <div className="border-x border-black flex-1 px-4 py-2">
                    <div className="flex my-2">
                        <div className={styles.key}>Reverse No.</div>
                        <div className={styles.value}>: 385</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>Transportation Mode</div>
                        <div className={styles.value}>: Road</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>Transporter Name</div>
                        <div className={styles.value}>: PORTER</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>Vehicle No. </div>
                        <div className={styles.value}>: TS13UD0661</div>
                    </div>
                </div>
                <div className="border-r border-black flex-1 px-4 py-2">
                    <div className="flex my-2">
                        <div className={styles.key}>Reverse Charge</div>
                        <div className={styles.value}>: No</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>Challan No. </div>
                        <div className={styles.value}>:</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>LR Number</div>
                        <div className={styles.value}>:</div>
                    </div>
                    <div className="flex my-2">
                        <div className={styles.key}>LR Date</div>
                        <div className={styles.value}>: 30-10-2024</div>
                    </div>
                </div>
            </div>
            <div className={styles.shippingDetails}>
                <div className="border border-r-0  border-b-0 border-black px-4 py-2">
                    <span className="text-2xl font-semibold">
                        Phata Phat Delivery
                    </span>
                    <AddressComponent />
                </div>
                <div className="border border-r-0 border-b-0 border-black px-4 py-2">
                    <div className="font-[600] my-1 text-[18px]">Customer Details:</div>
                    <div>Ch Syam Kumar</div>
                    <div className="font-[600] my-1 text-[18px]">Billing Address:</div>
                    <AddressComponent />
                </div>
                <div className="border border-black border-b-0  px-4 py-2">
                    <div className="font-[600] my-2 text-[18px]">Shipping Address:</div>
                    <div>{'M/S PPD'}</div>
                    <AddressComponent />
                </div>
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
                <BankComponent />
                <div>
                    <div className="flex p-2 border border-black bg-[#BFDBFE]">
                        <div className={styles.key}>Total Amount Before Tax</div>
                        <div className="font-semibold">: ₹2,56,500</div>
                    </div>
                    <div className="flex p-2 border border-black border-t-0">
                        <div className={styles.key}>Add: CGST</div>
                        <div className="font-semibold">: ₹0</div>
                    </div>
                    <div className="flex p-2 border border-black border-t-0">
                        <div className={styles.key}>Add: SGST</div>
                        <div className="font-semibold">: ₹0</div>
                    </div>
                    <div className="flex p-2 border border-black border-t-0 bg-[#BFDBFE]">
                        <div className={styles.key}>Total Amount</div>
                        <div className="font-semibold">: ₹2,56,500</div>
                    </div>
                </div>
                {/* 
                    <tr>
        				<td colSpan={2}>
        					<div className="text-center flex flex-col items-center">
        						<img src={Signature.src} alt="signature" width={100} height={100} />
        						Authorised Signatory
        					</div>
        				</td>
        			</tr> 
                */}
            </div >
        </div >
    )
}