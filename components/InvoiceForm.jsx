import formFields from "./../public/data/invoiceFields.json";
import CompoenentRender from "./ComponentRender";

export default function InvoiceForm() {
    console.log(formFields);

    return (
        <div>
            {
                Object.keys(formFields).map((title, index) => {
                    return (
                        <div key={index}>
                            <div>{title}</div>
                            <div className="flex justify-left items-center gap-4 my-4 flex-wrap">
                                {
                                    Object.keys(formFields[title]).map((field, ind) => {
                                        return (
                                            field.includes("address") ? (
                                                <div key={ind}>
                                                    <h3>{field}</h3>
                                                    {
                                                        Object.keys(formFields[title][field]).map((addressField, i) => (
                                                            <div key={i}>
                                                                <CompoenentRender componentName={addressField} componentData={formFields[title][field][addressField]} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (
                                                <CompoenentRender componentName={field} componentData={formFields[title][field]} key={ind} />
                                            )
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}