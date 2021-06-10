import React from 'react';
import {
  IonApp,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonRange,
} from '@ionic/react';
import type { InputChangeEventDetail } from '@ionic/core/dist/types/components/input/input-interface';
import { useIonFormState } from './use-ion-form-state';

const tags = ['apple', 'banana', 'cherry', 'orange'];

export default function DemoForm() {
  let { state, reset, item } = useIonFormState({
    name: 'alice',
    age: 12,
    admin: true,
    tags: ['apple', 'orange'],
    cat: '',
    priceRange: { lower: 10, upper: 50 },
  });

  return (
    <>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>useIonFormState Demo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <pre>
            <code>{JSON.stringify(state, null, 2)}</code>
          </pre>
          <div className="ion-text-center">
            <IonButton onClick={reset}>Reset</IonButton>
          </div>
          {item({
            name: 'name',
            label: 'Name',
            // override default Label renderer
            renderLabel: (props) => (
              <IonLabel color="primary" position="floating">
                {props.label}
              </IonLabel>
            ),
            renderContent: (props) => <IonInput type="text" {...props} />,
          })}
          {item({
            name: 'age',
            label: 'Age',
            mapValue: (e: CustomEvent<InputChangeEventDetail>, currentValue) =>
              +e.detail.value! || currentValue,
            renderContent: (props) => <IonInput type="number" {...props} />,
          })}
          {item({
            name: 'admin',
            label: 'Is Admin?',
            renderContent: (props) => (
              <>
                <IonCheckbox {...(props as any)} />
                <IonButton slot="end">additional content</IonButton>
              </>
            ),
          })}
          {item({
            name: 'tags',
            label: 'Tags',
            renderContent: (props) => (
              <IonSelect multiple {...props}>
                {tags.map((tag) => (
                  <IonSelectOption key={tag} value={tag}>
                    {tag}
                  </IonSelectOption>
                ))}
              </IonSelect>
            ),
          })}
          {item({
            name: 'cat',
            label: 'Cat',
            renderContent: (props) => (
              <IonSelect {...props}>
                {tags.map((tag) => (
                  <IonSelectOption key={tag} value={tag}>
                    {tag}
                  </IonSelectOption>
                ))}
              </IonSelect>
            ),
          })}
          {item({
            name: 'priceRange',
            label: 'Price Range',
            renderContent: (props) => (
              <IonRange min={1} max={80} dualKnobs {...props} />
            ),
          })}
        </IonContent>
      </IonApp>
    </>
  );
}
