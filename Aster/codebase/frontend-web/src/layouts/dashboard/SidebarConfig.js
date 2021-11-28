import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import dataMatrixScan from '@iconify/icons-mdi/data-matrix-scan';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import accountIcon from '@iconify/icons-mdi/account';
import formatListBulleted from '@iconify/icons-mdi/format-list-bulleted';


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'My Tasks',
    path: '/dashboard/mytasks',
    icon: getIcon(formatListBulleted)
  },
  {
    title: 'Classify Task',
    path: '/dashboard/classifytask',
    icon: getIcon(dataMatrixScan)
  },
];

export default sidebarConfig;
