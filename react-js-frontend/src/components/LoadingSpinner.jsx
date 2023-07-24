import { Spinner } from 'react-bootstrap'

export const LoadingSpinner = ({ size, width, height }) => {
  const spinnerStyle = {
    color: '#E60100',
    width: width,
    height: height,
  }
  return <Spinner size={size} animation="border" style={spinnerStyle} role="status" />
}
