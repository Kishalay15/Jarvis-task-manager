import React from "react";

const Loader = ({ size = "md", color = "blue", fullScreen = false }) => {
    // Size variants
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-3",
        lg: "w-16 h-16 border-4"
    };

    // Color variants
    const colorClasses = {
        blue: "border-blue-600",
        green: "border-green-600",
        red: "border-red-600",
        purple: "border-purple-600",
        gray: "border-gray-600"
    };

    const spinnerClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    ${colorClasses[color] || colorClasses.blue}
    rounded-full border-t-transparent animate-spin
  `;

    // Full screen version with overlay
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <div className={spinnerClasses}></div>
                    <p className="mt-4 text-gray-700 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Regular inline loader
    return (
        <div className="flex items-center justify-center">
            <div className={spinnerClasses}></div>
        </div>
    );
};

export default Loader;
