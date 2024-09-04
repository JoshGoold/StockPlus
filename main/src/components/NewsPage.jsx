import React from 'react'

const NewsPage = (props) => {
  return (
    <div className='flex flex-wrap f gap-4 justify-center items-center'>
      {props.data.map((story, index)=>(
        <div key={index} className="shadow-md p-3 w w-1/4 rounded-sm">
            <div className="flex flex-col justify-center items-center gap-3">
                <h1 className='font-bold text-2xl'>{story.title}</h1>
                <h3>{story.publisher}</h3>
            </div>
            <div className="p-2 ">
            {story.thumbnail && story.thumbnail.resolutions && story.thumbnail.resolutions.length > 0 ? (
                <img src={story.thumbnail.resolutions[0].url} alt="img" />
            ) : (
                <p>No image available</p>
            )}
            </div>
            <div className="">
                <a className='shadow-md text-sm p-2 hover:bg-blue-400 hover:text-white' href={story.link}>See Story Here</a>
            </div>
        </div>
      ))}
    </div>
  )
}

export default NewsPage
