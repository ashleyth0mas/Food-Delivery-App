import React, { useEffect } from 'react';
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from '../actions/restaurantAction';
import Restaurant from '../components/Restaurant';
import Loader from '../components/layout/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import CountRestaurant from './CountRestaurant';
import { useParams, useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keyword } = useParams();
    const { loading: restaurantsLoading, error: restaurantsError, restaurants, showVegOnly } = useSelector((state) => state.restaurants);

    useEffect(() => {
        if (restaurantsError) {
            // Handle error here, e.g., show an error message
            return;
        }
        dispatch(getRestaurants(keyword));
    }, [dispatch, restaurantsError, keyword]);

    const handleSortByRatings = () => {
        dispatch(sortByRatings());
    };

    const handleSortByReviews = () => {
        dispatch(sortByReviews());
    };

    const handleToggleVegOnly = () => {
        dispatch(toggleVegOnly());
    };

    return (
        <>
            <CountRestaurant />
            {restaurantsLoading ? (
                <Loader />
            ) : restaurantsError ? (
                <Message variant="danger">{restaurantsError}</Message>
            ) : restaurants && restaurants.restaurants && restaurants.restaurants.length ? (
                <section>
                    <div className="sort">
                        <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                            {showVegOnly ? 'Show All' : 'Veg Only'}
                        </button>
                        <button className="sort_rev p-3" onClick={handleSortByReviews}>
                            Sort By Reviews
                        </button>
                        <button className="sort_rate p-3" onClick={handleSortByRatings}>
                            Sort By Ratings
                        </button>
                    </div>
                    <div className="row mt-4">
                        {restaurants.restaurants.map(
                            (restaurant) =>
                                (!showVegOnly || (showVegOnly && restaurant.isVeg)) && (
                                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                                )
                        )}
                    </div>
                </section>
            ) : (
                <Message variant="info">No restaurants found</Message>
            )}
        </>
    );
};

export default Home;
