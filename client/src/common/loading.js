import React, { useState, useEffect } from 'react'

const progress = ['.', '.', '.', '.', '.']

const Loading = ({ text = 'loading ', interval = 250 }) => {
  const [loading, setLoading] = useState(text)

  useEffect(() => {
    function go() {
      if (typeof go.counter === 'undefined') {
        go.counter = 0
      }
      setLoading(text + progress.slice(0, go.counter++).join(''))
      if (go.counter > progress.length) {
        go.counter = 0
      }
    }

    let id = setInterval(go, interval)
    return () => clearInterval(id)
  }, [text, interval])

  return <div>{loading}</div>
}

export default Loading
