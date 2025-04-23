import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from "prop-types";



SelectJoy.propTypes = {
    placeholder: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    idName: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    defaultValue : PropTypes.string.isRequired,
    onChange: PropTypes.func,
    hasError: PropTypes.bool,
};
export default function SelectJoy(props) {
    const { placeholder,width,idName, rows, defaultValue,onChange, hasError } = props;
    return (
        <Select id={idName} onChange={onChange} defaultValue={defaultValue} color={props.hasError ? 'danger' : 'neutral'}
            placeholder={placeholder} indicator={<KeyboardArrowDown />} sx={{
        width: {width},
            [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                transform: 'rotate(-180deg)',
            },
        },
    }} >
            <Option value="0">Select an option</Option>
            {rows.map( (row,index) => {
                return <Option key={row.key} value={row.key} >{row.value}</Option>
            })}


    </Select>
);
}
