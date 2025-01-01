export default function CompoenentRender({ componentName, componentData, setFormData, formData }) {
    return (
        <div>
            {
                (componentData.component_type === "input") && (
                    <div>
                        <label className="font-medium text-[14px]">
                            {componentData.label}
                        </label>
                        <br />
                        <input
                            className="w-[100%] border border-black rounded-sm px-[10px] py-[6px] text-[14px]"
                            type={componentData?.data_type}
                            placeholder={componentData?.placeholder}
                            name={componentName}
                            value={formData[componentName]}
                            onChange={(e) => setFormData({ ...formData, [componentName]: e.target.value })}
                        />
                    </div>
                )
            }
        </div>
    );
}