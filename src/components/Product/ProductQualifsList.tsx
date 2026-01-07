import type { Product } from '@/data/products'
import Tag from '../UI/Reusable/Tag'

type Props = Pick<Product, 'qualifications'>

export default function ProductQualifsList({ qualifications }: Props) {
  return (
    <div className='mb-8'>
      <h2>Kwalifikacje:</h2>
      <ul className='flex gap-1'>
        {qualifications.map((qualification, idx) => (
          <li key={ idx }><Tag>{ qualification }</Tag></li>
        ))}
      </ul>
    </div>
  )
}