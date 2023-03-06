import React, { useEffect, useState } from 'react'
import './AddBlock.css'
import axios from "axios";


export const AddBlock = ({ onClickBlock, task}) => {

	const [inputValue, setInputValue] = useState('');
	const [areaValue, setAreaValue] = useState('');
	const [colorCheck, setColorCheck] = useState('');

	const activeColor = (id) => {
		if (id === colorCheck)
		return 'active'
	}

	const [drop, setDrop] = useState([]);
	
	useEffect(() => {
		setDrop(task);
	}, [])
	
	const isDisabled = () => { if (!colorCheck) return 'disable'; };

	const addList = () => {
		axios.post('https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart', {
			title: inputValue,
			description: areaValue,
			completed: false,
			tag: colorCheck
		}).catch(() => {
			alert('Ошибка при добавлении!');
		})
		onClickBlock();
		setInterval(() => {
			window.location.reload()
		}, 1000)
	};


  return (
		<div className='wrapper_block'>
			<div className='container_block'>
				<div className='block_button'>
					<p onClick={onClickBlock} className='close'>закрыть</p>
					<button className={isDisabled()} onClick={addList} >добавить</button>
				</div>
				<h1>Заголовок</h1>
			  <input
				  value={inputValue}
				  onChange={e => setInputValue(e.target.value)}
				  className='background1'
				  type="text"
				  placeholder="название загаловка"
			  />
			  <h2 >Описание</h2>
			  <textarea
				  type="text"
				  value={areaValue}
				  onChange={e => setAreaValue(e.target.value)}
				  placeholder="описание"
				  className='background2'
				/>
				<p>Тэги</p>
				<div className='flex1'>
					{drop.map((item, index) => (
					<div
							key={index}
							className={`checkbox ${activeColor(item.colorId)}`}>
						<input type="radio"
							name='tagId'
							className='inputbox'
							onChange={() => setColorCheck(item.colorId)}
						/>
						<label 
						className='labelbox '>
							<i className={`label_i label_i--${item.colorName}`}></i>
							{item.name}
						</label>
					</div>
			  ))}
				</div>
		</div>
	 </div>
  )
}
