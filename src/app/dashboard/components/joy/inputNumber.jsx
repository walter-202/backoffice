import * as React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';



const NumericFormatAdapter = React.forwardRef(

    function NumericFormatAdapter(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}



                thousandSeparator
                valueIsNumericString
                prefix=""
            />
        );
    },
);

InputNumber.propTypes = {
    name: PropTypes.string.isRequired,
    placerHolder: PropTypes.string.isRequired,
    idName: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    hasError :PropTypes.bool.isRequired,

};

export default function InputNumber(props) {
    const {placerHolder, idName,prefix,width, onChange,hasError} = props;
    const [value, setValue] = React.useState("1.0");
    return (
        <FormControl>
            <Input
                sx={{ width: width, textAlign:"center"  }}
                id={idName} color={props.hasError ? 'danger' : 'neutral'}
                value={value}
                onChange={onChange}
                placeholder={placerHolder}
                slotProps={{
                    input: {
                        component: NumericFormatAdapter,
                        name: props.name,
                        prefix: prefix
                    },
                }}
            />
        </FormControl>
    );
}
