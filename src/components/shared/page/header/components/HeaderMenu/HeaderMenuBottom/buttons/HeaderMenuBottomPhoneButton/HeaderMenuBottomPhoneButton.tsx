import {FullButton} from '@src/components/UI-kit/buttons/FullButton/FullButton'
import PhoneSVG from '@icon/phone.svg'

export default function HeaderMenuBottomPhoneButton() {
  return (
    <FullButton
      type={'Link'}
      href={'tel:+71231234567'}
      activeButton={true}
      border={false}
      borderColor={''}
      buttonFill={'none'}
      buttonElementColor={'white'}
      buttonText={''}
    >
      <PhoneSVG />
    </FullButton>
  )
}
