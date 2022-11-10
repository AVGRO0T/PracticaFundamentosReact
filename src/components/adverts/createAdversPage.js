import { useEffect, useState } from 'react';
import { createAdverts } from '../../clientApi/petitions';
import { getTags } from './tags';


const GetTag = () => {
    const [tags, setTags] = useState(["rojo","rojo"]);

    useEffect (() => {
        const execute = async () => {
            const tags = await getTags();
            setTags(tags);
        };
        execute();
    },);
    return tags;
}



const CreateAdverts = () => {
    
 
    const [name, setName] = useState('');
    const [sale, setSale] = useState('');
    const [price, setPrice] = useState(0);
    const [tags, setTags]= useState([]);
    const [image, setImage]= useState('');

    const handleChangeName = event => setName(event.target.value);
    const handleChangeSale = event => setSale(event.target.value);
    const handleChangePrice = event => setPrice(event.target.value);
    const handleChangeTags = event => setTags(event.target.value);
    const handleChangeImage = event => setImage(event.target.value);
    
     
    
    const handleSubmit = async event => {
        event.preventDefault();

    try {
        /* const createdAdverts = */ await createAdverts({ name, sale, price, tags, image});
    } catch (error) {
        console.log ("HACER UN ERROR");
    } 
    };
    /* console.log(GetTag()); */
    return (
        <div>
            <h1> CREA TU ANUNCIO </h1>
            <form onSubmit={handleSubmit}>
            <label> Name </label>
            <input type={"text"} onChange={handleChangeName} name="name" value={name}/>
            <div className='selectSale'>
                <label>
                Sale:
                <select onChange={handleChangeSale} value={sale}>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
                </label>
            </div>
            <label> Price </label>
            <input type={"text"} onChange={handleChangePrice} name="price" value={price}/>
            <div className='selectTags'>
            <label>
            Tags:
            <select value={tags} onChange={handleChangeTags}>
              {GetTag().map(item => {
                  return (<option key={item} value={item}>{item}</option>);
              })}
            </select>
          </label>
            </div>
            <label> IMAGEN:
                <input type={"file"} value={image} onChange={handleChangeImage}></input>
            </label>
            <input type="submit"></input>
            </form>
        </div>

    )
}
export default CreateAdverts;