import React from 'react'
import { useSelector } from 'react-redux';

const PreviousComments = ({ setShowCurrentCaption }) => {

  const { captions } = useSelector((state) => state.CaptionReducer);

  const captionSubmitHandler = (caption) => {
    setShowCurrentCaption(caption)
  }

  return (
    <>
      {captions.length > 0 ? (
        <div>
          {captions.map((caption, i) => {
            return <div>
              <ul style={{ padding: "10px 30px" }}>
                <li
                  key={i}
                  onClick={() => captionSubmitHandler(caption.response)}
                  style={{
                    color: "white",
                    cursor : "pointer"
                  }}>
                  {caption.response}
                </li>
              </ul>
            </div>
          })}
        </div>
      ) : <p style={{
        color: "white"
      }}>there is no such comments</p>}
    </>
  )
}

export default PreviousComments