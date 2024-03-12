import { useState } from 'react';
import { TOffer } from '../../services/types/offers';
import OffersList from '../offers-list/offers-list';
import { SIZES } from '../../services/constants';

type TOffersListCardProps = {
    offers: TOffer[];
}


const OfferListBlock = ({offers}: TOffersListCardProps) => {
  const [activeOfferId, setActiveOfferId] = useState<string|null>(null);

  function handleMouseEnter(id:string) {
    setActiveOfferId(id);
  }

  function handleMouseLeave() {
    setActiveOfferId(null);
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
        Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <OffersList offers={offers} listClassName='cities__places-list places__list tabs__content' cardSize={SIZES.offers} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" data-id={activeOfferId}></section>
      </div>
    </div>
  );
};

export default OfferListBlock;