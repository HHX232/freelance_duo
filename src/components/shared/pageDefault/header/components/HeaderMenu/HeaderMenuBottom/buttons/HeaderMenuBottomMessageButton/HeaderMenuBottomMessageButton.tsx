import MessageSVG from '@icon/message.svg'
import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'

export default function HeaderMenuBottomMessageButton() {
  return (
    <FullButton
      type={'Link'}
      href={'/#messages'}
      activeButton={true}
      border={false}
      borderColor={''}
      buttonFill={'none'}
      buttonElementColor={'white'}
      buttonText={''}
    >
      <MessageSVG />
    </FullButton>
  )
}
