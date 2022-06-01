import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

import '../Product.css';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})
    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    const addToCarthandler = () => {
        console.log(props.detail._id,"detail");
        props.addToCart(props.detail._id)
    }   
    console.log(Product,"product");
    return (
        <div>
            <Descriptions title="Product Info" color="textPrimary">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.continents}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="secondary" style={{color:"black", backgroundColor: "#00e600", fontWeight: '500'}}
                    onClick={addToCarthandler}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
