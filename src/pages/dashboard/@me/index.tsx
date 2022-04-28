import React from 'react';
import SideBar from '../../../components/SideBar';

class DashboardMe extends React.Component {
    render() {
        return (
            <div>
                <SideBar {...{urlsType: 'USER'}} />
                <section className="content">
                    <h1 style={{color: 'var(--luny-colors-text-100)'}}>Dashboard Sidebar</h1>
                </section>
            </div>
        );
    }
}

export default DashboardMe;