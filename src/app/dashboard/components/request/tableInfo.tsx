import * as React from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { format } from 'date-fns';
import {ReadRequestByTableDto,requestHeadInfo}  from '@/app/interface/RequestStructure'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Stack from '@mui/joy/Stack';
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import {ModalClose} from "@mui/joy";
import RequestForm from "@/app/dashboard/components/request/formInfo";



function labelDisplayedRows({from, to, count, }: {
    from: number;
    to: number;
    count: number;
}) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

/*function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string | keyof ReadRequestByTableDto },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}*/
function getComparator<Key extends keyof ReadRequestByTableDto>(
    order: Order,
    orderBy: Key,
): (a: ReadRequestByTableDto, b: ReadRequestByTableDto) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ReadRequestByTableDto) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof ReadRequestByTableDto) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <thead>
        <tr>

            {requestHeadInfo.map((headCell,index) => {
                const active = orderBy === headCell.id;
                return (
                    <th
                        key={headCell.id}
                        aria-sort={
                            active
                                ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                                : undefined
                        }
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            underline="none"
                            color="neutral"
                            textColor={active ? 'primary.plainColor' : undefined}
                            component="button"
                            onClick={createSortHandler(headCell.id)}
                            startDecorator={
                                headCell.numeric ? (
                                    <ArrowDownwardIcon
                                        sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                ) : null
                            }
                            endDecorator={
                                !headCell.numeric ? (
                                    <ArrowDownwardIcon
                                        sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                ) : null
                            }
                            sx={{
                                fontWeight: 'lg',

                                '& svg': {
                                    transition: '0.2s',
                                    transform:
                                        active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                },

                                '&:hover': { '& svg': { opacity: 1 } }
                            }}
                        >
                            {headCell.label}
                            {active ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </Link>
                    </th>
                );
            })}
        </tr>
        </thead>
    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Box
            sx={[
                {
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    borderTopLeftRadius: 'var(--unstable_actionRadius)',
                    borderTopRightRadius: 'var(--unstable_actionRadius)',
                },
                numSelected > 0 && {
                    bgcolor: 'background.level1',
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%', fontSize:'2rem' }}
                    id="tableTitle"
                    component="div"

                >
                    Request List
                </Typography>
            )}

        </Box>
    );
}

interface propsRequestDataTable {
    rows : ReadRequestByTableDto[]
}
export default function RequestDataTable(props:propsRequestDataTable) {
    const {rows} = props;
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ReadRequestByTableDto>('id');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [typeView, setTypeView] = React.useState<"view" | "edit" | "new">("view");
    const [selectedRequestId, setSelectedRequestId] = React.useState<number>(0);
    const handleViewClick = (row:number) => {
        setSelectedRequestId(row);
        setIsViewModalOpen(true);
        setTypeView("view")
    };

    const handleUpdateClick = (row:number) => {
        console.log(`Update clicked for ID: ${row}`);
    };

    const handleDeleteClick = (row:number) => {
            console.log(`Delete clicked for ID: ${row}`);

    };


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ReadRequestByTableDto,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.personFullName);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10));
        setPage(0);
    };
    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? rows.length
            : Math.min(rows.length, (page + 1) * rowsPerPage);
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
    <React.Fragment>

        <Sheet
            variant="outlined"
            sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
        >
            <EnhancedTableToolbar numSelected={selected.length}  />
            <Table
                aria-labelledby="tableTitle"
                hoverRow
                sx={{
                    '--TableCell-headBackground': 'transparent',
                    '--TableCell-selectedBackground': (theme) =>
                        theme.vars.palette.success.softBg,
                    '& thead th:nth-of-type(1)': { width: '50px', textAlign: 'left' },
                    '& thead th:nth-of-type(2)': { width: '20%',textAlign: 'left'},
                    '& thead th:nth-of-type(3)': {width: '140px',textAlign: 'center' },
                    '& thead th:nth-of-type(4)': {width: '100px',textAlign: 'center' },
                    '& thead th:nth-of-type(5)': {width: '30%',textAlign: 'left' },
                    '& thead th:nth-of-type(6)': {width: '90px',textAlign: 'right' },
                    '& thead th:nth-of-type(7)': {width: '140px',textAlign: 'center' },
                }}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                />
                <tbody>
                {[...rows]
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const isItemSelected = selected.includes(row.personFullName);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (

                                <tr key={row.id}>
                                    <td id={labelId} scope="row" className="text-left"> &nbsp; {row.id}</td>
                                    <td> {row.personFullName} </td>
                                    <td className="text-center">{format(row.creationDate, 'yyyy/MM/dd')}</td>
                                    <td className="text-center">{row.status}</td>
                                    <td>{row.description}</td>
                                    <td>{row.typePriority}</td>
                                    <td >
                                        <Stack spacing={3} sx={{ alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center',  }}>
                                                <IconButton
                                                    disabled={!row.actions.canView}
                                                    variant="outlined"
                                                    color="primary"
                                                   onClick={() =>{
                                                       handleViewClick(row.id)

                                                   }}
                                                >
                                                    <RemoveRedEyeIcon />
                                                </IconButton>

                                                <IconButton
                                                    disabled={!row.actions.canUpdate}
                                                    variant="outlined"
                                                    color="warning"
                                                    onClick={() =>{ handleUpdateClick(row.id) }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    disabled={!row.actions.canDelete}
                                                    variant="outlined"
                                                    color="danger"
                                                    onClick={() =>{ handleDeleteClick(row.id) }}
                                                >

                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Box>
                                        </Stack>

                                    </td>

                                </tr>


                        );
                    })}
                {emptyRows > 0 && (
                    <tr
                        style={
                            {
                                height: `calc(${emptyRows} * 40px)`,
                                '--TableRow-hoverBackground': 'transparent',
                            } as React.CSSProperties
                        }
                    >
                        <td colSpan={6} aria-hidden />
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'flex-end',
                            }}
                        >
                            <FormControl orientation="horizontal" size="sm">
                                <FormLabel>Rows per page:</FormLabel>
                                <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={25}>25</Option>
                                </Select>
                            </FormControl>
                            <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
                                {labelDisplayedRows({
                                    from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                    to: getLabelDisplayedRowsTo(),
                                    count: rows.length === -1 ? -1 : rows.length,
                                })}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton
                                    size="sm"
                                    color="neutral"
                                    variant="outlined"
                                    disabled={page === 0}
                                    onClick={() => handleChangePage(page - 1)}
                                    sx={{ bgcolor: 'background.surface' }}
                                >
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    color="neutral"
                                    variant="outlined"
                                    disabled={
                                        rows.length !== -1
                                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                            : false
                                    }
                                    onClick={() => handleChangePage(page + 1)}
                                    sx={{ bgcolor: 'background.surface' }}
                                >
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </td>
                </tr>
                </tfoot>
            </Table>
        </Sheet>

    <RequestForm
        open={isViewModalOpen}
        idRequest={selectedRequestId}
        typeForm={typeView}
    />

    </React.Fragment>

    );







}






