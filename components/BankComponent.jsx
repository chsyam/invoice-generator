import styles from "./../styles/invoiceStyles.module.css"

export default function BankComponent({ formData }) {
    const bankDetails = {
        'Account Number': formData?.account_number,
        'IFSC Code': formData?.ifsc_code,
        'Bank Name': formData?.bank_name,
        'Branch': formData?.branch_name,
        'For UPI Payment': formData?.upi_payment_mobile_number
    }

    return (
        <div className="">
            {
                Object.keys(bankDetails).map((key, index) => {
                    return (
                        <div key={index} className="flex gap-4 my-2">
                            <div className={styles.key}>{key}</div>
                            <div className="font-semibold">: {bankDetails[key]}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}