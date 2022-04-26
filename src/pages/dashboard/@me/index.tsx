import React from 'react';
import SideBar from '../../../components/SideBar';

class DashboardMe extends React.Component {
    render() {
        return (
            <div>
                <SideBar />
                <section className="home">
                    <h1>Dashboard Sidebar</h1>
                </section>
            </div>
        );
    }
}

export default DashboardMe;