import React, { forwardRef, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { PAGE_TYPE } from 'src/types/types'
import { ContextApp } from 'src/common/context-app'

const Page = forwardRef(({ children, title = '', ...rest }, ref) => {
  // eslint-disable-next-line
  const [contextApp, setContextApp] = useContext(ContextApp)

  useEffect(() => {
    setContextApp((context) => ({ ...context, title }))
  }, [title, setContextApp])

  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>A2.{title}</title>
      </Helmet>
      {children}
    </div>
  )
})

Page.propTypes = PAGE_TYPE
export default Page
