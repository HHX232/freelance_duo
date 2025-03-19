import {FullButton} from '@src/components/UI-kit/BaseControls/buttons/FullButton/FullButton'
import MessageSVG from '@icon/message.svg'

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
