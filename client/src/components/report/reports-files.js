import React, { useState, useEffect, useRef, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ItemsList from 'src/common/items-list'
import { getFilesAsync } from 'src/mock/storeMock'
import { getPeriod } from 'src/utils'
import Loading from 'src/common/loading'
import { REPORTS_FILES_TYPE } from 'src/types/types'

const fileParams = {
  headers: ['файл', 'описание', 'скачать'],
  fields: ['name', 'desc', 'download'],
  key: 'name',
}

const download = (name) => (
  <a href={name} download>
    скачать
  </a>
)

// app/reports/2021/2021_05
const ReportsFiles = ({ params = fileParams }) => {
  const { year, month } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [files, setFiles] = useState(null)
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      const files = await getFilesAsync(year, month)
      if (!mountedRef.current) return null;

      files.forEach((file) => (file['download'] = download(file.name)))
      console.log(`files::`, files)
      setFiles(files)
      setIsLoading(false)

    } catch (error) {
      console.log(`error::`, error);
    }
  }, [mountedRef, year, month])

  useEffect(() => {
    fetchData()
    
    return () => {
      mountedRef.current = false
    }
  }, [fetchData])

  const handleSelect = (item) => {
    console.log(`item:`, item)
  }

  return (
    <div>
      <Typography variant='h4' component='h1'>
        {getPeriod(month)}
      </Typography>
      {isLoading ? (
        <Loading />
      ) : (
        <Box mt={2}>
          <ItemsList
            items={files}
            params={params}
            onSelect={handleSelect}
            isCheckbox={false}
            isPagination={false}
            isSwitchDense={false}
          />
        </Box>
      )}
    </div>
  )
}

ReportsFiles.propTypes = REPORTS_FILES_TYPE
export default ReportsFiles
