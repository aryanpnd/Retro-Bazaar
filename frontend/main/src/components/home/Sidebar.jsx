import React from 'react'
import '../../css/Sidebar.css'

function Sidebar() {
    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <div className='sidebar-sellnow'>
                        <div >
                            Sell Now
                        </div>
                        {/* <AddCircleOutline
                            color={'#00000'}
                            title={"sell"}
                            height="2.3rem"
                            width="2.3rem"
                        /> */}
                    </div>
                </div>
                <div className="sidebar-content">
                    <div className='sidebar-content-item'>
                        {/* <BagOutline
                            color={'#ffffff'}
                            title={"categories"}
                            height="2rem"
                            width="2rem"
                        /> */}
                        <div className='sidebar-text'>
                            Categories
                        </div>
                    </div>
                    <div className='sidebar-content-item'>
                        {/* <BagOutline
                            color={'#ffffff'}
                            title={"categories"}
                            height="2rem"
                            width="2rem"
                        /> */}
                        <div className='sidebar-text'>
                            Categories
                        </div>
                    </div>
                    <div className='sidebar-content-item'>
                        {/* <BagOutline
                            color={'#ffffff'}
                            title={"categories"}
                            height="2rem"
                            width="2rem"
                        /> */}
                        <div className='sidebar-text'>
                            Categories
                        </div>
                    </div>


                </div>
                {/* <hr /> */}
                <div className="sidebar-footer">
                    <div className='sidebar-content-item'>
                        {/* <SettingsOutline
                            color={'#ffffff'}
                            title={"settings"}
                            height="2rem"
                            width="2rem"
                        /> */}
                        <div className='sidebar-text'>Settings</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar