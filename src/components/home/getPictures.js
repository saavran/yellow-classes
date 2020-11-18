import { useEffect, useState } from 'react'

export default function GetPictures(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        fetch(`https://api.unsplash.com/photos?page=${pageNumber}`, {
            headers: {
                Authorization: "Client-ID -LDhBEWJzS8xhpas1bNgoW8_pKT3L87rFBKVajwG1EY"
            }
        })
            .then(res => res.json())
            .then(json => {
                setImages(prevImages => {
                    return [...prevImages, ...json]
                })
                setLoading(false)
                setHasMore(true)
            })
            .catch(err => {
                setLoading(false)
                setError(true)
            })
    }, [pageNumber])
    return { loading, error, images, hasMore }
}