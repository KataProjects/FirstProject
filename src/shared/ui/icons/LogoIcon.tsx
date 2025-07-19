interface IconProps {
  size?: number;
  className?: string;
}

export const LogoIcon = ({ size = 40, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0)">
      <mask
        id="mask0"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <path d="M0 40H40V0H0V40Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M20.0012 -0.00012207C8.95327 -0.00012207 3.05176e-05 8.95565 3.05176e-05 20.0004C3.05176e-05 31.0464 8.95327 39.9999 20.0012 39.9999C31.0423 39.9999 39.9997 31.0464 39.9997 20.0004C39.9997 8.95565 31.0423 -0.00012207 20.0012 -0.00012207Z"
          fill="#4797FF"
        />
        <path
          d="M21.8182 21.8129V29.6954L24.8536 33.3315L24.8482 35.7592L20.0002 32.6937L15.1513 35.7592L15.1468 33.3315L18.1818 29.6954V21.8129L4.84875 27.2711V24.2409L18.1818 13.9361V4.84622C18.1821 3.84236 18.9957 3.02814 20.0002 3.02814C21.004 3.02814 21.8182 3.84236 21.8182 4.84622V13.9361L35.1513 24.2409V27.2711L21.8182 21.8129Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
