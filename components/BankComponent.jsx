import styles from "./../styles/invoiceStyles.module.css"

export default function BankComponent() {
    const bankDetails = {
        'Account Number': '025063200000070',
        'IFSC Code': 'YESB0000250',
        'Bank Name': 'Yes Bank',
        'Branch': 'BANJARA HILLS, HYDERABAD',
        'For UPI Payment': '8534099966'
    }

    return (
        <div className="border px-4 py-2 border-t-0 border-black">
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