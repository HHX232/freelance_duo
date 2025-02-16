import {useState} from 'react'
import {AuthFormCode} from '@pages/dashboard/auth/form-code/form-code'
import {AuthFormPhone} from '@pages/dashboard/auth/form-auth/form-auth'
import {AuthByPhone, AuthByPhoneConfirm} from '@src/actions/auth'
import {IAuth} from '@src/types/auth.interface'
import {useStore} from '@src/lib/store/store'
import {useRouter} from 'next/navigation'

interface IAuthPopup {
  onClose: () => void
  router?: boolean
}

interface IFormPhone {
  phone: string
  agree: boolean
}

export const AuthPopup = (props: IAuthPopup) => {
  const {setToken} = useStore()
  const router = useRouter()

  const [isAuthPhoneSuccess, setAuthPhoneSuccess] = useState<boolean>(false)
  const [isAuthPhoneData, setAuthPhoneData] = useState<IFormPhone>({} as IFormPhone)

  //const [isPhoneChange, setPhoneChange] = useState<boolean>(false);

  const handleFormPhoneSubmit = async (data: IFormPhone) => {
    const phone = data.phone.replace(/[^\d+]/g, '')
    await AuthByPhone(phone)
  }

  const handleConfirm = async (code: string) => {
    const res: IAuth = await AuthByPhoneConfirm(isAuthPhoneData.phone.replace(/[^\d+]/g, ''), code)

    if (res.success) {
      props.onClose()
      setToken(res.token)

      if (!props.router) {
        router.push('/lk')
      }
    }
  }

  return (
    <>
      {!isAuthPhoneSuccess ? (
        <AuthFormPhone
          onClose={props.onClose}
          onSuccess={(data, status) => {
            setAuthPhoneData(data)
            setAuthPhoneSuccess(status)
            handleFormPhoneSubmit(data)
          }}
        />
      ) : (
        <AuthFormCode
          {...isAuthPhoneData}
          onChangePhone={() => {
            setAuthPhoneSuccess(false)
          }}
          onClose={props.onClose}
          onSuccess={(data, status) => {
            //setAuthPhoneSuccess(status)
            console.log(status)
            handleConfirm(data.code)
          }}
        />
      )}
    </>
  )
}
