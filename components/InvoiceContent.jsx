import { format } from "date-fns";
import styles from "./../styles/invoiceStyles.module.css";
import AddressComponent from "./AddressComponent";
import BankComponent from "./BankComponent";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function InvoiceContent({ ref, formData }) {
    const typeOfRecipient = {
        "Original for Recepient": true,
        "Duplicate for Transporter": false,
        "Triplicate for Supplier": false
    }

    const getFormattedDate = (date) => {
        if (!date) return "-";
        return format(date, "dd/MM/yyyy");
    }

    const highlightedRows = {
        backgroundColor: '#BFDBFE',
        textAlign: 'center',
        fontWeight: 500
    }

    function toNumber(value) {
        if (!value) return 0;
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    }

    const get_Taxble_Amount = (quantity, price) => {
        return toNumber(quantity) * toNumber(price);
    }

    const get_GST_Amount = (quantity, price, gst) => {
        return (get_Taxble_Amount(quantity, price) * toNumber(gst)) / 100;
    }

    const getItemTotal = (quantity, price, cgst, sgst) => {
        let total = get_Taxble_Amount(quantity, price) + get_GST_Amount(quantity, price, cgst) + get_GST_Amount(quantity, price, sgst);
        return toNumber(total).toFixed(2);
    }

    const getTotalQuantity = () => {
        let total = 0;
        formData?.itemsList?.forEach((item) => {
            total += toNumber(item?.quantity);
        })
        return total;
    }

    const get_Total_taxable_value = () => {
        let total = 0;
        formData?.itemsList?.forEach((item) => {
            total += get_Taxble_Amount(item?.quantity, item?.price);
        })
        return total;
    }

    const get_all_items_total_after_taxes = () => {
        let total = 0;
        formData?.itemsList?.forEach((item) => {
            total += get_Taxble_Amount(item?.quantity, item?.price) + get_GST_Amount(item?.quantity, item?.price, item?.cgst) + get_GST_Amount(item?.quantity, item?.price, item?.sgst);
        })
        return total.toFixed(2);
    }
    const get_all_items_gst = (gst_type) => {
        let total = 0;
        formData?.itemsList?.forEach((item) => {
            total += get_GST_Amount(item?.quantity, item?.price, item[gst_type]);
        })
        return total;
    }

    function convertToWords(amount) {
        const units = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
        ];
        const teens = [
            "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen"
        ];
        const tens = [
            "", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
        ];
        const scales = [
            "", "Thousand", "Lakh", "Crore"
        ];

        function numberToWords(num) {
            if (num === 0) return "Zero";

            let words = "";
            let scaleIndex = 0;

            while (num > 0) {
                let part = num % 1000;
                if (part !== 0) {
                    words = `${convertHundreds(part)} ${scales[scaleIndex]} ${words}`.trim();
                }
                num = Math.floor(num / 1000);
                scaleIndex++;
            }

            return words.trim();
        }

        function convertHundreds(num) {
            let words = "";
            if (num > 99) {
                words += `${units[Math.floor(num / 100)]} Hundred `;
                num %= 100;
            }
            if (num > 10 && num < 20) {
                words += `${teens[num - 11]} `;
            } else {
                words += `${tens[Math.floor(num / 10)]} `;
                num %= 10;
            }
            words += units[num];
            return words.trim();
        }

        function getRupeesAndPaise(amount) {
            const [rupees, paise] = toNumber(amount).toFixed(2).split(".");
            return {
                rupees: parseInt(rupees, 10),
                paise: parseInt(paise, 10),
            };
        }

        const { rupees, paise } = getRupeesAndPaise(amount);

        let result = `${numberToWords(rupees)} Rupees`;
        if (paise > 0) {
            result += ` and ${numberToWords(paise)} Paise`;
        }
        return result + " Only";
    }

    return (
        <div ref={ref} style={{ zoom: 0.8 }} className="mx-[10px] my-[10px] p-[10px]">
            <div className={styles.itemsList}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow sx={highlightedRows}>
                                        <TableCell colSpan={11}>
                                            <div className="flex justify-between items-center gap-4 flex-nowrap">
                                                <div className="flex-1">
                                                </div>
                                                <div className="flex-1 text-2xl font-bold flex-1 text-center">
                                                    TAX INVOICE
                                                </div>
                                                <div className="flex-1 text-right">
                                                    {
                                                        Object.keys(typeOfRecipient).map((type, index) => {
                                                            return (
                                                                typeOfRecipient[type] && (
                                                                    <div key={index}>
                                                                        <span>{type}</span>
                                                                    </div>
                                                                )
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={4}>
                                            <div className="flex">
                                                <div className={styles.key}>Invoice Date :</div>
                                                <div className={styles.value}>
                                                    {getFormattedDate(formData?.invoice_date)}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={4}>
                                            <div className="flex">
                                                <div className={styles.key}>Date of Supply :</div>
                                                <div className={styles.value}>
                                                    {getFormattedDate(formData?.data_of_supply)}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={3}>
                                            <div className="flex">
                                                <div className={styles.key}>Place of Supply :</div>
                                                <div className={styles.value}>
                                                    {formData?.place_of_supply}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={4}>
                                            <div className="text-left">
                                                <div className="font-medium mb-1 text-[18px]">
                                                    Source of supply:
                                                </div>
                                                <span className="text-xl font-semibold">
                                                    {formData?.company_name || ""}
                                                </span>
                                                <AddressComponent address_type="company" />
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={4}>
                                            <div className="text-left">
                                                <div className="font-medium mb-1 text-[18px]">
                                                    Customer Details:
                                                </div>
                                                <div>{formData?.customer_name || ""}</div>
                                                <div className="font-medium mb-1 text-[18px]">Billing Address:</div>
                                                <AddressComponent address_type="customer" />
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={3}>
                                            <div className="text-left">
                                                <div className="font-medium mb-1 text-[18px]">
                                                    Shipping Address:
                                                </div>
                                                <AddressComponent address_type="shipping" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={highlightedRows}>
                                        <TableCell sx={highlightedRows} rowSpan={2}>#</TableCell>
                                        <TableCell sx={highlightedRows} rowSpan={2}>Name of Product</TableCell>
                                        <TableCell sx={highlightedRows} rowSpan={2}>QTY</TableCell>
                                        <TableCell sx={highlightedRows} rowSpan={2}>Unit</TableCell>
                                        <TableCell sx={highlightedRows} rowSpan={2}>Rate</TableCell>
                                        <TableCell sx={highlightedRows} rowSpan={2}>Taxable Value</TableCell>
                                        <TableCell sx={highlightedRows} colSpan={2}>CGST</TableCell>
                                        <TableCell sx={highlightedRows} colSpan={2}>SGST</TableCell>
                                        <TableCell sx={highlightedRows} rowSpan={2}>Total</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={highlightedRows}>Rate</TableCell>
                                        <TableCell sx={highlightedRows}>Amount</TableCell>
                                        <TableCell sx={highlightedRows}>Rate</TableCell>
                                        <TableCell sx={highlightedRows}>Amount</TableCell>
                                    </TableRow>
                                    {
                                        formData?.itemsList && formData?.itemsList?.length === 0 ? (
                                            <TableRow>
                                                <TableCell sx={{ height: '100px' }}></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        ) : (
                                            (formData?.itemsList || []).map((item, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{item?.item_name || ""}</TableCell>
                                                        <TableCell>{item?.quantity || 0}</TableCell>
                                                        <TableCell>{item?.units || ""}</TableCell>
                                                        <TableCell>{item?.price || 0}</TableCell>
                                                        <TableCell>{get_Taxble_Amount(item?.quantity, item?.price)}</TableCell>
                                                        <TableCell>{Number(item?.cgst || 0).toFixed(2)}%</TableCell>
                                                        <TableCell>{get_GST_Amount(item?.quantity, item?.price, item?.cgst)}</TableCell>
                                                        <TableCell>{Number(item?.sgst || 0).toFixed(2)}%</TableCell>
                                                        <TableCell>{get_GST_Amount(item?.quantity, item?.price, item?.sgst)}</TableCell>
                                                        <TableCell>{getItemTotal(item?.quantity, item?.price, item?.cgst, item?.sgst)}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        )
                                    }
                                    <TableRow sx={highlightedRows}>
                                        <TableCell sx={{ fontSize: '16px' }} colSpan={3}>Total Quantity</TableCell>
                                        <TableCell sx={{ fontSize: '16px' }} colSpan={2}>
                                            <div className="text-center">
                                                {getTotalQuantity()}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px' }}>
                                            ₹ {get_Total_taxable_value()}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px' }} colSpan={2}>
                                            ₹ {get_all_items_gst("cgst")}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px' }} colSpan={2}>
                                            ₹ {get_all_items_gst("sgst")}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px' }}>
                                            ₹ {get_all_items_total_after_taxes()}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={11}>
                                            <div className="text-left text-[16px] font-medium">
                                                Total invoice amount (in words):
                                                <span className="font-medium pl-2 ">
                                                    {convertToWords(get_all_items_total_after_taxes())}.
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5} rowSpan={4}>
                                            <BankComponent formData={formData} />
                                        </TableCell>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            <div className="text-left">
                                                Total Amount Before Tax
                                            </div>
                                        </TableCell>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            <div className="text-left">
                                                ₹ {get_all_items_total_after_taxes()}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <div className="text-left">
                                                Add: CGST
                                            </div>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <div className="text-left">
                                                ₹ 0
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <div className="text-left">
                                                Add: SGST
                                            </div>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <div className="text-left">
                                                ₹ 0
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            Total Amount
                                        </TableCell>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            ₹ {get_all_items_total_after_taxes()}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>

        </div >
    )
}