import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import TuneIcon from '@mui/icons-material/Tune';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const iconSmall = 18;
const iconSmallSubItems = 16; 

const menuItems = [
    {
      label: 'DASHBOARD',
      icon: <DashboardIcon style={{ fontSize: iconSmall }} />,
      href: '/dashboard',
    },
    {
      label: 'APP MOBILE',
      icon: <AppSettingsAltIcon style={{ fontSize: iconSmall }} />,
      subItems: [
        { label: 'Request Services', icon: <PhonelinkRingIcon style={{ fontSize: iconSmallSubItems }} />, href: '/dashboard/app-mobile/service-request' },
        { label: 'Question For Company', icon: <ContactSupportIcon style={{ fontSize: iconSmallSubItems }} />, href: '/dashboard/' },
        ],
    },
    {
      label: 'LEADS',
      icon: <DashboardIcon style={{ fontSize: iconSmall }} />,
      href: '/dashboard/contact',
    },
    {
      label: 'SETTINGS',
      icon: <TuneIcon style={{ fontSize: iconSmall }} />,
      subItems: [
        { label: 'Category', icon: <CategoryIcon style={{ fontSize: iconSmallSubItems }} />, href: '/dashboard/settings/category' },
        { label: 'Sub-Category', icon: <ClassIcon style={{ fontSize: iconSmallSubItems }} />, href: '/dashboard/settings/sub-category' },
        { label: 'Services ', icon: <FormatListBulletedIcon style={{ fontSize: iconSmallSubItems }} />, href: '/dashboard/settings/service' },
      ],
    },
  ];

  export default menuItems;