import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching, heroesFetched, heroesFetchingError, heroesRemove } from '../../actions/actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();
    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(heroesFetchingError())
    }, []);
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    const onDelete =  ((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data=> console.log(data, 'deleted'))
            .then(dispatch(heroesRemove(id)))
            .catch(console.log('error'))
    })
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({id, ...props}) => {
            return <HeroesListItem onDelete={() => onDelete(id)}  key={id} {...props} />
        })
    }
    return (
        <ul> {renderHeroesList(heroes)} </ul>
    )
}
export default HeroesList;