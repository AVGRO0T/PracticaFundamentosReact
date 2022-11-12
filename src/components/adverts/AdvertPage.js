import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../layout/Page';
import { getAdvertsDetail, deleteAdvertsDetail } from '../../clientApi/petitions';
import Button from '../common/Button';


const AdvertPage = props => {
    const [advertname, setAdvertname] = useState('');
    const [advertprice, setAdvertprice] = useState(null);
    const [adverttags, setAdverttags] = useState(null);
    const [advertsale, setAdvertsale] = useState(null);
    const [advertphoto, setAdvertphoto] = useState(null);
   
    const {advertId} = useParams();
    const navigate = useNavigate();
    const unmounteRef = useRef(false);

    useEffect (() => {
        getAdvertsDetail(advertId)
         .then(advert => {
            setAdvertname(advert.name);
            setAdvertphoto(advert.photo);
            setAdvertprice(advert.price);
            setAdvertsale(advert.sale);
            setAdverttags(advert.tags)
         })
         .catch(error => {
            if (error.status === 404) {
                navigate('/')
            }
         })
    }, [advertId, navigate]);
    useEffect(() => {
        return () => {
          unmounteRef.current = true;
        };
      }, []);


     
      return (
        <Page title="Detalle de Anuncio" {...props}>
            
          <div>
           <h3> {advertname} </h3>
           <img src={advertphoto}></img>
           <p>Precio: {advertprice}</p>
           <p> Tipo de Producto {advertsale}</p>
           <span>TAGS: {adverttags}</span>
           
          
           
    
          </div>
            

        </Page>

      );

}

export default AdvertPage