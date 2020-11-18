import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import "./modal.css"

export default function Modal(props) {

    const setNewIndex = (direction) => {
        let newIndex
        switch (direction) {
            case "left":
                newIndex = parseInt(props.imageIndex) - 1
                break;
            case "right":
                newIndex = parseInt(props.imageIndex) + 1
                break;
        }
        props.changeIndex(newIndex)
    }

    const closeModal = () => {
        props.closeModal()
    }

    return (
        <div className="modal">
            <div className="modal-body">
                <svg onClick={() => setNewIndex("left")} className="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="none" d="M0 0h24v24H0z" /><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" /></svg>
                <svg onClick={() => closeModal()} className="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
                <div className="image-wrap">
                    <LazyLoadImage
                        alt="High res"
                        src={props.image.urls.regular}
                    />
                </div>
                <svg onClick={() => setNewIndex("right")} className="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="none" d="M0 0h24v24H0z" /><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" /></svg>
            </div>
        </div>
    )
}
