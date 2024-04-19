import React from 'react'
import Select from 'react-select'

const Dropdown = ({ title, label, options, handleChange }) => {
  const transformedOptions = options.map((option) => ({
    value: option.value,
    label: !option.seed
      ? `${option.value}`
      : `(${option.seed}) ${option.value}`,
  }))

  const handleSelectChange = (selectedOption) => {
    handleChange(
      { target: { value: selectedOption ? selectedOption.value : '' } },
      label,
    )
  }
  return (
    <Select
      options={transformedOptions}
      isSearchable
      onChange={handleSelectChange}
      isDisabled={options.length < 2}
      placeholder={title}
    />
  )
}

export default Dropdown
