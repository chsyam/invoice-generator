export default function AddressComponent({ address_type, formData }) {
    return (
        <div>
            {
                address_type === "company" && (
                    <address className="mb-3">
                        <div className="my-2">
                            {formData?.company_plot_number && `${formData?.company_plot_number},`}
                            {formData?.company_street && `${formData?.company_street},`}
                            {formData?.company_landmark && `${formData?.company_landmark},`}
                            {formData?.company_area && `${formData?.company_area},`}
                            {formData?.company_city && `${formData?.company_city},`}
                            {formData?.company_state && `${formData?.company_state},`}
                            {formData?.company_pincode && `${formData?.company_pincode}.`}
                        </div>
                        {
                            <div>
                                <div className="mt-3">
                                    {
                                        formData?.company_phone_number && (
                                            <div>
                                                Ph: <span className="font-semibold pl-2">{formData?.company_phone_number}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        formData?.company_email && (
                                            <div>
                                                Email: <span className="font-semibold pl-2">{formData?.company_email}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mt-3">
                                    {
                                        formData?.company_PAN && (
                                            <div>
                                                GSTIN: <span className="font-semibold pl-2">{formData?.company_PAN}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        formData?.company_GSTIN && (
                                            <div>
                                                GSTIN: <span className="font-semibold pl-2">{formData?.company_GSTIN}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </address>
                )
            }
            {
                address_type === "customer" && (
                    <address className="mb-3">
                        <div className="my-2">
                            {formData?.customer_plot_number && `${formData?.customer_plot_number},`}
                            {formData?.customer_street && `${formData?.customer_street},`}
                            {formData?.customer_landmark && `${formData?.customer_landmark},`}
                            {formData?.customer_area && `${formData?.customer_area},`}
                            {formData?.customer_city && `${formData?.customer_city},`}
                            {formData?.customer_state && `${formData?.customer_state},`}
                            {formData?.customer_pincode && `${formData?.customer_pincode}.`}
                        </div>
                        {
                            <div>
                                <div className="mt-3">
                                    {
                                        formData?.customer_phone_number && (
                                            <div>
                                                Ph: <span className="font-semibold pl-2">{formData?.customer_phone_number}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        formData?.customer_email && (
                                            <div>
                                                Email: <span className="font-semibold pl-2">{formData?.customer_email}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mt-3">
                                    {
                                        formData?.customer_PAN && (
                                            <div>
                                                GSTIN: <span className="font-semibold pl-2">{formData?.customer_PAN}</span>
                                            </div>
                                        )
                                    }
                                    {
                                        formData?.customer_GSTIN && (
                                            <div>
                                                GSTIN: <span className="font-semibold pl-2">{formData?.customer_GSTIN}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </address>
                )
            }
            {
                address_type === "shipping" && (
                    <address className="mb-3">
                        {formData?.shipping_plot_number && `${formData?.shipping_plot_number},`}
                        {formData?.shipping_landmark && `${formData?.shipping_landmark},`}
                        {formData?.shipping_street && `${formData?.shipping_street},`}
                        {formData?.shipping_state && `${formData?.shipping_area},`}
                        {formData?.shipping_pincode && `${formData?.shipping_pincode},`}
                        {formData?.shipping_city && `${formData?.shipping_city}`}
                    </address>
                )
            }
        </div>
    );
}