import { getAssetPath } from "@/utils/paths"

export const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-clip opacity-10 pointer-events-none">
      <img src={getAssetPath("/images/shapes/half_circle_lines.svg")} className='absolute top-40 right-0 translate-x-1/2 rotate-180 aspect-square w-100' alt="" />
      <img src={getAssetPath("/images/shapes/circle_lines_fill.svg")} className='absolute top-150 left-0 -translate-x-1/3 rotate-45 aspect-square w-100' alt="" />
      <img src={getAssetPath("/images/shapes/bubble.svg")} className='absolute top-235 left-65 -translate-x-1/2 aspect-square w-20' alt="" />
      <img src={getAssetPath("/images/shapes/bubble.svg")} className='absolute top-250 left-46 -translate-x-1/2 aspect-square w-10' alt="" />
      <img src={getAssetPath("/images/shapes/bubble.svg")} className='absolute top-260 left-58 -translate-x-1/2 aspect-square w-5' alt="" />
      <img src={getAssetPath("/images/shapes/star.svg")} className='absolute top-260 right-45 translate-x-1/2 aspect-square w-30' alt="" />
      <img src={getAssetPath("/images/shapes/star.svg")} className='absolute top-250 right-15 translate-x-1/2 aspect-square w-20' alt="" />
      <img src={getAssetPath("/images/shapes/star.svg")} className='absolute top-275 right-20 translate-x-1/2 aspect-square w-10' alt="" />
      <img src={getAssetPath("/images/shapes/star.svg")} className='absolute top-290 right-10 translate-x-1/2 aspect-square w-5' alt="" />
      <img src={getAssetPath("/images/shapes/sharp_waves.svg")} className='absolute top-300 right-10 translate-x-1/2 aspect-square w-100' alt="" />
      <img src={getAssetPath("/images/shapes/half_circle_lines.svg")} className='absolute top-350 left-0 -translate-x-1/4 rotate-90 aspect-square w-100' alt="" />
    </div>
  )
}