import React from 'react'
import { SlSocialLinkedin } from "react-icons/sl";
//faded-text is cutsom tailwind css
import { FiGithub } from "react-icons/fi";

function FollowOn() {
  return (
    <div className='faded-text pt-2'>
        <span>Follow on:</span>
        <div className='flex gap-4 pt-3'>
            <a href='https://www.linkedin.com/in/adarshpandey1'>
               <SlSocialLinkedin size={15}/>
            </a>

            <a href='https://github.com/AdarshPanday2000'>
            <FiGithub  size={15}/>
            </a>
        </div>
    </div>
  )
}

export default FollowOn