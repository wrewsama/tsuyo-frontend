import React from 'react'
import { useParams } from 'react-router-dom'

export default function Exercise() {
    const { id } = useParams()
    return (
        <div>Exercise {id}</div>
    )
}
