import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react'

export const Register = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='px-3'>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='grid grid-cols-12 p-5'>
          <div className='col-span-12 border-b-black'>
            <IonInput 
              label="Nombre"
              labelPlacement="floating" 
              fill="solid" 
              placeholder="Enter text">
            </IonInput>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
