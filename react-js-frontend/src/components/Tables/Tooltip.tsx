import { OverlayTrigger, Tooltip as BsTooltip } from 'react-bootstrap'
import { Placement } from 'react-bootstrap/esm/types'

interface IProps {
  text: string
  tooltipText: string
  placement?: Placement
}

export const Tooltip = ({ text, tooltipText, placement = 'top' }: IProps) => {
  return (
    <OverlayTrigger placement={placement} overlay={<BsTooltip id={`regular-tooltip-top`}>{tooltipText}</BsTooltip>}>
      <span>{text}</span>
    </OverlayTrigger>
  )
}
