import {useState} from 'react'
import './Block.css'

import tochka from '../../assets/image/tochka.png'
import axios from 'axios'



export const Block = ({ items, isRemovable, onRemove, hidden, onClickEdit, onClickItem}) => {

	const [check, setCheck] = useState(false);
	const [open, setOpen] = useState(false);

	const flex = { display: 'flex' }
	const none = { display: 'none' }
	
	const colorCircle = (id) => {
		let color = '';
		if (id === 1) {
			color = 'lavanda';
	  }

	  if (id === 2) {
			color = 'blue';
	  }

	  if (id === 3) {
			color = 'pink';
	  }

	  if (id === 4) {
			color = 'green';
	  }
		return color;
		
	}



	const removeList = (item) => {
		if (window.confirm('Вы действительно хотите удалить?'))
		{
			axios.delete(`https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart/${item.id}`).then(() => {
				onRemove(item.id);
			})
		}
		setOpen(!open);
		setInterval(() => {
			window.location.reload()
		}, 1000)
	}

	const closeEdit = () => {
		onClickEdit();
		onClickItem(items);
		setOpen(!open);
	}

	return (
	<div style={(hidden && check) ? none : flex} className="main_text">
		<div className="main_text__h1">
			{ check 
				? (<h1><s>{items.title}</s></h1>)
				:
				(<h1>{items.title}</h1>)
			}
			<img className='main_text__remove_icon' src={tochka} onClick={() => setOpen(!open)} draggable={true} width={20} alt='tochka' />
			{open
				&&
				(
					<div className='openclose'>
						<p onClick={closeEdit} className='p_edit'>изменить ...</p>
						{isRemovable && (<p onClick={() => removeList(items)} className='p_delete'>удалить</p>)}
					</div>
			)}
		</div>
		{ check 
				? (<p><s>{items.description}</s></p>)
				:
				(<p>{items.description}</p>)
			}
		<div className="main_text__circle">
				<i className={`color color--${colorCircle(items.tag)}`}></i>
				<input onChange={() => setCheck(!check)} className="custom_check" type="checkbox" />
			<p>
				выполнено
			</p>
		</div>
	</div>
  )
}
