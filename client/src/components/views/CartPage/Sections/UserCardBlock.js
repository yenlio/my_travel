import React from 'react'

function UserCardBlock(props) {
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }
    // console.log(props.products, "'productttttt");    

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} alt="product"
                        src={renderCartImage(product.images)} />
                </td>
                <td>{product.quantity} Điểm</td>
                <td>$ {product.price} </td>
                <td><button
                    style={{ color: "black", backgroundColor: " #cc0044", fontWeight: '500' }}
                    onClick={() => props.removeItem(product._id)}
                >Delete </button> </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ảnh địa điểm </th>
                        <th>đánh giá </th>
                        <th>Gia</th>
                        <th>Xóa khỏi giỏ hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
