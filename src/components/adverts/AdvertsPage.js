import { useEffect } from 'react';
import { useState } from 'react';
import { getAdverts } from '../../clientApi/petitions';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

import './AdvertsPage.css'

import Page from '../layout/Page';
import { GetTag } from './NewAdvertPage';
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
    const [filterprice, setFilterprice] = useState(0);
    const [filtersale, setFilterSale] = useState('todos');
    const [filtertag, setFiltertags] = useState('todos');

    const adverts = GetAdvert();
    const tag = GetTag();

   const handleChangeFiltername = event => setFiltername(event.target.value);
   const handleChangeFilterprice = event => setFilterprice(event.target.value);
   const handleChangeFiltersale = event => setFilterSale(event.target.value);
   const handleChangeFiltertags = event => {
    setFiltertags(event.target.value);
   // setFiltertags('work','mobile','lifesty','motor')
    console.log(filtertag)
    }
    
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
    let results2 = [];
    if (!filterprice ){
        results2 = results
    }else {
       results2 = results.filter( (data) => 
        
         data.price >= parseInt(filterprice,10) 
        )
    }
    // Filtro Estado
    let results3 = [];
    if (filtersale === 'todos'){
        results3 = results2
    } else if ( filtersale === "compra"){
       
        function searching (x) { return x.sale === true}
        results3 = results2.filter(searching);
        
    }else {
        function searching (x) { return x.sale === false}
        results3 = results2.filter(searching);
    }

    // Filtro por tags

    let results4 = [];
    if (filtertag === 'todos'){
        if (!results3) {
            results4 = adverts
        }else
        results4 = results3
    } else {
        results4 = results3.filter( (data) => 
        data.tags.includes(filtertag)
        )
    }
    return (
        <Page title="Lista de Anuncios" {...props}>
        <div className="AdvertsPage"> 
        <label>
            Filtra por Nombre:
        <input type="text" value={filtername} onChange={handleChangeFiltername}/>
        </label>
        <label>
            Filtrar por Precio:
        <input type="range" value={filterprice} onChange={handleChangeFilterprice}/>
        {filterprice}
        </label>
        <div>
       
            Filtrar por Estado:
        <label><input type={"radio"} onChange={handleChangeFiltersale} name="empleoactual" value="todos"/> Todos </label>
        <label><input type={"radio"} onChange={handleChangeFiltersale} name="empleoactual" value="compra"/> Compra</label>
        <label><input type={"radio"} onChange={handleChangeFiltersale} name="empleoactual" value={false}/> Venta </label>


        </div>
        <div className='selectTags'>
            {tag.map(tagss => {
                return (
                    <div key={tagss.id}>
                    <input type={"checkbox"} onChange={handleChangeFiltertags} value={tagss} name="tags"/>
              <label htmlFor={tagss}>{tagss}</label>
              </div>
                )
            })
            } 
           <input type={"checkbox"} onChange={handleChangeFiltertags} value="todos" name="tags"/>
              <label htmlFor="todo">Todos</label>
            </div>
        
        {adverts.length ? (
            <div className='spaceAdverts'>
                {results4.map(advert => (
                    <div key={advert.id} className='showAdverts'>

                    <Link to={`/adverts/${advert.id}`}>
                        <article className='articlesDetail'>
                            <div className='showAdverts'>

                                <span className='adverts-price'><p>Precio:</p> {advert.price} EUR </span> <br></br>
                                <span className='adverts-name'> <p>Nombre:</p> {advert.name} </span> <br></br>
                              <div>
                                <h4>Tags:</h4>
                                {advert.tags.map((usar) => {
                                    return (<span className='adverts-tags'> {usar} </span>) 
                                })}
                                
                                
                              </div>
                                
                                {advert.sale === true &&
                                <span className='adverts-sale'><p>Estado:</p> Compra </span>
                                }
                                {advert.sale === false &&
                                <span className='adverts-sale'><p>Estado:</p> Venta </span>
                                }
                            </div>
                        </article>
                    </Link>
                    </div>
                ))}
            </div>
        ) : (
            <EmptyList />
        )}    
        </div>
        </Page>
    )

  }
export default AdvertsPage;