import * as React from 'react'

import styles from './style.module.scss'

const Download = ({ fill, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg height="100px" viewBox="0 0 100 100" width="100px" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" fill={fill} r="50" />
      <g>
        <path
          className={styles.animatedChainOne2}
          d="m60.02,43.37l-10.02,18.13l-10.02,-18.13l5.01,0l0,-18.22l10.02,0l0,18.22z"
          fill="#E0E0E2"
          id="svg_6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={styles.animatedChainOne}
          d="m29.24,70.98l1.3,2.0c0.46,0.6 2.13,1.0 4.05,1.0l15.55,0l15.55,0c1.92,0 3.59,-0.4 4.05,-1.0l1.3,-2.0"
          fill="#56565C"
          stroke="#56565C"
          strokeWidth="2"
          transform="matrix(1 0 0 1 0 0)"
        />
      </g>
    </svg>
  )
}

export default Download
