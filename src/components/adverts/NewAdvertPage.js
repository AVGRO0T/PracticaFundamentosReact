import { useEffect, useState } from 'react';
import { createAdverts } from '../../clientApi/petitions';
import { getTags } from './tags';
import { useNavigate } from 'react-router-dom';

export const GetTag = () => {
    const [tags, setTags] = useState([]);

    useEffect (() => {
        const execute = async () => {
            const tags = await getTags();
            setTags(tags);
        };
        execute();
    },[]);
    return tags;
}



const CreateAdverts = () => {
    
    const tag = GetTag();

    const [name, setName] = useState('');
    const [sale, setSale] = useState(true);
    const [price, setPrice] = useState('');
    const [tags, setTags]= useState([]);
    const [photo, setPhoto]= useState(null);

    const handleChangeName = event => setName(event.target.value);
    const handleChangeSale = event => setSale(event.target.value);
    const handleChangePrice = event => setPrice(event.target.value);
    const handleChangeTags = event => {
        setTags(tags.concat(event.target.value))
        console.log(tags)
        ;}
    const handleChangephoto = event => setPhoto(event.target.files[0]);
    
    const navigate = useNavigate(); 
    
    const handleSubmit = async event => {
        event.preventDefault();

    try {
        const formData = new FormData();
        if (photo != null){
            formData.append("photo", photo)
        }
        formData.append("name", name )
        formData.append("sale", sale)
        formData.append("price", price)
        formData.append("tags", tags)
        
       const advert = await createAdverts(formData)
       
       navigate(`/adverts/${advert.id}`)
        console.log("CREADO");
    } catch (error) {
        console.log ("HACER UN ERROR");
    } 
    };
    const isButtonEnabled = () => name && price && sale && tags;
    return (
        <div>
            <h1> CREA TU ANUNCIO </h1>
            <form method='post' onSubmit={handleSubmit} encType="multipart/form-data" >
            <label> Name </label>
            <input type={"text"} onChange={handleChangeName} name="name" value={name}/>
            <div className='selectSale'>
                <label>
                Sale:
                <select onChange={handleChangeSale} value={sale}>
                    <option value={true}>Compra</option>
                    <option value={false}>Venta</option>
                </select>
                </label>
            </div>
            <label> Price </label>
            <input type={"number"} onChange={handleChangePrice} name="price" value={price}/>
            <div className='selectTags'>
            {tag.map(tagss => {
                return (
                    <div key={tagss.id}>
                    <input type={"checkbox"} onChange={handleChangeTags} value={tagss} name="tags"/>
              <label htmlFor={tagss}>{tagss}</label>
              </div>
                )
            })
            }
           
             
          
            </div>
            <label> IMAGEN:
                <input type={"file"} id="fileInput"  onChange={handleChangephoto}></input>
            </label>
            <input type="submit" disabled={!isButtonEnabled()}></input>
            </form>
        </div>

    )
}
export default CreateAdverts;