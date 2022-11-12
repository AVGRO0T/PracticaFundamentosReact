import { useEffect } from 'react';
import { useState } from 'react';
import { getAdverts } from '../../clientApi/petitions';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
//import classNames from 'classnames';
import Page from '../layout/Page';
const EmptyList = () => (
    <div style={{ textAlign: 'center' }}>
      <p>No hay anuncios creados</p>
      <Button as={Link} to="/adverts/new" variant="primary">
       Crear nuevo anuncio
      </Button>
    </div>
  );

  const GetAdvert = () => {
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const execute = async () => {
            const adverts = await getAdverts();
            setAdverts(adverts); 
        };
        execute();
    },[]);

    return adverts;
  };

  const AdvertsPage = props => {
    const [filtername, setFiltername] = useState('');
    const [filterprice, setFilterprice] = useState(0)
    const adverts = GetAdvert();

   const handleChangeFiltername = event => setFiltername(event.target.value);
   const handleChangeFilterprice = event => setFilterprice(event.target.value);
    /* const className = classNames(styles.advertsPage, {
        [styles.empty]: !adverts.length,
    }); */

    //Filtro Name

    let results = [];
    if (!filtername){
        results = adverts
    }else {
        results = adverts.filter( (data) => 
        data.name.toLowerCase().includes(filtername.toLocaleLowerCase())
        )
    }
    // Filtro Precio
    if (!filterprice ){
        results = adverts
    }else {
        results = adverts.filter( (data) => 
        
         data.price >= parseInt(filterprice,10) 
        )
    }
    return (
        <Page title="Lista de Anuncios" {...props}>
        <div className="test"> 
        <label>
            Filtra por Nombre:
        <input type="text" value={filtername} onChange={handleChangeFiltername}/>
        </label>
        <label>
            Filtrar por Precio:
        <input type="range" value={filterprice} onChange={handleChangeFilterprice}/>
        {filterprice}
        </label>
        {adverts.length ? (
            <ul>
                {results.map(advert => (
                    <li key={advert.id}>

                    <Link to={`/`}>
                        <article>
                            <div>

                                <span className='adverts-price'>{advert.price} EUR</span>
                                <span className='adverts-name'>{advert.name}</span>
                                <span className='adverts-tags'>{advert.tags}</span> 
                                {advert.sale === true &&
                                <span className='adverts-sale'>Compra</span>
                                }
                                {advert.sale === false &&
                                <span className='adverts-sale'>Venta</span>
                                }
                            </div>
                        </article>
                    </Link>
                    </li>
                ))}
            </ul>
        ) : (
            <EmptyList />
        )}    
        </div>
        </Page>
    )

  }
export default AdvertsPage;