import React, { forwardRef, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { PAGE_TYPE } from 'src/types/types'
// import { AppContext } from 'src/context/app-context'
import { MainContext } from 'src/context/main-context'

const Page = forwardRef(({ children, title = '', ...rest }, ref) => {
  // eslint-disable-next-line
  // const [contextApp, setContextApp] = useContext(AppContext)

  const main = useContext(MainContext)

  useEffect(() => {
    // setContextApp((context) => ({ ...context, title }))
    main.saveTitle(title)
  }, [main, title])

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
