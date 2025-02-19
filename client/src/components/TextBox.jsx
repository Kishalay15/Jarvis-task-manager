import React from "react";
import clsx from "clsx";
import PropTypes from 'prop-types';

const TextBox = React.forwardRef(
    ({ type, placeholder, label, className, register, name, error }, ref) => {
        return (
            <div className='w-full flex flex-col gap-1'>
                {label && (
                    <label htmlFor={name} className='text-slate-800'>
                        {label}
                    </label>
                )}
                <div>
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        ref={ref}
                        {...register}
                        aria-invalid={error ? "true" : "false"}
                        className={clsx(
                            "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
                            className
                        )}
                    />
                </div>
                {error && (
                    <span className='text-xs text-[#f64949fe] mt-0.5 '>{error}</span>
                )}
            </div>
        );
    }
);

TextBox.displayName = 'TextBox';

TextBox.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    register: PropTypes.object,
    name: PropTypes.string,
    error: PropTypes.string
};

TextBox.defaultProps = {
    type: 'text',
    placeholder: '',
    className: ''
};

export default TextBox;
