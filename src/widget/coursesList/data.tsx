export interface ICoursesItem {
	id: number
	name: string
	rating: number
	description: string
	img?: string | null
}

export const COURSES_ITEMS: ICoursesItem[] = [
	{
		id: 1,
		name: 'Web/Html/Css/Js',
		rating: 4,
		description:
			'Courses for kids, learning: html/css/js, good luck my little programmers!',
		img: 'https://cdn-icons-png.flaticon.com/512/1051/1051277.png'
	},
	{
		id: 2,
		name: 'Python для начинающих',
		rating: 5,
		description: 'Изучаем Python с нуля: переменные, циклы и первые программы!',
		img: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png'
	},
	{
		id: 3,
		name: 'Мир Scratch',
		rating: 4,
		description:
			'Создавай свои первые игры и мультики с помощью блоков Scratch.',
		img: 'https://cdn-icons-png.flaticon.com/512/528/528260.png'
	},
	{
		id: 4,
		name: 'Разработка игр на Roblox',
		rating: 5,
		description:
			'Курс по созданию миров и игр в Roblox Studio для юных гейм-дизайнеров.',
		img: 'https://cdn-icons-png.flaticon.com/512/3940/3940051.png'
	},
	{
		id: 5,
		name: 'Математика и логика',
		rating: 3,
		description: 'Развиваем логическое мышление и решаем интересные задачки.',
		img: 'https://cdn-icons-png.flaticon.com/512/2570/2570672.png'
	},
	{
		id: 6,
		name: 'Основы Minecraft',
		rating: 5,
		description:
			'Программирование в Minecraft: автоматизируй всё с помощью команд!',
		img: 'https://cdn-icons-png.flaticon.com/512/888/888882.png'
	},
	{
		id: 7,
		name: 'Создание мультфильмов',
		rating: 4,
		description: 'Учимся делать анимацию и озвучивать персонажей.',
		img: 'https://cdn-icons-png.flaticon.com/512/1995/1995578.png'
	},
	{
		id: 8,
		name: 'Юный блогер',
		rating: 3,
		description: 'Основы видеомонтажа и создания контента для YouTube.',
		img: 'https://cdn-icons-png.flaticon.com/512/3662/3662691.png'
	},
	{
		id: 9,
		name: 'Робототехника Lego',
		rating: 5,
		description: 'Собираем роботов и программируем их на выполнение задач.',
		img: 'https://cdn-icons-png.flaticon.com/512/2942/2942813.png'
	},
	{
		id: 10,
		name: 'Графический дизайн',
		rating: 4,
		description: 'Создаем крутые картинки и открытки в Figma для детей.',
		img: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png'
	},
	{
		id: 11,
		name: 'Кибербезопасность для детей',
		rating: 4,
		description: 'Как безопасно сидеть в интернете и защищать свои данные.',
		img: 'https://cdn-icons-png.flaticon.com/512/3011/3011277.png'
	},
	{
		id: 12,
		name: 'Мобильная разработка',
		rating: 4,
		description: 'Создаем простые мобильные приложения для Android и iOS.',
		img: 'https://cdn-icons-png.flaticon.com/512/4144/4144864.png'
	},
	{
		id: 13,
		name: '3D моделирование',
		rating: 5,
		description: 'Учимся создавать 3D персонажей и объекты в Blender.',
		img: 'https://cdn-icons-png.flaticon.com/512/5968/5968440.png'
	},
	{
		id: 14,
		name: 'Фотография для детей',
		rating: 3,
		description: 'Основы фотографии: композиция, свет и обработка фото.',
		img: 'https://cdn-icons-png.flaticon.com/512/1042/1042339.png'
	},
	{
		id: 15,
		name: 'Шахматы онлайн',
		rating: 4,
		description: 'Обучаем стратегии и тактике игры в шахматы.',
		img: 'https://cdn-icons-png.flaticon.com/512/3094/3094829.png'
	},
	{
		id: 16,
		name: 'Английский для геймеров',
		rating: 4,
		description: 'Учим английский язык через игры и игровую лексику.',
		img: 'https://cdn-icons-png.flaticon.com/512/3898/3898082.png'
	},
	{
		id: 17,
		name: 'Каллиграфия',
		rating: 3,
		description: 'Учимся красиво писать и рисовать буквы.',
		img: 'https://cdn-icons-png.flaticon.com/512/2997/2997969.png'
	},
	{
		id: 18,
		name: 'Юный изобретатель',
		rating: 5,
		description: 'Развиваем инженерное мышление и создаем полезные вещи.',
		img: 'https://cdn-icons-png.flaticon.com/512/3135/3135719.png'
	},
	{
		id: 19,
		name: 'Управление дронами',
		rating: 5,
		description: 'Основы пилотирования дронов и аэросъемки.',
		img: 'https://cdn-icons-png.flaticon.com/512/4526/4526783.png'
	},
	{
		id: 20,
		name: 'Кулинария для детей',
		rating: 4,
		description: 'Готовим простые и вкусные блюда вместе с шеф-поваром.',
		img: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png'
	}
]
