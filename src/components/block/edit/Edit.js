import './Edit.css'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export const Edit = ({onClickEdit, itemEdit}) => {

	const [inputValueEdit, setInputValueEdit] = useState(itemEdit.title);
	const [areaValueEdit, setAreaValueEdit] = useState(itemEdit.description);

	
	const closepopup = () => {
		
		axios.put(`https://62abab0dbd0e5d29af13d0c5.mockapi.io/cart/${itemEdit.id}`, {
			title: inputValueEdit,
			description: areaValueEdit,
			completed: false
		}).catch(() => {
			alert('Ошибка при редактировании!');
		})
		setInterval(() => {
			window.location.reload()
		}, 500)
		onClickEdit();
	}

	return (
	<div className='wrapper_edit'>
		<div className='container_edit'>
			<div className='edit_button'>
				<p onClick={onClickEdit} className='close_edit'>закрыть</p>
				<button onClick={closepopup} >изменить</button>
			</div>
			<h1>Заголовок</h1>
		  <input
			  value={inputValueEdit}
			  onChange={e => setInputValueEdit(e.target.value)}
			  className='background1'
			  type="text"
			  placeholder="название загаловка"
		  />
		  <h2 >Описание</h2>
		  <textarea
			  type="text"
			  value={areaValueEdit}
			  onChange={e => setAreaValueEdit(e.target.value)}
			  placeholder="описание"
			  className='background2'
			  />
		</div>
	</div>
	)
}
