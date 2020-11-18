import React, { useState, useRef, useCallback } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Modal from '../modal/Modal'
import getPictures from './getPictures'
import "./home.css"

export default function Home() {
    const [pageNumber, setPageNumber] = useState(1)
    const [imageIndex, setImageIndex] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { loading, images, hasMore } = getPictures(pageNumber)

    const observer = useRef()

    const lastAppointmentRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(pageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    const showFullImage = (index) => {
        setImageIndex(index)
        setShowModal(true)
    }

    const bogusRef = useCallback()

    return (
        <div className="picture-grid">
            <div className="grid-wrapper">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        ref={(images.length === index + 1) ? lastAppointmentRef : bogusRef}
                        className="image-wrap"
                        onClick={() => showFullImage(index)}
                    >
                        <LazyLoadImage
                            alt="Thumbnail"
                            src={image.urls.small}
                        />
                    </div>
                ))}
            </div>
            {loading &&
                <div>Loading...</div>
            }
            {showModal &&
                <Modal
                    image={images[imageIndex]}
                    imageIndex={imageIndex}
                    changeIndex={(index) => showFullImage(index)}
                    closeModal={() => { setShowModal(false) }}
                />
            }
        </div>
    )
}
