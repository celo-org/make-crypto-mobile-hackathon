import { Link } from 'react-router-dom'

const Li = ({ children }: { children?: Array<any> }) => <li className="mb-6 text-left font-light text-lg flex gap-3">{children}</li>
const Sidebarlist = () => {

    return <>
        <ul>
            <Link to="/dashboard"><Li><DashboardSVG />Dashboard</Li></Link>
            <Li><PayrollSVG />Payroll</Li>
            <Link to="/dashboard/transactions"><Li><TransactionsSVG />Transactions</Li></Link>
            <Li><SwapSVG />Swap</Li>
            <Link to="/dashboard/assets"><Li><AssetsSVG />Assets</Li></Link>
            <Link to="/dashboard/teams"><Li><TeamsSVG />Teams</Li></Link>
            <Li><SettingSVG /> Settings</Li>
        </ul>
    </>
}

const DashboardSVG = () => <img src='/icons/dashboardicon.svg' alt='Dashboard' />

const PayrollSVG = () => <img src='/icons/runpayrollicon.svg' alt="Payroll" />

const TransactionsSVG = () => <img src='/icons/Transactionsicon.svg' alt="Transaction" />

const SwapSVG = () => <img src='/icons/swap.svg' alt="Swap" />

const AssetsSVG = () => <img src='/icons/stocksicon.svg' alt="Asset" />

const TeamsSVG = () => <img src='/icons/teamlogo.svg' alt="Teams" />

const SettingSVG = () => <img src='/icons/settings.svg' alt="" />

export default Sidebarlist;