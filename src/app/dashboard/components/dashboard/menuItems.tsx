import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TuneIcon from '@mui/icons-material/Tune';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const iconSmall = 18;
const iconSmallSubItems = 16; 

const menuItems = [
    {
      label: 'DASHBOARD',
      icon: <DashboardIcon style={{ fontSize: iconSmall }} />,
      href: '/dashboard',
    },
    {
      label: 'ACTIVITI BOX',
      icon: <PeopleIcon style={{ fontSize: iconSmall }} />,
      href: '/users',
    },
    {
      label: 'MARKETING',
      icon: <InventoryIcon style={{ fontSize: iconSmall }} />,
      href: '/productos',
    },
    {
      label: 'SALES',
      icon: <AssessmentIcon style={{ fontSize: iconSmall }} />,
      href: '/reportes',
      subItems: [
        { label: 'Sub Item 1', href: '/sales/sub1' },
        { label: 'Another Sub Item', href: '/sales/sub2' },
      ],
    },
    {
      label: 'CMS',
      icon: <DashboardIcon style={{ fontSize: iconSmall }} />,
      subItems: [
        { label: 'Post Editor', href: '/cms/editor' },
        { label: 'Media Library', href: '/cms/media' },
      ],
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