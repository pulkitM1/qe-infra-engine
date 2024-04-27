import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';

const ITEM_HEIGHT = 48; 
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, 
      width: 150, 
    },
  },
};

interface Filter {
  heading: string;
  options: string[];
}

interface FilterDropdownProps {
  initialSelectedOptions?: string[]; 
  onFilterChange?: (selectedOptions: string[]) => void; // Add this line
}

const filters: Filter[] = [
  { heading: 'OS', options: ['Debian', 'Centos','Red Hat'] },
  { heading: 'Pool ID', options: ['Regression', 'Magma', 'Failover'] },
];

function getStyles(name: string, selectedOptions: string[], theme: Theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(name) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function FilterDropdown({ initialSelectedOptions = [], onFilterChange }: FilterDropdownProps) {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = React.useState(initialSelectedOptions);
  const [tempSelectedOptions, setTempSelectedOptions] = React.useState(initialSelectedOptions); // Temporary state

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setTempSelectedOptions(event.target.value); 
  };

  const handleClose = () => {

    if (JSON.stringify(tempSelectedOptions.sort()) !== JSON.stringify(selectedOptions.sort())) {
      setSelectedOptions(tempSelectedOptions); 
      const selectedFilters = filters.map(filter => ({
        filter: filter.heading,
        subfilters: tempSelectedOptions.filter(option => filter.options.includes(option))
      }));
    
      if (onFilterChange) {
        onFilterChange(selectedFilters);
      }
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '150px' , height: '10px'}}> 
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
        >
     
          {filters.map((filter, index) => [
            <ListSubheader key={index} style={{ textAlign: 'center' }}>{filter.heading}</ListSubheader>,
            filter.options.map((option) => (
              <MenuItem key={option} value={option} style={{ ...getStyles(option, tempSelectedOptions, theme), display: 'flex', justifyContent: 'center' }}>
                {option}
              </MenuItem>
            )),
          ])}
        </Select>
      </FormControl>
    </div>
  );
}
