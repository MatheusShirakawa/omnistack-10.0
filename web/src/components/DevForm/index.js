import React ,{useState, useEffect} from 'react';

function DevForm({ onSubmit }){
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [techs, setTechs] = useState('');
    const [github_username, setGithub_username] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
    
          },
          (err)=>{
            console.log(err);
          },
          {
            timeout:300000,
          }
         )
      },  []);

    async function handleSubmit(e){
        e.preventDefault();
        console.log(e);

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithub_username('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="github_userna
                me">Usuario do github</label>
                <input 
                    name="github_username" 
                    id="github_username" 
                    type="text" 
                    required
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input 
                    name="techs" 
                    id="techs" 
                    type="text" 
                    value={techs}
                    required
                    onChange={e => setTechs(e.target.value) }
                />
              </div>

              <div className="input-group">
                <div className="input-block">
                  <label htmlFor="latitude">Latitude</label>
                  <input 
                      name="latitude" 
                      id="latitude" 
                      type="number" 
                      required 
                      value={latitude}
                      onChange={e => setLatitude(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="longitude">Longitude</label>
                  <input 
                      name="longitude" 
                      id="longitude" 
                      type="number"  
                      required 
                      value={longitude}
                      onChange={e => setLongitude(e.target.value)}
                    />
                </div>
              </div>
              <button type="submit">Salvar</button>
          </form>
    );
}

export default DevForm;