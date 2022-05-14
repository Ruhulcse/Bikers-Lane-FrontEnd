import React, { useState } from 'react';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Events = () => {
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();
    return(

        <>
        <Event></Event>
        </>
    );


}



export default Events;