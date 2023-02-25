import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from '../../hooks/http.hook';
import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions/actions';
import { v4 as uuid } from 'uuid';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом 


const HeroesFilters = () => {
    const { heroes, filters } = useSelector(state => state);
    const { request } = useHttp();
    const dispatch = useDispatch();
    const onFilterHeroes = (e) => {
        const value = e.target.value;
        if (value === 'all') {
            dispatch(heroesFetching())
            request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(heroesFetchingError())
        }
    }
    function addFilters() {
        heroes.map(item => {
            <button key={uuid()} value={item.element}
                onClick={((e) => onFilterHeroes(e))} 
                className={`btn ${item.className}`}>
                { heroes.element } 
            </button>
        })
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group"> {addFilters()} </div>
            </div>
        </div>
    )
}

export default HeroesFilters;



// API
// http://localhost:3001/heroes?title=json-server&element=water