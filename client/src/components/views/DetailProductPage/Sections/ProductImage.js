import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { Pannellum, PannellumVideo } from "pannellum-react";
import myImages from '../../../../assets/a.jpg'




function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {

        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push(
                     `http://localhost:5000/${item}`,
                    // thumbnail: `http://localhost:5000/${item}`
                )
            })
            setImages(images)
        }
    }, [props.detail])
    console.log(props.detail.images,"detaillllll   ");
    console.log(Images,"images detail");

    return (
        <div>
            {/* <ImageGallery items={Images} /> */}
            <Pannellum
                width="100%"
                height="500px"
                image={Images}
                pitch={10}
                yaw={180}   
                hfov={110}
                autoLoad
                onLoad={() => {
                    console.log("panorama loaded");
                }}
            >
                {/* <Pannellum.Hotspot
                    type="info"
                    pitch={11}
                    yaw={-167}
                    text="Info Hotspot Text 3"
                    URL="https://github.com/farminf/pannellum-react"
                />

                <Pannellum.Hotspot
                    type="info"
                    pitch={31}
                    yaw={-107}
                    text="Info Hotspot Text 4"
                    URL="https://github.com/farminf/pannellum-react"
                /> */}
            </Pannellum>
        </div>
    )
}

export default ProductImage
