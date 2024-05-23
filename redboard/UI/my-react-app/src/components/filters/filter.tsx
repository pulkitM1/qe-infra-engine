/**
 * FilterDropdown Component
 * 
 * This component renders a dropdown menu for filters. It allows multiple selections
 * and the selected options are highlighted. The dropdown menu is scrollable if the
 * list of options exceeds the maximum height.
 * 
 * @author Pulkit Matta
 * @company Couchbase
 */

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';

// Constants for dropdown menu styling
const ITEM_HEIGHT = 48; 
const ITEM_PADDING_TOP = 8;

// Props for the dropdown menu
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10.5 + ITEM_PADDING_TOP, 
      width: 'auto', 
      maxWidth: '80%',
    },
  },
};

// Type definitions for props
interface Filter {
  heading: string;
  options: string[];
}

interface FilterDropdownProps {
  initialSelectedOptions?: string[]; 
  onFilterChange?: (selectedOptions: string[]) => void; 
}

// Helper function to get styles for selected options
function getStyles(name: string, selectedOptions: string[], theme: Theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(name) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}


FilterDropdown.defaultProps = {
  filters: [],
};

// Main component
export default function FilterDropdown({ initialSelectedOptions = [], onFilterChange, disabled, filters }: FilterDropdownProps) {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = React.useState(initialSelectedOptions);
  const [tempSelectedOptions, setTempSelectedOptions] = React.useState(initialSelectedOptions); 


  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setTempSelectedOptions(event.target.value); 
  };

 
  const handleClose = () => {
    if (JSON.stringify(tempSelectedOptions.sort()) !== JSON.stringify(selectedOptions.sort())) {
      setSelectedOptions(tempSelectedOptions); 
      const selectedFilters = filters.map(filter => ({
        filter: filter.filter,
        subfilters: tempSelectedOptions.filter(option => filter.subfilters.includes(option))
      }));
  
      if (onFilterChange) {
        onFilterChange(selectedFilters);
      }
    }
  };

  // Render component
  return (
    <div>
      <FormControl sx={{ m: 1, width: '180px' , height: '10px'}}> 
        <Select
          multiple
          displayEmpty
          value={tempSelectedOptions} 
          onChange={handleChange}
          onClose={handleClose} 
          input={<Input style={{ padding: '0px 10px', outline: 'none' }} />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ fontStyle: 'normal' }}>Filters</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Filter options' }}
          disabled={disabled}
        >
   {filters && filters.map((filter, index) => [
  <ListSubheader key={index} style={{ textAlign: 'center' }}>{filter.filter}</ListSubheader>,
  filter.subfilters && filter.subfilters.map((option) => (
    <MenuItem key={option} value={option} style={{ ...getStyles(option, tempSelectedOptions, theme), display: 'flex', overflowX: 'auto',  whiteSpace: 'nowrap', justifyContent: 'center' }}>
      {option}
    </MenuItem>
  )),
])}
        </Select>
      </FormControl>
    </div>
  );
}
