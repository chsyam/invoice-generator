import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

export default function CompoenentRender({ componentName, componentData, setFormData, formData }) {
    const getInputComponent = (componentName, componentData, setFormData, formData) => {
        if (componentData?.data_type === "date") {
            return (
                <div>
                    <label htmlFor={componentName || ""} className="font-medium text-[14px]">
                        {componentData.label}
                    </label>
                    <br />
                    <DatePicker
                        className="w-[100%] border border-black rounded-sm"
                        id={componentName || ""}
                        showIcon
                        icon={<CalendarDays />}
                        dateFormat="dd/MM/yyyy"
                        selected={formData[componentName] || new Date()}
                        onChange={(date) => setFormData({ ...formData, [componentName]: date })}
                    />
                </div>
            )
        } else if (['text', 'number', 'email'].includes(componentData?.data_type)) {
            return (
                <div>
                    <label htmlFor={componentName || ""} className="font-medium text-[14px]">
                        {componentData.label}
                    </label>
                    <br />
                    <input id={componentName || ""}
                        className="w-[100%] border border-black rounded-sm px-[10px] py-[6px] text-[14px] min-w-[200px]"
                        type={componentData?.data_type}
                        placeholder={componentData?.placeholder}
                        value={formData[componentName] || ""}
                        onChange={(e) => setFormData({ ...formData, [componentName]: e.target.value })}
                    />
                </div>
            )
        }
    }

    return (
        <div>
            {
                getInputComponent(componentName, componentData, setFormData, formData)
            }
        </ div>
    );
}