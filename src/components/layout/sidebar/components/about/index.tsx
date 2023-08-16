import { AppModal } from '@/components/level1/antd/AppModal'
import { APP_NAME } from '@/types/constants'
import { Button } from 'antd'
import { useState } from 'react'
import { MenuItem } from '../MenuItem'

export const About = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <MenuItem onClick={() => setOpen(true)} iconClass='fa-regular fa-circle-exclamation'>
        About {APP_NAME}
      </MenuItem>

      <AppModal
        open={open}
        onCancel={() => setOpen(false)}
        title={'About ' + APP_NAME}
        footer={[
          <Button key={'close'} onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <span className="text-yellow-300"> Hello guys!</span>
        <br /> My name is Andy. I have experienced difficulties in learning English, especially without a practice
        partner. Therefore, I created this app to enhance my English skills. Later, I thought of sharing it with those
        in similar situations. The app is a <span className="text-yellow-300"> work in progress</span>, and I&apos;m
        striving to improve it. So, if you encounter any issues or have suggestions for exciting features, please send
        them to me in the <span className="text-yellow-300">feedback section</span>. It would greatly assist me. Thank
        you.
      </AppModal>
    </>
  )
}
