export default function CompoenentRender({ componentName, componentData }) {
    console.log(componentName, componentData);

    return (
        <div>
            {
                (componentData.component_type === "input") && (
                    <div>
                        <label className="font-medium text-[14px]">
                            {componentData.label}
                        </label><br />
                        <input className="border border-black rounded-sm px-[10px] py-[6px] text-[14px] min-w-[250px]" type={componentData?.type} placeholder={componentData?.placeholder} />
                    </div>
                )
            }
        </div>
    );
}