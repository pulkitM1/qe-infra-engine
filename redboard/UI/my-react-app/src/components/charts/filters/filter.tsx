// FilterDropdown.tsx

import React, { useState } from 'react';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';

const { Option } = components;
const AnimatedMulti = makeAnimated();

const CustomOption = (props) => (
  <Option {...props}>
    <input type="checkbox" checked={props.isSelected} onChange={() => null} />{' '}
    <label>{props.label}</label>
  </Option>
);

const FilterDropdown = ({ handleFilterChange }) => {
    const options = [
        {
          label: 'Category A',
          options: [
            { value: 'Category A', label: 60 },
            { value: 'Subcategory A2', label: 'Subcategory A2' },
          
          ],
        },
        {
          label: 'Category B',
          options: [
            { value: 'Subcategory B1', label: 'Subcategory B1' },
            { value: 'Subcategory B2', label: 'Subcategory B2' },
           
          ],
        },
        {
            label: 'Category E',
            options: [
              { value: 'Subcategory B1', label: 'Subcategory B1' },
              { value: 'Subcategory B2', label: 'Subcategory B2' },
            
            ],
          },
          {
            label: 'Category R',
            options: [
              { value: 'Subcategory R1', label: 'Subcategory R1' },
              { value: 'Subcategory R3', label: 'Subcategory R4' },
             
            ],
          },
          {
              label: 'Category C',
              options: [
                { value: 'Subcategory B1', label: 'Subcategory B1' },
                { value: 'Subcategory B2', label: 'Subcategory B2' },
               
              ],
            },{
                label: 'Category D',
                options: [
                  { value: 'Subcategory B1', label: 'Subcategory B1' },
                  { value: 'Subcategory B2', label: 'Subcategory B2' },
                 
                ],
              },
              {
                  label: 'Category E',
                  options: [
                    { value: 'Subcategory B1', label: 'Subcategory B1' },
                    { value: 'Subcategory B2', label: 'Subcategory B2' },
                   
                  ],
                },
        
        // Add more categories as needed
      ];
  
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black',
        backgroundColor: state.isSelected ? 'blue' : 'white',
        borderBottom: '1px solid black',
      }),
    };
  
    return (
      <Select
        closeMenuOnSelect={false}
        components={{ Option: CustomOption, ...AnimatedMulti }}
        isMulti
        options={options}
        onChange={(selectedOptions) => handleFilterChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
        placeholder="Select filters..."
        styles={customStyles}
      />
    );
  };
  
export default FilterDropdown;