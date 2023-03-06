import "./App.css"
import { useEffect, useState } from "react";
import { AddBlock } from "./components/addBlock/AddBlock";
import { Block } from "./components/block/Block";
import axios from "axios";


import man from './assets/image/man.png'
import girl from './assets/image/girl.png'
import kid from './assets/image/kid.png'
import plus from './assets/image/plus.png'
import { Edit } from "./components/block/edit/Edit";


const photo = [man, girl, kid];


function App() {

	const [lists, setLists] = useState(null);
	const [task, setTask] = useState(null);
	const [checked, setChecked] = useState(false);
	const [blockOpened, setBlockOpened] = useState(false);
	const [hiddenBlock, setHiddenBlock] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [itemForEdit, setItemForEdit] = useState('');
	const [filteredCarts, setFilteredCarts] = useState('');

	const [taskAdd, setTaskAdd] = useState(null);

	useEffect(() => {
		axios.get('https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart')
			.then(({ data }) => {
				setLists(data);
				setFilteredCarts(data);
			});
			axios.get('https://62abab0dbd0e5d29af13d0c5.mockapi.io/items')
			.then(({ data }) => {
				setTask(data);
				setTaskAdd(data);
			});
	}, []);

	const filteredList = (id) => {
		if (Number(id) !== 9) {
			setFilteredCarts(lists.filter(item => Number(item.tag) === Number(id)))
		} else {
			setFilteredCarts(lists);
		}
	}

	const [imageIndex, setImageIndex] = useState(man);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setImageIndex(photo[Math.floor(Math.random() * photo.length)]);
		}, 3000)
		return () => clearInterval(intervalId);
	}, [])


	return (
		<div className="container">
			{blockOpened ?
				<AddBlock
					task={task}
					onClickBlock={() => setBlockOpened(false)} />
			:
			null}
			{openEdit && (
				lists && 
				lists.map(list => (
					<Edit
						key={list.id}
						list={list}
						itemEdit={itemForEdit}
						onClickEdit={() => setOpenEdit(!openEdit)}
				/>
				)))
			}
			<div className="todo">
				<p>Todo</p>
				<img onClick={() => setBlockOpened(true)} className="plus" src={plus} draggable={false} width={35} alt='plus'/>
			</div>
			
			<div	className="main">
				<div	className="aside">
					<ul>
						{task ?
							(task.map((item, index) =>
								<li
									key={index}
									onClick={() => filteredList(item.id)}
								>
									<i className={`color color--${item.colorName}`}></i>
									{item.name}
								</li>
							)) : ('Загрузка...')}
					</ul> 
					<div className="hide_done">
						<input
							onClick={() => setHiddenBlock(!hiddenBlock)}
							className="custom_checkbox"
							type="checkbox"
							checked={checked}
							onChange={() => setChecked(!checked)}
						/>
						<label >{checked ?
							(<p className="custom_color1">Спрятать выполненое</p>)
							:
							(<p className="custom_color2">Спрятать выполненое</p>)}
						</label>
					</div>
						<img className="image" draggable={false} alt='' src={imageIndex}/>
				</div>
			<div className="block">
				{lists ? (
					filteredCarts.map((item, index) =>
						<Block
							key={index}
							items={item}
							hidden={hiddenBlock}
							onClickEdit={() => setOpenEdit(!openEdit)}
							onClickItem={() => setItemForEdit(item)}
							onRemove={(id) => {
								const newLists = lists.filter(item => item.id !== id);
								setLists(newLists);
							}}
							isRemovable
							/>
						) ): (
							'Загрузка...'
						)
				}
			</div>
		</div>
	</div>
  );
}
export default App;
