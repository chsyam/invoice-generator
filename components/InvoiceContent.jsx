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
        fontWeight: 600
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

    const ones = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    const teens = [
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];
    const tens = [
        "",
        "ten",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];

    function numberToWords(num) {
        if (num === "0") return "zero";

        let numStr = num.toString();
        let word = "";
        let n = numStr.length;

        if (n > 9) return "overflow";

        numStr = numStr.padStart(9, "0");

        let crore = numStr.slice(0, 2);
        let lakh = numStr.slice(2, 4);
        let thousand = numStr.slice(4, 6);
        let hundred = numStr[6];
        let ten = numStr.slice(7);

        if (parseInt(crore) > 0) {
            word += `${convertTwoDigits(crore)} crore `;
        }
        if (parseInt(lakh) > 0) {
            word += `${convertTwoDigits(lakh)} lakh `;
        }
        if (parseInt(thousand) > 0) {
            word += `${convertTwoDigits(thousand)} thousand `;
        }
        if (parseInt(hundred) > 0) {
            word += `${ones[hundred]} hundred `;
        }
        if (parseInt(ten) > 0) {
            word += convertTwoDigits(ten);
        }
        return word.trim();
    }

    function convertTwoDigits(num) {
        num = parseInt(num, 10);
        if (num < 10) return ones[num];
        if (num > 10 && num < 20) return teens[num - 11];
        let unit = num % 10;
        let ten = Math.floor(num / 10);
        return `${tens[ten]} ${ones[unit]}`.trim();
    }

    function convertRupeesPaise(amount) {
        let [rupees, paise] = amount.toString().split(".");

        let rupeesInWords = numberToWords(parseInt(rupees));
        let paiseInWords = paise ? convertTwoDigits(paise.padEnd(2, "0")) : "";

        let result = "";
        if (rupeesInWords) {
            result += `${rupeesInWords} rupees`;
        }
        if (paiseInWords) {
            result += ` and ${paiseInWords} paise`;
        }

        return result.trim() !== "" ? result.trim() + " Only" : "";
    }

    return (
        <div ref={ref} style={{ zoom: 0.8 }} className="mx-[10px] my-[10px] p-[10px]">
            <div className={styles.itemsList}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={11}>
                                            <div className="flex justify-left">
                                                <div className="border-r border-black pr-6">
                                                    <span className="font-medium text-[14px]">
                                                        Invoice Date :
                                                    </span>
                                                    <span className="font-semibold text-[16px] pl-2">
                                                        {getFormattedDate(formData?.invoice_date)}
                                                    </span>
                                                </div>
                                                <div className="border-r border-black px-6">
                                                    <span className="font-medium text-[14px]">
                                                        Date of Supply :
                                                    </span>
                                                    <span className="font-semibold text-[16px] pl-2">
                                                        {getFormattedDate(formData?.data_of_supply)}
                                                    </span>
                                                </div>
                                                <div className="pl-6">
                                                    <span className="font-medium text-[14px]">
                                                        Place of Supply :
                                                    </span>
                                                    <span className="font-semibold text-[16px] pl-2">
                                                        {formData?.place_of_supply}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={highlightedRows}>
                                        <TableCell colSpan={11}>
                                            <div className="flex justify-between items-center gap-4 flex-nowrap">
                                                <div className="flex-1" />
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
                                            <div className="text-left font-medium mb-1 text-[18px]">
                                                Source of supply:
                                            </div>
                                            <div className="text-left text-xl font-semibold">
                                                {formData?.company_name || ""}
                                            </div>
                                            <AddressComponent address_type="company" formData={formData} />
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={4}>
                                            <div className="text-left font-medium mb-1 text-[18px]">
                                                Customer Details:
                                            </div>
                                            <div className="text-left text-[18px] mb-1">{formData?.customer_name || ""}</div>
                                            <div className="text-left font-medium mb-1 text-[18px]">Billing Address:</div>
                                            <AddressComponent address_type="customer" formData={formData} />
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'top' }} colSpan={3}>
                                            <div className="text-left font-medium mb-1 text-[18px]">
                                                Shipping Address:
                                            </div>
                                            <AddressComponent address_type="shipping" formData={formData} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={highlightedRows}>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>#</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>Name of Product</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>QTY</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>Unit</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>Rate</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>Taxable Value</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} colSpan={2}>CGST</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} colSpan={2}>SGST</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }} rowSpan={2}>Total</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }}>Rate</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }}>Amount</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }}>Rate</TableCell>
                                        <TableCell sx={{ ...highlightedRows, fontSize: '16px' }}>Amount</TableCell>
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
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600 }} colSpan={3}>Total Quantity</TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600 }} colSpan={2}>
                                            <div className="text-center">
                                                {getTotalQuantity()}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600 }}>
                                            ₹ {get_Total_taxable_value()}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600 }} colSpan={2}>
                                            ₹ {get_all_items_gst("cgst")}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600 }} colSpan={2}>
                                            ₹ {get_all_items_gst("sgst")}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600 }}>
                                            ₹ {get_all_items_total_after_taxes()}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={11}>
                                            <div className="text-left text-[14px] text-pretty">
                                                Total amount (in words):
                                                <span className="font-semibold text-[16px] pl-2">
                                                    {convertRupeesPaise(get_all_items_total_after_taxes())}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5} rowSpan={4}>
                                            <BankComponent formData={formData} />
                                        </TableCell>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            <div className="text-left font-medium text-[16px]">
                                                Total Amount Before Tax
                                            </div>
                                        </TableCell>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            <div className="text-left font-medium text-[16px]">
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
                                            <div className="text-left font-medium text-[16px]">
                                                Total Amount
                                            </div>
                                        </TableCell>
                                        <TableCell sx={highlightedRows} colSpan={3}>
                                            <div className="text-left font-medium text-[16px]">
                                                ₹ {get_all_items_total_after_taxes()}
                                            </div>
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