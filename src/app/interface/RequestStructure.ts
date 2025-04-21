
export enum TextAlign {
    Right = 'right',
    Left = 'left',
    Center = 'center',
    Inherit = 'inherit',
    Justify = 'justify',
}
export interface ReadRequestByTableDto {
    id: number;
    personFullName : string;
    creationDate : Date;
    status : string;
    description : string;
    typePriority : string;
    actions : actions
}
interface actions {
    canView: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}
export interface headStructure {
    id: keyof ReadRequestByTableDto,
    numeric: boolean,
    disablePadding: boolean,
    label: string,
    align: TextAlign;
}


export let requestHeadInfo : headStructure[] = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "#",
        align: TextAlign.Center,
    }, {
        id: "personFullName",
        numeric: false,
        disablePadding: true,
        label: "Person Name",
        align: TextAlign.Center,
    }, {
        id: "creationDate",
        numeric: false,
        disablePadding: true,
        label: "Creation Date",
        align: TextAlign.Center,
    }, {
        id: "status",
        numeric: false,
        disablePadding: true,
        label: "Status",
        align: TextAlign.Center,
    },{
        id: "description",
        numeric: false,
        disablePadding: true,
        label: "Description",
        align: TextAlign.Center,
    }, {
        id: "typePriority",
        numeric: false,
        disablePadding: true,
        label: "Priority",
        align: TextAlign.Center,
    },{
        id: "actions",
        numeric: false,
        disablePadding: true,
        label: "actions",
        align: TextAlign.Center,
    },
]



