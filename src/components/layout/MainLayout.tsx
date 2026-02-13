import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-dark-bg text-text-primary font-body">
            <Header />
            <main className="flex-1 pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
