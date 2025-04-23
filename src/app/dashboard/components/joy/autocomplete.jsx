import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import PropTypes from "prop-types";
import SelectJoy from "./select";

AutocompleteSelect.propTypes = {
    placeholder: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    idName: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
};


export default function AutocompleteSelect(props) {
    const { placeholder,width,idName, rows } = props;
    return (
        <Autocomplete
            id={idName}
            placeholder={placeholder}
            options={rows}
            sx={{ width: width }}
        />
    );
}

