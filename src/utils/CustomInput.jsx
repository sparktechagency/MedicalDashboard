/* eslint-disable react/prop-types */
import { Input } from "antd";

const CustomInput = ({ icon: Icon, label, placeholder, className, type = "text", isPassword = false, borderStyle = "solid", borderColor = "#48B1DB", borderWidth = "1px", borderRadius = "8px", ...rest }) => {
  return (
    <div className="w-full">
      {/* Dynamic Label */}
      {label && <label className="block mb-2 text-gray-700 text-sm font-medium">{label}</label>}
      
      <div className="relative">
        {/* Use Input.Password if isPassword is true */}
        {isPassword ? (
          <Input.Password
            prefix={Icon && <Icon className="text-[#48B1DB] text-xl " />} // Dynamic icon
            placeholder={placeholder || "Enter password"} // Dynamic placeholder
            className={`w-full px-4 py-2 text-[16px] text-gray-700 rounded-lg ${borderStyle} border-${borderWidth} border-${borderColor} bg-white ${className}`}
            style={{
              borderRadius: borderRadius, // Apply border-radius
            }}
            {...rest} // Additional props
          />
        ) : (
          <Input
            prefix={Icon && <Icon className="text-[#48B1DB] text-xl " />} // Dynamic icon
            placeholder={placeholder || "Enter value"} // Dynamic placeholder
            className={`w-full px-4 py-2 text-[16px] text-gray-700 rounded-lg ${borderStyle} border-${borderWidth} border-${borderColor} bg-white ${className}`}
            type={type} // Default input type
            style={{
              borderRadius: borderRadius, // Apply border-radius
            }}
            {...rest} // Additional props
          />
        )}
      </div>
    </div>
  );
};

export default CustomInput;
