import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import formFields from "./../public/data/invoiceFields.json";
import CompoenentRender from "./ComponentRender";
import { ChevronDown, CirclePlus, Trash2 } from "lucide-react";

export default function InvoiceForm({ formData, setFormData }) {
    const accordionStyles = {
        border: '1px solid #f6f6f6',
        backgroundColor: '#f6f6f6'
    };

    const itemFields = {
        "item_id": "",
        "item_name": "",
        "quantity": "",
        "units": "",
        "price": "",
        "cgst": "",
        "sgst": ""
    }

    const addItem = () => {
        let temp = formData?.itemsList || [];
        temp.push({ ...itemFields, "item_id": formData?.itemsList?.length + 1 });
        setFormData({ ...formData, temp })
    }

    const handleDeleteItem = (itemId) => {
        let temp = formData?.itemsList?.filter((item) => item?.item_id !== itemId);
        setFormData({ ...formData, "itemsList": temp })
    }

    const handleItemEdit = (itemId, field, value) => {
        let temp = formData?.itemsList?.map((item) => {
            if (item?.item_id === itemId) {
                item[field] = value;
            }
            return item;
        })
        setFormData({ ...formData, "itemsList": temp })
    }

    return (
        <div>
            <Accordion sx={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className="text-[16px] font-semibold tracking-wide">
                        Invoice Metadata
                    </div>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
            <Accordion sx={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <div className="text-[16px] font-semibold tracking-wide">
                        Company Details
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-wrap justify-center items-center gap-[10px]">
                        {
                            Object.keys(formFields["Company Details"]).map((field, ind) => {
                                return (
                                    <div key={ind} className="grow">
                                        <CompoenentRender setFormData={setFormData} formData={formData} componentName={field} componentData={formFields["Company Details"][field]} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <div className="text-[16px] font-semibold tracking-wide">
                        Customer Address Details
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-wrap justify-center items-center gap-[10px]">
                        {
                            Object.keys(formFields["Customer Details"]).map((field, ind) => {
                                return (
                                    <div key={ind} className="grow">
                                        <CompoenentRender setFormData={setFormData} formData={formData} componentName={field} componentData={formFields["Customer Details"][field]} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <div className="text-[16px] font-semibold tracking-wide">
                        Bank Details
                    </div>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded sx={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ChevronDown />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <div className="text-[16px] font-semibold tracking-wide">
                        Add Items
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="overflow-auto my-4">
                        {
                            (formData?.itemsList && formData?.itemsList?.length === 0) ? (
                                <div className="font-medium text-center">
                                    No items added.
                                </div>
                            ) : (
                                (formData?.itemsList || []).map((item, index) => {
                                    return (
                                        <div key={index} className="flex items-end flex-nowrap gap-4 mb-8">
                                            <div className="cursor-pointer bg-red-100 hover:bg-red-200 rounded-full p-2" onClick={() => handleDeleteItem(item?.item_id || index + 1)}>
                                                <Trash2 color="red" />
                                            </div>
                                            <div className="text-xl font-medium pb-2">
                                                {item?.item_id || index + 1}.
                                            </div>
                                            {
                                                Object.keys(item).map((field, ind) => {
                                                    return (
                                                        field !== "item_id" && (
                                                            <div key={field} className="grow">
                                                                <div>
                                                                    <label htmlFor={field || ""} className="font-medium text-[14px]">
                                                                        {formFields["Item Details"][field].label}
                                                                    </label>
                                                                    <br />
                                                                    <input id={field || ""}
                                                                        className="w-[100%] border border-black rounded-sm px-[10px] py-[6px] text-[14px] min-w-[200px]"
                                                                        type={formFields["Item Details"][field]?.data_type}
                                                                        placeholder={formFields["Item Details"][field]?.placeholder}
                                                                        value={item[field] || ""}
                                                                        onChange={(e) => handleItemEdit(item?.item_id || index + 1, field, e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                    <Button variant="contained" startIcon={<CirclePlus />} sx={{ textTransform: 'none' }} onClick={() => addItem()}>
                        Add item
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}