import React, { useEffect, useState } from "react";

const endpoint = "https://playground.4geeks.com/apis/fake/todos/user/alexavs1991";



const Home = () => {

	const [taskInput, setTaskInput] = useState("");
	const [myTodos, setMyTodos] = useState([]);

	const getTasks = async () => {
		try {
			const response = await fetch(endpoint);
			const data = await response.json();
			setMyTodos(data);
		} catch (error) {
			console.log(error, "ERROR the task is wrong")
		}
	};

	const editTask = async (task) => {
		const response = await fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(task),
			headers: { 'Content-Type': 'application/json' }
		})
	}


	const handleClick = () => {
		const newTask = [...myTodos, { done: false, label: taskInput }]
		setMyTodos(newTask)
		setTaskInput("")
		editTask(newTask)
	}


	const handleChange = (e) => {
		setTaskInput(e.target.value);
	}

	const deleteTask = async (index) => {
		const eliminateTask = myTodos.filter((item, indice) => indice !== index);
		setMyTodos(eliminateTask)
		editTask(eliminateTask)

	}


	useEffect(() => {
		getTasks();
	}, [])


	return (
		<>
			<div className="container">
				<div className="row mx-1">
					<div>
						<h1>
							Todo List
						</h1>

						<div className="d-flex justify-content-between">
							<input className="input form-control" onChange={handleChange}></input>
							<button onClick={handleClick} className="button btn btn-success" type="submit">
								Add
							</button>
						</div>
					</div>
					<div className="my-3">
						<ul>
							{myTodos.map((task, index) => {
								return (
									<div className="my-3 d-flex justify-content-between" key={index}>
										{task.label}
										<button className="trash btn btn-danger" onClick={() => deleteTask(index)}>
											<i class="fas fa-trash-alt"></i>
										</button>
									</div>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}


export default Home;
