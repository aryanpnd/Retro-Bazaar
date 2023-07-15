import React, { useContext, useState } from 'react';
import './filterButtonModal.css';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import axios from 'axios';
import { apiURL } from '../../../App';
import { productsContext } from '../../../contexts/productsContext';

const FilterButtonModal = ({ setProductData, modal, setModal, search,searchQuery }) => {

    const { selectedCategory } = useContext(productsContext)

    const [sortby, setSortby] = useState('date')
    const [orderby, setOrderby] = useState(1)
    const [loading, setloading] = useState(false)


    const closeModal = () => {
        setModal(false)
    };

    const fetch = async () => {
        if (search) {
            setloading(true)
            await axios.get(`${apiURL}/api/products/search?q=${searchQuery}&sortby=${sortby}&order=${orderby}`, { withCredentials: true }).then((data) => {
                setProductData(data.data.products)
                setloading(false)
                closeModal()
            })
            
        } else {
            setloading(true)
            await axios.get(`${apiURL}/api/products?sortby=${sortby}&order=${orderby}&category=${selectedCategory}`, { withCredentials: true }).then((data) => {
                setProductData(data.data)
                setloading(false)
                closeModal()
            })
        }

    }



    return (
        <>
            {/* {children(openModal)} */}

            {modal && (
                <div className={` app ${modal ? 'modal-open' : ''} modal`}>
                    <div className="filter-modal-content">

                        <div className='filter-model-heading'>
                            Filter
                            <button className='closeModal' onClick={closeModal}><CloseOutlined style={{ color: 'white', fontSize: '2rem', fontWeight: 'bolder' }} /></button>
                        </div>

                        <div className='filter-model-body'>
                            <h3>Sort by</h3>
                            <div>
                                <button className={`model-body-button${sortby === 'price' ? '-active' : ''}`} onClick={() => setSortby('price')}>Price</button>
                                <button className={`model-body-button${sortby === 'date' ? '-active' : ''}`} onClick={() => setSortby('date')}>Time</button>

                            </div>
                            <h3>Order</h3>
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
        </>
    );
};

export default FilterButtonModal;
