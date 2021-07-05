import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'

const CProgress = ({ className, loading = `loading... `, size = 14 }) => {
  return (
    <div className={className}>
      <span>{loading}</span>
      <CircularProgress size={size} color='inherit' />
    </div>
  )
}

CProgress.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.string,
  size: PropTypes.number,
}
export default CProgress
