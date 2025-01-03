export default function BankComponent({ formData }) {
    const bankDetails = {
        'Account Number': formData?.account_number,
        'IFSC Code': formData?.ifsc_code,
        'Bank Name': formData?.bank_name,
        'Branch': formData?.branch_name,
        'For UPI Payment': formData?.upi_payment_mobile_number
    }

    return (
        <div>
            {
                Object.keys(bankDetails).map((key, index) => {
                    return (
                        <div key={index} className="flex gap-2 my-2">
                            <div className="text-[14px] font-medium">{key}:</div>
                            <div className="text-[16px] font-semibold">{bankDetails[key]}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}