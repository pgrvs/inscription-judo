import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={23}
        height={18}
        viewBox="0 0 22 18"
        {...props}
    >
        <path
            d="M7.156 18.316 0 10.996l3.262-3.34 3.894 4L18.546 0l3.255 3.336Zm0 0"
            style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "#efefff",
                fillOpacity: 1,
            }}
        />
    </svg>
)
export default SvgComponent