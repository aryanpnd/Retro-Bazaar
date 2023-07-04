import React, { useContext, useState } from 'react';
import './filterButtonModal.css';
import { CloseOutlined,LoadingOutlined  } from '@ant-design/icons'
import axios from 'axios';
import { apiURL } from '../../../App';
import { productsContext } from '../../../contexts/productsContext';

const FilterButtonModal = ({ children, setProductData }) => {

    const { category, setCategory } = useContext(productsContext)

    const [modalOpen, setModalOpen] = useState(false);
    const [sortby, setSortby] = useState('date')
    const [orderby, setOrderby] = useState(1)
    const [loading, setloading] = useState(false)

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const fetch = async () => {
        setloading(true)
        await axios.get(`${apiURL}/api/products?sortby=${sortby}&order=${orderby}&category=${category}`, { withCredentials: true }).then((data) => {
            setProductData(data.data)
            setloading(false)
            closeModal()
        })

    }



    return (
        <div className={`filter-container app ${modalOpen ? 'modal-open' : ''}`}>
            {children(openModal)}

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">

                        <div className='model-heading'>
                            Filter
                            <button className='closeModal' onClick={closeModal}><CloseOutlined style={{ color: 'white', fontSize: '2rem', fontWeight: 'bolder' }} /></button>
                        </div>

                        <div className='model-body'>
                            <h3>Sort by</h3>
                            <div>
                                <button className={`model-body-button${sortby === 'price' ? '-active' : ''}`} onClick={() => setSortby('price')}>Price</button>
                                <button className={`model-body-button${sortby === 'date' ? '-active' : ''}`} onClick={() => setSortby('date')}>Time</button>

                            </div>
                            <h3>Sort by</h3>
                            <div>
                                <button className={`model-body-button${orderby === 1 ? '-active' : ''}`} onClick={() => setOrderby(1)}>Ascending</button>
                                <button className={`model-body-button${orderby === -1 ? '-active' : ''}`} onClick={() => setOrderby(-1)}>Descending</button>
                            </div>
                        </div>

                        <div className='model-botttom'>
                            <button onClick={fetch}>{loading ? <LoadingOutlined /> : 'Apply'}</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterButtonModal;
