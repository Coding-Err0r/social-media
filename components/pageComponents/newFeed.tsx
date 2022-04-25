import React from 'react'
import Card from '../utils/card'
import CreatePost from './createPost'

const NewFeed = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-6 p-6">
      <CreatePost/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default NewFeed