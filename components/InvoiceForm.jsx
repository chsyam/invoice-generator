import formFields from "./../public/data/invoiceFields.json";
import CompoenentRender from "./ComponentRender";

export default function InvoiceForm({ formData, setFormData }) {
    return (
        <div>
            <div className="my-[30px]">
                <div className="text-xl font-semibold tracking-wide my-2">
                    Invoice Metadata
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                    {
                        Object.keys(formFields["Invoice Metadata"]).map((field, ind) => {
                            return (
                                <div key={field} className="flex-grow">
                                    <CompoenentRender setFormData={setFormData} formData={formData} componentName={field} componentData={formFields["Invoice Metadata"][field]} key={ind} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="my-[30px]">
                <div className="text-xl font-semibold tracking-wide my-2">
                    Bank Details
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                    {
                        Object.keys(formFields["Bank Details"]).map((field, ind) => {
                            return (
                                <div key={field} className="grow">
                                    <CompoenentRender setFormData={setFormData} formData={formData} componentName={field} componentData={formFields["Bank Details"][field]} key={ind} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* {
                Object.keys(formFields).map((title, index) => {
                    return (
                        <div key={index}>

                            <div className="text-xl font-semibold tracking-wide">{title}</div>
                            <div className="flex justify-center items-center gap-4 my-4 flex-wrap">
                                {
                                    Object.keys(formFields[title]).map((field, ind) => {
                                        return (
                                            field.includes("address") ? (
                                                <div className="flex-1" key={ind}>
                                                    <div className="text-md font-medium">{field}</div>
                                                    <div className="flex flex-wrap">
                                                        {
                                                            Object.keys(formFields[title][field]).map((addressField, i) => (
                                                                <div key={i}>
                                                                    <CompoenentRender componentName={addressField} componentData={formFields[title][field][addressField]} />
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex-1">
                                                    <CompoenentRender componentName={field} componentData={formFields[title][field]} key={ind} />
                                                </div>
                                            )
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            } */}
        </div>
    );
}