import { Link } from '@tanstack/react-router'
import type { CoursesItem } from './type'

export const CardPreview = ({ item }: { item: CoursesItem }) => {
	return (
		<li
			className="flex flex-col justify-around  basis-1/5 shrink grow bg-white shadow-2xl rounded-3xl overflow-hidden p-5"
			key={item.id}
		>
			<div className="text-center text-[1.3rem] font-semibold">{item.name}</div>
			<div className="relative w-full pb-[100%]">
				<img
					className="absolute top-0 left-0  w-full h-full object-cover"
					src={item.img || ''}
					alt="1"
				/>
			</div>
			<div className="text-[1.2rem]">{item.description}</div>
			<div className="text-[2rem]">rating: {item.rating}</div>
			<Link
				to={'/courses/$coursesId'}
				params={{ coursesId: String(item.id) }}
			>
				Подробнее...
			</Link>
		</li>
	)
}
