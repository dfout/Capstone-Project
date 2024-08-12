import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getItemsThunk } from "../../redux/item";
import { NavLink } from "react-router-dom";
import './StoreHomePage.css';
import { IoIosStar, IoIosSearch } from "react-icons/io";

function StoreHomePage() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const [storeItems, setStoreItems] = useState([]);
    const [searchName, setSearch] = useState('');
    const [loadingMain, setLoadMain] = useState(true);

    // Function to filter items based on search input
    const filterItems = () => {
        if (searchName) {
            const filteredItems = Object.values(items).filter((item) => 
                item.name.toLowerCase().includes(searchName.toLowerCase()) ||
                item.description.toLowerCase().includes(searchName.toLowerCase())
            );
            setStoreItems(filteredItems);
        } else {
            setStoreItems(Object.values(items));
        }
    };

    useEffect(() => {
        dispatch(getItemsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (Object.values(items).length) {
            setStoreItems(Object.values(items));
            setLoadMain(false);
        }
    }, [items]);

    useEffect(() => {
        filterItems();
    }, [searchName, items]);

    const handleChange = (event) => {
        const value = event.target.value;
        switch (value) {
            case 'lowToHigh':
                setStoreItems((prevItems) => prevItems.slice().sort((a, b) => a.price - b.price));
                break;
            case 'highToLow':
                setStoreItems((prevItems) => prevItems.slice().sort((a, b) => b.price - a.price));
                break;
            case 'bestRating':
                setStoreItems((prevItems) => prevItems.slice().sort((a, b) => b.avgRating - a.avgRating));
                break;
            default:
                setStoreItems(Object.values(items));
                break;
        }
    };

    if (loadingMain) return <h1>Loading...</h1>;

    return (
        <div className='container'>

            <div className='sort-by-cont'>
            <div className='searchBarVisual'>
                <IoIosSearch />
                <input
                    className='searchBar'
                    type="search"
                    value={searchName}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search items..."
                />
            </div>
                <form className='sort-by'>
                    <label>Sort by:</label>
                    <select onChange={handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value='featured'>Featured</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                        <option value="bestRating">Best Rating</option>
                    </select>
                </form>
            </div>
            <div className='all-items'>
                {storeItems.map((item) => (
                    <div key={item.id} className="item-tile">
                        <NavLink className='item-link' to={`/store/items/${item.id}`}>
                            <div className='item-image-container'>
                                <img id='store-preview-image' src={item.Images[0].url} alt={item.name} />
                            </div>
                            <div className='item-details'>
                                <h3>{item.name}</h3>
                                <span>${item.price.toFixed(2)}</span>
                                <div className='rating-previews'>
                                    <IoIosStar />
                                    {item.avgRating && <span>{item.avgRating.toFixed(2)}</span>}
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoreHomePage;
