import { IonContent, IonHeader,  IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';

export const Register = () => {

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='px-3'>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='grid grid-cols-12 p-5 gap-4'>
          <div className='col-span-12 border-b-black'>
            <TextField className='w-full' label="Nombre" variant='filled' />
          </div>
          <div className='col-span-12 border-b-black'>
            <TextField className='w-full' label="Apellidos" variant='filled' />
          </div>
          <div className='col-span-12 border-b-black'>
            <MobileDatePicker
              defaultValue={dayjs('2022-04-17')}
              slots={{
                textField: (params) => 
                  <TextField 
                    {...params} 
                    className="w-full" 
                    variant="filled" 
                    label="Fecha de nacimiento" 
                  />
              }}
            />
          </div>
          <div className='col-span-12 border-b-black'>
            <FormControl variant="filled" className='w-full'>
              <InputLabel id="demo-simple-select-filled-label">
                Género
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Selecciona tu género</em>
                </MenuItem>
                <MenuItem value={10}>Hombre</MenuItem>
                <MenuItem value={20}>Mujer</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
