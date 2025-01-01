export default function AddressComponent({ address_type }) {
    const address = {
        'doorNo': '11-2-284',
        'landmark': 'Beside ALHAMDULILLAH Hotel',
        'street': 'Near HABEEB Nagar PS',
        'area': 'NAMPALLY',
        'city': 'HYDERABAD',
        'state': 'Telengana',
        'country': 'IN',
        'pincode': '500001',
        'phone': '8534099966',
        'email': 'syamkumar6845@gmail.com',
        'gstin': '36BLAPJ5919F1Z7',
        'pan': 'BLAPJ5919F'
    }

    return (
        <address className="mb-3">
            <div className="my-2">
                {`${address?.doorNo}, ${address?.landmark}, ${address?.street}, ${address?.area}, ${address?.state}, ${address?.pincode}, ${address?.city}, ${address?.country}`}
            </div>
            {
                address_type !== "shipping" && (
                    <div>
                        <div className="mt-3">
                            Ph: <span className="font-semibold pl-2">8534099966</span><br />
                            Email: <span className="font-semibold pl-2">syamkumar6845@gmail.com</span>
                        </div>
                        <div className="mt-3">
                            GSTIN: <span className="font-semibold pl-2">36BLAPJ5919F1Z7</span><br />
                            PAN No: <span className="font-semibold pl-2">BLAPJ5919F</span>
                        </div>
                    </div>
                )
            }
        </address>
    );
}