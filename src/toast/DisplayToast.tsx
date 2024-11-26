import { AlertColor } from "@mui/material"
import { toast } from "./toastObserver";


export default function DisplayToast() {

  const buttonColors = {
    success: 'rgb(46, 125, 50)',
    error: 'rgb(211, 47, 47)',
    info: 'rgb(2, 136, 209)',
    warning: 'rgb(237, 108, 2)',
  }

  const buttonStyle = ({ backgroundColor }: { backgroundColor: string }) => {
    return {
    backgroundColor: backgroundColor,
    color: 'white',
    padding: '10px 20px',
    cursor: 'pointer',
    margin: '5px',
    width: '300px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    }
    
  };

  const handleClick = (severity: AlertColor) => {
    toast[severity](`This is a ${severity} toast`);
  }
  return (
    <>
    <h3>Scrollable Toast List</h3>
    <ul>
      <li style={{ listStyleType: 'none' }}>
        <button style={buttonStyle({ backgroundColor: buttonColors.success })} onClick={() => handleClick('success')}>Display Toast Success</button>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <button style={buttonStyle({ backgroundColor: buttonColors.error })} onClick={() => handleClick('error')}>Display Toast Error</button>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <button style={buttonStyle({ backgroundColor: buttonColors.info })} onClick={() => handleClick('info')}>Display Toast Info</button>
      </li>
      <li style={{ listStyleType: 'none' }}>
        <button style={buttonStyle({ backgroundColor: buttonColors.warning })} onClick={() => handleClick('warning')}>Display Toast Warning</button>
      </li>
    </ul>
    </>
    
    
  )
}