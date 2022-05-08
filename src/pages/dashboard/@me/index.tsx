import React from 'react';
import SideBar from '../../../components/SideBar';
import NavBar from '../../../components/NavBar';

class DashboardMe extends React.Component {
    render() {
        return (
            <div>
                <SideBar {...{urlsType: 'USER'}} />
                <div className="content">
                    <NavBar />
                    {/* <h1 style={{color: 'var(--luny-colors-text-100)'}}>Dashboard Sidebar</h1> */}
                </div>
            </div>
        );
    }
}

export default DashboardMe;