import type { UserComment } from './type'

export const CardCommentsList = ({ items }: { items: UserComment[] }) => {
	if (!items.length) return <div>Список пуст</div>

	return (
		<ul className="flex flex-col gap-2 pt-2">
			{items &&
				items.map((item) => (
					<CardCommentItem
						key={item.username}
						item={item}
					/>
				))}
		</ul>
	)
}

const CardCommentItem = ({ item }: { item: UserComment }) => {
	return (
		<li
			key={item.username}
			className="bg-white w-full flex flex-col gap-2 rounded-2xl p-1"
		>
			<div>{item.username}</div>
			<div>{item.comment}</div>
		</li>
	)
}
