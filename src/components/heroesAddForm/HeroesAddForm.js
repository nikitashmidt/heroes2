import { useHttp } from '../../hooks/http.hook';
import { useSelector } from 'react-redux';
import { filtersAdd, heroesAdd } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const { filters } = useSelector(state => state);
    const [ nameHeroes, setNameHeroes ] = useState();
    const [ description, setDescription ] = useState();
    const [ element, setElement ] = useState();

    useEffect(() => {
        request("http://localhost:3001/filters")
        .then(filter =>  dispatch(filtersAdd(filter)))
    }, [])
    const onAddHeroes = (e) => {
        e.preventDefault();
        if (element !== undefined) {
            const newHeroes = {
                id: uuid(),
                name: nameHeroes,
                description: description,
                element: element
            }
            dispatch(heroesAdd(uuid(), nameHeroes, description, element))
            request("http://localhost:3001/heroes", "POST", JSON.stringify(newHeroes))
            .then(data => console.log(data))
        }
    }
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onAddHeroes(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    value={nameHeroes}
                    onChange={(e) => setNameHeroes(e.target.value)}
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value) }
                    >
                        {filters.map(filter=> {
                            return(
                                <option key={uuid()} value={filter.name}>{filter.name}</option>
                            )
                        })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;