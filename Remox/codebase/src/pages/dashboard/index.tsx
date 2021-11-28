import Navbar, { NavbarDropdown, Visitcard } from '../../layouts/dashboard/navbar'
import Sidebar from '../../layouts/dashboard/sidebar';
import MobileMenu from '../../layouts/dashboard/mobileMenu'
import Siderbarlist from '../../components/dashboard/sidebarlist'
import { useAppSelector } from '../../redux/hooks';
import { selectToggle } from '../../redux/reducers/toggles';
import { AnimatePresence } from 'framer-motion';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { selectStorage } from '../../redux/reducers/storage';
import { ClipLoader } from 'react-spinners';

const Dashboard = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
    const toggle = useAppSelector(selectToggle)
    const storage = useAppSelector(selectStorage)

    return <>
        <AnimatePresence>
            {toggle.mobileMenu &&
                <MobileMenu>
                    <div className="flex flex-col space-y-10">
                        <div className="actions flex flex-col items-center justify-evenly space-y-5">
                            {storage ? <Visitcard name="Remox" address={storage.accountAddress} /> : <ClipLoader />}
                            <NavbarDropdown />
                            <IoMdNotificationsOutline className="text-2xl" />
                        </div>
                        <Siderbarlist />
                    </div>
                </MobileMenu>
            }
        </AnimatePresence>
        <div className="flex flex-col pt-6 gap-16">
            <Navbar></Navbar>
            <div className="grid grid-cols-11 gap-12">
                <div className="hidden md:block md:col-span-2"><Sidebar /></div>
                <div className="col-span-11 md:col-span-8 pl-2 md:pl-7 pr-2">
                    {children}
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;