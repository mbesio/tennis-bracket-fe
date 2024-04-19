import React from 'react'

const Dropdown = ({ title, label, options, handleChange }) => {
  // console.log('title ', title)
  // console.log('options ', options)
  return (
    <select
      onChange={(event) => handleChange(event, label)}
      disabled={options.length < 2}
    >
      <option value="">{title}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          label={
            !option.seed
              ? `${option.value}`
              : `(${option.seed}) ${option.value}`
          }
        ></option>
      ))}
    </select>
  )
}

export default Dropdown
