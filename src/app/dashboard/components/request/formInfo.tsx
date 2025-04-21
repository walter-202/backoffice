"use client"
import React, {useEffect, useState} from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import {ModalClose} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import TabPanel from '@mui/joy/TabPanel';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Search from '@mui/icons-material/Search';
import Person from '@mui/icons-material/Person';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
interface typeLoad {
    type : "view" | "edit" | "new";
}
interface FormRequestProps{
    idRequest  : number ,
    typeForm : string,
}
function FormInfo(props : FormRequestProps ) {

    const urlEndpoint = 'http://localhost:12099/request/forTableList'
    const [request, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error , setError] = useState(null);
    const [index, setIndex] = React.useState(0);
    const colors = ['primary', 'danger', 'success', 'warning'] as const;


    useEffect(() => {
        const fetchRequests = async () => {
            try {

                const response = await fetch(urlEndpoint, {
                    headers: { 'Content-Type': 'application/json',},
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setRequests(data);

                setLoading(false);
            } catch (e:any) {
                setError(e);
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <p>Loading requests...</p>;
    }

    if (error) {
        return <p>Error fetching requests: {error}</p>;
    }


    return (
        <Box
            sx={{
                flexGrow: 1,
                m: -3,
                p: 4,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                bgcolor: `${'var(--colors-index)'}.500`,
            }}
            style={{ '--colors-index': colors[index] } as any}
        >
            <Tabs
                size="lg"
                aria-label="Bottom Navigation"
                value={index}
                onChange={(event, value) => setIndex(value as number)}
                sx={(theme) => ({
                    p: 1,
                    borderRadius: 16,
                    maxWidth: '90%',
                    mx: 'auto',
                    boxShadow: theme.shadow.sm,
                    '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
                    [`& .${tabClasses.root}`]: {
                        py: 1,
                        flex: 1,
                        transition: '0.3s',
                        fontWeight: 'md',
                        fontSize: 'md',
                        [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                            opacity: 0.7,
                        },
                    },
                })}
            >
                <TabList
                    variant="plain"
                    size="sm"
                    disableUnderline
                    sx={{ borderRadius: 'lg', p: 0 }}
                >
                    <Tab
                        disableIndicator
                        orientation="vertical"
                        {...(index === 0 && { color: colors[0] })}
                    >
                        <ListItemDecorator>
                            <HomeRoundedIcon />
                        </ListItemDecorator>
                        Basic Request Info
                    </Tab>
                    <Tab
                        disableIndicator
                        orientation="vertical"
                        {...(index === 1 && { color: colors[1] })}
                    >
                        <ListItemDecorator>
                            <FavoriteBorder />
                        </ListItemDecorator>
                        Request Service's Details
                    </Tab>
                    <Tab
                        disableIndicator
                        orientation="vertical"
                        {...(index === 2 && { color: colors[2] })}
                    >
                        <ListItemDecorator>
                            <Search />
                        </ListItemDecorator>
                        Summary
                    </Tab>

                </TabList>
                <Box
                    sx={(theme) => ({
                        '--bg': theme.vars.palette.background.surface,
                        background: 'var(--bg)',
                        boxShadow: '0 0 0 100vmax var(--bg)',
                        clipPath: 'inset(0 -100vmax)',

                    })}
                >
                    <TabPanel value={0} >
                        <div className=" place-content-center flex pt-8">
                            <AccordionGroup
                                sx={{
                                    maxWidth: "100%",
                                    [`& .${accordionSummaryClasses.indicator}`]: {
                                        transition: '0.3s',
                                    },
                                    [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                                        transform: 'rotate(45deg)',
                                    },
                                }}
                                transition={{
                                 initial: "0.3s ease-out",
                                 expanded: "0.2s ease",
                                 }}
                            >
                                <Accordion
                                    className=""
                                >
                                    <AccordionSummary indicator={<AddIcon />} className="bg-blue-300 "
                                    sx={{ borderRadius: '0.75rem' , color: 'white', marginY: '10px' }}
                                    >
                                        User Info
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <div   className="flex flex-wrap">
                                            <FormControl defaultValue="" required >
                                                <Label>Name</Label>
                                                <StyledInput placeholder="Write your name here" />
                                                <HelperText />
                                            </FormControl>
                                            <FormControl defaultValue="" required className="ml-4">
                                                <Label>Name</Label>
                                                <StyledInput placeholder="Write your name here" name=""/>
                                                <HelperText />
                                            </FormControl>
                                            <FormControl defaultValue="" required className="ml-4">
                                                <Label>Name</Label>
                                                <StyledInput placeholder="Write your name here" />
                                                <HelperText />
                                            </FormControl>
                                        </div>

                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        indicator={<AddIcon />} className="bg-blue-300 "
                                        sx={{ borderRadius: '0.75rem' , color: 'white', marginY: '10px' }}
                                    >
                                        Second accordion
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua.
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        indicator={<AddIcon />} className="bg-blue-300 "
                                        sx={{ borderRadius: '0.75rem' , color: 'white', marginY: '10px' }}
                                    >
                                        Third accordion
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua.
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionGroup>

                        </div>

                    </TabPanel>
                    <TabPanel value={1}>Request Service's Details</TabPanel>
                    <TabPanel value={2}>Summary</TabPanel>
                </Box>
            </Tabs>

        </Box>
    );


}
const StyledInput = styled(Input)(
    ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const Label = styled(
    ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const formControlContext = useFormControlContext();
        const [dirty, setDirty] = React.useState(false);

        React.useEffect(() => {
            if (formControlContext?.filled) {
                setDirty(true);
            }
        }, [formControlContext]);

        if (formControlContext === undefined) {
            return <p>{children}</p>;
        }

        const { error, required, filled } = formControlContext;
        const showRequiredError = dirty && required && !filled;

        return (
            <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
                {children}
                {required ? ' *' : ''}
            </p>
        );
    },
)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

export default FormInfo;