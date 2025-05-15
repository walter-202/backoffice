"use client";
import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem as MuiMenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useTheme } from '@mui/material/styles';
import {bgcolor} from "@mui/system";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const port = process.env.NEXT_PUBLIC_PORT;
const urlEndpoint = `${baseUrl}:${port}/request/forTableList`;



const EditableText = ({
                          value,
                          onChange,
                          className,
                      }: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
}) => {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const iconColor = isDarkMode ? 'text-gray-400' : 'text-muted-foreground';
    const inputBg = isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black';
    const inputBorder = isDarkMode ? 'border-zinc-700' : 'border-gray-300';

    return editing ? (
        <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => {
                onChange(tempValue);
                setEditing(false);
            }}
            autoFocus
            className={`${inputBg}  ${className}`}
        />
    ) : (
        <div className={`flex items-center gap-2 cursor-pointer ${textColor}`} onClick={() => setEditing(true)}>
            <span className={className}>{value}</span>
            <Pencil className={`w-3 h-3 ${iconColor}`} />
        </div>
    );
};

interface ContactFormProps {
    openRecivied: boolean;
    idContact: number;
    onCloseAction: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ openRecivied, idContact, onCloseAction }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [open, setOpen] = useState(openRecivied);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const iconColor = isDarkMode ? 'text-gray-400' : 'text-muted-foreground';
    const inputBg = isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-600 hover:text-white' : 'bg-white text-black ';
    const inputBorder = isDarkMode ? 'border-zinc-700' : 'border-gray-300';
    const buttonBg = isDarkMode ? 'bg-zinc-800' : 'bg-white';

    // Datos de contacto (simulados por ahora)
    const [name, setName] = useState("Rosalinda V Rodriguez");
    const [contact, setContact] = useState("Jorge Rodriguez");
    const [address, setAddress] = useState("1102 Choate Cir Houston, TX 77017");
    const [phones, setPhones] = useState(["832-926-8199", "713-454-1834"]);
    const [emails, setEmails] = useState(["rosard19@gmail.com", "esperjoseph4@gmail.com"]);
    const [newNote, setNewNote] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [manager, setManager] = useState("None");
    const [list, setList] = useState("Houston - Jimmy");
    const [notes, setNotes] = useState([
        "(Segundo intento) Sí tiene el techo mal pero no tiene plata.",
        "Ya se conversó con el señor Luis y comenta que lo ve complicado. Paso al siguiente.",
        "Cliente sin presupuesto disponible, verificar en 2 semanas.",
        "Llamada no atendida, reintentar mañana a las 3pm.",
        "Solicita más detalles antes de agendar visita.",
        "Solicita más detalles antes de agendar visita.",
        "Solicita más detalles antes de agendar visita.",
        "Solicita más detalles antes de agendar visita.",
        "Solicita más detalles antes de agendar visita.",
        "Solicita más detalles antes de agendar visita.",
        "Solicita más detalles antes de agendar visita.",
        "Enviar presupuesto detallado por correo."
    ]);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setOpen(false);
        onCloseAction();
    };

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([newNote, ...notes]);
            setNewNote("");
        }
    };

    useEffect(() => {
        setLoading(true);
        if (!idContact || idContact === 0) return;

        const fetchData = async () => {
            try {
                const response = await fetch(urlEndpoint, {
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                // TODO: usar los datos para setear los states como setName, setContact...
                console.log("Fetched contact:", data);

                setLoading(false);
            } catch (e: any) {
                setError(e);
                setLoading(false);
            }
        };

        fetchData();
    }, [idContact]);

    if (loading) {
        return (
            <Modal open={loading}>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        p: 4,
                        boxShadow: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress size={80} />
                </Box>
            </Modal>
        );
    }

    if (error) {
        return <p>Error fetching request: {error.message}</p>;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "background.paper",
                    overflowY: "auto",
                }}
            >
                {/* Top actions */}
                <div className="flex justify-between items-start p-4 gap-4">
                    <div className="flex flex-wrap gap-2">
                        <Button className="bg-blue-700 text-white" onClick={handleMenuClick}>
                            Actions
                        </Button>
                        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
                        </Menu>
                        <Button variant="outline" className="bg-blue-700 text-white" onClick={() => console.log("Action Plan")}><AddIcon />Action Plan</Button>
                        <Button variant="outline" className={` text-orange-300 ${buttonBg}`} onClick={() => console.log("Appointment")}><AddIcon />Appointment</Button>
                        <Button variant="outline" className={`text-blue-300 ${buttonBg}`} onClick={() => console.log("Task")}><AddIcon />Task</Button>
                        <Button variant="outline" className={` text-green-300 ${buttonBg}`} onClick={() => console.log("Follow Up Call")}><AddIcon />Follow Up Call</Button>
                    </div>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>

                {/* Main content */}
                <div className="flex overflow-hidden p-4">
                    <div className="w-2/3 pr-4 flex flex-col gap-4 overflow-y-auto">
                        {/* Header */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <EditableText value={name} onChange={setName} className="text-xl" />
                                <EditableText value={contact} onChange={setContact} className="ml-2" />
                                <EditableText value={address} onChange={setAddress} className="mt-4 ml-4" />
                            </div>
                            <div className="w-1/6 flex flex-wrap  -space-y-6">
                                <div className=" w-full  h-8 flex flex-nowrap space-x-2 ">
                                    <Typography sx={{ fontSize:'16px' }}> Phones  </Typography>  <AddIcon />
                                </div>
                                <div className=" w-full">
                                {phones.map((phone, i) => (
                                    <EditableText
                                        key={i}
                                        value={phone}
                                        onChange={(val) => {
                                            const updated = [...phones];
                                            updated[i] = val;
                                            setPhones(updated);
                                        }}
                                    />
                                ))}
                                </div>

                            </div>
                            <div className="w-1/4 ">
                                <div className=" w-full  h-8 flex flex-nowrap space-x-2 ">
                                    <Typography sx={{ fontSize:'16px' }}> Emails  </Typography>  <AddIcon  />
                                </div>
                                <div className=" w-full">
                                {emails.map((email, i) => (
                                    <EditableText
                                        key={i}
                                        value={email}
                                        onChange={(val) => {
                                            const updated = [...emails];
                                            updated[i] = val;
                                            setEmails(updated);
                                        }}
                                    />
                                ))}
                                </div>
                            </div>
                            <div className="w-1/6  ">
                                <Box className="flex space-y-4 mt-8 flex-wrap">
                                    <FormControl size="small" className="w-full">
                                        <InputLabel>Manager</InputLabel>
                                        <Select value={manager} label="Manager" onChange={(e) => setManager(e.target.value)} sx={{ fontSize:'14px' }}>
                                            <MuiMenuItem value="None">None</MuiMenuItem>
                                            <MuiMenuItem value="Option1">Option 1</MuiMenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl size="small" className="w-full">
                                        <InputLabel>List</InputLabel>
                                        <Select value={list} label="List" onChange={(e) => setList(e.target.value)} sx={{ fontSize:'14px' }}>
                                            <MuiMenuItem value="Houston - Jimmy">Houston - Jimmy</MuiMenuItem>
                                            <MuiMenuItem value="Option2">Option 2</MuiMenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                            </div>
                        </div>

                        {/* Groups */}
                        <div>
                            <p className={`font-bold text-lg ${textColor}`}>     Groups </p>
                            <div className="flex gap-2 flex-wrap mt-2">
                                {["Appointment Set", "Dead Lead", "Future Follow Up", "Hot Lead", "Trash"].map((label) => (
                                    <Badge key={label} variant="outline" className="bg-gray-200 text-gray-800 border-gray-300 shadow-sm">
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="misc">
                            <TabsList className="w-full flex flex-wrap border-b space-x-2 space-y-2 ">
                                {["MISC", "PROPERTY", "ACTIVITIES", "HISTORY", "EMAILS", "ACTION PLANS", "LEAD SHEET", "ATTACHMENTS"].map(
                                    (tab) => (
                                        <TabsTrigger key={tab} value={tab.toLowerCase()}
                                                     className="flex-1 text-center py-2 text-white data-[state=active]:bg-blue-700 data-[state=inactive]:bg-gray-600 data-[state=active]:text-white"
                                        >
                                            {tab}
                                        </TabsTrigger>
                                    )
                                )}
                            </TabsList>
                            <TabsContent value="misc">Contenido de MISC</TabsContent>
                            <TabsContent value="attachments">Contenido de Attachments</TabsContent>
                        </Tabs>
                    </div>

                    {/* Notes */}
                    <div className="w-1/3 border-l pl-4">
                        <h2 className={`text-lg font-semibold mb-2 ${textColor}`} >Notes</h2>
                        <Textarea
                            placeholder="Type Note Here..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className={`mb-2 ${inputBg}`}
                        />
                        <Button onClick={addNote} className={`mb-4  ${inputBg}  `} >
                            Add Note
                        </Button>

                        <Box sx={{ overflowY: "auto", maxHeight: 400 }}>
                            <div className="flex flex-col gap-2">
                                {notes.map((note, i) => (
                                    <Card key={i} className={`border border-gray-300 shadow-sm  ${inputBg}`}>
                                        <CardContent className="p-3 text-sm">
                                            <div className="text-xs text-muted-foreground mb-1">2024-04-29 14:30 • Jorge</div>
                                            {note}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </Box>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default ContactForm;