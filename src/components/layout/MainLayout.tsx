import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-dark-bg text-text-primary font-body">
            <Header />
            <main className="flex-1 pt-16 pb-16 md:pb-0">
                <Outlet />
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default MainLayout;
